 import { news, popular } from "../data";

function List({ title, items }) {
  return (
    <nav
      aria-label={title}
      className="group/list w-full min-w-0 overflow-hidden rounded-[20px] border-[3px] border-ink bg-white shadow-[0_4px_0_rgba(23,23,23,0.04)] transition-all duration-300 hover:shadow-[0_8px_24px_rgba(49,92,67,0.09)]"
    >
      {/* Header */}
      <div className="relative bg-ink px-4 py-4 text-center sm:px-5 sm:py-[18px]">
        <p className="text-[13px] font-extrabold uppercase tracking-[0.15em] text-[#FFC857] sm:text-[15px]">
          {title}
        </p>

        <span
          aria-hidden="true"
          className="mx-auto mt-2.5 block h-[3px] w-10 rounded-full bg-[#FFC857] transition-all duration-300 group-hover/list:w-14"
        />
      </div>

      {/* Items */}
      <ol>
        {items.slice(0, 5).map((item, i) => (
          <li
            key={item}
            className={`group/item border-b border-dotted border-line last:border-0 ${
              i === 0 ? "bg-ink" : "bg-white"
            }`}
          >
            <a
              href={i === 0 ? "/blog/halloween-sales-2026-hosting-vpn-software" : i === 1 ? "/blog/is-your-website-invisible-to-chatgpt" : i === 2 ? "/blog/nordvpn-review" : i === 3 ? "/blog/canva-create-2026-updates" : "/blog/hostinger-review"}
              className={`relative flex min-h-[68px] items-center gap-3 px-4 py-3 sm:gap-4 sm:px-5 sm:py-3.5 ${
                i === 0
                  ? "text-white"
                  : "text-ink hover:bg-[#FBF8F1]"
              } transition-colors duration-200`}
            >
              {/* Rank */}
              <span
                className={`w-8 shrink-0 text-center font-serif text-[30px] leading-none sm:text-[34px] ${
                  i === 0
                    ? "font-semibold text-[#FFC857]"
                    : "text-muted group-hover/item:text-[#7950A1]"
                } transition-colors duration-200`}
              >
                {i + 1}
              </span>

              {/* Title */}
              <span
                className={`min-w-0 flex-1 text-[14px] font-bold leading-snug sm:text-[15px] lg:text-[16px] ${
                  i === 0
                    ? "text-white group-hover/item:text-[#FFC857]"
                    : "text-ink group-hover/item:text-[#315C43]"
                } transition-colors duration-200`}
              >
                {item}
              </span>

              {/* Hover arrow */}
              {/* <span
                aria-hidden="true"
                className={`shrink-0 translate-x-1 text-lg opacity-0 transition-all duration-200 group-hover/item:translate-x-0 group-hover/item:opacity-100 ${
                  i === 0 ? "text-[#FFC857]" : "text-[#7950A1]"
                }`}
              >
                →
              </span> */}

              {i === 0 && (
                <span
                  aria-hidden="true"
                  className="absolute inset-y-0 left-0 w-[3px] bg-[#FFC857]"
                />
              )}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function NewsAndReviews() {
  return (
    <section className="mx-auto w-full max-w-[1220px] px-5 pb-16 md:px-8">
  <div className="grid items-start gap-8 md:grid-cols-2">
        <List title="Latest News & Updates" items={["Halloween Sales 2026: How to Spot a Spooky-Good Software Deal (and Avoid the Tricks)", "Your Website Might Be Invisible to ChatGPT. Here's How to Check (and Fix It) in 20 Minutes", "NordVPN Review 2026: Is It Worth Paying For Before the Black Friday Rush?", "Canva Create 2026: 5 Updates Small Businesses Should Actually Use", "Hostinger Review 2026: We Run This Very Website on It: Here's the Honest Truth"]} />
        <List title="Popular Reviews" items={["Shopify Review 2026: What the Latest Updates Really Mean for Small Stores", "Wix Review 2026: Is Wix Harmony Good Enough to Skip Hiring a Developer?", "Best AI Coding Assistants in 2026: Editors, Agents and App Builders", "Best AI Image Generators in 2026: For Ads, Blogs and Social", "Best AI Website Builders in 2026: From Prompt to Published Site"]} />
      </div>
    </section>
  );
}
