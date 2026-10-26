/**
 * Slug generation and validation utilities
 */

export function slugify(text) {
  if (!text) return "";
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function generateSlug(title, type = "blog") {
  const base = slugify(title);
  return `${type}-${base}`;
}

export function isValidSlug(slug) {
  return /^[a-z0-9-]+$/.test(slug) && slug.length > 0 && slug.length <= 200;
}