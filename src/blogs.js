let cache = null;

export async function loadBlogs() {
  if (cache) return cache;
  // Use bundled content directly to avoid duplication
  try {
    const mod = await import("./content/blogs.json");
    const data = mod.default || mod;
    if (Array.isArray(data)) {
      cache = data.filter((b) => !b.draft);
      return cache;
    }
  } catch {}
  cache = [];
  return cache;
}

export function resetCache() { cache = null; }

export function getCategories(blogs) {
  const set = new Set(blogs.map((b) => b.category).filter(Boolean));
  return [...set];
}

export function getPosts(blogs, { category, page = 1, limit = 12 } = {}) {
  let list = category ? blogs.filter((b) => b.category === category) : blogs;
  list = list.filter((b) => !b.draft);
  const total = list.length;
  const start = (page - 1) * limit;
  return { posts: list.slice(start, start + limit), total };
}

export function getPost(blogs, slug) {
  return blogs.find((b) => b.slug === slug && !b.draft) || null;
}

function timestampOf(post) {
  const value = post.updated || post.date;
  const time = value ? new Date(value).getTime() : 0;
  return Number.isNaN(time) ? 0 : time;
}

/** Newest first, optionally skipping the post that is currently open. */
export function getLatest(blogs, { excludeSlug, limit = 4 } = {}) {
  return blogs
    .filter((blog) => !blog.draft && blog.slug !== excludeSlug)
    .slice()
    .sort((a, b) => timestampOf(b) - timestampOf(a))
    .slice(0, limit);
}
