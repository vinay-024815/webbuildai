import { Link } from "react-router-dom";
import { useId } from "react";
import { formatDate } from "./PostHeader";

export function LatestArticlesList({ posts = [] }) {
  const headingId = useId();
  if (!posts.length) return null;

  return (
    <section aria-labelledby={headingId} className="rounded-[16px] border border-line/80 bg-white p-5">
      <div className="flex items-baseline justify-between gap-3">
        <h2 id={headingId} className="text-[11px] font-bold uppercase tracking-[0.12em] text-muted">
          Latest articles
        </h2>
        <Link to="/blog" className="text-[12px] font-medium text-forest underline-offset-2 hover:underline">
          View all
        </Link>
      </div>

      <ul className="mt-3 divide-y divide-line/60">
        {posts.map((post) => (
          <li key={post.slug} className="py-3 first:pt-0 last:pb-0">
            <Link to={`/blog/${post.slug}`} className="group flex items-start gap-3">
              <span className="size-14 shrink-0 overflow-hidden rounded-[10px] bg-cream-deep">
                {post.image && (
                  <img
                    src={post.image}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                )}
              </span>
              <span className="min-w-0">
                <span className="line-clamp-2 block text-[14px] font-medium leading-snug text-ink transition group-hover:text-forest">
                  {post.title}
                </span>
                <span className="mt-1 block text-[11px] text-muted">{formatDate(post.updated || post.date)}</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
