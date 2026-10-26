# RembdaAI — Category pages, Blog pages, and MCP-driven content

Plan for turning the current single-page site into a small content site where AI (Claude / ChatGPT)
publishes through an MCP server and content can never break the layout.

Current state (verified): Vite 7 + React 19 + Tailwind v4, one page in `src/App.jsx` (Header, Hero,
Software, Articles, Directory, UsefulTools, Compare, Newsletter, Footer), all content hardcoded in
`src/data.js`, all links are `#hash` anchors, no router, no pages beyond `/`.

---

## 0. Decisions

| Question | Decision | Why |
|---|---|---|
| Stack for content pages | **Astro, keeping the existing React components and Tailwind theme** | Every category/post needs real HTML for SEO. Astro gives static HTML per route, `getStaticPaths`, zod content schemas, sitemap + RSS, and image handling with no runtime JS. Vite + React Router would need a prerender step to get the same result. |
| Content source of truth | **Files in the repo** (`src/content/`) | The repo is already the CMS. Content and code ship together, one build, no vendor, no runtime API calls. |
| How AI publishes | **Own small MCP server** (stdio) + a deterministic validator | No CMS-with-MCP option fits this stack (Gravity Index returned none). A ~200 line MCP server over the content folder is enough: AI writes fields, code enforces limits. |
| Layout guarantee | **zod limits at build + fixed templates + clamp/auto-fit at render** | AI cannot be trusted to count characters. Code proves it. |
| API keys | Never in the browser. Only inside the MCP server process (or none at all if the MCP client is the model). | |

Fallback if Astro is a no-go: keep Vite, add `react-router-dom` + a prerender step, same content
files and same schemas. Everything in phases 1, 3, 4, 5 stays identical; only phase 2 changes.

---

## 1. Content model (the slot contract)

One strict schema per entity. Limits are the same numbers the design already uses.

```js
// src/content/config.js (Astro content collections, zod)
const post = z.object({
  title:     z.string().min(20).max(70),        // card + h1
  kicker:    z.string().max(14),                // category label above title
  excerpt:   z.string().min(60).max(150),       // 3 lines at card width
  category:  reference("categories"),           // slug
  hero:      z.object({ src: z.string().url(), alt: z.string().min(8).max(120) }),
  publishedAt: z.coerce.date(),
  updatedAt:   z.coerce.date().optional(),
  featured:  z.boolean().default(false),
  draft:     z.boolean().default(false),
  seo:       z.object({ title: z.string().max(60), description: z.string().max(155) }).optional(),
});

const category = z.object({
  name:  z.string().min(3).max(28),   // hero tile label
  slug:  z.string().regex(/^[a-z0-9-]+$/),
  blurb: z.string().max(110),         // tile tooltip + category page intro
  icon:  z.enum([...iconNames]),      // must exist in src/icons.jsx
  tone:  z.string().regex(/^#[0-9a-f]{6}$/i),
  order: z.number().int().default(99),
  intro: z.string().max(600).optional(),
  faq:   z.array(z.object({ q: z.string().max(90), a: z.string().max(400) })).max(8).default([]),
});
```

Body is a constrained block list, not free HTML/MDX: `h2 | h3 | p | ul | ol | quote | callout | table | image`.
Each block has its own length limit. This is what stops AI from pasting a 4000-word wall into a card slot.

Derived at build, never authored: `slug`, `readingTime`, `relatedPosts`, `breadcrumbs`, `sitemap`.

**Category set** (from the provided mock): Create a Website, Best Web Hosting, AI Website Builders,
WordPress Themes, Start a Blog, Get a Domain, eCommerce Platforms, Email Marketing, Best VPNs,
Best Antivirus, Design Software, Video Editing. The hero tile grid becomes a render of this list, so
adding a category via MCP adds a tile and a page — no code edit. The current `heroTools` in
`src/data.js` is replaced by it.

---

## 2. Routes and pages

```
/                      home (existing sections, kept)
/categories            hub listing all categories  (SEO index)
/category/[slug]       category page: intro, tool/post list, FAQ
/blog                  article index (latest + featured + category filter)
/blog/[slug]           article page: hero, body, TOC, related, JSON-LD
/tools/[slug]          tool review page (phase 6)
/404
/sitemap-index.xml, /robots.txt, /rss.xml
```

Category page template (fixed slots): breadcrumb → H1 (name) → blurb → post grid (same card
component as home) → "How we test" note → FAQ. Empty state when a category has no posts yet.

Blog index: featured post (wide card) + grid + category chips + pagination at ~12 posts.

Article page: `title` (max 2 lines), `kicker`, `excerpt` as deck, meta row (author, date, reading
time), hero image with fixed aspect, body blocks, related 3 posts, newsletter block.

Navigation changes: `navLinks` in `src/data.js` becomes real routes (`/blog`, `/categories`, etc.);
every `href="#articles"` / `href="#reviews"` / `href="#tools"` in `src/App.jsx` is repointed. Home
section anchors (`#newsletter`, `#compare`) stay as anchors.

---

## 3. MCP content server

`scripts/mcp/server.mjs`, `@modelcontextprotocol/sdk`, stdio transport, run from Claude Desktop or
any MCP client. No network access, writes only inside `src/content/`.

Tools:

| Tool | Purpose |
|---|---|
| `get_slot_spec` | Returns the schema + limits as text, so the model knows the contract up front. |
| `list_categories` | Slug, name, blurb, icon for the model to reference. |
| `draft_post` | Validates without writing. Returns `{ ok, errors: [{ field, got, limit, fix }] }`. |
| `publish_post` | Validates, generates slug from title, writes `src/content/posts/<slug>.md`. |
| `update_post` | Partial update by slug; re-validates everything. |
| `unpublish_post` | Sets `draft: true` (never deletes). |
| `upsert_category` | Create/update a category (used rarely, still validated). |
| `validate_content` | Repo-wide check, same code the build uses. |

Resources: `content://spec`, `content://categories`.

Loop: model calls `draft_post` → gets exact errors ("excerpt 187 chars, limit 150, trim 37") →
rewrites → `publish_post` → file on disk → next build has the page. The AI's retry loop is the
validator, not the prompt.

Guardrails: slug collisions rejected, `.md` files only, path traversal blocked, no shell/git
execution inside the MCP server.

MCP server also calls the AI provider itself only if we want "rewrite this draft" as a tool
(`shape_content`). If we do, the key lives in `.env` used by the server process — never in `src/`.

---

## 4. Fit guarantees (four layers)

1. **Build**: zod limits + `astro check`; `npm run build` fails on a 71-char title.
2. **Slot**: each component has fixed slots with `line-clamp` and `min-h`, so a max-length value
   still fills the same box (cards already use `items-stretch` + `mt-auto`).
3. **Render**: `AutoFitText` for H1s and card titles — measures `scrollHeight` vs `clientHeight`
   and steps font size down until it fits. Last resort, not the primary mechanism.
4. **CI/prebuild**: `npm run validate` run by prebuild and (later) CI, so bad content can't merge.

Deterministic trimming (word-boundary ellipsis) exists as a final fallback for `seo.description`
and `excerpt` only — never for titles.

---

## 5. Build order

**P1 — Skeleton (half day)**
Astro project at root, Tailwind v4 theme moved over unchanged, `src/components/*` ported (Header,
Footer, Newsletter, ArticleCard become `.astro`; only the mobile menu and form stay hydrated islands).
Home page renders identical. Verify: `npm run build`, visual diff of `/`.

**P2 — Categories + blog (half day, after P1)**
Content collections + schema, 3 sample posts, 12 categories, `[slug]` routes, blog index,
article template, sitemap, RSS, JSON-LD. Repoint nav and all hash links. Verify: every route 200,
one intentionally-too-long title fails the build.

**P3 — MCP server (half day)**
Tools above, same validator module imported by both MCP and build (single source of limits).
Verify: from an MCP client, publish one post end to end and see it appear after build; try an
invalid payload and confirm the field-level error comes back.

**P4 — Hardening (2–3 h)**
404, redirects from old anchors, OG images per post, `validate` in prebuild, basic Lighthouse pass.

**P5 — Later**
Tool review pages, search, pagination, author pages, image upload to R2/CDN, scheduled publishing.

---

## 6. Explicitly out of scope

- Letting AI write JSX/HTML/CSS. It writes data only; templates are human-owned.
- A paid CMS. 20–200 posts don't need one.
- Client-side AI calls (key exposure).
- Free-form MDX from the model (unbounded layout risk).

---

## 7. Open questions

1. Astro migration OK, or stay on Vite + React Router + prerender?
2. Which MCP client will actually publish — Claude Desktop, ChatGPT connectors, or a custom one?
   (Affects stdio vs HTTP transport.)
3. Should publishing also commit + push, or leave the working tree dirty for review?
4. Blog needs an author byline? Single "RembdaAI editorial" is enough for now?
