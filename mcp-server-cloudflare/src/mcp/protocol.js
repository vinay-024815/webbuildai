/**
 * MCP Protocol Handler - JSON-RPC over HTTP
 * Handles initialize, tools/list, and tools/call methods
 */

import { TOOL_DEFINITIONS } from "./tools.js";
import { ContentKV } from "../storage/kv.js";
import { hashContent } from "../utils/hash.js";
import { generateSlug } from "../utils/slug.js";
import { DedupChecker } from "../storage/dedup.js";

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
    const { type, slug } = args;
    const kv = new ContentKV(env.CONTENT_KV);
    const content = await kv.getContent(`${type}-${slug}`);
    if (!content) {
      throw new Error(`Content not found: ${type}/${slug}`);
    }
    return { content };
  }

  async handleListContent(args, env) {
    const { type, limit = 20, offset = 0 } = args;
    const kv = new ContentKV(env.CONTENT_KV);
    const prefix = type ? `${type}-` : "";
    const result = await kv.listContent(prefix, limit, null);
    return { items: result.items.slice(offset, offset + limit), total: result.total };
  }

  async handleCreateContent(args, env) {
    const { type, title, body, category, tags = [], force = false } = args;
    const kv = new ContentKV(env.CONTENT_KV);
    const dedup = new DedupChecker(kv);

    const dupCheck = await dedup.check({ title, body, type });
    if (dupCheck.isDuplicate && !force) {
      return {
        success: false,
        error: "duplicate_content",
        reason: dupCheck.reason,
        existing: dupCheck.existing,
        suggestedSlug: dupCheck.suggestedSlug,
      };
    }

    const slug = force ? (dupCheck.suggestedSlug || generateSlug(title, type)) : dupCheck.suggestedSlug;
    const hash = await hashContent(title, body, type);
    const now = new Date().toISOString();

    const content = {
      id: slug,
      type,
      title,
      slug,
      body,
      category,
      tags,
      createdAt: now,
      updatedAt: now,
      hash,
    };

    await kv.setContent(slug, content);
    await dedup.register({ slug, title, body, type, hash });

    return { success: true, slug, contentId: slug, content };
  }

  async handleUpdateContent(args, env) {
    const { slug, title, body, category, tags } = args;
    const kv = new ContentKV(env.CONTENT_KV);
    const dedup = new DedupChecker(kv);

    const existing = await kv.getContent(slug);
    if (!existing) {
      throw new Error(`Content not found: ${slug}`);
    }

    const updated = {
      ...existing,
      title: title || existing.title,
      body: body || existing.body,
      category: category || existing.category,
      tags: tags || existing.tags,
      updatedAt: new Date().toISOString(),
    };

    if (title || body) {
      const dupCheck = await dedup.check({
        title: updated.title,
        body: updated.body,
        type: existing.type,
      });
      if (dupCheck.isDuplicate && dupCheck.existing.some(e => e.slug !== slug)) {
        return {
          success: false,
          error: "duplicate_content",
          reason: dupCheck.reason,
          existing: dupCheck.existing,
        };
      }
      updated.hash = await hashContent(updated.title, updated.body, existing.type);
      await dedup.unregister({ slug, title: existing.title, type: existing.type, hash: existing.hash });
      await dedup.register({ slug, title: updated.title, body: updated.body, type: existing.type, hash: updated.hash });
    }

    await kv.setContent(slug, updated);
    return { success: true, updatedAt: updated.updatedAt, content: updated };
  }

  async handleDeleteContent(args, env) {
    const { slug } = args;
    const kv = new ContentKV(env.CONTENT_KV);
    const dedup = new DedupChecker(kv);

    const existing = await kv.getContent(slug);
    if (!existing) {
      throw new Error(`Content not found: ${slug}`);
    }

    await dedup.unregister({
      slug,
      title: existing.title,
      type: existing.type,
      hash: existing.hash,
    });
    await kv.deleteContent(slug);

    return { success: true };
  }

  async handleCheckDuplicate(args, env) {
    const { title, body, type = "blog" } = args;
    const kv = new ContentKV(env.CONTENT_KV);
    const dedup = new DedupChecker(kv);

    const result = await dedup.check({ title, body, type });
    return result;
  }

  async handleSearchContent(args, env) {
    const { query, type, limit = 20 } = args;
    const kv = new ContentKV(env.CONTENT_KV);
    const prefix = type ? `${type}-` : "";
    const result = await kv.listContent(prefix, limit * 2, null);

    const q = query.toLowerCase();
    const matches = result.items.filter(item =>
      item.title.toLowerCase().includes(q) ||
      (item.body && item.body.toLowerCase().includes(q)) ||
      (item.category && item.category.toLowerCase().includes(q))
    ).slice(0, limit);

    return { results: matches, total: matches.length };
  }

  async handleGetStats(args, env) {
    const kv = new ContentKV(env.CONTENT_KV);
    const result = await kv.listContent("", 1000, null);

    const byType = {};
    const byCategory = {};
    for (const item of result.items) {
      byType[item.type] = (byType[item.type] || 0) + 1;
      byCategory[item.category] = (byCategory[item.category] || 0) + 1;
    }

    return {
      total: result.items.length,
      byType,
      byCategory,
    };
  }
}