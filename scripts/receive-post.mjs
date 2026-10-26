import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const BLOGS_FILE = path.join(ROOT, "public", "blogs.json");
const IMAGES_DIR = path.join(ROOT, "public", "images");
const API_KEY = process.env.API_KEY || "dev-secret";
const PORT = process.env.PORT || 8790;

function readBlogs() {
  try { return JSON.parse(fs.readFileSync(BLOGS_FILE, "utf8")); } catch { return []; }
}
function writeBlogs(data) {
  const tmp = BLOGS_FILE + ".tmp";
  fs.writeFileSync(tmp, JSON.stringify(data, null, 2));
  fs.renameSync(tmp, BLOGS_FILE);
}
function validate(b) {
  const errors = [];
  if (!b.title) errors.push({ field: "title", got: b.title, limit: "required" });
  else if (b.title.length > 70) errors.push({ field: "title", got: b.title.length, limit: 70 });
  if (!b.excerpt) errors.push({ field: "excerpt", got: b.excerpt, limit: "required" });
  else if (b.excerpt.length > 150) errors.push({ field: "excerpt", got: b.excerpt.length, limit: 150 });
  if (!b.slug) errors.push({ field: "slug", got: b.slug, limit: "required" });
  if (!b.category) errors.push({ field: "category", got: b.category, limit: "required" });
  return errors;
}
function saveImage(slug, imageData) {
  if (!imageData) return null;
  try {
    const buf = Buffer.from(imageData, "base64");
    if (buf.length > 4 * 1024 * 1024) return null;
    if (!fs.existsSync(IMAGES_DIR)) fs.mkdirSync(IMAGES_DIR, { recursive: true });
    const file = path.join(IMAGES_DIR, `${slug}.jpg`);
    fs.writeFileSync(file, buf);
    return `/images/${slug}.jpg`;
  } catch { return null; }
}

const server = http.createServer((req, res) => {
  if (req.method === "GET" && req.url === "/health") {
    res.writeHead(200, { "Content-Type": "application/json" });
    return res.end(JSON.stringify({ ok: true }));
  }
  if (req.method === "POST" && req.url === "/create_post") {
    let body = "";
    req.on("data", (c) => (body += c));
    req.on("end", () => {
      if (req.headers["x-api-key"] !== API_KEY) {
        res.writeHead(401, { "Content-Type": "application/json" });
        return res.end(JSON.stringify({ error: "invalid api key" }));
      }
      let b;
      try { b = JSON.parse(body); } catch {
        res.writeHead(400, { "Content-Type": "application/json" });
        return res.end(JSON.stringify({ error: "invalid json" }));
      }
      const errors = validate(b);
      if (errors.length) {
        res.writeHead(400, { "Content-Type": "application/json" });
        return res.end(JSON.stringify({ error: "validation failed", errors }));
      }
      const blogs = readBlogs();
      if (blogs.some((x) => x.slug === b.slug)) {
        res.writeHead(409, { "Content-Type": "application/json" });
        return res.end(JSON.stringify({ error: "duplicate slug" }));
      }
      const image = saveImage(b.slug, b.image_data) || b.image || null;
      const post = {
        title: b.title,
        content: b.content || "",
        excerpt: b.excerpt,
        slug: b.slug,
        category: b.category,
        author: b.author || "RembdaAI editorial",
        tags: Array.isArray(b.tags) ? b.tags : [],
        faq: Array.isArray(b.faq) ? b.faq : [],
        image,
        publishedAt: b.publishedAt || new Date().toISOString().slice(0, 10),
        draft: false,
      };
      blogs.push(post);
      writeBlogs(blogs);
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ ok: true, slug: b.slug }));
    });
    return;
  }
  res.writeHead(404, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ error: "not found" }));
});

server.listen(PORT, () => console.log(`receiver listening on ${PORT}`));
