const pulgaCover = { url: "/blog-pulga.png" };
const felipePortrait = "/felipe-garcez-crop.jpg";

export interface BlogAuthor {
  name: string;
  avatar: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  category: string;
  date: string; // ISO
  excerpt: string;
  cover: string;
  coverAlt: string;
  author: BlogAuthor;
  body: string[];
}

export const FELIPE: BlogAuthor = {
  name: "Felipe Garcez",
  avatar: felipePortrait,
};

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "pensamento-analitico-a-pulga",
    title: "Pensamento analítico — a pulga",
    category: "Pensamento analítico",
    date: "2026-08-22",
    excerpt:
      "Um número sozinho quase nunca diz nada. Sem contexto e sem comparação, não existe insight.",
    cover: pulgaCover.url,
    coverAlt: "Ilustração em gravura antiga de uma pulga ampliada",
    author: FELIPE,
    body: [
      "Jerome Bruner, em The Process of Education (1960), separa dois jeitos de pensar: o pensamento intuitivo, que chega numa resposta plausível de cara, sem passar pelos passos que provariam se ela é válida, e o pensamento analítico, que é o trabalho de percorrer esses passos e checar se aquela resposta se sustenta. Complementando isso, pra mim pensamento analítico, na prática, é a capacidade de formular boas perguntas. Nos cursos a gente geralmente aprende a responder pergunta, quase nunca a formular uma.",
      "Em dados, um número sozinho quase nunca diz nada. Falta contexto, falta comparação. Pra saber se um número é bom ou ruim eu preciso das duas coisas.",
      "Um exemplo que uso bastante. Um analista júnior, todo feliz, reporta no dashboard: as vendas da peça X, lá na usinagem de precisão, fecharam o mês em 360 mil unidades, R$ 1,34 milhão, nunca vi um valor tão alto pra essa demanda. O CEO olha e responde: \u201ctá... e?\u201d",
      "Esse \u201ce?\u201d é o motivo de existir do analista. É ali que entra interpretar o dado e gerar o famoso insight. Dado sem contexto e sem comparação não é nada.",
      "Algumas perguntas ajudam a puxar contexto: essa peça é nova? o processo de produção mudou? quantas pessoas a gente tinha pra atender essa demanda? teve algum pedido fora da curva puxando a média pra cima?",
      "E pra comparar, a pergunta é sempre a mesma: comparando com o quê? Com o mês passado, o tal do MoM? Com o ano passado, YoY? Com o acumulado do ano, o YTD?",
      "Uma pegadinha que quase ninguém pensa: venda alta não quer dizer produto bom, às vezes é canibalização de outro produto seu. O que importa é a incrementalidade, quanto daquele resultado é novo de verdade e quanto é só troca de bolso.",
      "E tem o laranja com laranja, o same-store sales: só dá pra comparar o que é comparável. Loja nova com loja nova, mês cheio com mês cheio.",
      "Isso tudo é meio que o Sistema 1 e Sistema 2 do Kahneman. A pulga é o Sistema 1, a intuição que avisa antes de qualquer coisa. O pensamento analítico é o Sistema 2, o trabalho de ir atrás da resposta de verdade.",
      "Pensamento analítico é sentir a pulga antes de todo mundo, e mesmo assim ir atrás da prova.",
    ],
  },
];

export function getPost(slug: string) {
  return BLOG_POSTS.find((p) => p.slug === slug);
}

export function formatDate(iso: string) {
  return new Date(`${iso}T12:00:00Z`).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}
