import { useId } from "react";
import { useNewsletter } from "../../hooks/useNewsletter";

export function SidebarNewsletter() {
  const { email, setEmail, done, onSubmit } = useNewsletter();
  const fieldId = useId();

  return (
    <section aria-label="Newsletter" className="rounded-[18px] bg-forest px-5 py-6 text-cream">
      <h2 className="font-serif text-[20px] font-semibold leading-snug text-white">
        Get smarter about AI, websites and SEO.
      </h2>
      <p className="mt-2 text-[13px] leading-6 text-cream/70">
        One practical email with new guides, tools and workflows.
      </p>

      <div className="mt-4">
        {done ? (
          <p role="status" className="rounded-[12px] border border-emerald-400/30 bg-white/10 px-4 py-3 text-[13px] text-mint">
            Thanks for subscribing! You’re on the list.
          </p>
        ) : (
          <form onSubmit={onSubmit} className="space-y-2.5">
            <label htmlFor={fieldId} className="sr-only">
              Email address
            </label>
            <input
              id={fieldId}
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
              className="h-11 w-full rounded-[11px] border border-white/15 bg-white/95 px-3.5 text-[14px] text-ink outline-none placeholder:text-muted focus:border-mint focus:ring-2 focus:ring-mint/40"
            />
            <button
              type="submit"
              className="h-11 w-full rounded-full bg-black text-[14px] font-bold text-white transition"
            >
              Subscribe
            </button>
          </form>
        )}
        {/* <p className="mt-3 text-[11px] leading-5 text-cream/55">No spam. Unsubscribe anytime.</p> */}
      </div>
    </section>
  );
}
