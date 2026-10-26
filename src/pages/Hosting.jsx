import { Container } from "../ui";

export default function Hosting() {
  return (
    <section className="py-12 md:py-20">
      <Container>
        <div className="mb-10 text-center">
          <h2 className="font-serif text-[40px] leading-tight md:text-[56px] text-ink">
            Hosting Guides
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-[17px] leading-8 text-muted">
            Find the right hosting for your website — from shared to dedicated servers.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {[
            {
              title: "Best Web Hosting",
              desc: "Top hosting providers compared and tested.",
              href: "/hosting",
            },
            {
              title: "Best WordPress Hosting",
              desc: "Optimized WordPress hosting for performance.",
              href: "/hosting/wordpress",
            },
            {
              title: "Cheap VPS Hosting",
              desc: "Affordable virtual private servers.",
              href: "/hosting/vps",
            },
            {
              title: "Best Cloud Hosting",
              desc: "Scalable cloud infrastructure options.",
              href: "/hosting/cloud",
            },
            {
              title: "Dedicated Server Hosting",
              desc: "Full control with dedicated hardware.",
              href: "/hosting/dedicated",
            },
            {
              title: "How to Choose Hosting",
              desc: "A decision framework for your needs.",
              href: "/hosting/choose",
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