import { comparisons } from "../data";
import { Container } from "../ui";

export function CompareGrid() {
  return (
    <section className="border-y border-line bg-paper py-20">
      <Container>
        <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-wider text-forest">Compare</p>
            <h2 className="font-serif mt-2 text-3xl md:text-4xl">Side-by-side, no paid winners</h2>
            <p className="mt-3 text-muted">Transparent criteria and factual differences.</p>
          </div>
          <a className="shrink-0 font-semibold text-forest hover:underline" href="/compare">All comparisons →</a>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {comparisons.slice(0, 8).map((c) => (
            <a key={c.id} className="group rounded-2xl border border-line bg-white p-4 hover:border-forest" href={c.href || "/compare"}>
              <p className="font-semibold group-hover:text-forest">{c.title}</p>
              <p className="mt-1 text-xs text-muted">{c.criteria?.length || 0} criteria · {c.category}</p>
            </a>
          ))}
        </div>
      </Container>
    </section>
  );
}
