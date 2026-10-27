import { articles } from "../data";
import { Container } from "../ui";

export function BestPicks() {
  const picks = articles.slice(0, 8);
  return (
    // <section className="container-page py-20">
    <section className="mx-auto w-full max-w-[1220px] px-5 py-20 md:px-8">
      <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div className="max-w-2xl">
          <p className="text-sm font-bold uppercase tracking-wider text-forest">Reviews</p>
          <h2 className="font-serif mt-2 text-3xl md:text-4xl">Best of 2026: honest picks</h2>
          <p className="mt-3 text-muted">Transparent criteria, real trade-offs and no paid rankings.</p>
        </div>
        <a className="shrink-0 font-bold text-forest hover:underline" href="/hosting">All hosting reviews →</a>
      </div>
      <ol className="grid gap-4 md:grid-cols-2">
        {picks.map((a, i) => (
          <li key={a.slug}>
            <a className="group flex items-start gap-4 rounded-2xl border border-line bg-white p-5 transition hover:border-forest hover:shadow-md" href={a.href}>
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-ink text-lg text-white">{String(i + 1).padStart(2, "0")}</span>
              <span>
                <span className="block font-bold leading-snug group-hover:text-forest">{a.title}</span>
                <span className="mt-1 line-clamp-2 block text-sm text-muted">{a.excerpt}</span>
              </span>
            </a>
          </li>
        ))}
      </ol>
    </section>
  );
}
