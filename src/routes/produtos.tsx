import { useEffect, useRef, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";

import logoAsset from "@/assets/logo.png.asset.json";
import block65 from "@/assets/Group_65.png.asset.json";
import { BlogLink, EmailLink, InstagramLink } from "@/components/SocialLinks";

const TITLE = "Produtos Base01 Start, soluções de dados prontas para usar";
const DESCRIPTION =
  "A linha Base01 Start entrega soluções de gestão e dados já validadas, com escopo fechado, preço acessível e implantação rápida.";

export const Route = createFileRoute("/produtos")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/produtos" }],
  }),
  component: ProdutosPage,
});

type Product = {
  name: string;
  category: string;
  body: string;
  highlights: string[];
  price: string;
  href?: string;
  cta?: string;
  soon?: boolean;
};

const PRODUCTS: Product[] = [
  {
    name: "Reciclagem",
    category: "Gestão para empresas de reciclagem",
    body:
      "Sistema completo de gestão operacional e financeira para empresas de reciclagem, do ticket de pesagem ao resultado do mês.",
    highlights: [
      "Ticket de pesagem com cálculo automático",
      "Financeiro, fluxo de caixa e DRE automáticos",
      "Multiempresa, cada uma com seu login",
      "Dashboards de faturamento e estoque",
    ],
    price: "Sob consulta",
    href: "https://reciclagem.basezeroum.com.br",
    cta: "Conhecer o produto ↗",
  },
  {
    name: "Clínicas",
    category: "Gestão e indicadores para clínicas",
    body: "Agenda, faturamento e indicadores de retenção numa base única.",
    highlights: ["Faturamento por procedimento", "Retenção de pacientes", "Painel de metas"],
    price: "Em breve",
    soon: true,
  },
  {
    name: "Comércio",
    category: "Estoque e margem para o varejo",
    body: "Controle de estoque, giro e margem por produto, pronto para usar.",
    highlights: ["Giro de estoque", "Margem por produto", "Curva ABC"],
    price: "Em breve",
    soon: true,
  },
];

function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return { ref, visible };
}

function ProductCard({ product, index }: { product: Product; index: number }) {
  const { ref, visible } = useReveal<HTMLElement>();

  return (
    <article
      ref={ref}
      style={{ transitionDelay: `${index * 120}ms` }}
      className={`group relative flex flex-col rounded-[2rem] border border-white/15 bg-white/[0.04] p-8 backdrop-blur-sm transition-all duration-700 ease-out hover:-translate-y-1 hover:border-[var(--brand-blue)]/60 hover:shadow-[0_30px_70px_-40px_rgba(71,182,243,0.7)] ${
        visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
      }`}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[2rem] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "linear-gradient(140deg, rgba(71,182,243,0.14) 0%, rgba(138,205,186,0.08) 60%, transparent 100%)",
        }}
      />
      <div className="relative z-[1] flex flex-1 flex-col">
        <div className="flex items-center justify-between gap-3">
          <span className="pill-mint">{product.soon ? "Em breve" : "Disponível"}</span>
          <span className="text-xs font-bold uppercase tracking-[0.14em] text-on-dark-label">
            {product.price}
          </span>
        </div>

        <p className="mt-8 text-xs font-medium uppercase tracking-[0.18em] text-on-dark-label">
          Base01 Start
        </p>
        <h3 className="mt-2 text-2xl font-extrabold text-on-dark">{product.name}</h3>
        <p className="mt-2 text-sm font-bold text-brand-blue">{product.category}</p>
        <p className="mt-5 text-on-dark-muted">{product.body}</p>

        <ul className="mt-7 space-y-3 text-on-dark-muted">
          {product.highlights.map((h) => (
            <li key={h} className="flex gap-3">
              <span aria-hidden="true" className="font-bold text-brand-blue">
                ↗
              </span>
              <span>{h}</span>
            </li>
          ))}
        </ul>

        <div className="mt-9 pt-1">
          {product.soon ? (
            <span className="inline-flex cursor-default items-center gap-2 rounded-full border border-white/20 px-5 py-2.5 text-sm font-bold text-on-dark-label">
              Em desenvolvimento
            </span>
          ) : (
            <a
              href={product.href}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-brand"
            >
              {product.cta}
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

function ProdutosPage() {
  const year = new Date().getFullYear();

  return (
    <div className="min-h-screen bg-ink font-sans">
      <header className="sticky top-0 z-50 bg-ink/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <Link to="/">
            <img src={logoAsset.url} alt="B01 BaseZeroUm" className="h-8 w-auto" />
          </Link>
          <nav className="flex items-center gap-4">
            <Link to="/" className="text-sm font-bold text-on-dark-muted hover:text-brand-blue">
              Base 01
            </Link>
            <Link to="/blog" className="text-sm font-bold text-on-dark-muted hover:text-brand-blue">
              Blog
            </Link>
            <Link
              to="/creators"
              className="text-sm font-bold text-on-dark-muted hover:text-brand-blue"
            >
              Creators 01
            </Link>
            <Link to="/portal" className="btn-outline-blue">
              Portal do cliente
            </Link>
          </nav>
        </div>
      </header>

      {/* Header da seção */}
      <section className="section-dark glow-bottom">
        <div className="liquid-bg" aria-hidden="true">
          <span />
          <span />
        </div>
        <img
          src={block65.url}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute -right-10 top-20 w-56 opacity-10 sm:w-80"
        />
        <div className="section-pad relative z-[1] mx-auto max-w-6xl px-5">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-on-dark-label">
            B01 → linha de produtos Base01 Start
          </p>
          <h1 className="mt-6 max-w-3xl text-4xl leading-[1.08] tracking-tight sm:text-6xl">
            <span className="font-light text-on-dark-muted">Nem tudo precisa ser </span>
            <span className="font-extrabold text-on-dark">sob medida.</span>
          </h1>
          <p className="mt-10 max-w-2xl text-lg text-on-dark-muted sm:mt-12">
            A linha Base01 Start entrega soluções já validadas, com escopo fechado e
            implantação rápida. Mesmo padrão de qualidade da consultoria, sem o custo e o
            prazo de um projeto personalizado.
          </p>

          <div className="mt-14 grid gap-5 sm:mt-16 md:grid-cols-3">
            {[
              { k: "Escopo", v: "Fechado e padronizado" },
              { k: "Preço", v: "Fixo e mais acessível" },
              { k: "Entrega", v: "Imediata, já existe" },
            ].map((item) => (
              <div key={item.k} className="card-dark p-7">
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-brand-mint">
                  {item.k}
                </p>
                <p className="mt-3 text-lg font-bold text-on-dark">{item.v}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Grid de produtos */}
      <section className="section-dark glow-bottom border-t border-white/10">
        <div className="liquid-bg" aria-hidden="true">
          <span />
          <span />
        </div>
        <div className="section-padding relative z-[1] mx-auto max-w-6xl px-5">
          <span className="pill-mint">Produtos</span>
          <h2 className="mt-8 text-3xl leading-tight sm:text-5xl">
            <span className="font-light text-on-dark-muted">Soluções prontas para </span>
            <span className="font-extrabold text-on-dark">começar hoje.</span>
          </h2>

          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {PRODUCTS.map((p, i) => (
              <ProductCard key={p.name} product={p} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA de fechamento */}
      <section className="section-dark border-t border-white/10">
        <div className="section-pad relative z-[1] mx-auto max-w-6xl px-5">
          <div className="card-dark flex flex-col gap-8 p-10 sm:p-12 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-2xl font-extrabold text-on-dark sm:text-3xl">
                Precisa de algo sob medida?
              </h2>
              <p className="mt-4 max-w-xl text-on-dark-muted">
                Quando o problema é específico do seu negócio, a consultoria monta a base
                do zero com você.
              </p>
            </div>
            <Link to="/" hash="formulario" className="btn-brand shrink-0">
              Falar com a consultoria ↗
            </Link>
          </div>
        </div>
      </section>

      <footer className="section-dark border-t border-white/10">
        <div className="relative mx-auto flex max-w-6xl flex-col gap-8 px-5 py-12 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <img src={logoAsset.url} alt="B01 BaseZeroUm" className="h-7 w-auto" />
            <p className="mt-3 text-sm text-on-dark-label">Decide Beyond</p>
          </div>
          <div className="flex flex-col gap-3 text-sm sm:items-end">
            <div className="flex flex-wrap items-center gap-4">
              <BlogLink />
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
