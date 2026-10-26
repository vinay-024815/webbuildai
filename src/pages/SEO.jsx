import { Container } from "../ui";

export default function SEO() {
  return (
    <section className="py-12 md:py-20">
      <Container>
        <div className="mb-10 text-center">
          <h2 className="font-serif text-[40px] leading-tight md:text-[56px] text-ink">
            SEO Guides
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-[17px] leading-8 text-muted">
            Improve your site's visibility in search engines and AI answer engines.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {[
            {
              title: "SEO Action Plan",
              desc: "A complete SEO action plan for new and existing websites.",
              href: "/seo/action-plan",
            },
            {
              title: "Technical SEO Checklist",
              desc: "Audit your site's technical SEO comprehensively.",
              href: "/seo/technical",
            },
            {
              title: "AI Search: GEO & AEO",
              desc: "Optimize for generative and answer engines.",
              href: "/seo/geo-aeo",
            },
            {
              title: "Improve Website Speed",
              desc: "Core Web Vitals and performance optimization.",
              href: "/seo/speed",
            },
            {
              title: "Free Website Audit",
              desc: "Check your site's SEO health.",
              href: "/seo/audit",
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