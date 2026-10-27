import { useState } from "react";
import { Container } from "../ui";

const GOALS = [
  { id: "business", label: "Business Website", icon: "🏢", summary: "A credible site that turns visitors into calls, bookings or leads.", guides: ["How to Build a Website in 2026", "Best Small Business Web Hosting", "Best Website Builders 2026"], tools: ["Build My Website Stack", "Website Cost Calculator", "SEO Title Generator"], ai: ["Wix AI", "WordPress", "ChatGPT"] },
  { id: "blog", label: "Blog", icon: "✍️", summary: "A content site built to rank, grow an audience and monetise.", guides: ["How to Start a WordPress Blog", "Best WordPress Hosting", "Best Free WordPress Themes"], tools: ["SEO Content Brief Generator", "AI Content Optimizer", "Reading Time Calculator"], ai: ["WordPress", "Claude", "Grammarly"] },
  { id: "portfolio", label: "Portfolio", icon: "🎨", summary: "Show your work beautifully with minimal maintenance.", guides: ["Best Website Builders 2026", "Best AI Website Builders", "Free Website Hosting"], tools: ["Domain Name Generator", "Build My Website Stack", "Meta Description Generator"], ai: ["Framer", "Wix AI", "Canva"] },
  { id: "store", label: "Online Store", icon: "🛒", summary: "Sell products with reliable checkout, fast pages and good SEO.", guides: ["Best Ecommerce Platforms", "Best Email Marketing Tools", "Improve Website Speed"], tools: ["Website Cost Calculator", "Build My Website Stack", "UTM Generator"], ai: ["WordPress", "Wix AI", "Zapier"] },
  { id: "landing", label: "Landing Page", icon: "🎯", summary: "One page, one offer, one action.", guides: ["Best AI Website Builders", "Build a Website with Lovable", "Affiliate Marketing for Beginners"], tools: ["UTM Generator", "SEO Title Generator", "AI Website Auditor"], ai: ["Framer", "Lovable", "Hostinger Website Builder"] },
  { id: "webapp", label: "Web App", icon: "⚙️", summary: "Ship an app with AI coding tools, and keep it secure.", guides: ["Best Application Hosting", "Best AI Coding Assistants", "Vibe Coding Guide"], tools: ["Build My Website Stack", "AI Prompt Generator", "Robots.txt Generator"], ai: ["Claude Code", "Cursor", "Replit"] },
  { id: "aitool", label: "AI Tool", icon: "✨", summary: "Build an AI-powered product with models, agents and MCP.", guides: ["Best AI Coding Assistants", "Build a Website with Lovable", "What Is MCP?"], tools: ["AI Prompt Generator", "Build My Website Stack", "Website Cost Calculator"], ai: ["Claude", "Claude Code", "Lovable"] },
  { id: "membership", label: "Membership Website", icon: "🔐", summary: "Gated content, subscriptions and a community you own.", guides: ["How to Start a WordPress Blog", "Best WordPress Hosting", "Best Email Marketing Tools"], tools: ["Build My Website Stack", "Website Cost Calculator", "UTM Generator"], ai: ["WordPress", "Zapier", "Make"] },
];

export function BuildPicker() {
  const [active, setActive] = useState("business");
  const goal = GOALS.find((g) => g.id === active) || GOALS[0];
  return (
    <section className="border-y border-line bg-white py-20">
      <Container>
        <div className="mb-8 max-w-2xl">
          <p className="text-sm font-bold uppercase tracking-wider text-forest">Personalised path</p>
          <h2 className="font-serif mt-2 text-3xl md:text-4xl">What are you trying to build?</h2>
          <p className="mt-3 text-muted">Pick one. We'll point you to the right guides, free tools and AI tools.</p>
        </div>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {GOALS.map((g) => (
            <button key={g.id} type="button" onClick={() => setActive(g.id)} className={`flex min-h-14 items-center gap-2 rounded-2xl border-2 px-4 py-3 text-left font-semibold transition ${active === g.id ? "border-forest bg-forest text-white" : "border-line bg-white hover:border-forest"}`}>
              <span className="text-xl">{g.icon}</span>{g.label}
            </button>
          ))}
        </div>
        <div className="mt-6 rounded-3xl border border-line bg-white p-6 md:p-8">
          <p className="text-lg text-ink/80">{goal.summary}</p>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-forest">Read these guides</h3>
              <ul className="mt-3 space-y-3">{goal.guides.map((g) => <li key={g} className="rounded-xl border border-line p-3 font-semibold hover:border-forest">{g}</li>)}</ul>
            </div>
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-forest">Use these free tools</h3>
              <ul className="mt-3 space-y-3">{goal.tools.map((t) => <li key={t} className="rounded-xl border border-line p-3 font-semibold hover:border-forest">{t}</li>)}</ul>
            </div>
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-forest">Explore these AI tools</h3>
              <ul className="mt-3 space-y-3">{goal.ai.map((a) => <li key={a} className="rounded-xl border border-line p-3 font-semibold hover:border-forest">{a}</li>)}</ul>
            </div>
          </div>
          <a className="mt-8 inline-block rounded-full bg-forest px-6 py-3 text-white hover:bg-moss" href="/tools/website-stack-generator">Get a personalised stack →</a>
        </div>
      </Container>
    </section>
  );
}
