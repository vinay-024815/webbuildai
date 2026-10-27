import { Link } from "react-router-dom";
import { Container } from "../ui";

export default function Domains() {
  return (
    <article className="py-16 md:py-20">
      <Container>
        <h1 className="font-serif text-[36px] leading-tight md:text-[44px]">Domains</h1>
        <p className="mt-4 max-w-2xl text-[17px] leading-8 text-muted">Everything you need to know about choosing and registering a domain.</p>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          <Link to="/blog/how-to-choose-a-domain-name" className="rounded-[20px] border border-forest/10 p-6 hover:shadow-lg">How to Choose a Domain Name</Link>
          <Link to="/blog/cheap-domain-registrars" className="rounded-[20px] border border-forest/10 p-6 hover:shadow-lg">Cheap Domain Registrars</Link>
          <Link to="/blog/domain-name-renewal-prices" className="rounded-[20px] border border-forest/10 p-6 hover:shadow-lg">Domain Renewal Prices</Link>
        </div>
      </Container>
    </article>
  );
}
