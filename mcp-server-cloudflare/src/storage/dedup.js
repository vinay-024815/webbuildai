/**
 * Duplicate detection logic for content
 */

import { hashContent, generateSlug } from "../utils/hash.js";

export class DedupChecker {
  constructor(kv) {
    this.kv = kv;
  }

  /**
   * Check if content is a duplicate before creating
   * Returns { isDuplicate, reason, existing, suggestedSlug }
   */
  async check({ title, body, type = "blog" }) {
    const results = {
      isDuplicate: false,
      reason: null,
      existing: [],
      suggestedSlug: null,
    };

    // Level 1: Exact hash match (title + body)
    const hash = await hashContent(title, body, type);
    const existingByHash = await this.kv.getDedupByHash(hash);
    if (existingByHash) {
      results.isDuplicate = true;
      results.reason = "exact_content_match";
      results.existing.push({
        slug: existingByHash.slug,
        type: existingByHash.type,
        matchType: "exact",
      });
      return results;
    }

    // Level 2: Slug uniqueness
    const baseSlug = generateSlug(title, type);
    const existingBySlug = await this.kv.getDedupBySlug(baseSlug);
    if (existingBySlug) {
      results.isDuplicate = true;
      results.reason = "slug_exists";
      results.existing.push({
        slug: existingBySlug.slug,
        type: existingBySlug.type,
        matchType: "slug",
      });
      results.suggestedSlug = `${baseSlug}-${Date.now().toString(36).slice(-4)}`;
      return results;
    }

    // Level 3: Fuzzy title match (same category + similar title words)
    const existingByTitle = await this.kv.getDedupByTitle(type, title);
    if (existingByTitle) {
      results.isDuplicate = true;
      results.reason = "similar_title";
      results.existing.push({
        slug: existingByTitle.slug,
        type: existingByTitle.type,
        matchType: "title",
      });
      results.suggestedSlug = `${baseSlug}-2`;
      return results;
    }

    results.suggestedSlug = baseSlug;
    return results;
  }

  /**
   * Register content in dedup index after successful creation
   */
  async register({ slug, title, body, type, hash }) {
    await this.kv.setDedupByHash(hash, slug, type);
    await this.kv.setDedupBySlug(slug, hash, type);
    await this.kv.setDedupByTitle(type, title, slug);
  }

  /**
   * Remove from dedup index when content is deleted
   */
  async unregister({ slug, title, type, hash }) {
    await this.kv.deleteDedupIndex(hash, slug, type, title);
  }
}