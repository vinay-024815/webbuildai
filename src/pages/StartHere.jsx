import { Link } from "react-router-dom";
import { Container } from "../ui";

export default function StartHere() {
  return (
    <article className="py-16 md:py-20">
      <Container>
        <h1 className="font-serif text-[36px] leading-tight md:text-[44px]">Start Here</h1>
        <p className="mt-4 max-w-2xl text-[17px] leading-8 text-muted">New to building websites? Start with these guides to go from idea to published site.</p>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          <Link to="/blog/how-to-build-a-website" className="rounded-[20px] border border-forest/10 p-6 hover:shadow-lg">How to Create a Website</Link>
          <Link to="/blog/best-website-builder" className="rounded-[20px] border border-forest/10 p-6 hover:shadow-lg">Best Website Builders</Link>
          <Link to="/blog/best-ai-website-builders-2026" className="rounded-[20px] border border-forest/10 p-6 hover:shadow-lg">Best AI Website Builders</Link>
        </div>
      </Container>
    </article>
  );
}
