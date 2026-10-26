import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container } from "../ui";
import { ArticleCard } from "../components/ArticleCard";
import { Pagination } from "../components/Pagination";
import { loadBlogs, getPosts } from "../blogs";

export default function Category() {
  const { slug } = useParams();
  const [posts, setPosts] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  useEffect(() => {
    loadBlogs().then((blogs) => {
      const { posts: p, total: t } = getPosts(blogs, { category: slug, page, limit: 12 });
      setPosts(p); setTotal(t);
    });
  }, [slug, page]);
  const name = slug.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
  return (
    <section className="py-16 md:py-20">
      <Container>
        <h1 className="font-serif text-[36px] leading-tight md:text-[44px]">{name}</h1>
        {posts.length === 0 && <p className="mt-10 text-muted">No posts yet in this category.</p>}
        <div className="mt-10 grid items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((p) => <ArticleCard key={p.slug} article={p} />)}
        </div>
        <Pagination page={page} total={total} limit={12} onChange={setPage} />
      </Container>
    </section>
  );
}
