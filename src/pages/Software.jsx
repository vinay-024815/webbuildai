import { Link } from "react-router-dom";
import { Container } from "../ui";

export default function SoftwarePage() {
  return (
    <article className="py-16 md:py-20">
      <Container>
        <h1 className="font-serif text-[36px] leading-tight md:text-[44px]">Software Reviews</h1>
        <p className="mt-4 max-w-2xl text-[17px] leading-8 text-muted">VPNs, antivirus, and creative tools reviewed with no fake scores.</p>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          <Link to="/blog/best-vpn" className="rounded-[20px] border border-forest/10 p-6 hover:shadow-lg">Best VPN Services</Link>
          <Link to="/blog/best-antivirus-software" className="rounded-[20px] border border-forest/10 p-6 hover:shadow-lg">Best Antivirus Software</Link>
          <Link to="/blog/best-ai-image-generators" className="rounded-[20px] border border-forest/10 p-6 hover:shadow-lg">Best AI Image Generators</Link>
        </div>
      </Container>
    </article>
  );
}
