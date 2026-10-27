/**
 * MCP Protocol Handler - JSON-RPC over HTTP
 * Handles initialize, tools/list, and tools/call methods
 */

import fs from "node:fs";
import path from "node:path";
import { TOOL_DEFINITIONS } from "./tools.js";
import { hashContent } from "../utils/hash.js";
import { generateSlug } from "../utils/slug.js";

// Content directory - relative to the project root
// const CONTENT_DIR = path.join(process.cwd(), "src", "content");
const CONTENT_DIR = path.join(__dirname, "..", "..", "src", "content");


// Cache for content files (loaded once at startup)
let _contentFilesCache = null;

/**
 * Get all JSON content files from src/content/ directory
 * Returns object: { filenameWithoutJson: fullPath }
 */
function getContentFiles() {
  if (!_contentFilesCache) {
    try {
      const files = fs.readdirSync(CONTENT_DIR);
      _contentFilesCache = files
        .filter((f) => f.endsWith(".json"))
        .reduce((acc, file) => {
          const key = file.replace(".json", "");
          acc[key] = path.join(CONTENT_DIR, file);
          return acc;
        }, {});
    } catch (e) {
      _contentFilesCache = {};
    }
  }
  return _contentFilesCache;
}

/**
 * Read and parse a JSON file from content directory
 */
function readContentFile(fileName) {
  const filePath = path.join(CONTENT_DIR, `${fileName}.json`);
  try {
    const data = fs.readFileSync(filePath, "utf8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

/**
 * Write data to a JSON file in content directory
 */
function writeContentFile(fileName, data) {
  const filePath = path.join(CONTENT_DIR, `${fileName}.json`);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

/**
 * Generate slug from title (same logic as original)
 */
function makeSlug(title, type) {
  return generateSlug(title, type);
}

/**
 * Check for duplicate slug in a data array
 */
function checkDuplicate(data, slug, type) {
  const existing = data.find(
    (item) => item.slug === slug && item.type === type
  );
  return existing ? { isDuplicate: true, existing } : { isDuplicate: false };
}

export class MCPProtocol {
  constructor() {
 this.tools = TOOL_DEFINITIONS;
  }

  handleInitialize() {
    return {
      protocolVersion: "2024-11-05",
      capabilities: {
        tools: {},
      },
      serverInfo: {
        name: "webbuild-ai-mcp",
        version: "1.0.0",
      },
    };
  }

  handleToolsList() {
    return {
      tools: this.tools,
    };
  }

  async handleToolsCall(name, args, env) {
    switch (name) {
      case "read_content":
        return await this.handleReadContent(args, env);
      case "list_content":
        return await this.handleListContent(args, env);
      case "create_content":
        return await this.handleCreateContent(args, env);
      case "update_content":
        return await this.handleUpdateContent(args, env);
      case "delete_content":
        return await this.handleDeleteContent(args, env);
      case "check_duplicate":
        return await this.handleCheckDuplicate(args, env);
      case "search_content":
        return await this.handleSearchContent(args, env);
      case "get_stats":
        return await this.handleGetStats(args, env);
      default:
        throw new Error(`Unknown tool: ${name}`);
    }
  }

  async handleReadContent(args, env) {
    const { file, slug } = args;

    if (!file || !slug) {
      throw new Error("Missing required args: file and slug");
    }

    const data = readContentFile(file);
    const item = data.find((item) => item.slug === slug);

    if (!item) {
      throw new Error(`Content not found: ${file}/${slug}`);
    }

    return { content: item };
  }

  async handleListContent(args, env) {
    const { file, type, limit = 20, offset = 0 } = args;

    if (!file) {
      throw new Error("Missing required arg: file");
    }

    const data = readContentFile(file);
    const filtered = type ? data.filter((item) => item.type === type) : data;
    const items = filtered.slice(offset, offset + limit);

    return {
      items,
      total: filtered.length,
      file,
      type,
    };
  }

  async handleCreateContent(args, env) {
    const { file, title, body, category, tags = [] } = args;

    if (!file || !title) {
      throw new Error("Missing required args: file and title");
    }

    const data = readContentFile(file);

    // Generate slug from title
    const slug = makeSlug(title, file);

    // Check for duplicate
    const dupCheck = checkDuplicate(data, slug, file);
    if (dupCheck.isDuplicate) {
      return {
        success: false,
        error: "duplicate_content",
        reason: `Slug "${slug}" already exists in ${file}`,
        existing: dupCheck.existing,
      };
    }

    const now = new Date().toISOString();

    const newItem = {
      id: slug,
      type: file,
      title,
      slug,
      body: body || "",
      category: category || "",
      tags,
      createdAt: now,
      updatedAt: now,
    };

    data.push(newItem);

    // Write back to file
    writeContentFile(file, data);

    return {
      success: true,
      slug,
      content: newItem,
    };
  }

  async handleUpdateContent(args, env) {
    const { file, slug, title, body, category, tags } = args;

    if (!file || !slug) {
      throw new Error("Missing required args: file and slug");
    }

    const data = readContentFile(file);

    const index = data.findIndex((item) => item.slug === slug);

    if (index === -1) {
      throw new Error(`Content not found: ${file}/${slug}`);
    }

    // Update fields if provided (undefined means "keep existing")
    if (title !== undefined) data[index].title = title;
    if (body !== undefined) data[index].body = body;
    if (category !== undefined) data[index].category = category;
    if (tags !== undefined) data[index].tags = tags;

    data[index].updatedAt = new Date().toISOString();

    // Write back to file
    writeContentFile(file, data);

    return {
      success: true,
      content: data[index],
    };
  }

  async handleDeleteContent(args, env) {
    const { file, slug } = args;

    if (!file || !slug) {
      throw new Error("Missing required args: file and slug");
    }

    const data = readContentFile(file);

    const index = data.findIndex((item) => item.slug === slug);

    if (index === -1) {
      throw new Error(`Content not found: ${file}/${slug}`);
    }

    const removed = data.splice(index, 1)[0];

    // Write back to file (keeps array without the removed item)
    writeContentFile(file, data);

    return {
      success: true,
      deleted: removed,
    };
  }

  async handleCheckDuplicate(args, env) {
    const { title, body, type = "blog" } = args;

    if (!title) {
      throw new Error("Missing required arg: title");
    }

    const files = getContentFiles();
    // Check across all content files
    for (const [fileName, filePath] of Object.entries(files)) {
      const data = readContentFile(fileName);
      const existing = data.find(
        (item) => item.title === title && item.type === type
      );
      if (existing) {
        return {
          isDuplicate: true,
          existing,
          file: fileName,
        };
      }
    }

    return { isDuplicate: false };
  }

  async handleSearchContent(args, env) {
    const { file, query } = args;

    if (!query) {
      throw new Error("Missing required arg: query");
    }

    const q = query.toLowerCase();

    if (file) {
      // Search in specific file
      const data = readContentFile(file);
      const matches = data.filter((item) =>
        (item.title && item.title.toLowerCase().includes(q)) ||
        (item.body && item.body.toLowerCase().includes(q)) ||
        (item.category && item.category.toLowerCase().includes(q))
      );

      return {
        results: matches,
        total: matches.length,
        file,
        query,
      };
    }

    // Search across all files
    const files = getContentFiles();
    const allMatches = [];

    for (const [fileName, filePath] of Object.entries(files)) {
      const data = readContentFile(fileName);
      const matches = data.filter((item) =>
        (item.title && item.title.toLowerCase().includes(q)) ||
        (item.body && item.body.toLowerCase().includes(q)) ||
        (item.category && item.category.toLowerCase().includes(q))
      );
      allMatches.push(...matches.map((m) => ({ ...m, _sourceFile: fileName })));
    }

    // Dedup by slug
    const seen = new Set();
    const uniqueMatches = allMatches.filter((item) => {
      if (seen.has(item.slug)) return false;
      seen.add(item.slug);
      return true;
    });

    return {
      results: uniqueMatches,
      total: uniqueMatches.length,
      query,
    };
  }

  async handleGetStats(args, env) {
    const { file } = args;

    if (file) {
      // Stats for specific file
      const data = readContentFile(file);

      const byType = {};
      const byCategory = {};

      for (const item of data) {
        byType[item.type] = (byType[item.type] || 0) + 1;
        byCategory[item.category] = (byCategory[item.category] || 0) + 1;
      }

      return {
        total: data.length,
        byType,
        byCategory,
        file,
      };
    }

    // Stats for ALL files
    const files = getContentFiles();
    let total = 0;
    const byType = {};
    const byFile = {};

    for (const [fileName, filePath] of Object.entries(files)) {
      const data = readContentFile(fileName);
      total += data.length;
      byFile[fileName] = data.length;

      for (const item of data) {
        const t = item.type || "unknown";
        byType[t] = (byType[t] || 0) + 1;
      }
    }

    return {
      total,
      byType,
      byFile, // breakdown: { blogs: 6, tools: 12, ... }
    };
  }
}