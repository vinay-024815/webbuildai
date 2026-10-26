import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

const heroTools = [
  { title: "Create a Website", color: "#3b82f6", icon: "layout" },
  { title: "SEO Checklist", color: "#22c55e", icon: "check" },
  { title: "Website Builder", color: "#6366f1", icon: "blocks" },
  { title: "WordPress Themes", color: "#0ea5e9", icon: "wp" },
  { title: "Statistics", color: "#f59e0b", icon: "chart" },
  { title: "Web Design", color: "#ec4899", icon: "pen" },
  { title: "Social Media Marketing", color: "#8b5cf6", icon: "share" },
  { title: "Email Marketing", color: "#14b8a6", icon: "mail" },
  { title: "Email APIs", color: "#f97316", icon: "api" },
  { title: "WordPress Plugins", color: "#06b6d4", icon: "puzzle" },
  { title: "Video Editing", color: "#84cc16", icon: "video" },
  { title: "Cybersecurity", color: "#64748b", icon: "shield" },
];

const slugify = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

const templates = [
  (cat) => ({
    title: `Getting Started with ${cat}: A Complete Beginner Guide`,
    excerpt: `Everything you need to know to get started with ${cat.toLowerCase()} in 2026, from basics to first results.`,
    content: `<p>${cat} can feel overwhelming at first, but a structured approach makes it manageable. This guide walks through the fundamentals.</p><h2>Why ${cat} Matters</h2><p>Understanding the core concepts helps you make better decisions and avoid common mistakes.</p><h2>First Steps</h2><p>Start small, measure results, and iterate based on real data.</p><h2>Next Steps</h2><p>Once comfortable, explore advanced techniques to scale your efforts.</p>`,
    tags: [slugify(cat), "beginner", "guide", "2026"],
  }),
  (cat) => ({
    title: `Top 10 ${cat} Tips for Better Results`,
    excerpt: `Practical tips to improve your ${cat.toLowerCase()} outcomes without extra budget or tools.`,
    content: `<p>Small changes compound. These ten tips focus on high-impact, low-effort improvements.</p><h2>Tip 1: Focus on Fundamentals</h2><p>Master the basics before chasing advanced tactics.</p><h2>Tip 2: Measure Everything</h2><p>Use analytics to validate assumptions and guide decisions.</p><h2>Tip 3: Stay Consistent</h2><p>Consistency beats intensity over the long run.</p>`,
    tags: [slugify(cat), "tips", "best-practices", "productivity"],
  }),
  (cat) => ({
    title: `${cat} Mistakes to Avoid in 2026`,
    excerpt: `Common ${cat.toLowerCase()} mistakes that cost time and money, and how to avoid them.`,
    content: `<p>Many practitioners repeat the same errors. Here are the most common ones and how to sidestep them.</p><h2>Mistake 1: Skipping Research</h2><p>Always research before committing resources.</p><h2>Mistake 2: Ignoring Data</h2><p>Let metrics guide your strategy, not opinions.</p><h2>Mistake 3: Overcomplicating</h2><p>Simpler solutions often outperform complex ones.</p>`,
    tags: [slugify(cat), "mistakes", "pitfalls", "strategy"],
  }),
  (cat) => ({
    title: `Advanced ${cat} Strategies for Growth`,
    excerpt: `Level up your ${cat.toLowerCase()} with advanced strategies used by top performers.`,
    content: `<p>Once the basics are solid, these strategies help you scale and outperform competitors.</p><h2>Strategy 1: Automation</h2><p>Automate repetitive tasks to free up time for high-value work.</p><h2>Strategy 2: Personalization</h2><p>Tailor experiences to individual users for better engagement.</p><h2>Strategy 3: Continuous Testing</h2><p>Run experiments constantly to find what works.</p>`,
    tags: [slugify(cat), "advanced", "growth", "scaling"],
  }),
  (cat) => ({
    title: `${cat} Tools Worth Trying in 2026`,
    excerpt: `A curated list of ${cat.toLowerCase()} tools that deliver real value without breaking the bank.`,
    content: `<p>The right tools save time and improve outcomes. Here are our top picks.</p><h2>Tool 1: All-in-One Platform</h2><p>Great for teams that want everything in one place.</p><h2>Tool 2: Specialized Solution</h2><p>Best for focused, deep functionality.</p><h2>Tool 3: Open Source Option</h2><p>Free and flexible for technical teams.</p>`,
    tags: [slugify(cat), "tools", "software", "review"],
  }),
  (cat) => ({
    title: `${cat} Case Study: Real Results from a Real Project`,
    excerpt: `A real-world case study showing how ${cat.toLowerCase()} drove measurable improvements.`,
    content: `<p>Case studies reveal what actually works. This one breaks down the strategy, execution, and results.</p><h2>The Challenge</h2><p>The starting point and the problem that needed solving.</p><h2>The Approach</h2><p>The strategy and tactics applied.</p><h2>The Results</h2><p>Measurable outcomes and key takeaways.</p>`,
    tags: [slugify(cat), "case-study", "results", "analysis"],
  }),
];

const blogs = [];
let idx = 0;
for (const tool of heroTools) {
  const catSlug = slugify(tool.title);
  for (let i = 0; i < 6; i++) {
    const t = templates[i](tool.title);
    idx++;
    blogs.push({
      title: t.title,
      content: t.content,
      excerpt: t.excerpt,
      slug: `${slugify(t.title)}-${idx}`,
      category: catSlug,
      author: "RembdaAI editorial",
      tags: t.tags,
      faq: [
        { q: `Is ${tool.title} worth it?`, a: `Yes, when applied consistently with clear goals.` },
        { q: `How long until results?`, a: `Typically 2-4 weeks for initial traction.` },
      ],
      image: `/images/${slugify(t.title)}-${idx}.jpg`,
      publishedAt: new Date(Date.now() - idx * 86400000).toISOString().slice(0, 10),
      draft: false,
    });
  }
}

fs.writeFileSync(path.join(ROOT, "public", "blogs.json"), JSON.stringify(blogs, null, 2));
console.log(`Generated ${blogs.length} blogs across ${heroTools.length} categories.`);
