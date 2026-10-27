import { useEffect, useState } from "react";

function prefersReducedMotion() {
  return typeof window !== "undefined" && Boolean(window.matchMedia?.("(prefers-reduced-motion: reduce)").matches);
}

/**
 * Reads the headings straight out of the rendered body. No ids are injected
 * into the HTML, so the TOC keeps DOM nodes (not anchors) as its targets.
 */
export function useArticleHeadings(containerRef, depsKey) {
  const [headings, setHeadings] = useState([]);

  useEffect(() => {
    const root = containerRef.current;
    if (!root) {
      setHeadings([]);
      return;
    }
    const found = Array.from(root.querySelectorAll("h2, h3"))
      .map((el) => ({ el, level: Number(el.tagName[1]), text: (el.textContent || "").trim() }))
      .filter((heading) => heading.text);
    setHeadings(found);
  }, [containerRef, depsKey]);

  return headings;
}

/**
 * Tracks the section the reader is in: the last heading that has passed the
 * top of the reading band. Measured inside requestAnimationFrame instead of an
 * IntersectionObserver so jumps (deep links, TOC clicks, back button) resolve
 * correctly even when no heading sits inside the band.
 */
export function useActiveHeading(headings) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const elements = headings.map((heading) => heading.el).filter(Boolean);
    if (!elements.length) {
      setActive(0);
      return;
    }

    let frame = 0;
    const THRESHOLD = 120;

    const measure = () => {
      frame = 0;
      let next = 0;
      for (let i = 0; i < elements.length; i += 1) {
        if (elements[i].getBoundingClientRect().top <= THRESHOLD) next = i;
        else break;
      }
      // The last heading can sit above the band once the page is scrolled out.
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 8) {
        next = elements.length - 1;
      }
      setActive(next);
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [headings]);

  return active;
}

function TocList({ headings, active }) {
  return (
    <ol className="space-y-1">
      {headings.map((heading, i) => {
        const isActive = i === active;
        return (
          <li key={`${heading.text}-${i}`}>
            <button
              type="button"
              onClick={() =>
                heading.el?.scrollIntoView({
                  behavior: prefersReducedMotion() ? "auto" : "smooth",
                  block: "start",
                })
              }
              aria-current={isActive ? "true" : undefined}
              className={`w-full border-l-2 py-1.5 text-left text-[13px] leading-snug transition ${
                heading.level === 3 ? "pl-6" : "pl-3"
              } ${
                isActive
                  ? "border-leaf font-semibold text-forest"
                  : "border-line/60 text-muted hover:border-leaf/50 hover:text-ink"
              }`}
            >
              {heading.text}
            </button>
          </li>
        );
      })}
    </ol>
  );
}

/**
 * `variant="desktop"` is the sidebar card, `variant="mobile"` the collapsible
 * block above the body. Both read the same headings/active props.
 */
export function TableOfContents({ headings, active = 0, variant = "desktop" }) {
  if (headings.length < 3) return null;

  if (variant === "mobile") {
    return (
      <details className="rounded-[16px] border border-line/80 bg-white px-4 py-3 lg:hidden">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-2 text-[11px] font-bold uppercase tracking-[0.12em] text-muted [&::-webkit-details-marker]:hidden">
          <span>On this page</span>
          <span className="text-forest">{headings.length}</span>
        </summary>
        <nav aria-label="On this page" className="mt-3">
          <TocList headings={headings} active={active} />
        </nav>
      </details>
    );
  }

  return (
    <nav aria-label="On this page" className="rounded-[16px] border border-line/80 bg-white p-5">
      <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-muted">On this page</p>
      <div className="mt-3">
        <TocList headings={headings} active={active} />
      </div>
    </nav>
  );
}
