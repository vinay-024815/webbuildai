import { Link } from "react-router-dom";
import { Container } from "../ui";

export default function Grow() {
  return (
    <article className="py-16 md:py-20">
      <Container>
        <h1 className="font-serif text-[36px] leading-tight md:text-[44px]">Grow</h1>
        <p className="mt-4 max-w-2xl text-[17px] leading-8 text-muted">Grow your website with marketing, email, and monetization strategies.</p>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          <Link to="/blog/best-email-marketing-tools" className="rounded-[20px] border border-forest/10 p-6 hover:shadow-lg">Best Email Marketing Tools</Link>
          <Link to="/blog/affiliate-marketing-for-beginners" className="rounded-[20px] border border-forest/10 p-6 hover:shadow-lg">Affiliate Marketing for Beginners</Link>
          <Link to="/blog/halloween-sales-2026-hosting-vpn-software" className="rounded-[20px] border border-forest/10 p-6 hover:shadow-lg">Halloween Sales 2026</Link>
        </div>
      </Container>
    </article>
  );
}
