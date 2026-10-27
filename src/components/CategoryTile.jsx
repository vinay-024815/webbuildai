const iconBase =
  "h-12 w-12 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-2";

const categoryIcons = {
  // Website: Browser window with layout blocks
  website: (
    <svg viewBox="0 0 48 48" className={iconBase} fill="none">
      <rect x="4" y="6" width="40" height="36" rx="6" stroke="currentColor" strokeWidth="2.2" />
      <path d="M4 15h40" stroke="currentColor" strokeWidth="2.2" />
      <circle cx="10" cy="10.5" r="1.2" fill="#FFC400" />
      <circle cx="15" cy="10.5" r="1.2" fill="#FFC400" />
      <rect x="10" y="21" width="12" height="15" rx="2" fill="#E7F3F0" stroke="#08796E" strokeWidth="1.5" />
      <path d="M27 22h10M27 27h10M27 32h7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),

  // Hosting: Server stack
  hosting: (
    <svg viewBox="0 0 48 48" className={iconBase} fill="none">
      <rect x="7" y="5" width="34" height="11" rx="3" fill="#E7F3F0" stroke="currentColor" strokeWidth="2" />
      <rect x="7" y="19" width="34" height="11" rx="3" stroke="currentColor" strokeWidth="2" />
      <rect x="7" y="33" width="34" height="10" rx="3" stroke="currentColor" strokeWidth="2" />
      <circle cx="13" cy="10.5" r="2" fill="#FFC400" />
      <circle cx="13" cy="24.5" r="2" fill="#08796E" />
      <circle cx="13" cy="38" r="2" fill="#FFC400" />
      <path d="M20 11h14M20 25h14M20 38h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  ),

  // AI: Neural network
  ai: (
    <svg viewBox="0 0 48 48" className={iconBase} fill="none">
      <path d="M24 5v9M11 13l7 7M37 13l-7 7M18 20h12M18 20l-5 12M30 20l5 12M13 32l11 9 11-9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="24" cy="5" r="3" fill="#FFC400" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="11" cy="13" r="3" fill="#E7F3F0" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="37" cy="13" r="3" fill="#E7F3F0" stroke="currentColor" strokeWidth="1.5" />
      <rect x="15" y="17" width="18" height="7" rx="3.5" fill="#08796E" />
      <circle cx="13" cy="32" r="3" fill="#FFC400" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="35" cy="32" r="3" fill="#FFC400" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="24" cy="41" r="3" fill="#E7F3F0" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  ),

  // Themes: Paint swatches
  themes: (
    <svg viewBox="0 0 48 48" className={iconBase} fill="none">
      <rect x="5" y="7" width="24" height="31" rx="4" fill="#E7F3F0" stroke="currentColor" strokeWidth="2" />
      <rect x="19" y="13" width="24" height="28" rx="4" fill="white" stroke="currentColor" strokeWidth="2" />
      <path d="M24 20h14M24 25h10" stroke="#08796E" strokeWidth="2" strokeLinecap="round" />
      <rect x="24" y="30" width="14" height="6" rx="2" fill="#FFC400" />
      <circle cx="12" cy="15" r="2" fill="#08796E" />
      <circle cx="19" cy="15" r="2" fill="#FFC400" />
      <path d="M10 23h8M10 28h5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  ),

  // Blog: Open book with bookmark
  blog: (
    <svg viewBox="0 0 48 48" className={iconBase} fill="none">
      <path d="M24 13C19 8 12 8 5 10v28c7-2 14-2 19 3 5-5 12-5 19-3V10c-7-2-14-2-19 3Z" fill="#E7F3F0" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path d="M24 13v28M10 17c4-1 7-1 10 1M10 23c4-1 7-1 10 1M29 20h8M29 26h8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M33 5h7v13l-3.5-3-3.5 3V5Z" fill="#FFC400" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  ),

  // Domain: Globe with meridians
  domain: (
    <svg viewBox="0 0 48 48" className={iconBase} fill="none">
      <circle cx="24" cy="24" r="19" fill="#E7F3F0" stroke="currentColor" strokeWidth="2" />
      <ellipse cx="24" cy="24" rx="8" ry="19" stroke="currentColor" strokeWidth="1.8" />
      <path d="M6 24h36M10 14h28M10 34h28" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="36" cy="12" r="6" fill="#FFC400" stroke="currentColor" strokeWidth="1.5" />
      <path d="M33.5 12h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),

  // Ecommerce: Shopping bag
  ecommerce: (
    <svg viewBox="0 0 48 48" className={iconBase} fill="none">
      <path d="M8 17h32l-3 26H11L8 17Z" fill="#E7F3F0" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round" />
      <path d="M17 19v-6a7 7 0 0 1 14 0v6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      <path d="m24 25 2.1 4.3 4.7.7-3.4 3.3.8 4.7-4.2-2.2-4.2 2.2.8-4.7-3.4-3.3 4.7-.7L24 25Z" fill="#FFC400" stroke="#08796E" strokeWidth="1.2" strokeLinejoin="round" />
    </svg>
  ),

  // Email: Envelope
  email: (
    <svg viewBox="0 0 48 48" className={iconBase} fill="none">
      <rect x="4" y="10" width="40" height="29" rx="5" fill="#E7F3F0" stroke="currentColor" strokeWidth="2.2" />
      <path d="m6 14 18 14 18-14" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="m6 35 12-10M42 35 30 25" stroke="#08796E" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="37" cy="9" r="5" fill="#FFC400" stroke="currentColor" strokeWidth="1.5" />
      <path d="M35 9h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),

  // Fallback: Document with check
  default: (
    <svg viewBox="0 0 48 48" className={iconBase} fill="none">
      <path d="M10 5h19l10 10v28H10V5Z" fill="#E7F3F0" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round" />
      <path d="M29 5v11h10M16 23h16M16 29h11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <circle cx="33" cy="35" r="8" fill="#FFC400" stroke="currentColor" strokeWidth="1.5" />
      <path d="m29 35 3 3 5-6" stroke="#315C43" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
};

function getCategoryIcon(name = "") {
  const n = name.toLowerCase();

  if (n.includes("hosting") || n.includes("server")) return categoryIcons.hosting;
  if (n.includes("ai") || n.includes("artificial intelligence")) return categoryIcons.ai;
  if (n.includes("theme") || n.includes("design")) return categoryIcons.themes;
  if (n.includes("blog") || n.includes("content")) return categoryIcons.blog;
  if (n.includes("domain")) return categoryIcons.domain;
  if (n.includes("commerce") || n.includes("ecommerce") || n.includes("store") || n.includes("shop")) return categoryIcons.ecommerce;
  if (n.includes("email") || n.includes("newsletter")) return categoryIcons.email;
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
