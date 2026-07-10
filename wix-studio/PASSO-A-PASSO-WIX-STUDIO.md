# Instituto Raiz → Wix Studio — Passo a passo

Objetivo: recriar a home **idêntica** no Wix Studio, com o cliente editando textos/imagens pelo painel visual. O **layout** (seções, grids, containers) você monta no editor; o **estilo** vem do arquivo `instituto-raiz.css` (colar em **Código `</>` → CSS**).

---

## 0. Preparação (uma vez)

1. **Fontes:** Studio → Configurações do site → Fontes → adicionar do Google: **Anton**, **Archivo**, **Instrument Serif**.
2. **Paleta:** cadastre as cores como estilos do site:
   - Creme `#F4EEDF` · Creme quente `#FBF7EA` · Verde tinta `#1B2E1C` · Verde rodapé `#14230F`
   - Laranja `#D93A21` · Amarelo `#F0D45C` · Verdes de apoio `#3C4A36 / #6B7A5E / #A9BCA0 / #DCE5D3`
3. **CSS:** abra **Código `</>`** e cole todo o `instituto-raiz.css`.
4. **Como aplicar classe:** clique num elemento → painel **Inspetor** → campo **Classe CSS** → digite a classe (ex.: `raiz-btn raiz-btn--accent`).

> Regra geral de layout: quase toda seção é uma **Section** (largura total) com um **Container** interno centralizado (máx. ~1180–1360px) e dentro **Stacks** (vertical/horizontal) ou **Grids**.

---

## 1. NAV (cabeçalho fixo)
- Elemento **Header** (fixo no topo, fundo `#F4EEDF`, borda inferior 2px `#1B2E1C`).
- **Stack horizontal**, space-between:
  - **Logo**: Container 34×34, fundo laranja, cantos `50% 50% 50% 4px`, letra "R" (Anton, creme). Classe opcional para o "R".
  - **Menu**: itens de texto (Projetos, Voluntariado, Adote, Sobre, Notícias, Empresas, Transparência, Contato) — 13px, caixa-alta, hover laranja.
  - **Botão "Doar agora"** → classe `raiz-btn raiz-btn--accent`.
- Mobile: use o menu hambúrguer nativo do Studio.

## 2. HERO
- **Section** com classe `raiz-hero` (fundo de bolinhas já vem do CSS).
- **Stack vertical**:
  - Linha de rótulo: `✺  ONG de educação ambiental  ·  Sertão do Cariri — Ceará` (13–15px, caixa-alta).
  - **Título** (classe `raiz-h1`, tamanho ~clamp 60→168px): 3 linhas —
    "Plantar [imagem-pílula] futuro" / "[imagem-pílula] no *sertão* ✺" / "é coletivo [imagem-pílula]".
    - As **pílulas de imagem** = elemento **Imagem** com classe `raiz-pill-img` (largura ~200px, altura ~90px). São editáveis pelo cliente.
  - Bloco final: parágrafo (máx 560px) + 2 botões (`raiz-btn raiz-btn--dark` e `raiz-btn raiz-btn--ghost`).
- Estrelas flutuantes `✺`: elementos de texto soltos com classe `raiz-star raiz-star--float` (decorativo, opcional).

## 3. MARQUEE (faixa laranja rolando)
- ⚠️ **Não sai de CSS puro no editor.** Duas opções:
  - **A (recomendada):** elemento **Embed → HTML** e cole um `<div class="raiz-marquee"><div class="raiz-marquee__track">…</div></div>` (o CSS já anima).
  - **B:** uma faixa estática (sem rolar) com os dizeres, se não quiser embed.
- Texto: Doe agora ✺ Seja voluntário ✺ Plante uma árvore ✺ Adote uma escola ✺ Vem pro mutirão.

## 4. IMPACTO (4 números)
- **Section** (fundo creme). Container centralizado.
- Topo: **Grid 1fr / 1.4fr** — título `raiz-h2` ("Impacto que dá pra **contar**") + frase `raiz-serif`.
- **Grid 4 colunas** (vira 1 no mobile) com 4 **cards** classe `raiz-stat` (alternar `--yellow` / `--cream`):
  - número (classe `raiz-stat__num`) + rótulo bold + descrição pequena.
  - Valores: **12.400** árvores · **38** escolas · **2.150** crianças · **3,8 mi** litros.
- ⚠️ Contagem animada (0→número): usar **interação do Studio** ou deixar estático.

## 5. PROJETOS (3 cards)
- **Section**. Título `raiz-h2` "Projetos".
- **Grid 3 colunas**, cada card = classe `raiz-card raiz-card--lift`:
  - Imagem topo (`raiz-card__img`, altura 220px) + tags (`raiz-tag`, uma `raiz-tag--yellow`) + `raiz-h3` + parágrafo + link "Apoiar este projeto →".
  - Cards: **Viveiro nas Escolas**, **Água de Chuva**, **Guardiões da Caatinga**.

## 6. O QUE FAZEMOS (8 cards)
- **Section** classe `raiz-sec--warm`. Título `raiz-h2` "O que **fazemos**" + frase serifada.
- **Grid 4 colunas** (2 linhas), cada item = link com imagem (130px) + título Anton + seta "→". Hover fundo amarelo (`raiz-card` serve; ajuste hover se quiser).
- 8 títulos: Reflorestar a caatinga · Educar pela terra · Colher água de chuva · Fortalecer a agricultura familiar · Guardar sementes crioulas · Gerar renda verde · Proteger a biodiversidade · Mobilizar voluntários.

## 7. MANIFESTO (fundo escuro + imagem)
- **Section** classe `raiz-sec--dark`, com **imagem de fundo** (opacidade ~34%, filtro) + camada de gradiente escura.
- Container centralizado (máx 1080px): rótulo `✺ Nosso manifesto` (amarelo) + frase grande `raiz-serif` (~clamp 30→52px) + assinatura (foto circular + nome "Maria das Graças Almeida").
- ⚠️ Efeito "palavras acendendo no scroll": só com interação/embed. Sem isso, deixe o texto opaco normal.

## 8. DEPOIMENTO
- **Section** container 1080px. **Grid auto / 1fr**:
  - Foto 300×360 girada -3° com sombra `14px 14px 0 #F0D45C` (aplique via classe própria ou estilo do elemento).
  - Aspas grandes (Anton laranja) + frase `raiz-serif` 30px + autor ("Ana Beatriz, 17 — Guardiã da Caatinga").

## 9. LETREIRO GIGANTE
- Faixa creme com texto vazado gigante "Plantar ✺ Educar ✺ Transformar". Mesmo esquema do item 3 (Embed p/ rolar, ou estático).

## 10. PRA ONDE VAI O DINHEIRO (fundo escuro)
- **Section** `raiz-sec--dark`. Título "Pra onde vai cada **R$ 1** doado".
- **Barra de proporção** (pill 72px de altura): 3 divs lado a lado 84% amarelo / 10% laranja / 6% creme (84¢ / 10¢ / 6¢). Legenda com bolinhas coloridas.
- "Você sabia?" + **grid 3** cards com borda clara: **R$ 30 / R$ 120 / R$ 350** + descrição.

## 11. COMO AJUDAR (fundo laranja) — id `ajudar`
- **Section** `raiz-sec--accent`. Título `raiz-h2` "Faça parte da raiz" + parágrafo.
- Card creme com **barra de progresso** da campanha (Campanha 2026 — 20.000 árvores; barra amarela).
- **Grid 3**: Doe mensalmente · Seja voluntário · Empresa parceira (cada um com botão).

## 12. ANO EM NÚMEROS (fundo imagem escura)
- **Section** com imagem de fundo + overlay verde. Título "Nosso ano em **números**" + `✺ Relatório 2025`.
- **Grid 4** com números amarelos (borda superior 3px amarela): **11.300** · **4** · **214** · **2**.
- Botão fantasma "Ler o relatório completo".

## 13. NOTÍCIAS (3 cards)
- **Section** `raiz-sec--warm`. Título "Últimas do Raiz" + link "Ver todas →".
- **Grid 3** cards `raiz-card raiz-card--lift`: imagem 200px + tag categoria + data + `raiz-h3` 21px + resumo.
- ➜ Estas 3 podem virar um **Repeater ligado ao CMS "Noticias"** (que já existe no projeto headless), pro cliente editar sem mexer no layout.

## 14. PRA ONDE AGORA (4 blocos)
- **Grid 4** blocos coloridos (verde / amarelo / creme / laranja), cada um: `✺` + título Anton + seta. Links: Sobre, Projetos, Adote, Doar.

## 15. FOOTER
- **Section** classe `raiz-footer`.
- Título gigante `raiz-footer__big` "Instituto Raiz ✺" + frase serifada.
- **Grid 4** (1.5/1/1/1.4): coluna institucional + redes (`raiz-social`) · coluna "Conheça" · coluna "Apoie" · coluna newsletter (input + botão).
- Barra final: © 2026 Instituto Raiz · "Feito no sertão ✺" · "↑ Voltar ao topo".

---

## Resumo do que é CSS × o que é editor × o que precisa de código extra

| Item | Como fazer |
|---|---|
| Cores, bordas, cantos, sombra dura, tipografia, hover | ✅ CSS (`instituto-raiz.css`) + classes |
| Seções, grids, containers, colocar imagens/textos | 🧱 Montado no editor (visual) |
| Marquees rolando / letreiro gigante | ⚙️ Embed HTML (snippet no CSS) ou estático |
| Contadores animados (0→número) | ⚙️ Interação do Studio ou estático |
| "Palavras acendendo" no manifesto | ⚙️ Interação/embed ou texto fixo |
| Cards de Notícias editáveis pelo cliente | 🔗 Repeater ligado ao CMS "Noticias" (já criado) |

Fonte do design: `../index.html` (home) — as demais páginas reaproveitam as MESMAS classes.
