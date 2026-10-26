import { useEffect, useState } from "react";
import { Container } from "../ui";
import { Icon, LogoMark } from "../icons";
import { articles, comparisons, directory, heroTools, heroHeadline, heroSubheadline, heroPrimaryCTA, heroSecondaryCTA, navLinks, news, popular, softwareColumns, usefulTools } from "../data";
import { CategoryTile } from "../components/CategoryTile";
import { ArticleCard } from "../components/ArticleCard";
function Hero() {
  const [cats, setCats] = useState([]);
  useEffect(() => {
    const fallback = heroTools.map((t) => ({ slug: t.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"), name: t.name, tone: t.color }));
    const derived = [...new Set(articles.map((a) => a.category))];
    const seedSlugs = new Set(fallback.map((f) => f.slug));
    const extra = derived.filter((s) => !seedSlugs.has(s)).map((s) => ({ slug: s, name: s, tone: "#3b82f6" }));
    setCats([...fallback, ...extra]);
  }, []);
  return (
    <section className="relative overflow-hidden  pb-10 pt-8 md:pt-14">
      <div aria-hidden className="pointer-events-none absolute -right-24 -top-28 size-[420px] rounded-full bg-sage/80 blur-[2px] md:size-[520px]" />
      <div aria-hidden className="pointer-events-none absolute right-16 top-10 size-40 rounded-full bg-mint/70 md:right-40" />
      <Container className="relative">
        <h1 className="max-w-[15ch] font-serif text-[46px] leading-[1.08] font-medium tracking-[-0.03em] text-ink md:text-[72px]">
          {heroHeadline}
        </h1>
        <p className="mt-6 max-w-[48ch] text-[17px] leading-8 text-muted md:text-[19px]">
          {heroSubheadline}
        </p>
      
<div className="mt-8 flex flex-wrap items-center gap-4">
  {/* Primary CTA */}
  <a
    href={heroPrimaryCTA.href}
    className="group inline-flex items-center justify-center gap-2.5 rounded-full border border-[#315C43] bg-gradient-to-b from-[#315C43] to-[#1F4933] px-7 py-3.5 text-[15px] font-semibold text-white  transition-all duration-200 ease-out hover:-translate-y-0.5 hover:from-[#3B6B4E] hover:to-[#28563C] active:translate-y-0 active:shadow-[0_1px_0_#153724,0_3px_8px_rgba(31,73,51,0.16)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B6B4E] focus-visible:ring-offset-2"
  >
    {heroPrimaryCTA.text}
    <Icon
      name="arrow"
      className="size-4 transition-transform duration-200 group-hover:translate-x-1"
    />
  </a>

  {/* Secondary CTA */}
  <a
    href={heroSecondaryCTA.href}
    className="group inline-flex items-center justify-center gap-2.5 rounded-full border border-[#D6DED5] bg-white/80 px-7 py-3.5 text-[15px] font-semibold text-[#263B2E] shadow-[0_2px_8px_rgba(31,41,32,0.05)] transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-[#A8BBA9] hover:bg-white hover:shadow-[0_8px_20px_rgba(31,41,32,0.09)] active:translate-y-0 active:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B6B4E] focus-visible:ring-offset-2"
  >
    {heroSecondaryCTA.text}
    <Icon
      name="arrow"
      className="size-4 text-[#526B59] transition-transform duration-200 group-hover:translate-x-1"
    />
  </a>
</div>

        <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {cats.map((c) => (
            <CategoryTile key={c.slug} cat={c} />
          ))}
        </div>
      </Container>
    </section>
  );
}


export function Software() {
  const descriptions = [
    "Protect your connection on public Wi-Fi, while travelling and when working remotely.",
    "Keep your devices, accounts and client data safe, without paying for what you don't need.",
    "Design, photo, video and AI image tools for ads, social content, thumbnails and brand assets.",
  ];

  const icons = [
    <svg viewBox="0 0 48 48" fill="none" className="h-12 w-12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="24" cy="23" r="20" />
      <path d="M4 23h40M24 3c-7 6-10 13-10 20s3 14 10 20M24 3c7 6 10 13 10 20s-3 14-10 20" />
      <circle cx="38" cy="38" r="8" fill="#FFC400" stroke="currentColor" />
      <path d="m34.5 38 2.5 2.5 4-5" stroke="#07584F" />
    </svg>,
    <svg viewBox="0 0 48 48" fill="none" className="h-12 w-12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M24 3 43 11v12c0 12-8 19-19 23C13 42 5 35 5 23V11L24 3Z" />
      <rect x="16" y="22" width="16" height="12" rx="3" fill="#FFC400" />
      <path d="M19 22v-4a5 5 0 0 1 10 0v4" />
    </svg>,
    <svg viewBox="0 0 48 48" fill="none" className="h-12 w-12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M24 4C12 4 4 13 4 24c0 10 7 18 17 18h3a4 4 0 0 0 3-7 4 4 0 0 1 3-7h4c6 0 10-5 10-11S34 4 24 4Z" />
      <circle cx="16" cy="21" r="3" fill="#FFC400" />
      <circle cx="23" cy="13" r="3" fill="#FFC400" />
      <circle cx="32" cy="14" r="3" fill="#FFC400" />
    </svg>,
  ];

  return (
    <section id="reviews" className="bg-white px-4 py-14 sm:px-6 md:py-20">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-serif text-[34px] font-semibold leading-tight tracking-[-0.03em] text-ink sm:text-[40px] md:text-[46px]">
            VPNs, antivirus & creative tools
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-[16px] leading-7 text-muted sm:text-[18px]">
            The software every site owner, marketer and creator relies on,
            reviewed with the same no-fake-scores rules as everything else.
          </p>
        </div>

        <div className="mt-10 grid items-stretch gap-6 md:mt-12 md:grid-cols-3">
          {softwareColumns.slice(0, 3).map((col, index) => (
            <div
              key={col.title}
              className="group flex h-full flex-col rounded-[22px] border border-[#E8E1D6] bg-white p-6 shadow-[0_3px_12px_rgba(25,45,32,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-[#C8DCD2] hover:shadow-[0_12px_30px_rgba(25,45,32,0.08)] sm:p-7"
            >
              <div className="mb-6 flex h-12 w-12 items-center justify-center text-[#08796E]">
                {icons[index]}
              </div>

              <h3 className="text-[22px] font-semibold leading-tight tracking-[-0.03em] text-ink">
                {index === 0
                  ? "VPN & Privacy"
                  : index === 1
                  ? "Antivirus & Security"
                  : "Creative Software"}
              </h3>

              <p className="mt-3 min-h-[56px] text-[15px] leading-[1.55] text-muted sm:text-[16px]">
                {descriptions[index]}
              </p>

              <div className="mb-4 mt-6 border-t border-[#E8E1D6]" />

              <ul className="space-y-1">
                {col.links.map((item) => (
                  <li key={item}>
                    <a
                      href="#reviews"
                      className="group/link flex min-h-[48px] items-center justify-between gap-3 rounded-xl px-2.5 py-3 text-[15px] font-semibold leading-5 text-ink transition-colors duration-200 hover:bg-[#E7F3F0] hover:text-[#07584F] sm:text-[16px]"
                    >
                      <span>{item}</span>
                      <span className="shrink-0 text-[23px] font-normal leading-none transition-transform duration-200 group-hover/link:translate-x-1">
                        →
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}


function Articles() {
  const latest = articles.slice(0, 3);
  return (
    <section id="articles" className="py-12 md:py-16">
      <Container>
        <div className="mb-7 flex items-end justify-between gap-4">
          <div>
            <h2 className="font-serif text-[30px] leading-tight md:text-[36px]">Latest articles</h2>
            <p className="mt-2 max-w-xl text-sm leading-6 text-muted">Practical guides, honest reviews and useful insights to help you choose the right tools.</p>
          </div>
          <a href="/blog" className="hidden shrink-0 text-sm font-medium text-forest transition hover:underline sm:inline-block">View all articles →</a>
        </div>
        <div className="grid items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {latest.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      </Container>
    </section>
  );
}
export function Directory() {
  return (
    <section id="directory" className="bg-paper py-16 md:py-20">
      <Container className="grid items-start gap-10 md:grid-cols-[1.1fr_1.4fr]">
        <div>
          <h2 className="font-serif text-[36px] leading-tight md:text-[44px]">Find the right AI tool, fast</h2>
          <p className="mt-3 max-w-md text-[17px] leading-8 text-muted">Assistants, writing, design, code, SEO, and automation — sorted by job, not by hype.</p>
          <a href="#tools" className="mt-6 inline-flex rounded-full border border-ink/15 px-5 py-2.5 text-[15px] font-medium hover:border-ink/30">Browse directory</a>
        </div>
        <div className="grid grid-cols-2 gap-x-8 gap-y-8 sm:grid-cols-4">
          {directory.map((col) => (
            <div key={col.title}>
              <h3 className="text-[15px] font-semibold">{col.title}</h3>
              <ul className="mt-2.5 space-y-2">
                {col.items.map((item) => (
                  <li key={item}><a href="#tools" className="text-[15px] text-muted hover:text-ink">{item}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

export function UsefulTools() {
  return (
    <section id="tools" className="py-16 md:py-20">
      <Container>
        <h2 className="font-serif text-[36px] md:text-[44px]">Useful tools, no sign-up</h2>
        <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {usefulTools.map((col) => (
            <div key={col.group}>
              <h3 className="border-b border-line pb-3 text-[16px] font-semibold">{col.group}</h3>
              <ul className="mt-4 space-y-3">
                {col.items.map((item) => (
                  <li key={item}><a href="#tools" className="text-[16px] text-muted hover:text-ink">{item}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

export function Compare() {
  return (
    <section id="compare" className="pb-16">
      <Container>
        <h2 className="font-serif text-[36px] md:text-[44px]">Side-by-side, no paid winners</h2>
        <div className="mt-8 grid gap-x-10 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
          {comparisons.map((item) => (
            <a key={item.id} href={item.href || "#compare"} className="flex items-center justify-between border-b border-line py-4 text-[17px] hover:text-leaf">
              {item.title}
              <Icon name="arrow" className="size-5 text-muted" />
            </a>
          ))}
        </div>
      </Container>
    </section>
  );
}

function Newsletter() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  function onSubmit(e) {
    e.preventDefault();
    if (!email.trim()) return;
    setDone(true);
  }

  return (
    <section id="newsletter" className="px-4 pb-16 pt-6 sm:px-6">
      <Container>
        <div className="relative isolate overflow-hidden rounded-[28px] bg-[#023025] px-6 py-10 sm:px-10 sm:py-12 md:rounded-[30px] md:px-14 md:py-14">
          {/* Decorative circle */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-12 -top-16 -z-10 size-64 rounded-full bg-[#396D5C] md:-right-8 md:-top-16 md:size-72"
          />

          <div className="relative grid items-center gap-7 md:grid-cols-[1.1fr_1fr] md:gap-8">
            {/* CTA text */}
            <div>
              <h2 className="max-w-[19ch] font-serif text-[30px] font-semibold leading-[1.12] tracking-[-0.03em] text-white sm:text-[36px] md:text-[42px]">
                Get smarter about AI, websites and SEO.
              </h2>

              <p className="mt-4 max-w-lg text-[15px] leading-[1.65] text-white sm:text-[17px]">
                One practical email with new guides, tools and workflows.
                Unsubscribe anytime.
              </p>
            </div>

            {/* Newsletter form */}
            <div className="relative z-10 w-full">
              {done ? (
                <div
                  role="status"
                  className="rounded-2xl border border-[#0B6B61]/20 bg-white/90 px-5 py-4 text-[15px] font-medium text-[#0B6B61]"
                >
                  Thanks for subscribing! You’re on the list.
                </div>
              ) : (
                <form
                  onSubmit={onSubmit}
                  className="flex w-full flex-col gap-3 sm:flex-row sm:items-center"
                >
                  <label htmlFor="newsletter-email" className="sr-only">
                    Email address
                  </label>

                  <input
                    id="newsletter-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    autoComplete="email"
                    className="h-14 min-w-0 flex-1 rounded-[15px] border border-[#e5e5e5] bg-white px-5 text-[15px] text-[#171717] outline-none placeholder:text-[#6B7280] focus:border-[#0B6B61] focus:ring-2 focus:ring-[#0B6B61]/20"
                  />

                  <button
                    type="submit"
                    className="h-14 shrink-0 rounded-full bg-[#FFC400] px-6 text-[15px] font-semibold text-white transition hover:bg-[#07584F] focus:outline-none focus:ring-2 focus:ring-[#0B7065] focus:ring-offset-2 focus:ring-offset-[#F9B934]"
                  >
                    Subscribe
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}


export default function Home() {
  return (
    <>
      <Hero />
      <Software />
      <Articles />
      <Directory />
      <UsefulTools />
      <Compare />
     <Newsletter/>
    </>
  );
}
