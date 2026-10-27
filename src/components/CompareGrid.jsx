
import { comparisons } from "../data";
import { Container } from "../ui";

export function CompareGrid() {
  return (
    <section className="border-y border-[#DDE1D7] py-16 sm:py-20">
      <Container>
        <div className="mb-9 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-[0.14em] text-[#176B52]">
              Compare
            </p>

            <h2 className="mt-2 font-serif text-3xl text-[#17251F] md:text-4xl">
              Side-by-side, no paid winners
            </h2>

            <p className="mt-3 leading-7 text-[#4B5D54]">
              Transparent criteria and factual differences.
            </p>
          </div>

          <a
            className="shrink-0 font-semibold text-[#176B52] transition-colors hover:text-[#104A39] hover:underline"
            href="/compare"
          >
            All comparisons →
          </a>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {comparisons.slice(0, 8).map((c) => (
            <a
              key={c.id}
              className="group rounded-2xl border border-[#D7DCCF] bg-white p-5 transition hover:-translate-y-0.5 hover:border-forest"
              href={c.href || "/compare"}
            >
              <p className="font-semibold text-[#17251F] transition-colors group-hover:text-forest">
                {c.title}
              </p>

              <p className="mt-2 text-xs leading-5 text-[#58675E]">
                {c.criteria?.length || 0} criteria
                <span className="mx-1.5 text-[#A0AAA0]">·</span>
                {c.category}
              </p>
            </a>
          ))}
        </div>
      </Container>
    </section>
  );
}
