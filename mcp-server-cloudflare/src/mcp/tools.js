const file = { type: "string", description: "JSON file name in src/content, with or without .json" };
const slug = { type: "string", description: "Record slug or id" };
const item = { type: "object", description: "Complete JSON record to append to an array file" };
const body = { type: "string", description: "Content HTML/Markdown; stored as the record's content field" };

export const MCP_TOOLS = {
  LIST_CONTENT_FILES: "list_content_files",
  READ_CONTENT_FILE: "read_content_file",
  EDIT_CONTENT_FILE: "edit_content_file",
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
    name: MCP_TOOLS.LIST_CONTENT_FILES,
    description: "List JSON files available in src/content",
    inputSchema: { type: "object", properties: {} },
  },
  {
    name: MCP_TOOLS.READ_CONTENT_FILE,
    description: "Read a complete JSON content file",
    inputSchema: {
      type: "object",
      properties: { file },
      required: ["file"],
    },
  },
  {
    name: MCP_TOOLS.EDIT_CONTENT_FILE,
    description: "Add, replace, or remove a value in any content JSON using a JSON Pointer path",
    inputSchema: {
      type: "object",
      properties: {
        file,
        operation: { type: "string", enum: ["add", "replace", "remove"] },
        path: { type: "string", description: "JSON Pointer, for example /0/content or /nav/items/0" },
        value: { description: "JSON value; required for add and replace" },
      },
      required: ["file", "operation", "path"],
    },
  },
  {
    name: MCP_TOOLS.READ_CONTENT,
    description: "Fetch a record by slug or id from a content file",
    inputSchema: {
      type: "object",
      properties: { file, type: { type: "string", description: "Legacy alias for file" }, slug },
      required: ["slug"],
      anyOf: [{ required: ["file"] }, { required: ["type"] }],
    },
  },
  {
    name: MCP_TOOLS.LIST_CONTENT,
    description: "List records in a content file with pagination",
    inputSchema: {
      type: "object",
      properties: {
        file,
        type: { type: "string", description: "Legacy alias for file" },
        limit: { type: "number", default: 20, minimum: 1, maximum: 100 },
        offset: { type: "number", default: 0, minimum: 0 },
      },
    },
  },
  {
    name: MCP_TOOLS.CREATE_CONTENT,
    description: "Append a record to an array content file. For blogs, body is saved as content.",
    inputSchema: {
      type: "object",
      properties: { file, type: { type: "string", description: "Legacy alias for file" }, item, title: { type: "string" }, body, category: { type: "string" }, tags: { type: "array", items: { type: "string" } } },
      required: ["title", "body"],
      anyOf: [{ required: ["file"] }, { required: ["type"] }],
    },
  },
  {
    name: MCP_TOOLS.UPDATE_CONTENT,
    description: "Update a record by slug or id. For blogs, body is saved as content.",
    inputSchema: {
      type: "object",
      properties: { file, type: { type: "string", description: "Legacy alias for file" }, slug, title: { type: "string" }, body, category: { type: "string" }, tags: { type: "array", items: { type: "string" } }, updates: { type: "object", description: "Additional record fields to update" } },
      required: ["slug"],
      anyOf: [{ required: ["file"] }, { required: ["type"] }],
    },
  },
  {
    name: MCP_TOOLS.DELETE_CONTENT,
    description: "Delete a record by slug or id from an array content file",
    inputSchema: {
      type: "object",
      properties: { file, type: { type: "string", description: "Legacy alias for file" }, slug },
      required: ["slug"],
      anyOf: [{ required: ["file"] }, { required: ["type"] }],
    },
  },
  {
    name: MCP_TOOLS.CHECK_DUPLICATE,
    description: "Check whether a title already exists in content files",
    inputSchema: {
      type: "object",
      properties: { title: { type: "string" }, body, type: { type: "string" } },
      required: ["title"],
    },
  },
  {
    name: MCP_TOOLS.SEARCH_CONTENT,
    description: "Search content by title, body, excerpt, or category",
    inputSchema: {
      type: "object",
      properties: { query: { type: "string" }, file, type: { type: "string", description: "Legacy alias for file" }, limit: { type: "number", default: 20, minimum: 1, maximum: 100 } },
      required: ["query"],
    },
  },
  {
    name: MCP_TOOLS.GET_STATS,
    description: "Get item counts by file and total content statistics",
    inputSchema: { type: "object", properties: { file } },
  },
];

export function getToolNames() {
  return TOOL_DEFINITIONS.map((tool) => tool.name);
}

export function getToolDefinition(name) {
  return TOOL_DEFINITIONS.find((tool) => tool.name === name);
}
