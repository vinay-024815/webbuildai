const MCP_ENDPOINT =
  import.meta.env.VITE_MCP_ENDPOINT || "https://your-mcp-server.your-subdomain.workers.dev/mcp";

const MCP_API_KEY = import.meta.env.VITE_MCP_API_KEY;

let requestId = 0;

export async function callMCP(toolName, input) {
  try {
    const res = await fetch(MCP_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(MCP_API_KEY ? { Authorization: `Bearer ${MCP_API_KEY}` } : {}),
      },
      body: JSON.stringify({
        jsonrpc: "2.0",
        method: "tools/call",
        id: ++requestId,
        params: {
          name: toolName,
          arguments: input,
        },
      }),
    });

    if (!res.ok) {
      throw new Error(`MCP error: ${res.status}`);
    }

    const data = await res.json();

    if (data.error) {
      return { success: false, error: data.error.message || data.error };
    }

    return { success: true, data: data.result };
  } catch (err) {
    console.error(`MCP call failed for ${toolName}:`, err);
    return { success: false, error: err.message };
  }
}

export async function mcpInitialize() {
  try {
    const res = await fetch(MCP_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(MCP_API_KEY ? { Authorization: `Bearer ${MCP_API_KEY}` } : {}),
      },
      body: JSON.stringify({
        jsonrpc: "2.0",
        method: "initialize",
        id: ++requestId,
        params: {},
      }),
    });

    if (!res.ok) {
      throw new Error(`MCP init error: ${res.status}`);
    }

    const data = await res.json();
    return { success: true, data: data.result };
  } catch (err) {
    console.error("MCP initialize failed:", err);
    return { success: false, error: err.message };
  }
}

export async function mcpListTools() {
  try {
    const res = await fetch(MCP_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(MCP_API_KEY ? { Authorization: `Bearer ${MCP_API_KEY}` } : {}),
      },
      body: JSON.stringify({
        jsonrpc: "2.0",
        method: "tools/list",
        id: ++requestId,
        params: {},
      }),
    });

    if (!res.ok) {
      throw new Error(`MCP list tools error: ${res.status}`);
    }

    const data = await res.json();
    return { success: true, data: data.result };
  } catch (err) {
    console.error("MCP list tools failed:", err);
    return { success: false, error: err.message };
  }
}

// Map old tool names to new Cloudflare MCP tool names
export const MCP_TOOLS = {
  // Content management
  READ_CONTENT: "read_content",
  LIST_CONTENT: "list_content",
  CREATE_CONTENT: "create_content",
  UPDATE_CONTENT: "update_content",
  DELETE_CONTENT: "delete_content",

  // Deduplication
  CHECK_DUPLICATE: "check_duplicate",

  // Search & stats
  SEARCH_CONTENT: "search_content",
  GET_STATS: "get_stats",

  // Legacy AI tool names (mapped to content operations)
  GENERATE_BLOG: "create_content",
  GENERATE_META: "create_content",
  COMPARE_TOOLS: "create_content",
  REWRITE_CONTENT: "update_content",
  GENERATE_FAQ: "create_content",
  GENERATE_TITLE: "create_content",
  SUMMARIZE: "update_content",
};