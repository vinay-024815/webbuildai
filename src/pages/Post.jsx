import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Container } from "../ui";
import { loadBlogs, getPost } from "../blogs";

export default function Post() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    loadBlogs().then((blogs) => { setPost(getPost(blogs, slug)); setLoaded(true); });
  }, [slug]);
  if (!loaded) return <Container className="py-16"><p className="text-muted">Loading…</p></Container>;
  if (!post) return <Container className="py-16"><p className="text-muted">Post not found.</p><Link to="/blog" className="mt-4 inline-block text-forest hover:underline">← Back to blog</Link></Container>;
  return (
    <article className="py-16 md:py-20 bg-white ">
      <Container>
        <Link to="/blog" className="text-sm text-forest hover:underline">← Back to blog</Link>
        <h1 className="mt-4 font-serif text-[36px] leading-tight md:text-[44px]">{post.title}</h1>
        {post.excerpt && <p className="mt-4 max-w-2xl text-[17px] leading-8 text-muted">{post.excerpt}</p>}
        {post.image && (
          <div className="mt-8 aspect-[16/9] overflow-hidden rounded-[20px]">
            <img src={post.image} alt={post.title} className="h-full w-full object-cover" />
          </div>
        )}
        <div className="prose mt-10 max-w-none" dangerouslySetInnerHTML={{ __html: post.content || "" }} />
        {Array.isArray(post.faq) && post.faq.length > 0 && (
          <div className="mt-12">
            <h2 className="font-serif text-[28px]">FAQ</h2>
            <div className="mt-4 space-y-4">
              {post.faq.map((f, i) => (
                <div key={i}>
                  <h3 className="font-semibold">{f.q}</h3>
                  <p className="mt-1 text-muted">{f.a}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </Container>
    </article>
  );
}
