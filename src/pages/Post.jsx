import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Container } from "../ui";
import { loadBlogs, getPost, getLatest } from "../blogs";
import { site } from "../data";
import { Breadcrumbs } from "../components/article/Breadcrumbs";
import { PostHeader } from "../components/article/PostHeader";
import { TableOfContents, useArticleHeadings, useActiveHeading } from "../components/article/TableOfContents";
import { LatestArticlesList } from "../components/article/LatestArticlesList";
import { SidebarNewsletter } from "../components/article/SidebarNewsletter";
import { NewsletterCTA } from "../components/NewsletterCTA";

const BASE_TITLE = "WebBuild AI — Build, automate and grow your website with AI";

function PostSkeleton() {
  return (
    <div className="animate-pulse" aria-busy="true">
      <span className="sr-only">Loading article</span>
      <div className="h-3 w-64 max-w-full rounded bg-cream-deep" />
      <div className="mt-6 flex gap-2">
        <div className="h-6 w-20 rounded-full bg-cream-deep" />
        <div className="h-6 w-32 rounded-full bg-cream-deep" />
      </div>
      <div className="mt-6 h-9 w-full max-w-[780px] rounded bg-cream-deep" />
      <div className="mt-3 h-9 w-3/4 max-w-[560px] rounded bg-cream-deep" />
      <div className="mt-6 h-5 w-full max-w-[600px] rounded bg-cream-deep" />
      <div className="mt-3 h-5 w-2/3 max-w-[420px] rounded bg-cream-deep" />
      <div className="mt-8 flex items-center justify-between gap-4 border-y border-line/70 py-4">
        <div className="flex items-center gap-3">
          <div className="size-10 rounded-full bg-cream-deep" />
          <div className="space-y-2">
            <div className="h-3 w-32 rounded bg-cream-deep" />
            <div className="h-3 w-20 rounded bg-cream-deep" />
          </div>
        </div>
        <div className="h-3 w-24 rounded bg-cream-deep" />
      </div>
      <div className="mt-6 h-12 w-full rounded-[12px] bg-cream-deep" />
      <div className="mt-8 aspect-[16/9] w-full rounded-[20px] bg-cream-deep md:aspect-[2/1]" />
    </div>
  );
}

export default function Post() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [latest, setLatest] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let alive = true;
    setLoaded(false);
    setPost(null);
    loadBlogs().then((blogs) => {
      if (!alive) return;
      setPost(getPost(blogs, slug));
      setLatest(getLatest(blogs, { excludeSlug: slug, limit: 4 }));
      setLoaded(true);
    });
    return () => {
      alive = false;
    };
  }, [slug]);

  useEffect(() => {
    document.title = post
      ? `${post.seoTitle || post.title} — WebBuild AI`
      : loaded
        ? "Post not found — WebBuild AI"
        : BASE_TITLE;
    return () => {
      document.title = BASE_TITLE;
    };
  }, [post, loaded]);

  // One <h1> per page: drop any heading level 1 that sneaks in with the body HTML.
  const bodyHtml = useMemo(() => (post?.content || "").replace(/<\/?h1[^>]*>/gi, ""), [post]);

  // The TOC reads the rendered body itself, so it stays in sync with the HTML.
  const proseRef = useRef(null);
  const headings = useArticleHeadings(proseRef, post?.slug);
  const activeHeading = useActiveHeading(headings);

  if (!loaded) {
    return (
      <section className="bg-paper pb-20 pt-6 md:pt-8">
        <Container>
          <PostSkeleton />
        </Container>
      </section>
    );
  }

  if (!post) {
    return (
      <section className="bg-paper py-16 md:py-24">
        <Container>
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Blog", href: "/blog" }, { label: "Post" }]} />
          <h1 className="mt-6 font-serif text-[32px] font-semibold leading-tight tracking-[-0.02em] text-ink md:text-[42px]">
            Post not found
          </h1>
          <p className="mt-3 max-w-xl text-[16px] leading-7 text-muted">
            This article may have moved, or the link is broken. Everything we publish lives on the blog index.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/blog"
              className="rounded-full bg-forest px-5 py-2.5 text-[14px] font-semibold text-white transition hover:bg-moss"
            >
              Back to blog
            </Link>
            <Link
              to="/"
              className="rounded-full border border-line px-5 py-2.5 text-[14px] font-semibold text-forest transition hover:bg-mint"
            >
              Go home
            </Link>
          </div>
        </Container>
      </section>
    );
  }

  const author = post.author || site.author;

  return (
    <>
      <article className="bg-paper pb-16 pt-6 md:pt-8">
        <Container>
          <PostHeader post={post} author={author} />
        </Container>

        <Container className="mt-10 md:mt-12">
          <TableOfContents headings={headings} active={activeHeading} variant="mobile" />

          <div className="grid gap-y-12 lg:mt-0 lg:grid-cols-[minmax(0,740px)_300px] lg:items-start lg:justify-between lg:gap-x-12">
            <div className="mt-6 min-w-0 lg:mt-0">
              <div ref={proseRef} className="prose" dangerouslySetInnerHTML={{ __html: bodyHtml }} />

              {Array.isArray(post.faq) && post.faq.length > 0 && (
                <section className="mt-12 border-t border-line/70 pt-8" aria-labelledby="post-faq">
                  <h2 id="post-faq" className="font-serif text-[26px] leading-tight tracking-[-0.015em] text-ink md:text-[28px]">
                    Frequently asked questions
                  </h2>
                  <div className="mt-5 space-y-5">
                    {post.faq.map((item, i) => (
                      <div key={i}>
                        <h3 className="text-[17px] font-semibold text-ink">{item.q}</h3>
                        <p className="mt-1.5 text-[15.5px] leading-7 text-muted">{item.a}</p>
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </div>

            <aside className="sidebar-scroll hidden lg:sticky lg:top-[96px] lg:block lg:max-h-[calc(100vh-120px)] lg:overflow-y-auto lg:overscroll-contain lg:pr-1">
              <div className="space-y-6">
                <TableOfContents headings={headings} active={activeHeading} />
                <LatestArticlesList posts={latest} />
                <SidebarNewsletter />
              </div>
            </aside>
          </div>

          <div className="mt-12 space-y-6 lg:hidden">
            <LatestArticlesList posts={latest} />
            <SidebarNewsletter />
          </div>
        </Container>
      </article>

      {/* <NewsletterCTA id="newsletter" /> */}
    </>
  );
}
