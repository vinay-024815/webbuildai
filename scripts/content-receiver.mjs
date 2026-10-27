import { createServer } from "node:http";
import { createHash, timingSafeEqual } from "node:crypto";
import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "src", "content");
const PORT = Number(process.env.CONTENT_RECEIVER_PORT || 8788);
const API_KEY = process.env.CONTENT_RECEIVER_API_KEY;
const MAX_BODY_BYTES = 1_000_000;
const writes = new Map();

if (!API_KEY || API_KEY.length < 24) {
  throw new Error("Set CONTENT_RECEIVER_API_KEY to a random secret of at least 24 characters before starting the receiver.");
}

function json(res, status, value) {
  res.writeHead(status, { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" });
  res.end(JSON.stringify(value));
}

function authorized(req) {
  const header = req.headers.authorization || "";
  const supplied = header.startsWith("Bearer ") ? header.slice(7) : "";
  const expectedHash = createHash("sha256").update(API_KEY).digest();
  const suppliedHash = createHash("sha256").update(supplied).digest();
  return timingSafeEqual(expectedHash, suppliedHash);
}

function resolveFile(value) {
  if (typeof value !== "string") throw new Error("Missing content file name");
  const name = value.replace(/\.json$/i, "");
  if (!/^[a-zA-Z0-9_-]+$/.test(name)) throw new Error("Invalid content file name");
  const target = path.resolve(ROOT, `${name}.json`);
  if (path.dirname(target) !== ROOT) throw new Error("Content file path is outside src/content");
  return { name, target };
}

async function listFiles() {
  const entries = await fs.readdir(ROOT, { withFileTypes: true });
  return entries.filter((entry) => entry.isFile() && entry.name.endsWith(".json"))
    .map((entry) => entry.name.slice(0, -5)).sort();
}

async function readFile(file) {
  const { target } = resolveFile(file);
  let parsed;
  try {
    if ((await fs.lstat(target)).isSymbolicLink()) throw new Error("Symbolic links are not allowed in src/content");
    parsed = JSON.parse(await fs.readFile(target, "utf8"));
  } catch (error) {
    if (error.code === "ENOENT") throw new Error(`Content file not found: ${file}.json`);
    if (error instanceof SyntaxError) throw new Error(`Content file contains invalid JSON: ${file}.json`);
    throw error;
  }
  return parsed;
}

async function saveFile(file, data) {
  const { target } = resolveFile(file);
  const serialized = `${JSON.stringify(data, null, 2)}\n`;
  JSON.parse(serialized);
  const temporary = `${target}.${process.pid}.${Date.now()}.${Math.random().toString(36).slice(2)}.tmp`;
  try {
    await fs.writeFile(temporary, serialized, { encoding: "utf8", flag: "wx" });
    await fs.rename(temporary, target);
  } finally {
    await fs.rm(temporary, { force: true }).catch(() => {});
  }
}

async function modifyFile(file, mutator) {
  const { target } = resolveFile(file);
  const previous = writes.get(target) || Promise.resolve();
  const current = previous.catch(() => {}).then(async () => {
    const data = await readFile(file);
    const result = await mutator(data);
    return result;
  });
  writes.set(target, current);
  try {
    return await current;
  } finally {
    if (writes.get(target) === current) writes.delete(target);
  }
}

function pointerParts(pointer) {
  if (pointer === "") return [];
  if (typeof pointer !== "string" || !pointer.startsWith("/")) throw new Error("Path must be a JSON Pointer beginning with /");
  const parts = pointer.slice(1).split("/").map((part) => part.replace(/~1/g, "/").replace(/~0/g, "~"));
  if (parts.some((part) => ["__proto__", "prototype", "constructor"].includes(part))) {
    throw new Error("Unsafe JSON Pointer path");
  }
  return parts;
}

function parentAt(root, parts) {
  if (!parts.length) throw new Error("The JSON document root cannot be edited; select a nested path");
  let parent = root;
  for (const part of parts.slice(0, -1)) {
    if (parent === null || typeof parent !== "object" || !(part in parent)) throw new Error(`JSON Pointer parent not found: ${part}`);
    parent = parent[part];
  }
  return { parent, key: parts.at(-1) };
}

function editValue(root, operation, pointer, value) {
  if (!["add", "replace", "remove"].includes(operation)) throw new Error("operation must be add, replace, or remove");
  if (operation !== "remove" && value === undefined) throw new Error(`value is required for ${operation}`);
  const { parent, key } = parentAt(root, pointerParts(pointer));
  if (Array.isArray(parent)) {
    if (key === "-" && operation === "add") {
      parent.push(value);
      return root;
    }
    if (!/^(0|[1-9]\d*)$/.test(key)) throw new Error("Array path must use a numeric index (or /- for append)");
    const index = Number(key);
    if (operation === "add") {
      if (index > parent.length) throw new Error("Array insertion index is out of range");
      parent.splice(index, 0, value);
    } else {
      if (index >= parent.length) throw new Error("Array index not found");
      if (operation === "replace") parent[index] = value;
      else parent.splice(index, 1);
    }
  } else if (parent && typeof parent === "object") {
    const exists = Object.prototype.hasOwnProperty.call(parent, key);
    if (operation === "replace" && !exists) throw new Error("JSON Pointer target not found");
    if (operation === "remove") {
      if (!exists) throw new Error("JSON Pointer target not found");
      delete parent[key];
    } else parent[key] = value;
  } else throw new Error("JSON Pointer parent is not an object or array");
  return root;
}

function recordIndex(data, slug) {
  if (!Array.isArray(data)) throw new Error("Record CRUD requires an array JSON file; use edit_content_file for object files");
  return data.findIndex((item) => String(item?.slug ?? "") === String(slug) || String(item?.id ?? "") === String(slug));
}

function slugify(value) {
  return String(value || "").toLowerCase().trim().replace(/[^\w\s-]/g, "").replace(/[\s_-]+/g, "-").replace(/^-+|-+$/g, "");
}

async function handle(action, args) {
  if (action === "list_files") return { files: await listFiles() };
  if (action === "read_file") return { file: args.file, data: await readFile(args.file) };
  if (action === "edit_value") {
    return modifyFile(args.file, async (data) => {
      await saveFile(args.file, editValue(data, args.operation, args.path, args.value));
      return { file: args.file, operation: args.operation, path: args.path, data: await readFile(args.file) };
    });
  }
  if (action === "read_item") {
    const data = await readFile(args.file);
    const index = recordIndex(data, args.slug);
    if (index < 0) throw new Error(`Content not found: ${args.file}/${args.slug}`);
    return { content: data[index] };
  }
  if (action === "list_items") {
    const files = args.file ? [args.file] : await listFiles();
    const records = [];
    for (const file of files) {
      const data = await readFile(file);
      if (Array.isArray(data)) records.push(...data.map((item) => ({ ...item, _sourceFile: file })));
    }
    const offset = Math.max(0, Number(args.offset) || 0);
    const limit = Math.min(100, Math.max(1, Number(args.limit) || 20));
    return { items: records.slice(offset, offset + limit), total: records.length, file: args.file || null };
  }
  if (action === "create_item") {
    return modifyFile(args.file, async (data) => {
      if (!Array.isArray(data)) throw new Error("Cannot append a record to an object file; use edit_content_file with an object path");
      const item = { ...args.item };
      if (!item.title) throw new Error("A title is required");
      if (item.body !== undefined && item.content === undefined) item.content = item.body;
      delete item.body;
      if (!item.slug) item.slug = slugify(item.title);
      if (!item.slug) throw new Error("Could not generate a slug from title");
      if (args.file === "blogs") {
        item.id = item.id ?? Math.max(0, ...data.map((entry) => Number(entry.id) || 0)) + 1;
        item.date = item.date || new Date().toISOString().slice(0, 10);
        item.category = item.category || "General";
        item.kicker = item.kicker || item.category;
        item.excerpt = item.excerpt || "";
        const wordCount = String(item.content || "").replace(/<[^>]*>/g, " ").trim().split(/\s+/).filter(Boolean).length;
        item.readTime = item.readTime || `${Math.max(1, Math.ceil(wordCount / 200))} min`;
        item.seoTitle = item.seoTitle || item.title;
        item.seoDescription = item.seoDescription || item.excerpt || item.title;
      } else item.id = item.id ?? item.slug;
      if (recordIndex(data, item.slug) >= 0) throw new Error(`Duplicate slug or id: ${item.slug}`);
      data.push(item);
      await saveFile(args.file, data);
      return { success: true, slug: item.slug, content: item };
    });
  }
  if (action === "update_item") {
    return modifyFile(args.file, async (data) => {
      const index = recordIndex(data, args.slug);
      if (index < 0) throw new Error(`Content not found: ${args.file}/${args.slug}`);
      const updates = { ...args.updates };
      if (updates.body !== undefined && updates.content === undefined) updates.content = updates.body;
      delete updates.body;
      data[index] = { ...data[index], ...updates, updated: new Date().toISOString().slice(0, 10) };
      await saveFile(args.file, data);
      return { success: true, content: data[index] };
    });
  }
  if (action === "delete_item") {
    return modifyFile(args.file, async (data) => {
      const index = recordIndex(data, args.slug);
      if (index < 0) throw new Error(`Content not found: ${args.file}/${args.slug}`);
      const [deleted] = data.splice(index, 1);
      await saveFile(args.file, data);
      return { success: true, deleted };
    });
  }
  if (action === "search") {
    const query = String(args.query || "").toLowerCase();
    const files = args.file ? [args.file] : await listFiles();
    const results = [];
    for (const file of files) {
      const data = await readFile(file);
      const items = Array.isArray(data) ? data : [data];
      for (const item of items) {
        if (JSON.stringify(item).toLowerCase().includes(query)) results.push({ ...item, _sourceFile: file });
      }
    }
    return { results: results.slice(0, Math.min(100, Number(args.limit) || 20)), total: results.length, query };
  }
  if (action === "check_duplicate") {
    const title = String(args.title || "").trim().toLowerCase();
    if (!title) throw new Error("A title is required");
    for (const file of await listFiles()) {
      const data = await readFile(file);
      const items = Array.isArray(data) ? data : [data];
      const existing = items.find((item) => String(item?.title || "").trim().toLowerCase() === title);
      if (existing) return { isDuplicate: true, existing, file };
    }
    return { isDuplicate: false };
  }
  if (action === "stats") {
    const files = args.file ? [args.file] : await listFiles();
    const byFile = {};
    const byType = {};
    const byCategory = {};
    let total = 0;
    for (const file of files) {
      const data = await readFile(file);
      byFile[file] = Array.isArray(data) ? data.length : 1;
      byType[file] = byFile[file];
      total += byFile[file];
      for (const item of Array.isArray(data) ? data : [data]) {
        if (item?.category) byCategory[item.category] = (byCategory[item.category] || 0) + 1;
      }
    }
    return { total, byFile, byType, byCategory };
  }
  throw new Error(`Unknown receiver action: ${action}`);
}

async function readRequest(req) {
  let body = "";
  for await (const chunk of req) {
    body += chunk;
    if (Buffer.byteLength(body) > MAX_BODY_BYTES) throw new Error("Request body too large");
  }
  return JSON.parse(body || "{}");
}

const server = createServer(async (req, res) => {
  if (req.method === "GET" && req.url === "/health") return json(res, 200, { status: "ok" });
  if (req.method !== "POST" || req.url !== "/api/content") return json(res, 404, { error: "Not found" });
  if (!authorized(req)) return json(res, 401, { error: "Unauthorized" });
  try {
    const request = await readRequest(req);
    const data = await handle(request.action, request);
    return json(res, 200, { success: true, data });
  } catch (error) {
    const status = error instanceof SyntaxError ? 400 : /not found/i.test(error.message) ? 404 : 400;
    return json(res, status, { success: false, error: error.message });
  }
});

server.listen(PORT, "127.0.0.1", () => {
  process.stdout.write(`Content receiver listening at http://127.0.0.1:${PORT}\n`);
});
