import blueprintsData from "../content/blueprints.json";
import { Container } from "../ui";

export function Blueprints() {
  return (
    <section id="blueprints" className="scroll-mt-24 border-y border-line bg-white py-20">
      <Container>
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <h2 className="font-serif text-3xl md:text-4xl">Website Blueprints</h2>
          <p className="mt-3 text-muted">Proven combinations for common projects. Pick one and follow the guide.</p>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          {blueprintsData.map((b) => (
            <article key={b.title} className="group relative flex flex-col overflow-hidden rounded-2xl border border-line bg-white transition hover:-translate-y-1 hover:shadow-xl">
              <div className="relative h-52 overflow-hidden">
                <img src={b.image} alt={b.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="text-xl font-bold group-hover:text-forest"><a href={b.href} className="after:absolute after:inset-0">{b.title}</a></h3>
                <p className="mt-3 text-muted">{b.description}</p>
                <p className="mt-auto border-t border-line pt-4 text-sm font-medium text-ink/70">{b.tag}</p>
              </div>
            </article>
          ))}
        </div>
        <p className="mt-10 text-center">
          <a className="rounded-full bg-forest px-6 py-3 text-white hover:bg-moss" href="/tools/website-stack-generator">Build my personalised stack →</a>
        </p>
      </Container>
    </section>
  );
}
