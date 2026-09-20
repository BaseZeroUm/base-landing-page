import { createFileRoute, Link, notFound } from "@tanstack/react-router";

import logoAsset from "@/assets/logo.png.asset.json";
import { getPost, formatDate } from "@/lib/blog-content";
import { BlogCover } from "@/components/BlogCover";
import { NewsletterForm } from "@/components/NewsletterForm";
import { EmailLink, InstagramLink } from "@/components/SocialLinks";


export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = getPost(params.slug);
    if (!post) throw notFound();
    return { post };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Post não encontrado — Blog B01" }, { name: "robots", content: "noindex" }],
      };
    }
    const { post } = loaderData;
    const title = `${post.title} — Blog B01`;
    return {
      meta: [
        { title },
        { name: "description", content: post.excerpt },
        { property: "og:title", content: title },
        { property: "og:description", content: post.excerpt },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [{ rel: "canonical", href: `https://basezeroum.com.br/blog/${post.slug}` }],
    };
  },
  component: BlogPostPage,
});

function BlogPostPage() {
  const { post } = Route.useLoaderData();
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

      <article className="section-dark glow-bottom relative overflow-hidden">
        <div className="liquid-bg" aria-hidden="true">
          <span />
          <span />
        </div>
        <div className="section-pad relative z-[1] mx-auto max-w-4xl px-5">
          <BlogCover
            src={post.cover}
            alt={post.coverAlt}
            category={post.category}
            author={post.author}
            size="hero"
            priority
          />

          <div className="mx-auto mt-12 max-w-[720px]">
            <span className="pill-mint">{post.category}</span>
            <h1 className="mt-6 text-3xl font-extrabold leading-tight text-on-dark sm:text-4xl">
              {post.title}
            </h1>
            <p className="mt-4 text-sm text-on-dark-label">
              {post.author.name} · {formatDate(post.date)}
            </p>

            <div className="mt-10 space-y-6 text-lg leading-relaxed text-on-dark-muted">
              {post.body.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>

            <div className="mt-16 card-dark p-8 text-center">
              <p className="text-2xl font-extrabold text-on-dark">
                Quer achar a base do seu negócio?
              </p>
              <p className="mt-4 text-on-dark-muted">
                A gente organiza seus dados para você decidir com contexto e comparação.
              </p>
              <Link to="/" hash="formulario" className="btn-brand mt-8">
                Falar com a B01 ↗
              </Link>
            </div>

            <div className="mt-10">
              <NewsletterForm source={`post-${post.slug}`} />
            </div>

            <p className="mt-12 text-center">
              <Link to="/blog" className="text-brand-blue">
                ← Voltar para o blog
              </Link>
            </p>
          </div>
        </div>
      </article>

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

