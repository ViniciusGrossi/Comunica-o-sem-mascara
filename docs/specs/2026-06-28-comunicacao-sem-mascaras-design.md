---
title: "Comunicação Sem Máscaras — Landing Page Premium Design Spec"
date: 2026-06-28
tags: [spec, landing-page, premium, nil-nunes, communicacao-sem-mascaras]
status: draft
---

# Comunicação Sem Máscaras — Landing Page Premium Design Spec

## 1. Visão Geral

Landing page premium de alto valor percebido para o programa online **Comunicação Sem Máscaras**, criado pela mentora Nil Nunes. A página deve conduzir emocionalmente a visitante da insegurança até a decisão de compra, transmitindo transformação, autoridade, sofisticação e confiança.

### Mensagem central

> Você não precisa se tornar outra mulher para ocupar espaços.
> Precisa apenas parar de esconder a mulher que já existe dentro de você.

### Métrica de sucesso

- Lighthouse Performance ≥ 95
- Tempo de carregamento (LCP) < 2.5s
- 60 FPS consistente em animações (desktop)
- Conversão via CTA direto → Kiwify checkout

---

## 2. Público-Alvo

Mulheres 25-50 anos: empreendedoras, profissionais liberais, líderes, comunicadoras, servidoras públicas, políticas.

**Perfil psicológico:** inteligentes, competentes, muito potencial, medo do julgamento, dificuldade para aparecer/gravar vídeos/vender, insegurança para falar em público, sensação de viver abaixo do potencial.

**Jornada emocional:** Insegurança → Identificação → Esperança → Desejo → Autoridade da mentora → Confiança → Urgência → Compra

---

## 3. Stack Técnica

| Camada | Tecnologia | Nota |
|---|---|---|
| Framework | Next.js 15 App Router | SSG/ISR, `$`=browser-only |
| Estilo | Tailwind CSS v4 (CSS-first `@theme`) | Proibido `tailwind.config.js` |
| Componentes | Shadcn UI + Lucide Icons | Base para accordion, buttons |
| Animação principal | GSAP + ScrollTrigger (free) | Horizontal pin, mask reveal, scrub |
| Animação UI | Motion (motion.dev) | Reveals, hover magnético, accordion |
| Smooth scroll | Lenis (locomotive-scroll fork) | Substitui scroll nativo |
| CSS nativo | `@scroll-timeline`, View Transitions API, IntersectionObserver | Fade entre seções, reveal genérico |
| Web Animations API | Contadores, partículas leves CTA | Canvas ≤200 nodes ou WAAPI |
| Deploy | Vercel | Free tier, edge CDN |
| Idioma | pt-BR único | Sem i18n |

---

## 4. Design System

### 4.1 Paleta

| Papel | Cor | Hex | Uso |
|---|---|---|---|
| Primária | Vermelho queimado | `#8E1B2C` | Botões, destaques, CTA, badges |
| Secundária | Vinho profundo | `#5C1020` | Hover, gradientes escuros, backgrounds de seção |
| Neutro claro | Branco | `#FFFFFF` | Fundo principal |
| Neutro médio | Cinza muito claro | `#F7F5F3` | Seções alternadas |
| Neutro escuro | Quase preto | `#1A0508` | Texto, hero escuro |
| Dourado metálico | Dourado | `#D4A574` | Detalhes finos, ornamentos, bordas |
| Dourado deep | Dourado escuro | `#A07A3C` | Hover dourado, gradientes |

**Regra:** dourado apenas em detalhes finos (bordas, ícones, ornamentos, divisor). Jamais em grandes áreas.

### 4.2 Tipografia

| Papel | Fonte | Peso | Fallback |
|---|---|---|---|
| Título (H1-H3) | Cormorant Garamond | 400, 500, 600 italic | Georgia, serif |
| Corpo / UI | Inter | 400, 500, 600 | system-ui, sans-serif |
| Label / Micro | Inter | 500 uppercase tracking-wide | system-ui, sans-serif |

**Escala (mobile → desktop):**
- H1: `clamp(2rem, 5vw, 3.5rem)` — line-height 1.05
- H2: `clamp(1.5rem, 3.5vw, 2.5rem)` — line-height 1.1
- H3: `clamp(1.25rem, 2.5vw, 1.75rem)` — line-height 1.2
- Body: `1rem` (16px) — line-height 1.6
- Micro/label: `0.75rem` — tracking 0.12em uppercase

### 4.3 Espaçamento

- Seção padding vertical: `clamp(4rem, 10vw, 8rem)`
- Container max-width: `1200px`
- Gap entre elementos: `1.5rem – 2rem`
- Muito espaço em branco entre blocos

### 4.4 Arquétipos visuais

- **Heroína** — coragem de se mostrar
- **Governante** — autoridade, estrutura
- **Sábio** — profundidade, método

### 4.5 Elementos gráficos

Linhas curvas SVG, círculos translúcidos com blur (glass morphism), formas orgânicas, gradientes radiais (vinho→preto, dourado→vinho), glows sutis, partículas leves (canvas ou WAAPI), ornamentos femininos sofisticados, texturas de profundidade (background gradiente com noise sutil).

---

## 5. Arquitetura de Página — 17 Seções

### 5.1 Hero

- **Layout:** Split 55/45 — texto à esquerda, imagem à direita
- **Headline:** `Para a mulher que cansou de se esconder.`
- **Subheadline:** `Aprenda a se comunicar com confiança, autenticidade e autoridade para ocupar os espaços que deseja — sem medo de julgamentos.`
- **CTA:** Botão `Quero fazer parte do Comunicação Sem Máscaras` → link externo Kiwify
- **Selos:** Acesso imediato · 12 meses de acesso · Plataforma Kiwify · 7 dias garantia (badges pill inline abaixo do CTA)
- **Social proof:** Badge `+200 mulheres impactadas` (posicionado sobre a imagem)
- **Partículas:** Efeito de partículas brilhantes douradas sutis ao redor do CTA (WAAPI ou canvas ≤200 nodes)
- **Imagem:** Placeholder gerado via banana-claude → mulher elegante, confiante, olhar sério, fundo neutro
- **Animações:** Headline text-reveal por palavra (Motion staggered), imagem fade-in + slight scale, partículas async, selos staggered fade-up

### 5.2 Trustbar

- Seção fina com 4 selos em row horizontal (ícone + texto curto)
- Selos: Acesso Imediato · 12 Meses · Kiwify · Garantia 7 Dias
- Layout: `flex justify-center gap-8`
- Animação: fade-in staggered

### 5.3 Problema

- **Imagem:** Mulher insegura em reunião (placeholder banana)
- **Headline:** `Você sente que...`
- **Lista (6 itens):** trava ao falar / pensa depois no que deveria ter dito / medo de julgamentos / evita vídeos / dificuldade para vender / sente que vive abaixo do potencial
- **Fechamento:** `Muitas mulheres não têm falta de potencial. Têm excesso de medo.`
- **Layout:** 2-colunas (imagem esquerda, lista direita) ou empilhado mobile
- **Animações:** Cards aparecendo conforme scroll (IntersectionObserver staggered), fechamento com mask-reveal (GSAP)

### 5.4 Transformação

- **Imagem:** Mulher caminhando confiante (placeholder banana)
- **Headline:** `Imagine viver assim...`
- **Lista visual (6 itens com ícone):** comunicar com confiança / vender naturalmente / gravar vídeos / ser respeitada / ocupar espaços / parar de se esconder
- **Layout:** Grid 3-colunas (desktop) / 2-colunas (tablet) / 1-coluna (mobile)
- **Fundo:** Gradiente animado sutil (radial vinho→neutro, keyframes CSS)
- **Animações:** Cada card com fade+slide-up staggered, ícone com micro-bounce ao entrar

### 5.5 O Método (10 Módulos) — Horizontal Pin Sticky

- **Headline:** `O Método`
- **Subheadline:** `10 módulos que transformam a mulher antes da comunicação.`
- **Layout:** GSAP ScrollTrigger pinned horizontal scroll — enquanto rola verticalmente, os cards deslizam horizontalmente
- **Cards:** Cada módulo = card vertical estilo "pôster de livro" (aspect 3:4), com número dourado, título serif, descrição curta
- **Módulos:**
  1. Boas-vindas
  2. Autoconhecimento
  3. Autoconfiança
  4. Assertividade
  5. Autenticidade
  6. Persuasão
  7. Pitch
  8. Oratória
  9. Técnicas
  10. Encerramento
- **Paleta dos cards:** Gradientes alternando entre vinho escuro → dourado (card ímpar) e dourado claro → vinho (card par)
- **Mobile fallback:** Grid vertical normal com scroll (sem pin horizontal)
- **Animações:** Scrub progress com GSAP ScrollTrigger, cards entram com slight rotate + fade, número dourado glow sutil

### 5.6 Diferencial

- **Headline:** `O que nos torna diferentes`
- **Layout:** Split comparison — esquerda "Cursos comuns" / direita "Comunicação Sem Máscaras"
- **Esquerda:** Cards cinza claro, tom neutro — "Ensinam técnicas"
- **Direita:** Cards com borda dourada, fundo vinho — "Transforma primeiro a mulher. Depois a comunicação."
- **Animação:** Slide-in lateral (esquerda da esquerda, direita da direita) com scrub do GSAP

### 5.7 Sobre Nil Nunes

- **Headline:** `Quem é Nil Nunes?`
- **Foto:** Profissional, fundo clean (placeholder banana ou foto real)
- **Cards de autoridade (6):** Comunicadora / Palestrante / Escritora de 12 livros / Radialista / Mentora / Criadora da metodologia
- **Trajetória:** Timeline vertical minimal (opcional) com marcos-chave
- **Layout:** Foto à esquerda, cards à direita (desktop)
- **Animações:** Foto com mask-reveal, cards fade-up staggered, trajetória com scroll-reveal sequencial

### 5.8 Prova Social

- **Headline:** `Mulheres que decidiram parar de se esconder`
- **Sub-label:** `+200 mulheres impactadas`
- **Formato:** Carrossel de cards com autoplay (5s por slide), snap horizontal
- **Cada card:** Foto (placeholder circular) + Nome + Cargo + Aspas (quote) + "Antes/Depois" breve
- **Controles:** Setas laterais + dots + pausa no hover
- **Layout:** Full-width, cards centralizados
- **Animações:** Slide suave, fade no card ativo, hover com slight lift + shadow

### 5.9 Para Quem É

- **Headline:** `Para quem é o programa`
- **6 cards com ícone:** Empreendedoras / Líderes / Servidoras / Profissionais liberais / Comunicadoras / Políticas
- **Layout:** Grid 3×2 (desktop) / 2×3 (tablet) / 1-coluna (mobile)
- **Animações:** Cards fade-up staggered com IntersectionObserver

### 5.10 Para Quem NÃO É

- **Headline:** `Para quem NÃO é`
- **3 cards discretos:** Quem busca fórmula mágica / Quem não quer praticar / Quem não deseja evoluir
- **Estilo:** Cards com borda tracejada, texto mais leve, sem destaque visual — intencionalmente "apagado"
- **Animações:** Fade-in simples

### 5.11 Resultado

- **Headline:** `Você não vai sair apenas falando melhor.`
- **Sub-headline:** `Vai sair:`
- **5 cards premium:** Mais segura / Mais confiante / Mais autêntica / Mais preparada / Mais posicionada
- **Layout:** Cards com borda dourada, fundo glass morphism, ícone + texto
- **Animações:** Cards aparecem com mask-reveal (GSAP), contadores numéricos se aplicável

### 5.12 Oferta

- **Headline:** `Faça parte do Comunicação Sem Máscaras`
- **Valor riscado:** `R$397,90` (text-decoration line-through, cinza)
- **Valor lançamento:** `R$297,90` (grande, dourado, glow sutil)
- **Badges:** Primeiras 30 vagas · 12 meses de acesso · Pagamento via Kiwify · Garantia 7 dias
- **CTA:** Botão grande com glow → Kiwify checkout
- **Layout:** Card centralizado com borda dourada, fundo gradiente vinho→preto
- **Animações:** Número counter animado (Web Animations API), botão pulse discreto, glow hover

### 5.13 Bônus

- **Headline:** `Bônus exclusivo`
- **Card premium:** Aula "Como vencer o medo de gravar vídeos" · Masterclass gravada
- **Estilo:** Card com gradiente dourado, ícone de presente, badge "BÔNUS"
- **Animações:** Fade-in + slight scale-on-reveal

### 5.14 Garantia

- **Selo dourado grande** (SVG/círculo ornamental)
- **Texto:** `7 dias de garantia incondicional. Se não for para você, devolvemos 100% do valor.`
- **Layout:** Centralizado, clean
- **Animações:** Selo com rotate sutil ao entrar

### 5.15 FAQ

- **Formato:** Accordion elegante (Motion animate)
- **Perguntas e respostas:**
  1. **Como acesso o programa?** — Após a compra, você recebe um e-mail com link de acesso à plataforma Kiwify. Basta clicar e começar.
  2. **Quanto tempo de acesso tenho?** — 12 meses de acesso a todos os módulos e bônus.
  3. **Preciso falar em público?** — Não. O programa desenvolve comunicação para qualquer contexto: reuniões, vídeos, vendas, networking.
  4. **Serve para iniciantes?** — Sim. O método começa pela base (autoconhecimento e autoconfiança) e avança progressivamente.
  5. **Como funciona a garantia?** — 7 dias de garantia incondicional. Se não for para você, devolvemos 100% do valor.
- **Estilo:** Item aberto com borda dourada inferior, conteúdo com slide-down, ícone chevron rotacionando
- **Animações:** Motion `AnimatePresence` + `layout` para smooth open/close

### 5.16 CTA Final

- **Imagem:** Nil Nunes poderosa, olhar firme, fundo escuro dramático (placeholder banana)
- **Headline:** `Quantas oportunidades você ainda vai perder por medo de se posicionar?`
- **Texto emocional curto:** parágrafo de fechamento reforçando urgência + transformação
- **CTA gigante:** `Quero fazer parte do Comunicação Sem Máscaras`
- **Partículas:** Douradas discretas flutuando (WAAPI)
- **Layout:** Full-bleed com overlay gradiente, texto centralizado sobreposto
- **Animações:** Headline text-reveal por palavra, partículas async, botão pulse + glow

### 5.17 Rodapé

- Logo · Redes sociais · WhatsApp · Política de Privacidade · Termos · Contato
- Layout: `grid-cols-3` (desktop) / stacked (mobile)
- Estilo: fundo `#1A0508`, texto claro

---

## 6. Animações — Inventário Completo

| # | Animação | Tecnologia | Liga em |
|---|---|---|---|
| 1 | Fade In | CSS `@keyframes` + IntersectionObserver | Revelação genérica |
| 2 | Slide Up | Motion `variants` + `whileInView` | Cards, texto |
| 3 | Blur Reveal | CSS `filter: blur()` + Motion | Imagens de seção |
| 4 | Mask Reveal | GSAP ScrollTrigger `clipPath` | Hero, método, resultado |
| 5 | Text Reveal por palavra | Motion `staggerChildren` | H1 hero, CTA final |
| 6 | Floating Elements | CSS `@keyframes` float | Ornamentos, shapes |
| 7 | Mouse Parallax | Vanilla JS `mousemove` | Hero background elements |
| 8 | Glass Morphism | CSS `backdrop-filter: blur()` | Cards de resultado, oferta |
| 9 | Soft Glow | CSS `box-shadow` animated | CTA, badges |
| 10 | Scroll Progress | CSS `@scroll-timeline` | Barra topo |
| 11 | Sticky Sections (Método) | GSAP ScrollTrigger `pin` | Seção de 10 módulos |
| 12 | Cards com Hover | CSS `transform: translateY + shadow` | Todos os cards |
| 13 | Hover Magnético | Motion `useMotionValue` + `spring` | Botões CTA |
| 14 | Ripple Effect | CSS `::after` + `animation` | Botões |
| 15 | Background Gradient Animado | CSS `@keyframes` hue-shift | Seção transformação |
| 16 | Light Sweep | CSS `background-position` animado | Botões CTA |
| 17 | Floating Shapes | CSS `@keyframes` + SVG | Ornamentos hero/CTA final |
| 18 | Scroll-Driven Animations | CSS `@scroll-timeline` + `animation-timeline` | Fade entre seções |
| 19 | Fade entre seções | View Transitions API | Navegação entre seções |
| 20 | Number Counter | WAAPI `element.animate()` | Preço, "+200" |
| 21 | Accordion elegante | Motion `AnimatePresence` + `layout` | FAQ |
| 22 | Timeline animada | GSAP ScrollTrigger scrub | Sobre Nil (se usada) |
| 23 | IntersectionObserver reveals | Vanilla JS `IntersectionObserver` | Maioria das seções |
| 24 | Ícones com animação | Motion `whileHover` | Cards de autoridade |
| 25 | Botões pulsando | CSS `@keyframes pulse` | CTA principal |
| 26 | Cards tilt no mouse | Vanilla JS `mousemove` + `transform: perspective` | Cards do método |
| 27 | Gradientes vivos | CSS `@keyframes` gradient position | Backgrounds seletivos |
| 28 | Motion Blur suave | CSS `filter: blur()` transitivo | Transições de imagem |
| 29 | Profundidade (parallax) | GSAP ScrollTrigger `scrub` | Seções com imagens |
| 30 | Partículas CTA | WAAPI ou Canvas API ≤200 nodes | Hero + CTA final |

**Regra:** `prefers-reduced-motion: reduce` desabilita TUDO — fallback para `opacity: 1` imediato sem transição.

---

## 7. Imagens

Todas geradas via skill `banana-claude` (nanobanana-mcp). Cinco posições:

| Seção | Descrição | Formato | Slot variável |
|---|---|---|---|
| Hero | Mulher elegante, confiante, olhar sério, fundo neutro limpo | 3:4 portrait | `hero-photo` |
| Problema | Mulher em reunião, hesitação, expressão insegura | 16:9 landscape | `problem-photo` |
| Transformação | Mulher caminhando confiante, postura firme, sensação de movimento | 3:4 portrait | `transform-photo` |
| Sobre Nil | Foto profissional, fundo clean | 1:1 square | `nil-photo` |
| CTA Final | Mulher poderosa, olhar firme, fundo escuro dramático | 16:9 landscape | `cta-photo` |

Placeholder: até imagem real chegar, uso gradiente de placeholder que indica posição.

---

## 8. SEO

### Meta tags

- `<title>` otimizado com keyword principal
- `<meta name="description">` com CTA implícito
- Open Graph completo (title, description, url, type — **sem** `og:image` dinâmico)
- Twitter Card summary_large_image

### Schema.org JSON-LD

3 blocos injetados via `<script type="application/ld+json">`:

1. **Course** — Nome, descrição, provider (Nil Nunes), offers (R$297.90 BRL)
2. **Organization** — Logos Tech / Nil Nunes, logo, contato
3. **FAQPage** — As 5 perguntas do FAQ com respostas

### Arquivos estáticos

- `robots.txt` — allow all, sitemap ref
- `sitemap.xml` — URL única (`/`)
- `next/og` — Open Graph image dinâmica (rota API `/api/og`) — **excluído do escopo** (decisão: sem OG social)

### HTML semântico

- Cada seção = `<section>` com `id` e `<h2>` hierárquico
- `<article>` para depoimentos
- Alt text em todas as imagens
- Headings H1→H2→H3 sem pular níveis

---

## 9. Performance

- Lighthouse ≥ 95 nas 4 categorias
- LCP < 2.5s (hero image otimizada via `next/image`)
- CLS < 0.05 (dimensões reservadas em imagens, font-display swap)
- FID < 100ms
- Lazy loading: `next/image` automático + `loading="lazy"` em seções abaixo do fold
- Fontes: `next/font/google` com `display: swap` e subset latin
- GSAP: tree-shake via `gsap/registerPlugin` apenas plugins usados
- Motion: import seletivo (não `import * from "motion"`)
- Lenis: bundle ~8kB gzip
- Canvas partículas: ≤200 nodes, GPU com `will-change: transform`
- CSS: critical inline no `<head>`, restante via `next/css`

---

## 10. Acessibilidade

- `prefers-reduced-motion: reduce` → desabilita todas as animações
- WCAG 2.1 AA: contraste mínimo 4.5:1 em texto, 3:1 em UI elements
- Focus visible em todos os interativos (accordion, botões, carrossel)
- `aria-label` em botões icon-only
- `aria-expanded` no accordion do FAQ
- `role="list"` e `role="listitem"` em carrossel de prova social
- Skip-to-content link
- HTML semântico completo

---

## 11. Responsividade

**Mobile-first breakpoints:**

| Breakpoint | Largura | Layout |
|---|---|---|
| Base (mobile) | < 640px | 1 coluna, stack vertical |
| sm | ≥ 640px | 2 colunas em listas |
| md | ≥ 768px | Hero split, grids 2-col |
| lg | ≥ 1024px | Método horizontal pin ativo |
| xl | ≥ 1280px | Max-width container |

**Degradación mobile:**
- Método: grid vertical normal (sem pin horizontal)
- Parallax: desabilitado
- Partículas: reduzidas ou desabilitadas
- Lenis smooth: desabilitado (scroll nativo)
- Mouse-move effects: desabilitados
- GSAP scrub: convertido para onEnter simples

---

## 12. Integração Kiwify

- Todos os CTAs linkam para `https://pay.kiwify.com.br/[SLUG]` (externo, `target="_blank"`, `rel="noopener noreferrer"`)
- Sem backend, sem captura de lead intermediária
- URL final do checkout definida via env var `NEXT_PUBLIC_KIWIFY_URL`

---

## 13. Estrutura de Arquivos (Next.js 15 App Router)

```
src/
├── app/
│   ├── layout.tsx          ← metadata, fonts, Lenis provider
│   ├── page.tsx            ← composição de todas as seções
│   ├── globals.css         ← @theme tokens Tailwind v4
│   ├── robots.ts           ← generate robots.txt
│   └── sitemap.ts          ← generate sitemap.xml
├── components/
│   ├── sections/
│   │   ├── hero.tsx
│   │   ├── trustbar.tsx
│   │   ├── problem.tsx
│   │   ├── transformation.tsx
│   │   ├── method.tsx
│   │   ├── differential.tsx
│   │   ├── about-nil.tsx
│   │   ├── social-proof.tsx
│   │   ├── for-who.tsx
│   │   ├── not-for-who.tsx
│   │   ├── results.tsx
│   │   ├── offer.tsx
│   │   ├── bonus.tsx
│   │   ├── guarantee.tsx
│   │   ├── faq.tsx
│   │   ├── final-cta.tsx
│   │   └── footer.tsx
│   ├── ui/
│   │   ├── button-magnetic.tsx
│   │   ├── animated-counter.tsx
│   │   ├── scroll-progress.tsx
│   │   ├── particles.tsx
│   │   ├── floating-shapes.tsx
│   │   ├── glass-card.tsx
│   │   ├── reveal-wrapper.tsx
│   │   ├── text-reveal.tsx
│   │   ├── mask-reveal.tsx
│   │   ├── carousel.tsx
│   │   ├── accordion-faq.tsx
│   │   └── section-fade.tsx
│   └── layout/
│       ├── navbar.tsx      ← sticky minimal (logo + único CTA, sem menu hamburger)
│       └── lenis-provider.tsx
├── hooks/
│   ├── use-intersection.ts
│   ├── use-mouse-parallax.ts
│   ├── use-tilt.ts
│   └── use-reduced-motion.ts
├── lib/
│   ├── gsap.ts             ← registerPlugin centralizado
│   ├── motion.ts           ← variantes e presets
│   └── constants.ts        ← URLs, textos, cores
├── public/
│   ├── images/             ← hero, problem, transform, nil, cta
│   └── fonts/              ← (se self-hosting)
└── types/
    └── index.ts
```

---

## 14. Dependências

```json
{
  "dependencies": {
    "next": "^15",
    "react": "^19",
    "react-dom": "^19",
    "tailwindcss": "^4",
    "motion": "^12",
    "gsap": "^3.12",
    "lenis": "^1.1",
    "lucide-react": "^0.460",
    "class-variance-authority": "^0.7",
    "clsx": "^2",
    "tailwind-merge": "^2"
  },
  "devDependencies": {
    "typescript": "^5.7",
    "@types/react": "^19",
    "@types/node": "^22"
  }
}
```

---

## 15. Fora do Escopo

- OG social image dinâmica (`next/og`)
- Meta Pixel / Google Ads / tracking events
- Webhook Mailchimp / ActiveCampaign
- i18n / multi-idioma
- Backend / API / database
- Áudio/vídeo players de prova social
- Authentication
- CMS / headless
- Analytics dashboard

---

## 16. Critérios de Aceite

- [ ] Todas as 17 seções renderizam corretamente em desktop e mobile
- [ ] Animações executam a 60fps em desktop (Chrome, Safari, Firefox)
- [ ] `prefers-reduced-motion` desabilita todas as animações
- [ ] Lighthouse Performance ≥ 95
- [ ] LCP < 2.5s
- [ ] CLS < 0.05
- [ ] Todos os CTAs linkam para `NEXT_PUBLIC_KIWIFY_URL`
- [ ] FAQ accordion funcional com 5 perguntas
- [ ] Carrossel de prova social com autoplay e pausa no hover
- [ ] Seção de método com scroll horizontal pinado (desktop) / grid vertical (mobile)
- [ ] Schema.org JSON-LD (Course + Organization + FAQPage) injetado
- [ ] robots.txt e sitemap.xml gerados
- [ ] HTML semântico com headings hierárquicos
- [ ] Alt text em todas as imagens
- [ ] Focus visible em todos os interativos
- [ ] Build e deploy via Vercel sem erros
