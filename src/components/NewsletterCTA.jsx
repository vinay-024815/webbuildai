import { useId } from "react";
import { Container } from "../ui";
import { useNewsletter } from "../hooks/useNewsletter";

export function NewsletterCTA({ id }) {
  const { email, setEmail, done, onSubmit } = useNewsletter();
  const fieldId = useId();

  return (
    <section id={id} className="px-4 pb-16 pt-6 sm:px-6">
      <Container>
        <div className="relative isolate overflow-hidden rounded-[28px] bg-[#023025] px-6 py-10 sm:px-10 sm:py-12 md:rounded-[30px] md:px-14 md:py-14">
          <div aria-hidden className="pointer-events-none absolute -right-12 -top-16 -z-10 size-64 rounded-full bg-[#396D5C] md:-right-8 md:-top-16 md:size-72" />
          <div className="relative grid items-center gap-7 md:grid-cols-[1.1fr_1fr] md:gap-8">
            <div>
              <h2 className="max-w-[19ch] font-serif text-[30px] font-semibold leading-[1.12] tracking-[-0.03em] text-white sm:text-[36px] md:text-[42px]">
                Get smarter about AI, websites and SEO.
              </h2>
              <p className="mt-4 max-w-lg text-[15px] leading-[1.65] text-white sm:text-[17px]">
                One practical email with new guides, tools and workflows. Unsubscribe anytime.
              </p>
            </div>
            <div className="relative z-10 w-full">
              {done ? (
                <div role="status" className="rounded-2xl border border-emerald-400/30 bg-white/90 px-5 py-4 text-[15px] font-medium text-[#0B6B61]">
                  Thanks for subscribing! You’re on the list.
                </div>
              ) : (
                <form onSubmit={onSubmit} className="flex w-full flex-col gap-3 sm:flex-row sm:items-center">
                  <label htmlFor={fieldId} className="sr-only">Email address</label>
                  <input id={fieldId} type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" autoComplete="email" className="h-14 min-w-0 flex-1 rounded-[15px] border border-[#e5e5e5] bg-white px-5 text-[15px] text-[#171717] outline-none placeholder:text-[#6B7280] focus:border-[#0B6B61] focus:ring-2 focus:ring-[#0B6B61]/20" />
                  <button type="submit" className="h-14 shrink-0 rounded-full bg-[#FFC400] px-6 text-[15px] font-semibold text-white transition hover:bg-[#07584F] focus:outline-none focus:ring-2 focus:ring-[#0B7065] focus:ring-offset-2 focus:ring-offset-[#F9B934]">
                    Subscribe
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
