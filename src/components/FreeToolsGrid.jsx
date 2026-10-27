import { tools } from "../data";
import { Container } from "../ui";

export function FreeToolsGrid() {
  return (
    <div className="mt-20">
      <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div className="max-w-2xl">
          <p className="text-sm font-bold uppercase tracking-wider text-forest">Free tools</p>
          <h2 className="font-serif mt-2 text-3xl md:text-4xl">Useful tools, no sign-up</h2>
          <p className="mt-3 text-muted">Real checks and calculators. We never fake results.</p>
        </div>
        <a className="shrink-0 font-semibold text-forest hover:underline" href="/tools">All free tools →</a>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {tools.slice(0, 6).map((t) => (
          <a key={t.id} className="group rounded-2xl border border-line bg-white p-5 transition hover:-translate-y-0.5 hover:border-forest" href={t.url || "/tools"}>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted">{t.category}</p>
            <h3 className="mt-2 text-lg font-semibold group-hover:text-forest">{t.title}</h3>
            <p className="mt-2 text-sm text-muted">{t.description}</p>
          </a>
        ))}
      </div>
    </div>
  );
}
