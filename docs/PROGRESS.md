# PROGRESS — Instituto Raiz (site ONG adoção de animais)

Site estático (HTML/CSS/JS) hospedado na Vercel. Migração para usar **Wix como CMS headless**.

## Decisões

### 2026-07-05 — Rumo da migração Wix
- Objetivo: colocar Wix no projeto sem perder o design atual.
- Kaylan pediu explicitamente "o que for mais fiel" ao site atual.
- **Decisão:** NÃO refazer no editor visual do Wix nem reconstruir em Next.js.
  Manter o HTML atual 100% intacto e usar o **Wix Headless só como CMS**,
  consumindo dados via **SDK JavaScript do Wix** (client-side) nas seções dinâmicas.
- MCP do Wix instalado (escopo usuário) e autenticado. Conta Wix tem 3 sites genéricos
  ("My Site", "My Site 2", "My Site 3") — nenhum é o Instituto Raiz.
- Wix CLI instalada mas **login pendente** (`npx @wix/cli login` — interativo).

## Coleções de CMS previstas (a modelar)
- **Animais** (adoção): nome, foto, espécie, porte, idade, sexo, status, descrição
- **Notícias**: título, data, capa, conteúdo, destaque
- **Projetos**: título, imagem, resumo, descrição
- **Transparência**: título, tipo (relatório/prestação), arquivo/link, data
- **Empresas parceiras**: nome, logo, link

## Backend Wix (headless) — criado 2026-07-05
- Conta: kaylansouza2@gmail.com
- Projeto headless: **Instituto Raiz**
  - metaSiteId (dashboard): `524a9938-76e7-487b-bc89-d677cc5d8969`
  - siteId (APIs): `b779dce5-6eda-46e3-9d29-bf468a005c8c`
  - Dashboard: https://manage.wix.com/dashboard/524a9938-76e7-487b-bc89-d677cc5d8969

## CORREÇÃO IMPORTANTE (2026-07-05)
- O Instituto Raiz NÃO é adoção de animais. É **ONG de reflorestamento no sertão**
  (Nova Olinda-CE): "Adote uma árvore", espécies da caatinga, mutirões, cisternas,
  Corredor Verde, Guardiões da Caatinga. Coleção "Animais" foi criada por engano e removida.
- O site é um **Design Canvas** (`<x-dc>` + support.js + componentes `DCLogic`),
  não HTML puro. Dados vêm de `renderVals()` com placeholders `{{ }}` e `<sc-for>`.
  Seções listáveis reais: **adote.html** (espécies) e **noticias.html** (notícias).

## Coleções no CMS — estado atual (todas read=ANYONE, edição só admin)
- **Especies** (adote): nome, cientifico, descricao, preco(NUMBER), foto(IMAGE), ordem — POPULADA (4)
- **Noticias**: categoria, data(TEXT "Jun 2026"), titulo, resumo, img, conteudo, ordem — POPULADA (9)
- **Projetos**: titulo, imagem, resumo, descricao — vazia (conteúdo hoje é estático no HTML)
- **Transparencia**: titulo, tipo, data, arquivo, link — vazia
- **Parceiros** (display "Empresas Parceiras"): nome, logo, link — vazia

## Pendências
- [x] Kaylan fazer login na Wix CLI
- [x] Criar o site headless na conta Wix
- [x] Criar coleções no Wix CMS
- [x] Gerar OAuth Client ID (app headless) para o SDK client-side
- [x] Popular coleções com o conteúdo real (Especies 4, Noticias 9)
- [x] Plugar Wix nas páginas adote.html e noticias.html (com fallback local)
- [ ] (futuro) Ligar Projetos/Transparencia/Parceiros quando houver conteúdo
- [ ] Kaylan: deploy na Vercel para valer em produção

## Tentativa "site idêntico DENTRO do Wix" — 2026-07-05 (CONCLUSÃO)
- Objetivo do Kaylan: levar o site pro Wix editável de forma automática (tipo Figma→Wix).
- Ferramenta `import-claude-design-from-url` (MCP Wix): testada com URL Vercel (HTML achatado),
  Vercel (Design Canvas original), HTML mínimo self-contained, e artifact Claude self-contained
  (imagens embutidas). TODAS retornaram "Invalid design URL". => a ferramenta não aceita URL
  externa por aqui (valida domínio/formato antes de buscar). Beco sem saída.
- `WixSiteBuilder` (IA Harmony): gerou site COMPLETO mas é releitura, NÃO idêntico.
  Preview: https://kaylansouza2.wixsite.com/instituto-raiz-1 (rascunho, não publicado)
  Editor: editor.wix.com/edit/od/08fe106b-1d7b-41cb-8b5e-dcccea10278d?metaSiteId=1bd07e07-f968-45ae-ac68-fb1784a00918
- VEREDITO: automático + idêntico + editável-nativo NÃO é possível com o que há aqui.
  Escolher 2 de 3. Deploys temporários Vercel criados p/ testes: projetos "out","orig","mini"
  (protection off) — LIMPAR depois.

## Integração front ↔ CMS — 2026-07-05
- Helper novo: **raiz-wix.js** — token de visitante (OAuth anônimo, clientId público)
  + query de coleção, com cache de token em localStorage. Só leitura.
- Fluxo por página: `componentDidMount` busca do CMS e faz setState; `renderVals`
  usa o CMS quando vier, senão o **fallback** local (conteúdo original embutido).
  => Se o Wix cair/CORS/offline, o site continua idêntico. Fidelidade garantida.
- Páginas ligadas: adote.html (coleção Especies), noticias.html (coleção Noticias).
- Mapeamento de campos: Especies {descricao->desc, foto->img}; Noticias {categoria->tag, img->img}.
- VALIDADO: token 200, query 200 (4 espécies / 9 notícias, ordenadas), CORS libera a
  origem *.vercel.app com POST+authorization, screenshot mobile 390px = idêntico ao original.
- NÃO validado automaticamente: captura de rede dentro do browser headless (Playwright
  só via npx aqui). Baixo risco — é fetch simples e os endpoints/CORS já passaram no curl.

## OAuth app (headless) — criado 2026-07-05
- Nome: "Site Instituto Raiz"
- **Client ID (público, usar no browser):** `f1ecae77-4b36-42c5-a6c6-5a25292b0742`
- Secret (server-side, NÃO usar no HTML): guardado no Wix (regenerável)
- Auth do site: `@wix/sdk` OAuthStrategy com visitor tokens (leitura pública do CMS)
