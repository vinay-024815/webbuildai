import { useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { Container } from "./ui";
import { LogoMark } from "./icons";
import { navLinks, footerColumns } from "./data";
import Home from "./pages/Home";
import Categories from "./pages/Categories";
import Category from "./pages/Category";
import BlogIndex from "./pages/BlogIndex";
import Post from "./pages/Post";
import LegalPage from "./pages/LegalPage";
import NotFound from "./pages/NotFound";
import Reviews from "./pages/Reviews";
import DirectoryPage from "./pages/DirectoryPage";
import Tools from "./pages/Tools";
import ComparePage from "./pages/ComparePage";
import Build from "./pages/Build";
import Hosting from "./pages/Hosting";
import SEO from "./pages/SEO";
import AI from "./pages/AI";

function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-line/80 bg-white/90 backdrop-blur-md">
      <Container className="flex items-center justify-between py-4 md:py-5">
        <Link to="/" className="flex items-center gap-2.5">
          <LogoMark />
          <span className="font-serif text-[28px] font-semibold tracking-tight">WebBuild AI</span>
        </Link>
        <nav className="hidden items-center gap-8 text-[17px] !text-black/90  text-muted md:flex">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="transition hover:text-ink">{link.label}</a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <a href="#newsletter" className="rounded-full bg-forest px-5 py-2.5 text-[15px] font-bold text-white transition hover:bg-moss">NEWSLETTER</a>
          <button type="button" className="grid size-10 place-items-center rounded-full border border-line md:hidden" aria-label="Open menu" onClick={() => setOpen((v) => !v)}>
            <span className="block h-0.5 w-4 bg-ink" />
          </button>
        </div>
      </Container>
      {open && (
        <div className="border-t border-line bg-white md:hidden">
          <Container className="flex flex-col gap-3 py-4 text-base">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} onClick={() => setOpen(false)}>{link.label}</a>
            ))}
          </Container>
        </div>
      )}
    </header>
  );
}


function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const columns = footerColumns;

  function handleSubscribe(e) {
    e.preventDefault();
    if (!email.trim()) return;

    // UI confirmation only; connect an email service to save subscribers.
    setSubscribed(true);
  }

  return (
    <footer
      id="resources"
      className="border-t border-white/10 bg-[#0D1014] text-[#C4CBD4]"
    >
      {/* Main footer */}
      <div className="mx-auto max-w-[1440px] px-5 py-12 sm:px-8 sm:py-14 lg:px-10 lg:py-16">
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-[2.2fr_1fr_1fr_1fr_1fr_0.9fr] lg:gap-x-8 xl:gap-x-10">

          {/* Brand and newsletter */}
          <div className="col-span-2 sm:col-span-3 lg:col-span-1">
            <Link to="/" className="mb-5 inline-flex items-center gap-2.5 text-white">
              <LogoMark />
              <span className="font-serif text-2xl font-semibold tracking-tight">
                WebBuild AI
              </span>
            </Link>

            <h3 className="text-[17px] leading-7 text-white">
              Build, Automate & Grow on the Modern Web.
            </h3>

            <p className="mt-3 max-w-md text-[15px] leading-6 text-[#AAB3C0]">
              Practical guides, AI tools, website resources, SEO strategies,
              and automation workflows for building the modern web.
            </p>

            <div className="mt-7">
              <p className="mb-3 text-[15px] font-semibold text-white">
                Get smarter about AI, websites and SEO.
              </p>

              {subscribed ? (
                <p
                  role="status"
                  className="rounded-xl border border-emerald-400/30 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-300"
                >
                  Thanks for subscribing!
                </p>
              ) : (
                <form
                  onSubmit={handleSubscribe}
                  className="flex max-w-lg flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row"
                >
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    aria-label="Email address"
                    className="min-w-0 flex-1 rounded-xl border border-[#D7DCE2] bg-white px-4 py-3 text-[15px] text-[#18212B] outline-none transition placeholder:text-[#6B7280] focus:border-[#0D9488] focus:ring-2 focus:ring-[#0D9488]/30"
                  />

                  <button
                    type="submit"
                    className="shrink-0 rounded-full bg-[#0D8175] px-6 py-3 text-[15px] font-semibold text-white shadow-[0_4px_12px_rgba(13,129,117,0.18)] transition duration-200 hover:-translate-y-0.5 hover:bg-[#109789] hover:shadow-lg active:translate-y-0"
                  >
                    Subscribe
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Navigation columns */}
          {columns.map((column) => (
            <div key={column.title} className="min-w-0">
              <h3 className="mb-5 text-[14px] font-bold tracking-wide text-white">
                {column.title}
              </h3>

              <ul className="space-y-3">
                {column.links.map(([label, href]) => (
                  <li key={label}>
                    <Link
                      to={href}
                      className="text-[14px] leading-5 text-[#C4CBD4] transition-colors duration-200 hover:text-white"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom legal bar */}
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-[1440px] px-5 py-7 sm:px-8 lg:px-10">
          <div className="flex flex-col gap-4 text-[14px] leading-6 md:flex-row md:items-start md:justify-between md:gap-8">
            <p className="shrink-0 text-[#C4CBD4]">
              © {new Date().getFullYear()} WebBuild AI. All rights reserved.
            </p>

            <p className="max-w-3xl text-[#AAB3C0]">
              Some links may be affiliate links. We may earn a commission at
              no extra cost to you.{" "}
              <Link
                to="/affiliate-disclosure"
                className="text-[#D9E0E8] underline underline-offset-2 transition hover:text-white"
              >
                Read our affiliate disclosure.
              </Link>
            </p>
          </div>

          <p className="mt-5 text-[12px] leading-5 text-[#5B6D62]">
            Product names and logos are trademarks of their respective owners
            and are used only to identify the products we review. No endorsement
            is implied. Website content is provided for informational purposes.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <div id="top" className="min-h-screen bg-white text-ink antialiased">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/category/:slug" element={<Category />} />
            <Route path="/blog" element={<BlogIndex />} />
            <Route path="/blog/:slug" element={<Post />} />
            <Route path="/about" element={<LegalPage title="About"><p>WebBuild AI is an independent publication covering AI, websites, and the modern web stack.</p></LegalPage>} />
            <Route path="/editorial-policy" element={<LegalPage title="Editorial Policy"><p>Our editorial team independently reviews and tests every tool and product we cover. We are not paid for positive coverage.</p></LegalPage>} />
            <Route path="/review-methodology" element={<LegalPage title="Review Methodology"><p>We test products hands-on over multiple weeks, comparing real-world performance, pricing, and support before publishing a verdict.</p></LegalPage>} />
            <Route path="/affiliate-disclosure" element={<LegalPage title="Affiliate Disclosure"><p>Some links on this site are affiliate links. We may earn a commission at no extra cost to you. We only recommend tools we believe in.</p></LegalPage>} />
            <Route path="/corrections-policy" element={<LegalPage title="Corrections Policy"><p>If you spot an error, contact us and we will correct it promptly.</p></LegalPage>} />
            <Route path="/brand-assets" element={<LegalPage title="Logo & Brand Assets"><p>Brand assets are available for press use. Please do not modify the logo.</p></LegalPage>} />
            <Route path="/privacy-policy" element={<LegalPage title="Privacy Policy"><p>We respect your privacy. This site collects minimal data necessary to operate. We do not sell personal information.</p></LegalPage>} />
            <Route path="/terms" element={<LegalPage title="Terms of Use"><p>By using this site you agree to these terms. Content is provided for informational purposes.</p></LegalPage>} />
            <Route path="/cookie-policy" element={<LegalPage title="Cookie Policy"><p>This site uses minimal cookies for functionality and analytics.</p></LegalPage>} />
            <Route path="/contact" element={<LegalPage title="Contact"><p>Reach us at hello@webbuildai.com.</p></LegalPage>} />
            <Route path="/reviews" element={<Reviews />} />
            <Route path="/directory" element={<DirectoryPage />} />
            <Route path="/tools" element={<Tools />} />
            <Route path="/compare" element={<ComparePage />} />
            <Route path="/build" element={<Build />} />
            <Route path="/hosting" element={<Hosting />} />
            <Route path="/seo" element={<SEO />} />
            <Route path="/ai" element={<AI />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
