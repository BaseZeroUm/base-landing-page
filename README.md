# 🚀 Base Zero Um — Landing Page & Plataforma de Lead Gen (`b01-data-lead-gen`)

> **Repositório Oficial:** [BaseZeroUm/base-landing-page](https://github.com/BaseZeroUm/base-landing-page)  
> **Plataforma de Desenvolvimento:** [Lovable](https://lovable.dev)  
> **Stack Principal:** TanStack Start (SSR), React 19, TypeScript, Tailwind CSS v4, Supabase, Lovable Email

---

## 📌 Visão Geral do Projeto

A Landing Page e Hub de Lead Gen da **Base Zero Um** (`basezeroum.com.br`) atua como a vitrine institucional, portal de atração e porta de entrada comercial para todo o ecossistema da B01.

Suas principais atribuições são:
1. **Conversão de Leads Institucionais:** Formulário de captação de clientes B2B para serviços de Engenharia de Dados, BI e Consultoria.
2. **Captação Creators 01:** Formulário segmentado (`/creators`) para profissionais e aspirantes a criadores de conteúdo e dados.
3. **Inscrição em Newsletter:** Captação contínua de inscritos de marketing e dados.
4. **Hub de Produtos:** Redirecionamento e apresentação de produtos verticais SaaS (ex.: Sistema de Reciclagem em `reciclagem.basezeroum.com.br`).
5. **Blog & SEO:** Publicação técnica indexável via SSR e `sitemap.xml` dinâmico.

---

## 🗺️ Matriz Geral de Configuração: Links, Fases e Dados a Captar

Abaixo está o mapa completo de cada serviço, link do painel onde acessá-lo, as credenciais ou dados que devem ser extraídos e o local de destino no projeto:

| Fase | Serviço / Plataforma | Link Direto do Console / Painel | O Que Captar / Gerar Nesse Link | Onde Configurar no Projeto |
| :--- | :--- | :--- | :--- | :--- |
| **Fase 1** | **Lovable** | [lovable.dev](https://lovable.dev) | • Acesso ao editor do projeto<br>• `LOVABLE_API_KEY`<br>• Gerenciamento de Secrets de deploy | Painel Lovable → Project Settings → Secrets / Environment |
| **Fase 1** | **GitHub** | [github.com/BaseZeroUm/base-landing-page](https://github.com/BaseZeroUm/base-landing-page) | • Repositório remoto sincronizado<br>• Chaves SSH / Token Personal Access Token (PAT) | `git clone` e remotes do Git |
| **Fase 2** | **Supabase (API Settings)** | [supabase.com/dashboard/project/rdulcblhxvzgeglejrey/settings/api](https://supabase.com/dashboard/project/rdulcblhxvzgeglejrey/settings/api) | • `Project URL`<br>• `anon / publishable key`<br>• `service_role key` (secreta) | `.env` e Lovable Secrets:<br>`SUPABASE_URL`<br>`SUPABASE_PUBLISHABLE_KEY`<br>`SUPABASE_SERVICE_ROLE_KEY` |
| **Fase 2** | **Supabase (SQL Editor)** | [supabase.com/dashboard/project/rdulcblhxvzgeglejrey/sql](https://supabase.com/dashboard/project/rdulcblhxvzgeglejrey/sql) | • Execução de schemas DDL<br>• Políticas RLS (Row Level Security)<br>• Grants para roles `anon` e `service_role` | `supabase/migrations/` (migrações de `leads` e `newsletter_subscribers`) |
| **Fase 3** | **Lovable Email / DNS** | [lovable.dev/projects/.../settings/email](https://lovable.dev) | • Verificação do subdomínio `notify.basezeroum.com.br`<br>• Registros CNAME / TXT (DKIM e SPF)<br>• Chave `LOVABLE_API_KEY` | DNS da Cloudflare / Provedor e variável `LOVABLE_API_KEY` no ambiente do servidor |
| **Fase 3** | **Notificações Operacionais** | E-mail de destino da equipe | • E-mail administrativo comercial (`felipe.garcez@basezeroum.com.br`) | `src/lib/leads.server.ts` |
| **Fase 4** | **Gestão de DNS (Domínios)** | Cloudflare / Registro.br / Painel DNS | • Apontamento `A` ou `CNAME` para `basezeroum.com.br`<br>• `CNAME` para `reciclagem.basezeroum.com.br`<br>• Registros de envio de e-mail | Painel de DNS do domínio |
| **Fase 5** | **Google Search Console** | [search.google.com/search-console](https://search.google.com/search-console) | • Token de validação de propriedade do site (`google-site-verification`) | `src/routes/__root.tsx` (meta tag) |
| **Fase 5** | **WhatsApp Business** | WhatsApp Link Generator / Meta API | • Número no formato internacional (`5511911380734`) e link `https://wa.me/5511911380734` | `src/components/LeadForm.tsx`, `CreatorsLeadForm.tsx`, `index.tsx` |
| **Fase 6** | **Webhooks / Automações** | n8n / Make / Lovable Webhooks | • Webhook URLs para envio de leads para CRM (Hubspot, Pipedrive ou Planilha Google) | Supabase Database Webhooks ou `@lovable.dev/webhooks-js` |

---

## 🛠️ Detalhamento Passo a Passo por Fases

---

### 🔹 Fase 1: Conexão Lovable & Repositório GitHub

1. **Repositório GitHub:**
   - Link: [https://github.com/BaseZeroUm/base-landing-page](https://github.com/BaseZeroUm/base-landing-page)
   - O projeto deve ser clonado localmente apenas por desenvolvedores autorizados da organização `BaseZeroUm`.
2. **Sincronização com Lovable:**
   - Link: [https://lovable.dev](https://lovable.dev)
   - O projeto está conectado bi-direcionalmente com o Lovable. 
   - ⚠️ **ATENÇÃO CRÍTICA (Regra de Histórico Git):** Nunca reescreva o histórico do Git (`git push --force`, `rebase`, `amend` ou `squash` de commits já publicados). Fazer isso corrompe o rastreamento interno do Lovable e pode resultar em perda de histórico do projeto.

---

### 🔹 Fase 2: Banco de Dados & RLS (Supabase)

O backend de armazenamento de contatos e inscrições utiliza o **Supabase**.

* **Dashboard do Projeto:** `https://supabase.com/dashboard/project/rdulcblhxvzgeglejrey`

#### O que captar no painel:
1. **Project URL & Keys:**
   - Vá em **Project Settings** > **API**:
     - `Project URL`: `https://rdulcblhxvzgeglejrey.supabase.co`
     - `Project API Keys > anon / publishable`: Ex. `sb_publishable_8s18xRV-SGerCJ_hnWsSpA_35_Jiagf`
     - `Project API Keys > service_role (secret)`: Token com privilégios de administração (usado no lado do servidor pelo TanStack Start para inserir leads contornando RLS ou rodando com autoridade de sistema).
2. **Tabelas do Banco de Dados (SQL Editor):**
   - Acesse o **SQL Editor** e certifique-se de que as migrações foram aplicadas:

```sql
-- 1. Tabela de Leads
CREATE TABLE IF NOT EXISTS public.leads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  company TEXT,
  whatsapp TEXT NOT NULL,
  email TEXT NOT NULL,
  moment TEXT,
  source TEXT NOT NULL DEFAULT 'b01',
  profile TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- RLS para Leads
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
GRANT INSERT ON public.leads TO anon, authenticated;
GRANT ALL ON public.leads TO service_role;

CREATE POLICY "Qualquer pessoa pode enviar lead" 
ON public.leads FOR INSERT 
TO anon, authenticated 
WITH CHECK (true);

-- 2. Tabela de Newsletter
CREATE TABLE IF NOT EXISTS public.newsletter_subscribers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  source TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- RLS para Newsletter
ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;
GRANT ALL ON public.newsletter_subscribers TO service_role;
```

---

### 🔹 Fase 3: E-mails Transacionais e Notificações (Lovable Email)

Sempre que um novo lead preenche o formulário da landing page ou do Creators 01, o sistema dispara um e-mail com template React Email renderizado no servidor.

1. **Painel do Lovable (Configuração de Envio):**
   - Acesse as configurações de e-mail no painel do projeto Lovable.
   - **O que captar:** `LOVABLE_API_KEY`.
2. **Subdomínio Delegado para Envio:**
   - O projeto está configurado para disparar e-mails utilizando o subdomínio:
     `notify.basezeroum.com.br`
   - **O que captar no painel do Lovable:** Registros DNS de validação (CNAME/TXT para DKIM, SPF e MX).
   - **O que configurar no DNS:** Criar as entradas fornecidas pelo Lovable na zona de DNS do domínio `basezeroum.com.br`.
3. **Destinatário da Notificação Comercial:**
   - Definido no arquivo `src/lib/leads.server.ts`:
     `felipe.garcez@basezeroum.com.br`

---

### 🔹 Fase 4: Domínios, DNS e Arquitetura Multi-Subdomínio

O domínio principal e os subdomínios conectam o marketing aos sistemas operacionais.

1. **Domínio Principal (Landing Page):**
   - `basezeroum.com.br` (e `www.basezeroum.com.br`)
   - Aponta para a infraestrutura de publicação do Lovable / Cloudflare.
2. **Subdomínio de E-mail:**
   - `notify.basezeroum.com.br`
3. **Subdomínios SaaS do Ecossistema:**
   - `reciclagem.basezeroum.com.br`: Redireciona os usuários ou botões de contratação para o sistema Base 01 Reciclagem (`recycle-flow-base`).
   - Futuros: `adega.basezeroum.com.br`, `admin.basezeroum.com.br`.
4. **Sessão Unificada entre Subdomínios (SSO):**
   - Ao configurar cookies no cliente Supabase, usar o escopo `.basezeroum.com.br` (com ponto no início) para permitir que a autenticação persista entre os portais.

---

### 🔹 Fase 5: Indexação, SEO e Validação de Tráfego

1. **Google Search Console:**
   - URL: [https://search.google.com/search-console](https://search.google.com/search-console)
   - **O que captar:** Código de verificação HTML / Meta Tag.
   - **Configurado em:** `src/routes/__root.tsx`:
     ```tsx
     {
       name: "google-site-verification",
       content: "r_YRDoh6n0apz_s6VNGJ8cvqfi8cGO57fYzDjb8HZYQ",
     }
     ```
   - **Sitemap Dinâmico:** Enviar para o Search Console a URL:
     `https://basezeroum.com.br/sitemap.xml`
2. **Link do WhatsApp Comercial:**
   - Destino: `https://wa.me/5511911380734`
   - Formato do telefone: DDI + DDD + Número (`55 11 91138-0734`).

---

### 🔹 Fase 6: Automações e Webhooks de Leads (Opcional / Futuro)

Para encaminhar os leads gerados diretamente para planilhas (Google Sheets), CRM ou Slack/Discord:
1. **Supabase Database Webhooks:**
   - Vá em **Database** > **Webhooks** no painel do Supabase.
   - Dispare requisições `POST` na tabela `leads` no evento `INSERT` apontando para seu fluxo no **n8n**, **Make** ou **Zapier**.
2. **Payload recebido pelo Webhook:**
   - `id`, `name`, `company`, `whatsapp`, `email`, `moment`, `source`, `profile`, `created_at`.

---

## 💻 Ambiente de Desenvolvimento Local

### 1. Pré-requisitos
- **Node.js**: Versão 20 ou superior (recomendado via `nvm`)
- **Gerenciador de Pacotes**: `npm` ou `bun`

### 2. Clonando o Repositório
```bash
git clone https://github.com/BaseZeroUm/base-landing-page.git
cd base-landing-page
npm install
```

### 3. Variáveis de Ambiente (`.env`)

Crie um arquivo `.env` na raiz do projeto com o seguinte conteúdo:

```env
# ============================================================
# Supabase Configuration
# ============================================================
SUPABASE_PROJECT_ID="rdulcblhxvzgeglejrey"
SUPABASE_URL="https://rdulcblhxvzgeglejrey.supabase.co"
SUPABASE_PUBLISHABLE_KEY="sb_publishable_8s18xRV-SGerCJ_hnWsSpA_35_Jiagf"

# Chave secreta de serviço (apenas no ambiente seguro do servidor/Lovable)
SUPABASE_SERVICE_ROLE_KEY="sb_secret_SUA_CHAVE_SERVICE_ROLE_AQUI"

# Variáveis expostas no bundle do cliente Vite
VITE_SUPABASE_PROJECT_ID="rdulcblhxvzgeglejrey"
VITE_SUPABASE_URL="https://rdulcblhxvzgeglejrey.supabase.co"
VITE_SUPABASE_PUBLISHABLE_KEY="sb_publishable_8s18xRV-SGerCJ_hnWsSpA_35_Jiagf"

# ============================================================
# Lovable Transational Email
# ============================================================
LOVABLE_API_KEY="sua_chave_lovable_api_key_aqui"
```

### 4. Scripts Disponíveis

| Comando | Descrição |
| :--- | :--- |
| `npm run dev` | Inicia o servidor de desenvolvimento TanStack Start / Vite |
| `npm run build` | Compila o projeto para produção com renderização SSR |
| `npm run preview` | Executa localmente o bundle compilado para validação |
| `npm run lint` | Executa a verificação do ESLint |
| `npm run format` | Formata os arquivos com Prettier |

---

## 📂 Estrutura do Código-Fonte

```text
b01-data-lead-gen/
├── src/
│   ├── components/            # Componentes reutilizáveis de interface
│   │   ├── LeadForm.tsx       # Formulário de captação de leads institucional
│   │   ├── CreatorsLeadForm.tsx # Formulário segmentado de Creators
│   │   ├── NewsletterForm.tsx # Inscrição rápida na newsletter
│   │   ├── SocialLinks.tsx    # Links sociais (Instagram, Blog, E-mail)
│   │   └── ToolLogos.tsx      # Logos das tecnologias (Power BI, Python, SQL...)
│   ├── lib/
│   │   ├── email-templates/   # Templates React Email e serviço de envio
│   │   ├── leads.functions.ts # Server Functions (RPC) validadas com Zod
│   │   ├── leads.server.ts    # Lógica de inserção no banco e disparo de e-mail
│   │   ├── newsletter.server.ts # Cadastro de assinantes na newsletter
│   │   └── landing-content.ts # Textos, pilares e dados da landing page
│   ├── routes/                # Roteamento baseado em arquivos (TanStack Router)
│   │   ├── __root.tsx         # Layout raiz, SEO global, fontes e tracking
│   │   ├── index.tsx          # Landing Page principal (basezeroum.com.br)
│   │   ├── produtos.tsx       # Vitrine de produtos (Reciclagem, Clínicas...)
│   │   ├── creators.tsx       # Página e captação do programa Creators 01
│   │   ├── blog.index.tsx     # Listagem de artigos do Blog
│   │   ├── blog.$slug.tsx     # Visualização de artigo individual
│   │   └── sitemap[.]xml.ts   # Geração dinâmica do sitemap para o Google
│   └── integrations/
│       └── supabase/          # Clientes Supabase (client.ts e client.server.ts)
├── supabase/
│   └── migrations/            # Histórico de migrações SQL aplicadas no Supabase
├── implementation_plan.md     # Plano de expansão e arquitetura multi-segmento
└── AGENTS.md                  # Regras de convivência Lovable / Git
```

---

## 🛡️ Contribuição e Políticas de Branch

- **Branches:** Todo trabalho deve ser feito em branches de desenvolvimento antes de subir para a branch sincronizada com o Lovable.
- **Sincronia com o Lovable:** Commits na branch principal disparam sincronização automática com o editor visual da plataforma. Mantenha os testes e tipos do TypeScript válidos antes de efetuar o push.
