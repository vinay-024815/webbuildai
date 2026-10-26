/**
 * Cloudflare KV storage operations for content and dedup index
 */

const CONTENT_PREFIX = "content:";
const DEDUP_HASH_PREFIX = "dedup:hash:";
const DEDUP_SLUG_PREFIX = "dedup:slug:";
const DEDUP_TITLE_PREFIX = "dedup:title:";
const METADATA_PREFIX = "meta:";

export class ContentKV {
  constructor(kvNamespace) {
    this.kv = kvNamespace;
  }

  // Content CRUD
  async getContent(slug) {
    const raw = await this.kv.get(`${CONTENT_PREFIX}${slug}`, "json");
    return raw;
  }

  async setContent(slug, content) {
    await this.kv.put(`${CONTENT_PREFIX}${slug}`, JSON.stringify(content));
    return content;
  }

  async deleteContent(slug) {
    await this.kv.delete(`${CONTENT_PREFIX}${slug}`);
    return true;
  }

  async listContent(prefix = "", limit = 100, cursor = null) {
    const options = { limit };
    if (cursor) options.cursor = cursor;
    const list = await this.kv.list({ prefix: CONTENT_PREFIX + prefix, ...options });
    const items = [];
    for (const key of list.keys) {
      const content = await this.kv.get(key.name, "json");
      if (content) items.push(content);
    }
    return { items, total: items.length, cursor: list.list_complete ? null : list.cursor };
  }

  // Dedup Index
  async getDedupByHash(hash) {
    const raw = await this.kv.get(`${DEDUP_HASH_PREFIX}${hash}`, "json");
    return raw;
  }

  async setDedupByHash(hash, slug, type) {
    await this.kv.put(`${DEDUP_HASH_PREFIX}${hash}`, JSON.stringify({ slug, type, createdAt: new Date().toISOString() }));
  }

  async getDedupBySlug(slug) {
    const raw = await this.kv.get(`${DEDUP_SLUG_PREFIX}${slug}`, "json");
    return raw;
  }

  async setDedupBySlug(slug, hash, type) {
    await this.kv.put(`${DEDUP_SLUG_PREFIX}${slug}`, JSON.stringify({ hash, type, createdAt: new Date().toISOString() }));
  }

  async getDedupByTitle(type, title) {
    const key = `${DEDUP_TITLE_PREFIX}${type}:${slugify(title)}`;
    const raw = await this.kv.get(key, "json");
    return raw;
  }

  async setDedupByTitle(type, title, slug) {
    const key = `${DEDUP_TITLE_PREFIX}${type}:${slugify(title)}`;
    await this.kv.put(key, JSON.stringify({ slug, type, title, createdAt: new Date().toISOString() }));
  }

  async deleteDedupIndex(hash, slug, type, title) {
    await this.kv.delete(`${DEDUP_HASH_PREFIX}${hash}`);
    await this.kv.delete(`${DEDUP_SLUG_PREFIX}${slug}`);
    await this.kv.delete(`${DEDUP_TITLE_PREFIX}${type}:${slugify(title)}`);
  }
}

function slugify(text) {
  if (!text) return "";
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export { ContentKV };