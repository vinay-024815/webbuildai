import { Link } from "react-router-dom";
import { Breadcrumbs } from "./Breadcrumbs";

const DEFAULT_AUTHOR = { name: "WebBuild AI Editorial", role: "Independent research team" };

export function formatDate(iso) {
  if (!iso) return null;
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return null;
  return date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

function initialsOf(name = "") {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();
}

/**
 * Header block for /blog/:slug — breadcrumb, chips, H1, deck, byline,
 * affiliate disclosure, hero image + caption (B1).
 */
export function PostHeader({ post, author }) {
  const byline = author?.name ? author : DEFAULT_AUTHOR;
  const published = formatDate(post.date);
  const updated = formatDate(post.updated);
  const readTime = post.readTime ? post.readTime.replace(/\s*read$/i, "") : null;
  const showDisclosure = post.disclosure !== false;
  const category = post.category;

  const crumbs = [
    { label: "Home", href: "/" },
    { label: "Blog", href: "/blog" },
    ...(category ? [{ label: category, href: `/category/${encodeURIComponent(category)}` }] : []),
    { label: post.title },
  ];

  return (
    <header>
      <Breadcrumbs items={crumbs} />

      <div className="mt-6 flex flex-wrap items-center gap-2 text-[12px] font-medium">
        {category && (
          <Link
            to={`/category/${encodeURIComponent(category)}`}
            className="rounded-full border border-forest/15 bg-mint/70 px-3 py-1 text-forest transition hover:bg-mint"
          >
            {category}
          </Link>
        )}
        {updated ? (
          <span className="rounded-full border border-line px-3 py-1 text-muted">
            Updated{" "}
            <time dateTime={post.updated} className="text-ink/80">
              {updated}
            </time>
          </span>
        ) : published ? (
          <span className="rounded-full border border-line px-3 py-1 text-muted">
            Published{" "}
            <time dateTime={post.date} className="text-ink/80">
              {published}
            </time>
          </span>
        ) : null}
      </div>

      <h1 className="mt-5 max-w-[24ch] font-serif text-[34px] font-semibold leading-[1.12] tracking-[-0.02em] text-ink sm:text-[38px] md:max-w-[36ch] md:text-[44px] lg:text-[48px]">
        {post.title}
      </h1>

      {post.excerpt && (
        <p className="mt-4 max-w-[62ch] text-[18px] leading-[1.65] text-muted md:text-[19px]">{post.excerpt}</p>
      )}

      <div className="mt-8 flex flex-wrap items-center justify-between gap-x-6 gap-y-4 border-y border-line/70 py-4">
        <div className="flex min-w-0 items-center gap-3">
          {byline.avatar ? (
            <img
              src={byline.avatar}
              alt=""
              width="40"
              height="40"
              loading="lazy"
              decoding="async"
              className="size-10 shrink-0 rounded-full object-cover ring-1 ring-line"
            />
          ) : (
            <span
              aria-hidden="true"
              className="grid size-10 shrink-0 place-items-center rounded-full bg-mint font-serif text-[15px] font-semibold text-forest"
            >
              {initialsOf(byline.name)}
            </span>
          )}
          <span className="min-w-0">
            <span className="block truncate text-[14px] font-semibold text-ink">{byline.name}</span>
            {byline.role && <span className="block truncate text-[12.5px] text-muted">{byline.role}</span>}
          </span>
        </div>
        {readTime && <span className="text-[12.5px] text-muted">{readTime} read</span>}
      </div>

      {showDisclosure && (
        <p className="mt-6 rounded-[12px] border border-line/80 bg-cream/50 px-4 py-3 text-[13px] leading-6 text-muted">
          Some links in this article are affiliate links. We may earn a commission at no extra cost to you.{" "}
          <Link
            to="/affiliate-disclosure"
            className="text-forest underline underline-offset-2 transition hover:text-leaf"
          >
            Read our affiliate disclosure.
          </Link>
        </p>
      )}

      {post.image && (
        <figure className="mt-8">
          <div className="overflow-hidden rounded-[20px] bg-cream-deep">
            <img
              src={post.image}
              alt={post.imageAlt || post.title}
              className="aspect-[16/9] w-full object-cover md:aspect-[2/1]"
              loading="eager"
              decoding="async"
            />
          </div>
          {post.heroCaption && (
            <figcaption className="mt-3 text-[13px] leading-6 text-muted">{post.heroCaption}</figcaption>
          )}
        </figure>
      )}
    </header>
  );
}
