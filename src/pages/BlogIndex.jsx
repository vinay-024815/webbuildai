import { useEffect, useState } from "react";
import { Container } from "../ui";
import { ArticleCard } from "../components/ArticleCard";
import { Pagination } from "../components/Pagination";
import { loadBlogs, getPosts } from "../blogs";

export default function BlogIndex() {
  const [posts, setPosts] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  useEffect(() => {
    loadBlogs().then((blogs) => {
      const { posts: p, total: t } = getPosts(blogs, { page, limit: 12 });
      setPosts(p); setTotal(t);
    });
  }, [page]);
  return (
    <section className="py-6 md:py-8">
      <Container>
        <h1 className="font-serif text-[36px] leading-tight md:text-[44px]">Blog</h1>
        <p className="mt-3 max-w-xl text-base text-muted">Latest articles and guides.</p>
        {posts.length === 0 && <p className="mt-10 text-muted">No posts yet.</p>}
        <div className="mt-10 grid items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((p) => <ArticleCard key={p.slug} article={p} />)}
        </div>
        <Pagination page={page} total={total} limit={12} onChange={setPage} />
      </Container>
    </section>
  );
}
