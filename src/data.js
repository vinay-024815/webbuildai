import siteData from "./content/site.json";
import navData from "./content/nav.json";
import heroData from "./content/hero.json";
import blogsData from "./content/blogs.json";
import toolsData from "./content/tools.json";
import comparisonsData from "./content/comparisons.json";
import seoData from "./content/seo.json";
import footerData from "./content/footer.json";

export const site = siteData;

export const navLinks = navData.main;

export const heroTools = heroData.categories;

export const heroHeadline = heroData.headline;
export const heroSubheadline = heroData.subheadline;
export const heroPrimaryCTA = heroData.primaryCTA;
export const heroSecondaryCTA = heroData.secondaryCTA;

export const softwareColumns = [
  {
    title: "VPN and Privacy",
    links: ["NordVPN review", "ExpressVPN vs NordVPN", "Surfshark review", "Proton VPN", "Best VPNs 2026"],
  },
  {
    title: "Antivirus and Security",
    links: ["Bitdefender review", "Norton 360", "Malwarebytes", "Best antivirus", "Password managers"],
  },
  {
    title: "Creative Software",
    links: ["Adobe Creative Cloud", "Canva Pro review", "CapCut vs Premiere", "Figma vs Sketch", "Best photo editors"],
  },
];

export const articles = blogsData.map((blog) => ({
  id: blog.id,
  slug: blog.slug,
  tone: "light",
  kicker: blog.kicker,
  title: blog.title,
  excerpt: blog.excerpt,
  href: blog.href || `#blog/${blog.slug}`,
  image: blog.image,
  imageAlt: blog.imageAlt,
  category: blog.category,
  date: blog.date,
  readTime: blog.readTime,
  seoTitle: blog.seoTitle,
  seoDescription: blog.seoDescription,
}));

export const news = [
  "Claude adds a quieter rewrite mode for long pages",
  "New open-source SEO crawler ships a hosted demo",
  "WordPress core experiments AI-assisted alt text",
  "Google tightens AI overview citations again",
  "A lightweight static host adds one-click previews",
];

export const popular = [
  "Best AI writing tools for marketers",
  "Website cost calculator, explained",
  "How we test VPN leak protection",
  "Starter stack for a one-person studio",
  "Email APIs compared for transactional mail",
];

export const directory = Object.values(
  toolsData.reduce((acc, tool) => {
    if (!acc[tool.category]) {
      acc[tool.category] = { title: tool.category, items: [] };
    }
    acc[tool.category].items.push(tool.title);
    return acc;
  }, {})
);

export const usefulTools = [
  {
    group: "Privacy check",
    items: ["Who is tracking me?", "Cookie scanner", "Email breach lookup"],
  },
  {
    group: "SEO & content",
    items: ["AI website builder", "Headline tester", "Keyword generator"],
  },
  {
    group: "Planning",
    items: ["Website cost calculator", "Hosting picker", "Domain checklist"],
  },
  {
    group: "Writing helpers",
    items: ["GPT detector", "Text rewriter", "Meta description writer"],
  },
];

export const comparisons = comparisonsData.map((c) => ({
  id: c.id,
  title: c.title,
  category: c.category,
  criteria: c.criteria,
  href: c.href,
}));

export const tools = toolsData;

export const seoPages = seoData;

export const footerColumns = footerData.columns;
export const siteFooterCopyright = siteData.footerCopyright;
export const siteContactEmail = siteData.contactEmail;
