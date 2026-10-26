import { Container } from "../ui";
import { Icon } from "../icons";
import { tools } from "../data";

export default function Tools() {
  return (
    <section className="py-12 md:py-20">
      <Container>
        <div className="mb-10 text-center">
          <h2 className="font-serif text-[40px] leading-tight md:text-[56px] text-ink">
            AI Tools Directory
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-[17px] leading-8 text-muted">
            Categorized AI tools for every job — tested, compared, and reviewed.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool) => (
            <a
              key={tool.id}
              href={tool.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col gap-3 rounded-[20px] border border-[#cbd5e1] bg-white p-6 hover:border-[#7c3aed] hover:shadow-[0_12px_30px_rgba(124,58,237,0.1)] transition-all duration-300"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-[17px] font-semibold text-ink group-hover:text-[#7c3aed] transition-colors">
                  {tool.title}
                </h3>
                <span className="flex items-center gap-1 text-[12px] font-bold text-[#7c3aed]">
                    {tool.rating} ★
                  </span>
              </div>
              <p className="text-[14px] leading-6 text-muted">{tool.description}</p>
              <div className="mt-auto flex items-center gap-2 text-[13px] text-muted uppercase tracking-[0.1em]">
                <Icon name={tool.icon} className="size-4" />
                <span>{tool.category}</span>
              </div>
            </a>
          ))}
        </div>
      </Container>
    </section>
  );
}
