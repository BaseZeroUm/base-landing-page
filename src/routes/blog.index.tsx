import { createFileRoute, Link } from "@tanstack/react-router";

import logoAsset from "@/assets/logo.png.asset.json";
import { BLOG_POSTS, formatDate } from "@/lib/blog-content";
import { BlogCover } from "@/components/BlogCover";
import { NewsletterForm } from "@/components/NewsletterForm";
import { EmailLink, InstagramLink } from "@/components/SocialLinks";


const TITLE = "Blog da B01, dados e decisão para PME";
const DESCRIPTION =
  "Textos curtos sobre pensamento analítico, business intelligence e como decidir com dados em vez de achismo.";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://basezeroum.com.br/blog" }],
  }),
  component: BlogIndex,
});

function BlogIndex() {
  const year = new Date().getFullYear();

  return (
    <div className="min-h-screen bg-paper font-sans">
      <header className="sticky top-0 z-50 bg-ink/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <Link to="/">
            <img src={logoAsset.url} alt="B01 BaseZeroUm" className="h-7 w-auto" />
          </Link>
          <nav className="flex items-center gap-4">
            <Link to="/blog" className="text-sm font-bold text-brand-blue">
              Blog
            </Link>
            <Link to="/portal" className="btn-outline-blue">
              Portal do cliente
            </Link>
          </nav>
        </div>
      </header>

      <section className="section-dark glow-bottom relative overflow-hidden">
        <div className="liquid-bg" aria-hidden="true">
          <span />
          <span />
        </div>
        <div className="section-pad relative z-[1] mx-auto max-w-6xl px-5">
          <span className="pill-mint">Blog</span>
          <h1 className="mt-8 text-4xl leading-tight sm:text-5xl">
            <span className="font-light text-on-dark-muted">Dados, contexto e </span>
            <span className="font-extrabold text-on-dark">boas perguntas.</span>
          </h1>
          <p className="mt-8 max-w-2xl text-lg text-on-dark-muted">{DESCRIPTION}</p>

          <div className="mt-14 grid gap-8 sm:grid-cols-2">
            {BLOG_POSTS.map((post) => (
              <Link
                key={post.slug}
                to="/blog/$slug"
                params={{ slug: post.slug }}
                className="card-dark group flex flex-col overflow-hidden p-5 transition hover:border-[var(--brand-blue)]"
              >
                <BlogCover
                  src={post.cover}
                  alt={post.coverAlt}
                  category={post.category}
                  author={post.author}
                />
                <div className="mt-6 flex flex-1 flex-col">
                  <span className="pill-mint self-start">{post.category}</span>
                  <h2 className="mt-4 text-xl font-extrabold text-on-dark">{post.title}</h2>
                  <p className="mt-3 line-clamp-2 text-on-dark-muted">{post.excerpt}</p>
                  <p className="mt-5 text-sm text-on-dark-label">{formatDate(post.date)}</p>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-16 max-w-2xl">
            <NewsletterForm source="blog-list" />
          </div>
        </div>
      </section>

      <footer className="section-dark border-t border-white/10">
        <div className="relative mx-auto flex max-w-6xl flex-col gap-8 px-5 py-12 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <Link to="/">
              <img src={logoAsset.url} alt="B01 BaseZeroUm" className="h-7 w-auto" />
            </Link>
            <p className="mt-3 text-sm text-on-dark-label">Decide Beyond</p>
          </div>
          <div className="flex flex-col gap-3 text-sm sm:items-end">
            <div className="flex flex-wrap items-center gap-4">
              <Link to="/blog" className="text-brand-blue hover:underline">
                Blog
              </Link>
              <span className="text-white/20">·</span>
              <EmailLink />
              <span className="text-white/20">·</span>
              <InstagramLink />
            </div>
            <p className="text-on-dark-label">© {year} B01 · BaseZeroUm</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

