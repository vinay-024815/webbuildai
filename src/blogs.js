let cache = null;

export async function loadBlogs() {
  if (cache) return cache;
  try {
    const res = await fetch("/blogs.json");
    const ct = res.headers.get("content-type") || "";
    if (!res.ok || !ct.includes("json")) { cache = []; return cache; }
    const data = await res.json();
    cache = Array.isArray(data) ? data : [];
  } catch {
    cache = [];
  }
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
