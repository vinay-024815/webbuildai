import { Link } from "react-router-dom";

/**
 * Breadcrumb trail. Data only — the page decides the items.
 * Last item renders as plain text with aria-current="page".
 */
export function Breadcrumbs({ items = [] }) {
  if (!items.length) return null;
  return (
    <nav aria-label="Breadcrumb" className="text-[13px] leading-6 text-muted">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
        {items.map((item, i) => {
          const last = i === items.length - 1;
          return (
            <li key={`${item.label}-${i}`} className="flex min-w-0 items-center gap-x-2">
              {i > 0 && (
                <span aria-hidden="true" className="text-line">
                  /
                </span>
              )}
              {last || !item.href ? (
                <span className="line-clamp-1 max-w-[22ch] text-ink/70 sm:max-w-[40ch]" aria-current={last ? "page" : undefined}>
                  {item.label}
                </span>
              ) : (
                <Link to={item.href} className="whitespace-nowrap underline-offset-2 hover:text-forest hover:underline">
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
