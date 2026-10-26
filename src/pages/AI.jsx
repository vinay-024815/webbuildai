import { Container } from "../ui";
import { MCPButton } from "../components/MCPButton";

export default function AI() {
  return (
    <section className="py-12 md:py-20">
      <Container>
        <div className="mb-10 text-center">
          <h2 className="font-serif text-[40px] leading-tight md:text-[56px] text-ink">
            AI Tools & Guides
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-[17px] leading-8 text-muted">
            Build websites with AI — Lovable, ChatGPT, Claude, and more.
          </p>
        </div>

        <div className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-center justify-center">
          <MCPButton
            tool={MCP_TOOLS.GENERATE_BLOG}
            input={{ topic: "Best AI Website Builders", keywords: ["AI", "website builder"], tone: "professional" }}
            label="Generate AI Blog Post"
            onGenerated={(data) => console.log("Blog generated:", data)}
          />
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {[
            {
              title: "Best AI Website Builders",
              desc: "Compare AI-powered website creation tools.",
              href: "/ai/builders",
            },
            {
              title: "Build with Lovable",
              desc: "Full-stack app creation with AI.",
              href: "/ai/lovable",
            },
            {
              title: "AI Agents Explained",
              desc: "Understanding autonomous AI agents.",
              href: "/ai/agents",
            },
            {
              title: "AI Tools Directory",
              desc: "Categorized AI tools for every job.",
              href: "/ai/directory",
            },
            {
              title: "Build with ChatGPT",
              desc: "Create websites using ChatGPT.",
              href: "/ai/chatgpt",
            },
            {
              title: "Build with Claude",
              desc: "Create websites using Claude.",
              href: "/ai/claude",
            },
          ].map((item) => (
            <a
              key={item.title}
              href={item.href}
              className="group flex flex-col gap-3 rounded-[20px] border border-[#cbd5e1] bg-white p-6 hover:border-[#7c3aed] hover:shadow-[0_12px_30px_rgba(124,58,237,0.1)] transition-all duration-300"
            >
              <h3 className="text-[18px] font-semibold text-ink group-hover:text-[#7c3aed] transition-colors">
                {item.title}
              </h3>
              <p className="text-[15px] leading-6 text-muted">{item.desc}</p>
            </a>
          ))}
        </div>
      </Container>
    </section>
  );
}