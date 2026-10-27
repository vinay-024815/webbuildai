export function AnnouncementBanner() {
  return (
    <div className="bg-forest text-white">
      <div className="mx-auto flex min-h-11 max-w-[1220px] flex-wrap items-center justify-center gap-x-4 gap-y-1 px-5 py-2 text-center text-sm">
        <p className="font-medium">New for 2026: The best AI website builders, compared side by side</p>
        <a className="rounded-md bg-forest px-3 py-1 text-sm font-semibold text-white hover:bg-mint hover:text-forest" href="/blog/best-ai-website-builders">Read the guide</a>
      </div>
    </div>
  );
}
