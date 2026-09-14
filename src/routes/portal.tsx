import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

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
  component: PortalRedirect,
});

function PortalRedirect() {
  useEffect(() => {
    window.location.replace("https://reciclagem.basezeroum.com.br");
  }, []);

  return null;
}
