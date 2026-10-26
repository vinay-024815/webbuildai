import { useEffect, useState } from "react";
import { Container } from "../ui";
import { CategoryTile } from "../components/CategoryTile";
import { loadBlogs, getCategories } from "../blogs";
import { heroTools } from "../data";

export default function Categories() {
  const [cats, setCats] = useState([]);
  useEffect(() => {
    loadBlogs().then((blogs) => {
      const derived = getCategories(blogs);
      const seedSlugs = new Set(heroTools.map((t) => t.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")));
      const list = heroTools.map((t) => ({ slug: t.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"), name: t.title, tone: t.color }));
      derived.forEach((s) => { if (!seedSlugs.has(s)) list.push({ slug: s, name: s, tone: "#3b82f6" }); });
      setCats(list);
    });
  }, []);
  return (
    <section className="py-16 md:py-20">
      <Container>
        <h1 className="font-serif text-[36px] leading-tight md:text-[44px]">Categories</h1>
        <p className="mt-3 max-w-xl text-base text-muted">Browse all categories.</p>
        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {cats.map((c) => <CategoryTile key={c.slug} cat={c} />)}
        </div>
      </Container>
    </section>
  );
}
