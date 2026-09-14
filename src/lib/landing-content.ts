const portalVisaoGeral = { url: "/portal-visao-geral.png" };
const portalFaturamento = { url: "/portal-faturamento.png" };
const portalPrevisao = { url: "/portal-previsao.png" };
const portalChatWidget = { url: "/portal-chat-widget.png" };
const portalChatPagina = { url: "/portal-chat-pagina.png" };
const iconBI = { url: "/Group_41-2.png" };
const iconEng = { url: "/Group_44-2.png" };
const iconSci = { url: "/Group_1000011548-2.png" };

export const PILLARS = [
  {
    tag: "BI",
    title: "Business Intelligence",
    icon: iconBI.url,
    body: "Painéis e indicadores que mostram o que está acontecendo no seu negócio agora.",
  },
  {
    tag: "Engenharia",
    title: "Engenharia de Dados",
    icon: iconEng.url,
    body: "Seus dados organizados e conectados num só lugar, prontos para uso.",
  },
  {
    tag: "Ciência",
    title: "Ciência de Dados",
    icon: iconSci.url,
    body: "Modelos e análises que ajudam a prever o que vem a seguir.",
  },
];

export const ABOUT_PILLS = [
  "Mentor de dados e analytics",
  "Apaixonado por histórias",
  "Tech lead de dados",
  "Nascido em 2000",
  "Filho de empreendedora",
];

export const PORTAL_TABS = [
  {
    id: "visao-geral",
    label: "Visão Geral",
    url: portalVisaoGeral.url,
    alt: "Portal B01: visão geral da clínica com faturamento, lucro, ticket médio e funil",
  },
  {
    id: "faturamento",
    label: "Faturamento",
    url: portalFaturamento.url,
    alt: "Portal B01: faturamento por categoria, meta, ticket médio e resultado operacional",
  },
  {
    id: "previsao",
    label: "Previsão",
    url: portalPrevisao.url,
    alt: "Portal B01: previsão de receita, churn projetado, LTV estimado e retenção por cohort",
  },
  {
    id: "chat-painel",
    label: "Chat de IA",
    url: portalChatWidget.url,
    alt: "Portal B01: assistente de dados respondendo sobre faturamento direto no painel",
  },
  {
    id: "chat-completo",
    label: "Assistente de dados",
    url: portalChatPagina.url,
    alt: "Portal B01: tela completa do assistente de dados com resposta em linguagem natural",
  },
];
