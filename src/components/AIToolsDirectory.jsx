
import toolsData from "../content/tools.json";
import { Container } from "../ui";

export function AIToolsDirectory() {
  const cats = [...new Set(toolsData.map((t) => t.category))];

  return (
    <section className="mx-auto w-full max-w-[1000px] py-8 sm:py-8">
      <Container>
        <div className="mb-9 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-[0.14em] text-[#176B52]">
              AI Tools Directory
            </p>

            <h2 className="mt-3 font-serif text-3xl font-semibold leading-tight text-[#17251F] sm:text-4xl">
              Find the right AI tool, fast
            </h2>

            <p className="mt-4 max-w-xl text-base leading-7 text-[#4B5D54] sm:text-lg">
              Assistants, coding agents, website builders, automation and SEO
              tools.
            </p>
          </div>

          <a
            className="inline-flex w-fit shrink-0 items-center gap-2 font-semibold text-[#176B52] transition-colors hover:text-[#104A39]"
            href="/ai-tools"
          >
            Browse all AI tools
            <span aria-hidden="true">→</span>
          </a>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {cats.map((c) => {
            const count = toolsData.filter(
              (t) => t.category === c
            ).length;

            return (
              <a
                key={c}
                href={`/ai-tools?category=${encodeURIComponent(c)}`}
className="group rounded-2xl border border-[#D7DCCF] bg-white p-5 transition hover:-translate-y-0.5 hover:border-forest"

              >
               
<p className="font-semibold text-[#17251F] group-hover:text-forest">
  {c}
</p>


                <p className="mt-2 text-sm font-medium text-[#58675E] group-hover:text-[#315D49]">
                  {count} {count === 1 ? "tool" : "tools"}
                </p>
              </a>
            );
          })}

          <a
            href="/ai/mcp"
            
className="group rounded-2xl border border-dashed border-[#B8C5B8] bg-white p-5 transition hover:-translate-y-0.5 hover:border-forest"

          >
            <p className="text-base font-semibold text-[#17251F] transition-colors group-hover:text-[#176B52]">
              MCP &amp; Agents
            </p>

            <p className="mt-2 text-sm font-medium text-[#58675E] group-hover:text-[#315D49]">
              Learn the protocol →
            </p>
          </a>
        </div>
      </Container>
    </section>
  );
}
