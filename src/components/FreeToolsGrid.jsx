
import { tools } from "../data";
import { Container } from "../ui";

export function FreeToolsGrid() {
  return (
    <div className="mt-20 rounded-3xl px-5 py-8 sm:px-8 sm:py-8">
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="max-w-2xl">
          <p className="text-sm font-bold uppercase tracking-[0.14em] text-[#176B52]">
            Free tools
          </p>

          <h2 className="mt-2 font-serif text-3xl text-[#17251F] md:text-4xl">
            Useful tools, no sign-up
          </h2>

          <p className="mt-3 leading-7 text-[#4B5D54]">
            Real checks and calculators. We never fake results.
          </p>
        </div>

        <a
          className="shrink-0 font-semibold text-[#176B52] transition-colors hover:text-[#104A39] hover:underline"
          href="/tools"
        >
          All free tools →
        </a>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {tools.slice(0, 6).map((t) => (
          <a
            key={t.id}
            className="group rounded-2xl border border-[#D7DCCF] bg-white p-5 transition hover:-translate-y-0.5 hover:border-forest"
            href={t.url || "/tools"}
          >
            <p className="text-xs font-bold uppercase tracking-[0.1em] text-[#527064]">
              {t.category}
            </p>

            <h3 className="mt-2 text-lg font-semibold text-[#17251F] transition-colors group-hover:text-forest">
              {t.title}
            </h3>

            <p className="mt-2 text-sm leading-6 text-[#526158]">
              {t.description}
            </p>
          </a>
        ))}
      </div>
    </div>
  );
}
