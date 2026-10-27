import { useEffect, useState } from "react";
import { Container } from "../ui";
import { Icon, LogoMark } from "../icons";
import { articles, comparisons, directory, heroTools, heroHeadline, heroSubheadline, heroPrimaryCTA, heroSecondaryCTA, navLinks, news, popular, softwareColumns, usefulTools } from "../data";
import { CategoryTile } from "../components/CategoryTile";
import { ArticleCard } from "../components/ArticleCard";
import { AnnouncementBanner } from "../components/AnnouncementBanner";
import { HeroTopics } from "../components/HeroTopics";
import { LatestArticlesCarousel } from "../components/LatestArticlesCarousel";
import { NewsAndReviews } from "../components/NewsAndReviews";
import { Blueprints } from "../components/Blueprints";
import { BestPicks } from "../components/BestPicks";
import { BuildPicker } from "../components/BuildPicker";
import { AISearch } from "../components/AISearch";
import { AIToolsDirectory } from "../components/AIToolsDirectory";
import { FreeToolsGrid } from "../components/FreeToolsGrid";
import { CompareGrid } from "../components/CompareGrid";
import { NewsletterCTA } from "../components/NewsletterCTA";
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
        <h1 className="display display-sm font-serif text-[46px] leading-[1.08] font-medium tracking-[-0.03em] text-ink md:text-[72px] max-w-[15ch]">
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
          {cats.slice(0, 12).map((c) => (
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
  // 1. VPN & Privacy — Globe with location marker
  <svg
    key="vpn"
    viewBox="0 0 56 56"
    fill="none"
    className="h-12 w-12"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="25" cy="28" r="20" />
    <path d="M5 28h40M25 8c-7 7-10 14-10 20s3 13 10 20M25 8c7 7 10 14 10 20s-3 13-10 20" />
    <path d="M43 34c-5 0-9 4-9 9 0 6 9 12 9 12s9-6 9-12c0-5-4-9-9-9Z" fill="#FFC400" stroke="#315C43" />
    <circle cx="43" cy="43" r="2.5" fill="#315C43" stroke="none" />
  </svg>,

  // 2. Antivirus — Shield with check
  <svg
    key="security"
    viewBox="0 0 56 56"
    fill="none"
    className="h-12 w-12"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path
      d="M28 5 46 12v13c0 12-7 20-18 26C17 45 10 37 10 25V12L28 5Z"
      fill="#E7F3F0"
    />
    <path d="M19 28l6 6 13-14" stroke="#08796E" strokeWidth="3" />
    <path d="M42 7v-4M50 15h4M46 9l3-3" stroke="#FFC400" strokeWidth="2.5" />
  </svg>,

  // 3. Creative Software — Palette with unique color drops
  <svg
    key="creative"
    viewBox="0 0 56 56"
    fill="none"
    className="h-12 w-12"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path
      d="M28 6C15 6 5 16 5 29c0 12 9 21 21 21h5c4 0 7-3 7-7 0-3-2-5-2-8 0-2 2-4 5-4h3c5 0 7-4 7-9C51 13 40 6 28 6Z"
      fill="#F4EDFA"
    />
    <circle cx="17" cy="24" r="3.5" fill="#08796E" stroke="none" />
    <circle cx="24" cy="15" r="3.5" fill="#7950A1" stroke="none" />
    <circle cx="35" cy="17" r="3.5" fill="#FFC400" stroke="none" />
    <circle cx="40" cy="25" r="3.5" fill="#315C43" stroke="none" />
    <path d="M28 32l2 4 4 2-4 2-2 4-2-4-4-2 4-2 2-4Z" fill="#FFC400" stroke="none" />
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

              <h3 className="text-[22px] font-semibold leading-tight tracking-[-0.03em] text-black">
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
                      href={index === 0 ? "/blog/best-vpn" : index === 1 ? "/blog/best-antivirus-software" : "/blog/best-ai-image-generators"}
                      className="group/link flex min-h-[48px] items-center justify-between gap-3 rounded-xl px-2.5 py-3 text-[15px] font-semibold leading-5 text-black transition-colors duration-200 hover:bg-[#E7F3F0] hover:text-[#07584F] sm:text-[16px]"
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
          <a href="/directory" className="mt-6 inline-flex rounded-full border border-ink/15 px-5 py-2.5 text-[15px] font-medium hover:border-ink/30">Browse directory</a>
        </div>
        <div className="grid grid-cols-2 gap-x-8 gap-y-8 sm:grid-cols-4">
          {directory.map((col) => (
            <div key={col.title}>
              <h3 className="text-[15px] font-semibold">{col.title}</h3>
              <ul className="mt-2.5 space-y-2">
                {col.items.map((item) => (
                  <li key={item}><a href="/directory" className="text-[15px] text-muted hover:text-ink">{item}</a></li>
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
                  <li key={item}><a href="/tools" className="text-[16px] text-muted hover:text-ink">{item}</a></li>
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
            <a key={item.id} href={item.href || "#compare"} className="flex items-center justify-between border-b border-line py-4 text-[17px] hover:text-forest">
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
              <h2 className="display display-sm font-serif text-[30px] font-semibold leading-[1.12] tracking-[-0.03em] text-white sm:text-[36px] md:text-[42px]">
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
      {/* <AnnouncementBanner /> */}
      <Hero />
      {/* <HeroTopics /> */}
      <Software />
      <LatestArticlesCarousel />
      <NewsAndReviews />
      <Blueprints />
     <div className="bg-[#FBFAF6]"> <BestPicks /></div>
      <BuildPicker />
      <AISearch />
        {/* <div className="bg-[#FBFAF6]">  <AIToolsDirectory /></div> */}
     <div  className="bg-[#FBFAF6]"> <section className="mx-auto w-full max-w-[1000px] py-20">
        <AIToolsDirectory />
        <FreeToolsGrid />
      </section></div>
      <CompareGrid />
      <NewsletterCTA />
    </>
  );
}
