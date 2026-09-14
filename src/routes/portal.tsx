import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";

const logoAsset = { url: "/logo.png" };
import { EmailLink, InstagramLink } from "@/components/SocialLinks";


const TITLE = "Portal do cliente | B01 BaseZeroUm";
const DESCRIPTION =
  "Acesse o Portal B01 para ver seus painéis de faturamento, clientes e previsões num só lugar.";

export const Route = createFileRoute("/portal")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: PortalLogin,
});

function PortalLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim());
  const valid = emailOk && password.length >= 6;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!valid || loading) return;
    setLoading(true);
    setError(null);
    await new Promise((r) => setTimeout(r, 700));
    setLoading(false);
    setError(
      "Ainda não encontramos esse acesso. O portal está em implantação para os primeiros clientes.",
    );
  }

  return (
    <div className="section-dark glow-bottom flex min-h-screen flex-col">
      <header className="mx-auto w-full max-w-6xl px-5 py-6">
        <Link to="/" className="inline-flex items-center gap-3">
          <img src={logoAsset.url} alt="B01 BaseZeroUm" className="h-7 w-auto" />
        </Link>
      </header>

      <main className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center px-5 pb-20">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-on-dark-label">
          Portal do cliente
        </p>
        <h1 className="mt-3 text-3xl font-bold leading-tight text-white sm:text-4xl">
          <span className="font-light">Entre para ver</span> sua base.
        </h1>
        <p className="mt-3 text-sm text-on-dark-muted">
          Acesso exclusivo para clientes B01. Ainda não é cliente?{" "}
          <Link to="/" hash="formulario" className="text-brand-blue underline">
            Fale com a gente
          </Link>
          .
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <div>
            <label htmlFor="portal-email" className="mb-1.5 block text-sm text-on-dark-muted">
              E-mail
            </label>
            <input
              id="portal-email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-2xl border border-white/25 bg-white/5 px-4 py-3 text-white placeholder:text-white/35 outline-none focus:border-brand-blue"
              placeholder="voce@empresa.com.br"
            />
          </div>
          <div>
            <label htmlFor="portal-password" className="mb-1.5 block text-sm text-on-dark-muted">
              Senha
            </label>
            <input
              id="portal-password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-2xl border border-white/25 bg-white/5 px-4 py-3 text-white placeholder:text-white/35 outline-none focus:border-brand-blue"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <p className="rounded-2xl border border-white/20 bg-white/5 px-4 py-3 text-sm text-on-dark-muted">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={!valid || loading}
            className="btn-brand w-full justify-center disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? (
              <span className="inline-flex items-center gap-2">
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-ink/40 border-t-ink" />
                Entrando...
              </span>
            ) : (
              "Entrar no portal"
            )}
          </button>
          <p className="text-center text-xs text-on-dark-label">
            Portal em implantação. Dúvidas de acesso: felipe.garcez@basezeroum.com.br
          </p>
        </form>

        <div className="mt-10 flex flex-col items-center gap-3 text-sm text-on-dark-muted">
          <InstagramLink />
          <p>© {new Date().getFullYear()} B01 · BaseZeroUm</p>
        </div>
      </main>
    </div>
  );
}

