import { Container } from "../ui";

export function AISearch() {
  return (
    <section className="bg-black py-20 text-white">
      <Container className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:items-center">
        <div>
          <p className="text-sm font-bold uppercase tracking-wider text-yellow-500">AI search</p>
          <h2 className="font-serif mt-2 text-3xl md:text-4xl">SEO is becoming search + AI discovery</h2>
          <p className="mt-4 text-white/80">People now get answers from AI Overviews and assistants as well as classic results. The fundamentals still matter, but being clear, structured and citable matters more than ever.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a className="rounded-full bg-green-900 px-6 py-3 text-white hover:bg-mint hover:text-forest" href="/seo/ai-search">Learn AI search</a>
            <a className="rounded-full border border-white px-6 py-3 text-white hover:bg-white hover:text-forest" href="/tools/ai-content-optimizer">Optimise your content</a>
          </div>
        </div>
        <ol className="grid gap-4 sm:grid-cols-3">
          {["Classic SEO", "Answer engines", "LLM visibility"].map((t, i) => (
            <li key={t} className="rounded-2xl border border-white/15 bg-white/5 p-5">
              <span className="text-sm font-bold text-yellow-500">0{i + 1}</span>
              <p className="mt-2 font-semibold">{t}</p>
              <p className="mt-2 text-sm text-white/75">{i === 0 ? "Crawling, indexing, relevance, links and page experience." : i === 1 ? "Direct answers, question-led structure, FAQs and schema." : "Entities, citations, brand mentions and content built for retrieval."}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
