import { Container } from "../ui";
import { Link } from "react-router-dom";

export default function LegalPage({ title, children }) {
  return (
    <section className="py-16 md:py-20">
      <Container className="max-w-[820px]">
        <h1 className="font-serif text-[36px] leading-tight md:text-[44px]">{title}</h1>
        <div className="prose mt-6 max-w-none text-[16px] leading-8 text-ink/90">{children}</div>
        <div className="mt-10">
          <Link to="/" className="text-forest hover:underline">← Back home</Link>
        </div>
      </Container>
    </section>
  );
}
