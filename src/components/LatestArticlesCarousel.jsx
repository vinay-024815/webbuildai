import { useRef, useState } from "react";
import { articles } from "../data";
import { Container } from "../ui";
import { ArticleCard } from "./ArticleCard";

export function LatestArticlesCarousel() {
  const ref = useRef(null);
  const [index, setIndex] = useState(0);
  const items = articles.slice(0, 5);
  const count = items.length;

  const go = (dir) => {
    const next = (index + dir + count) % count;
    setIndex(next);
    const el = ref.current;
    if (!el) return;
    const card = el.children[next];
    if (card) card.scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" });
  };

  return (
    <section className="py-20 bg-[#FBFAF6]">
      <Container>
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <h2 className="font-serif text-3xl md:text-4xl">Latest Articles</h2>
          <p className="mt-3 text-muted">New guides and reviews every week.</p>
        </div>
        <div className="relative">
          <button onClick={() => go(-1)} className="absolute -left-5 top-1/3 z-10 hidden h-12 w-12 items-center justify-center rounded-full border border-line bg-white text-xl shadow-lg hover:bg-mint lg:flex">‹</button>
          <button onClick={() => go(1)} className="absolute -right-5 top-1/3 z-10 hidden h-12 w-12 items-center justify-center rounded-full border border-line bg-white text-xl shadow-lg hover:bg-mint lg:flex">›</button>
         <div ref={ref} className="-mx-4 flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth px-4 pb-4 sm:mx-0 sm:px-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none]">
         {items.map((a, i) => (
              <div key={a.id || a.slug} className="flex h-full w-[85%] shrink-0 snap-start self-stretch sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]">
                <ArticleCard article={a} />
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}