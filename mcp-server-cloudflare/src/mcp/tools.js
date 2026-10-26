/**
 * MCP Tool Definitions
 * Defines all available tools with input/output schemas
 */

export const MCP_TOOLS = {
  READ_CONTENT: "read_content",
  LIST_CONTENT: "list_content",
  CREATE_CONTENT: "create_content",
  UPDATE_CONTENT: "update_content",
  DELETE_CONTENT: "delete_content",
  CHECK_DUPLICATE: "check_duplicate",
  SEARCH_CONTENT: "search_content",
  GET_STATS: "get_stats",
};

export const TOOL_DEFINITIONS = [
  {
    name: MCP_TOOLS.READ_CONTENT,
    description: "Fetch specific content by type and slug",
    inputSchema: {
      type: "object",
      properties: {
        type: { type: "string", description: "Content type: blog, tool, page, comparison" },
        slug: { type: "string", description: "Content slug identifier" },
      },
      required: ["type", "slug"],
    },
  },
  {
    name: MCP_TOOLS.LIST_CONTENT,
    description: "List content with pagination and optional type filter",
    inputSchema: {
      type: "object",
      properties: {
        type: { type: "string", description: "Filter by content type" },
        limit: { type: "number", default: 20, minimum: 1, maximum: 100 },
        offset: { type: "number", default: 0, minimum: 0 },
      },
    },
  },
  {
    name: MCP_TOOLS.CREATE_CONTENT,
    description: "Create new content with automatic deduplication check",
    inputSchema: {
      type: "object",
      properties: {
        type: { type: "string", description: "Content type: blog, tool, page, comparison" },
        title: { type: "string", description: "Content title" },
        body: { type: "string", description: "Content body (markdown/HTML)" },
        category: { type: "string", description: "Content category" },
        tags: { type: "array", items: { type: "string" }, description: "Tags" },
        force: { type: "boolean", default: false, description: "Force create even if duplicate detected" },
      },
      required: ["type", "title", "body"],
    },
  },
  {
    name: MCP_TOOLS.UPDATE_CONTENT,
    description: "Update existing content by slug",
    inputSchema: {
      type: "object",
      properties: {
        slug: { type: "string", description: "Content slug to update" },
        title: { type: "string", description: "New title" },
        body: { type: "string", description: "New body content" },
        category: { type: "string", description: "New category" },
        tags: { type: "array", items: { type: "string" }, description: "New tags" },
      },
      required: ["slug"],
    },
  },
  {
    name: MCP_TOOLS.DELETE_CONTENT,
    description: "Delete content by slug",
    inputSchema: {
      type: "object",
      properties: {
        slug: { type: "string", description: "Content slug to delete" },
      },
      required: ["slug"],
    },
  },
  {
    name: MCP_TOOLS.CHECK_DUPLICATE,
    description: "Check if content would be a duplicate before creating",
    inputSchema: {
      type: "object",
      properties: {
        title: { type: "string", description: "Proposed title" },
        body: { type: "string", description: "Proposed body content" },
        type: { type: "string", default: "blog", description: "Content type" },
      },
      required: ["title"],
    },
  },
  {
    name: MCP_TOOLS.SEARCH_CONTENT,
    description: "Search content by title or body text",
    inputSchema: {
      type: "object",
      properties: {
        query: { type: "string", description: "Search query" },
        type: { type: "string", description: "Filter by content type" },
        limit: { type: "number", default: 20, minimum: 1, maximum: 100 },
      },
      required: ["query"],
    },
  },
  {
    name: MCP_TOOLS.GET_STATS,
    description: "Get content statistics and analytics",
    inputSchema: {
      type: "object",
      properties: {},
    },
  },
];

export function getToolNames() {
  return TOOL_DEFINITIONS.map(t => t.name);
}

export function getToolDefinition(name) {
  return TOOL_DEFINITIONS.find(t => t.name === name);
}