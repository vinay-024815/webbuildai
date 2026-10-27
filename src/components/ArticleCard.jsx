export function ArticleCard({ article }) {
  const tone = article.tone === "dark";
  return (
    <a
      href={`/blog/${article.slug}`}
      className={`group flex h-[424px] min-w-0 flex-col overflow-hidden rounded-[20px] border transition duration-300 bg-white hover:-translate-y-1 hover:shadow-lg ${
        tone ? "border-forest bg-forest text-cream" : "border-forest/10 bg-[#fffdf8] text-ink"
      }`}
    >
      <div className="relative mx-3 mt-3 h-[150px] overflow-hidden rounded-[14px] sm:h-[160px]">
        {(article.image || article.hero_url) ? (
          <img
            src={article.image || article.hero_url}
            alt={article.hero_alt || article.title}
            loading="lazy"
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        ) : null}
        {/* <span className="absolute left-3 top-3 rounded-md bg-black/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-cream">
          {article.kicker || article.category}
        </span> */}
      </div>
      <div className="flex flex-1 flex-col p-5 pt-4">
        <p
          className={`text-[11px] font-medium uppercase tracking-[0.12em] ${
            tone ? "text-cream/60" : "text-muted"
          }`}
        >
          {article.kicker || article.category}
        </p>
        <h3 className="mt-2 min-h-[2.6em] line-clamp-3 font-serif text-[21px] leading-[1.3] tracking-[-0.02em]">
          {article.title}
        </h3>
        <p
          className={`mt-3 line-clamp-2 text-[13px] leading-[1.75] ${
            tone ? "text-cream/75" : "text-muted"
          }`}
        >
          {article.excerpt}
        </p>
        <div
          className={`mt-auto flex items-center justify-between border-t pt-4 mt-5 text-[12px] font-medium ${
            tone ? "border-cream/15 text-cream/90" : "border-forest/10 text-forest"
          }`}
        >
          <span>Read article</span>
          <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
        </div>
      </div>
    </a>
  );
}
