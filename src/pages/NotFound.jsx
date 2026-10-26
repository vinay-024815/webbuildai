import { Container } from "../ui";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <Container className="py-24 text-center">
      <h1 className="font-serif text-[44px]">404</h1>
      <p className="mt-3 text-muted">Page not found.</p>
      <Link to="/" className="mt-6 inline-block text-forest hover:underline">Go home</Link>
    </Container>
  );
}
