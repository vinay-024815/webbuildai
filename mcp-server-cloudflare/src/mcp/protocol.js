import { TOOL_DEFINITIONS } from "./tools.js";

const RECEIVER_CONFIG_KEY = "receiver:default";
const RECEIVER_TIMEOUT_MS = 10_000;

function contentFile(value) {
  if (typeof value !== "string") throw new Error("Missing required arg: file");
  const file = value.replace(/\.json$/i, "");
  if (!/^[a-zA-Z0-9_-]+$/.test(file)) throw new Error("Invalid content file name");
  const aliases = { blog: "blogs", tool: "tools", comparison: "comparisons" };
  return aliases[file] || file;
}

export class MCPProtocol {
  constructor() {
    this.tools = TOOL_DEFINITIONS;
  }

  handleInitialize() {
    return {
      protocolVersion: "2024-11-05",
      capabilities: { tools: {} },
      serverInfo: { name: "webbuild-ai-mcp", version: "1.1.0" },
    };
  }

  handleToolsList() {
    return { tools: this.tools };
  }

  async callReceiver(env, action, args = {}) {
    if (!env.CONTENT_KV) throw new Error("CONTENT_KV binding is not configured");

    const config = await env.CONTENT_KV.get(RECEIVER_CONFIG_KEY, { type: "json" });
    if (!config?.url || !config?.apiKey) {
      throw new Error(`Receiver config missing in CONTENT_KV at key ${RECEIVER_CONFIG_KEY}`);
    }

    let endpoint;
    try {
      endpoint = new URL(config.url);
    } catch {
      throw new Error("Receiver URL in CONTENT_KV is invalid");
    }
    if (endpoint.protocol !== "https:" && endpoint.hostname !== "localhost" && endpoint.hostname !== "127.0.0.1") {
      throw new Error("Receiver URL must use HTTPS");
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), RECEIVER_TIMEOUT_MS);
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${config.apiKey}`,
        },
        body: JSON.stringify({ action, ...args }),
        signal: controller.signal,
      });
      const result = await response.json().catch(() => null);
      if (!response.ok) {
        throw new Error(result?.error || `Receiver returned HTTP ${response.status}`);
      }
      if (!result?.success) throw new Error(result?.error || "Receiver operation failed");
      return result.data;
    } catch (error) {
      if (error.name === "AbortError") throw new Error("Local content receiver timed out");
      throw new Error(`Local content receiver: ${error.message}`);
    } finally {
      clearTimeout(timeout);
    }
  }

  async handleToolsCall(name, args = {}, env) {
    switch (name) {
      case "list_content_files":
        return this.callReceiver(env, "list_files");
      case "read_content_file":
        return this.callReceiver(env, "read_file", { file: contentFile(args.file) });
      case "edit_content_file":
        return this.callReceiver(env, "edit_value", {
          file: contentFile(args.file),
          operation: args.operation,
          path: args.path,
          ...(args.value === undefined ? {} : { value: args.value }),
        });
      case "read_content":
        return this.callReceiver(env, "read_item", {
          file: contentFile(args.file || args.type), slug: args.slug,
        });
      case "list_content":
        return this.callReceiver(env, "list_items", {
          file: args.file ? contentFile(args.file) : args.type ? contentFile(args.type) : undefined,
          limit: args.limit,
          offset: args.offset,
        });
      case "create_content":
        return this.callReceiver(env, "create_item", {
          file: contentFile(args.file || args.type),
          item: {
            ...(args.item || {}),
            ...(args.title === undefined ? {} : { title: args.title }),
            ...(args.body === undefined ? {} : { content: args.body }),
            ...(args.category === undefined ? {} : { category: args.category }),
            ...(args.tags === undefined ? {} : { tags: args.tags }),
          },
        });
      case "update_content":
        return this.callReceiver(env, "update_item", {
          file: contentFile(args.file || args.type),
          slug: args.slug,
          updates: {
            ...(args.title === undefined ? {} : { title: args.title }),
            ...(args.body === undefined ? {} : { content: args.body }),
            ...(args.category === undefined ? {} : { category: args.category }),
            ...(args.tags === undefined ? {} : { tags: args.tags }),
            ...(args.updates || {}),
          },
        });
      case "delete_content":
        return this.callReceiver(env, "delete_item", {
          file: contentFile(args.file || args.type), slug: args.slug,
        });
      case "check_duplicate": {
        return this.callReceiver(env, "check_duplicate", { title: args.title });
      }
      case "search_content":
        return this.callReceiver(env, "search", {
          query: args.query,
          file: args.file || args.type ? contentFile(args.file || args.type) : undefined,
          limit: args.limit,
        });
      case "get_stats":
        return this.callReceiver(env, "stats", { file: args.file ? contentFile(args.file) : undefined });
      default:
        throw new Error(`Unknown tool: ${name}`);
    }
  }
}
