/**
 * MCP Server Entry Point - Cloudflare Workers
 * Handles HTTP requests for MCP protocol (JSON-RPC)
 */

import { MCPProtocol } from "./mcp/protocol.js";
import { validateAuth, withAuth } from "./middleware/auth.js";

const protocol = new MCPProtocol;

// Helper to wrap tool results in MCP-compliant content format
function toMcpToolResult(data) {
  return { content: [{ type: "text", text: JSON.stringify(data) }] };
}

// Helper to wrap errors in MCP-compliant format
function toMcpToolError(message) {
  return { content: [{ type: "text", text: message }], isError: true };
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // Health check
    if (url.pathname === "/health") {
      return new Response(JSON.stringify({ status: "ok", service: "mcp-server-cloudflare" }), {
        headers: { "Content-Type": "application/json" },
      });
    }

    // MCP endpoint
    if (url.pathname === "/mcp" || url.pathname === "/") {
      if (request.method !== "POST") {
        return new Response(JSON.stringify({ error: "Method not allowed" }), {
          status: 405,
          headers: { "Content-Type": "application/json" },
        });
      }

      // Auth check
      const auth = validateAuth(request,env);
      if (!auth.valid) {
        return new Response(JSON.stringify({ error: auth.error }), {
          status: 401,
          headers: { "Content-Type": "application/json" },
        });
      }

      try {
        const body = await request.json();
        const { jsonrpc, method, id, params } = body;

        if (jsonrpc !== "2.0") {
          return new Response(JSON.stringify({ jsonrpc: "2.0", error: { code: -32600, message: "Invalid Request" }, id }), {
            status: 400,
            headers: { "Content-Type": "application/json" },
          });
        }

        // Handle MCP methods
        if (method === "initialize") {
          return new Response(JSON.stringify({ jsonrpc: "2.0", result: protocol.handleInitialize(), id }), {
            headers: { "Content-Type": "application/json" },
          });
        }

        if (method === "tools/list") {
          return new Response(JSON.stringify({ jsonrpc: "2.0", result: protocol.handleToolsList(), id }), {
            headers: { "Content-Type": "application/json" },
          });
        }

        if (method === "tools/call") {
          const { name, arguments: args } = params || {};
          if (!name) {
            return new Response(JSON.stringify({ jsonrpc: "2.0", error: { code: -32602, message: "Missing tool name" }, id }), {
              status: 400,
              headers: { "Content-Type": "application/json" },
            });
          }

          try {
            const rawResult = await protocol.handleToolsCall(name, args, env);
            // Wrap raw result in MCP-compliant content format
            const mcpResult = toMcpToolResult(rawResult);
            return new Response(JSON.stringify({ jsonrpc: "2.0", result: mcpResult, id }), {
              headers: { "Content-Type": "application/json" },
            });
          } catch (err) {
            // Wrap error in MCP-compliant format with isError: true
            const mcpError = toMcpToolError(err.message);
            return new Response(JSON.stringify({ jsonrpc: "2.0", error: mcpError, id }), {
              status: 500,
              headers: { "Content-Type": "application/json" },
            });
          }
        }

        return new Response(JSON.stringify({ jsonrpc: "2.0", error: { code: -32601, message: `Method not found: ${method}` }, id }), {
          status: 404,
          headers: { "Content-Type": "application/json" },
        });
      } catch (err) {
        return new Response(JSON.stringify({ jsonrpc: "2.0", error: { code: -32700, message: "Parse error" }, id: null }), {
          status: 400,
          headers: { "Content-Type": "application/json" },
        });
      }
    }

    return new Response(JSON.stringify({ error: "Not found" }), {
      status: 404,
      headers: { "Content-Type": "application/json" },
    });
  },
};