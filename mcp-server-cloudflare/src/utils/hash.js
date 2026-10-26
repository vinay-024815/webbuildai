/**
 * SHA-256 hashing utilities for content deduplication
 */

const encoder = new TextEncoder();

export async function sha256(data) {
  const buf = await crypto.subtle.digest("SHA-256", encoder.encode(data));
  return Array.from(new Uint8Array(buf))
    .map(b => b.toString(16).padStart(2, "0"))
    .join("");
}

export async function hashContent(title, body, type = "blog") {
  const combined = `${type}:${title}:${body || ""}`;
  return await sha256(combined);
}

export async function hashSlug(slug) {
  return await sha256(`slug:${slug}`);
}