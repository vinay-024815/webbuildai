import toolsData from "../content/tools.json";
import { Container } from "../ui";

export function AIToolsDirectory() {
  const cats = [...new Set(toolsData.map((t) => t.category))];
  return (
    <section className="mx-auto w-full max-w-[1000px] py-20">
      <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div className="max-w-2xl">
          <p className="text-sm font-bold uppercase tracking-wider text-forest">AI tools directory</p>
          <h2 className="font-serif mt-2 text-3xl md:text-4xl">Find the right AI tool, fast</h2>
          <p className="mt-3 text-muted">Assistants, coding agents, website builders, automation and SEO tools.</p>
        </div>
        <a className="shrink-0 font-semibold text-forest hover:underline" href="/ai-tools">Browse all AI tools →</a>
      </div>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-5">
        {cats.map((c) => (
          <a key={c} className="group rounded-2xl border border-line bg-white p-4 transition hover:border-forest hover:bg-mint/40" href={`/ai-tools?category=${encodeURIComponent(c)}`}>
            <p className="font-semibold group-hover:text-forest">{c}</p>
            <p className="mt-1 text-sm text-muted">{toolsData.filter((t) => t.category === c).length} tools</p>
          </a>
        ))}
        <a className="group rounded-2xl border bg-white border-dashed border-line p-4 hover:border-forest" href="/ai/mcp">
          <p className="font-semibold group-hover:text-forest">MCP & Agents</p>
          <p className="mt-1 text-sm text-muted">Learn the protocol →</p>
        </a>
      </div>
    </section>
  );
}
