
const categoryIcons = {
  website: (
    <svg viewBox="0 0 48 48" className="h-12 w-12" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="m17 14-10 10 10 10M31 14l10 10-10 10M28 11l-8 26" />
    </svg>
  ),

  hosting: (
    <svg viewBox="0 0 48 48" className="h-12 w-12" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M24 5 28 17 40 21 28 25 24 38 20 25 8 21 20 17 24 5Z" fill="#FFC400" />
      <path d="m35 31 2 5 5 2-5 2-2 5-2-5-5-2 5-2 2-5Z" />
    </svg>
  ),

  ai: (
    <svg viewBox="0 0 48 48" className="h-12 w-12" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 37 17 8l8 19 7-12 8 22H8Z" />
      <circle cx="17" cy="8" r="3" fill="#FFC400" />
      <circle cx="32" cy="15" r="3" fill="#FFC400" />
    </svg>
  ),

  themes: (
    <svg viewBox="0 0 48 48" className="h-12 w-12" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M24 5 28 17 40 21 28 25 24 37 20 25 8 21 20 17 24 5Z" />
      <path d="m12 32 2 5 5 2-5 2-2 5-2-5-5-2 5-2 2-5Z" fill="#FFC400" />
    </svg>
  ),

  blog: (
    <svg viewBox="0 0 48 48" className="h-12 w-12" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 38V10M8 38h33" />
      <path d="m13 31 8-10 7 4 11-14" />
      <path d="M31 11h8v8" />
      <circle cx="21" cy="21" r="2.5" fill="#FFC400" />
    </svg>
  ),

  domain: (
    <svg viewBox="0 0 48 48" className="h-12 w-12" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="20" cy="20" r="12" />
      <path d="m29 29 11 11" />
      <path d="M15 20h10M20 15v10" />
      <circle cx="20" cy="20" r="5" fill="#FFC400" fillOpacity=".7" />
    </svg>
  ),

  ecommerce: (
    <svg viewBox="0 0 48 48" className="h-12 w-12" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 39 15 9h25L34 39H9Z" />
      <path d="M19 16h13l-3 16H16l3-16Z" fill="#FFC400" />
      <path d="M21 22h7M20 27h7" />
    </svg>
  ),

  email: (
    <svg viewBox="0 0 48 48" className="h-12 w-12" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="m24 5 4 12 12 4-12 4-4 12-4-12-12-4 12-4 4-12Z" />
      <path d="m36 30 2 5 5 2-5 2-2 5-2-5-5-2 5-2 2-5Z" fill="#FFC400" />
    </svg>
  ),

  default: (
    <svg viewBox="0 0 48 48" className="h-12 w-12" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 12h32v25H8zM15 19h18M15 25h12M15 31h8" />
      <circle cx="35" cy="33" r="7" fill="#FFC400" />
    </svg>
  ),
};

function getCategoryIcon(name = "") {
  const n = name.toLowerCase();

  if (n.includes("hosting")) return categoryIcons.hosting;
  if (n.includes("ai")) return categoryIcons.ai;
  if (n.includes("theme")) return categoryIcons.themes;
  if (n.includes("blog")) return categoryIcons.blog;
  if (n.includes("domain")) return categoryIcons.domain;
  if (n.includes("commerce") || n.includes("ecommerce")) return categoryIcons.ecommerce;
  if (n.includes("email")) return categoryIcons.email;
  if (n.includes("website") || n.includes("builder")) return categoryIcons.website;

  return categoryIcons.default;
}


export function CategoryTile({ cat }) {
  return (
    <a
      href={`/category/${cat.slug}`}
      className="group flex min-h-[180px] flex-col items-center border border-[#DCE8DD] justify-center gap-5 rounded-[20px] bg-white px-5 py-7 text-center shadow-[0_4px_15px_rgba(0,0,0,0.05)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_28px_rgba(0,0,0,0.14)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#08796E] focus-visible:ring-offset-2"
    >
      <span className="flex h-12 w-12 items-center  justify-center text-[#08796E] transition-transform duration-300 group-hover:scale-110">
        {getCategoryIcon(cat.name)}
      </span>

      <span className="text-[17px] font-semibold leading-snug tracking-[-0.02em] text-[#17191C]">
        {cat.name}
      </span>
    </a>
  );
}
