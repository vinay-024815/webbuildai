export function Icon({ name, className = "size-4" }) {
  const props = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.8",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className,
    "aria-hidden": true,
  };

  const paths = {
    layout: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M3 9h18M9 21V9" />
      </>
    ),
    check: (
      <>
        <path d="M9 11l2 2 4-4" />
        <rect x="3" y="3" width="18" height="18" rx="2" />
      </>
    ),
    blocks: (
      <>
        <rect x="3" y="3" width="8" height="8" rx="1.5" />
        <rect x="13" y="3" width="8" height="8" rx="1.5" />
        <rect x="3" y="13" width="8" height="8" rx="1.5" />
        <rect x="13" y="13" width="8" height="8" rx="1.5" />
      </>
    ),
    wp: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M8 16c1.2-3.5 2-7.5 2-9M16 16c-1-3-2.4-7-2.4-9M6.5 10.5h11" />
      </>
    ),
    chart: (
      <>
        <path d="M4 19V5M4 19h16" />
        <path d="M8 16v-5M12 16V8M16 16v-8" />
      </>
    ),
    pen: (
      <>
        <path d="M12 20h9" />
        <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4Z" />
      </>
    ),
    share: (
      <>
        <circle cx="18" cy="5" r="3" />
        <circle cx="6" cy="12" r="3" />
        <circle cx="18" cy="19" r="3" />
        <path d="M8.6 13.5 15.4 17.5M15.5 6.5 8.6 10.5" />
      </>
    ),
    mail: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m4 7 8 6 8-6" />
      </>
    ),
    api: (
      <>
        <path d="M8 9H5a2 2 0 0 0 0 6h3M16 9h3a2 2 0 0 1 0 6h-3" />
        <path d="M10 12h4" />
      </>
    ),
    puzzle: (
      <>
        <path d="M12 4h3a2 2 0 0 1 2 2v2h1a2 2 0 1 1 0 4h-1v2a2 2 0 0 1-2 2h-2v1a2 2 0 1 1-4 0v-1H7a2 2 0 0 1-2-2v-3H4a2 2 0 1 1 0-4h1V6a2 2 0 0 1 2-2h3V3a2 2 0 1 1 4 0z" />
      </>
    ),
    video: (
      <>
        <rect x="3" y="6" width="13" height="12" rx="2" />
        <path d="m16 10 5-3v10l-5-3Z" />
      </>
    ),
    shield: (
      <>
        <path d="M12 3 5 6v6c0 4.5 3.1 7.7 7 9 3.9-1.3 7-4.5 7-9V6Z" />
        <path d="m9 12 2 2 4-4" />
      </>
    ),
    arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
    search: (
      <>
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-3.5-3.5" />
      </>
    ),
  };

  return <svg {...props}>{paths[name]}</svg>;
}

export function LogoMark() {
  return (
    <span className="grid size-9 place-items-center rounded-full bg-forest text-white">
      <svg viewBox="0 0 24 24" className="size-[18px]" fill="currentColor" aria-hidden>
        <path d="M12 3c-2.8 3.4-7 6.2-7 10.4A7 7 0 0 0 12 21a7 7 0 0 0 7-7.6C19 9.2 14.8 6.4 12 3Z" />
      </svg>
    </span>
  );
}
