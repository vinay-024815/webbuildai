import { Container } from "../ui";
import { navLinks } from "../data";

export default function Build() {
  return (
    <section className="py-12 md:py-20">
      <Container>
        <div className="mb-10 text-center">
          <h2 className="font-serif text-[40px] leading-tight md:text-[56px] text-ink">
            Build Guides
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-[17px] leading-8 text-muted">
            Step-by-step guides to create, launch, and grow your website on the modern web.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {[
            {
              title: "How to Create a Website",
              desc: "From domain to deployment — the complete beginner's roadmap.",
              href: "/build/create-website",
            },
            {
              title: "What Is WordPress",
              desc: "Understanding the world's most popular CMS and how to use it.",
              href: "/build/wordpress",
            },
            {
              title: "Best Website Builders",
              desc: "Compare no-code website builders for 2026.",
              href: "/build/builders",
            },
            {
              title: "WordPress Guides",
              desc: "Tutorials, themes, plugins, and maintenance.",
              href: "/build/wordpress-guides",
            },
            {
              title: "Vibe Coding Guide",
              desc: "Build apps with AI coding assistants.",
              href: "/build/vibe-coding",
            },
            {
              title: "Start a WordPress Blog",
              desc: "Launch your blog the right way.",
              href: "/build/start-blog",
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