# Local project content through the Cloudflare MCP Worker

The Worker does not store blog data in KV. `CONTENT_KV` stores one receiver connection record, while the local receiver reads and writes this project's `src/content/*.json` files.

## 1. Start the local receiver

From the project root, create a random secret of at least 24 characters and start the receiver in PowerShell:

```powershell
$env:CONTENT_RECEIVER_API_KEY = "replace-with-a-long-random-secret"
npm.cmd run content:receiver
```

The receiver listens only on `127.0.0.1:8788`. In another terminal, expose that port with ngrok:

```powershell
ngrok http 8788
```

Keep both processes running while MCP needs to edit local files. Use the HTTPS forwarding URL shown by ngrok and append `/api/content`.

## 2. Add the receiver record to CONTENT_KV

In the Cloudflare dashboard, open the existing `CONTENT_KV` namespace and add:

- **Key:** `receiver:default`
- **Value:** `{"url":"https://YOUR-NGROK-HOST.ngrok-free.app/api/content","apiKey":"THE-SAME-LOCAL-SECRET"}`

Replace the example host and secret. The value must be valid JSON. The API key is only sent from the Worker to the receiver; do not put it in Vite environment variables or browser code.

The ngrok URL can change between sessions. If it changes, update this KV value.

## 3. Configure Worker authentication and deploy

Set the MCP key as a Cloudflare Worker secret (do not put it in `[vars]`):

```powershell
cd mcp-server-cloudflare
npx.cmd wrangler secret put MCP_API_KEY
npx.cmd wrangler deploy
```

Configure Hermes with this key as the Bearer credential for the MCP endpoint. The Worker now rejects requests when `MCP_API_KEY` is missing.

For local `wrangler dev`, put `MCP_API_KEY="your-local-mcp-key"` in `mcp-server-cloudflare/.dev.vars`; `.dev.vars` is gitignored.

## Available content tools

- `list_content_files` and `read_content_file` discover and read any JSON file under `src/content`.
- `edit_content_file` supports JSON Pointer `add`, `replace`, and `remove` operations, including nested object values and array items. Array append uses a path ending in `/-`.
- Existing record tools continue to support array files such as `blogs.json`; blog `body` maps to the website's `content` field.

Object files such as `nav.json`, `site.json`, `hero.json`, and `footer.json` should be edited with JSON Pointer. The receiver rejects paths outside the content folder and validates JSON before saving. Writes are atomic and serialized per file.

Changes update the local JSON source. Vite dev should reload the changed JSON; a deployed static website needs a new build and deployment to show the change.
