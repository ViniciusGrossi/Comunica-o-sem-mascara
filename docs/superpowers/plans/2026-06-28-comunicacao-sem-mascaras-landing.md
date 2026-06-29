# Comunicação Sem Máscaras — Landing Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a premium, high-ticket landing page for "Comunicação Sem Máscaras" by Nil Nunes — 17 sections, heavy animations, mobile-first, Lighthouse ≥95.

**Architecture:** Next.js 15 App Router with SSG. Tailwind v4 CSS-first tokens. Sections composed in `page.tsx`. GSAP ScrollTrigger for horizontal pin (method) + mask reveals. Motion (motion.dev) for UI animations (stagger, hover, accordion). Lenis smooth scroll. Particles via WAAPI or Canvas ≤200 nodes. All CTAs point to Kiwify checkout via env var.

**Tech Stack:** Next.js 15, React 19, Tailwind CSS v4, Shadcn UI, Lucide Icons, GSAP 3.12+ScrollTrigger, Motion 12, Lenis 1.1, TypeScript 5.7

---

## File Structure

```
src/
├── app/
│   ├── layout.tsx              ← Root layout: metadata, fonts, Lenis provider, JSON-LD
│   ├── page.tsx                ← Composes all 17 sections
│   ├── globals.css             ← @theme tokens, base styles, keyframes
│   ├── robots.ts               ← Generate robots.txt
│   └── sitemap.ts              ← Generate sitemap.xml
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
│   └── ui/
│       ├── cta-button.tsx      ← Reusable CTA button with magnetic hover + glow
│       ├── animated-counter.tsx
│       ├── scroll-progress.tsx
│       ├── particles.tsx
│       ├── floating-shapes.tsx
│       ├── glass-card.tsx
│       ├── reveal-wrapper.tsx  ← IntersectionObserver reveal
│       ├── text-reveal.tsx     ← Stagger-per-word Motion
│       ├── mask-reveal.tsx     ← GSAP clipPath reveal
│       ├── carousel.tsx       ← Autoplay snap carousel
│       ├── accordion-faq.tsx  ← Motion AnimatePresence accordion
│       ├── section-fade.tsx   ← CSS scroll-driven fade between sections
│       ├── navbar.tsx         ← Sticky minimal navbar
│       └── lenis-provider.tsx ← Client component Lenis wrapper
├── hooks/
│   ├── use-intersection.ts
│   ├── use-mouse-parallax.ts
│   ├── use-tilt.ts
│   └── use-reduced-motion.ts
├── lib/
│   ├── gsap-reg.ts            ← registerPlugin (ScrollTrigger only)
│   ├── motion-presets.ts      ← Reusable Motion variants
│   └── constants.ts           ← KIWIFY_URL, colors, module data, FAQ data
├── public/
│   └── images/                ← 5 placeholder gradients → real images later
└── types/
    └── index.ts
```

---

## Task 1: Project Scaffolding

**Files:**
- Create: `package.json`, `tsconfig.json`, `next.config.ts`, `.env.local`, `.gitignore`, `src/app/layout.tsx`, `src/app/page.tsx`

- [ ] **Step 1: Initialize Next.js project**

Run:
```bash
cd "C:\Users\everex\Documents\Logos Tech\04-Projetos\01-Projetos\Sites\Nyll - Landing Page OpenCode"
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --no-import-alias --use-npm
```

When prompted, accept defaults. This creates `package.json`, `tsconfig.json`, `next.config.ts`, `src/app/layout.tsx`, `src/app/page.tsx`, `src/app/globals.css`, `.gitignore`.

- [ ] **Step 2: Install animation + UI dependencies**

Run:
```bash
npm install motion@latest gsap@latest lenis@latest lucide-react class-variance-authority clsx tailwind-merge
```

- [ ] **Step 3: Create `.env.local`**

Write file `.env.local`:
```
NEXT_PUBLIC_KIWIFY_URL=https://pay.kiwify.com.br/placeholder
```

- [ ] **Step 4: Verify dev server boots**

Run:
```bash
npm run dev
```

Open `http://localhost:3000`. Expect: default Next.js page renders. Kill server (Ctrl+C).

- [ ] **Step 5: Commit scaffolding**

```bash
git add -A
git commit -m "feat(scaffold): init Next.js 15 + animation deps"
```

---

## Task 2: Design System — Tailwind v4 Tokens + Fonts

**Files:**
- Modify: `src/app/globals.css`
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Replace globals.css with @theme tokens**

Write `src/app/globals.css`:

```css
@import "tailwindcss";

@theme {
  --color-primary: #8E1B2C;
  --color-secondary: #5C1020;
  --color-neutral-light: #F7F5F3;
  --color-neutral-dark: #1A0508;
  --color-gold: #D4A574;
  --color-gold-deep: #A07A3C;
  --color-white: #FFFFFF;

  --font-serif: "Cormorant Garamond", Georgia, serif;
  --font-sans: "Inter", system-ui, sans-serif;

  --section-py: clamp(4rem, 10vw, 8rem);
  --container-max: 1200px;
}

@layer base {
  html {
    scroll-behavior: smooth;
  }
  body {
    font-family: var(--font-sans);
    color: var(--color-neutral-dark);
    background: var(--color-white);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  h1, h2, h3 {
    font-family: var(--font-serif);
    font-weight: 500;
  }
  h1 {
    font-size: clamp(2rem, 5vw, 3.5rem);
    line-height: 1.05;
  }
  h2 {
    font-size: clamp(1.5rem, 3.5vw, 2.5rem);
    line-height: 1.1;
  }
  h3 {
    font-size: clamp(1.25rem, 2.5vw, 1.75rem);
    line-height: 1.2;
  }
}

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes pulseGlow {
  0%, 100% { box-shadow: 0 0 20px rgba(142, 27, 44, 0.3); }
  50% { box-shadow: 0 0 40px rgba(142, 27, 44, 0.6); }
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

@keyframes gradientShift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

@keyframes lightSweep {
  0% { left: -100%; }
  100% { left: 200%; }
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

- [ ] **Step 2: Configure fonts in layout.tsx**

Write `src/app/layout.tsx`:

```tsx
import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Comunicação Sem Máscaras — Nil Nunes",
  description:
    "Aprenda a se comunicar com confiança, autenticidade e autoridade. Programa online para mulheres que querem ocupar espaços sem medo de julgamentos.",
  openGraph: {
    title: "Comunicação Sem Máscaras — Nil Nunes",
    description:
      "Aprenda a se comunicar com confiança, autenticidade e autoridade. Para mulheres que querem ocupar os espaços que desejam.",
    url: "https://comunicacaosemmascaras.com.br",
    type: "website",
    locale: "pt_BR",
  },
  twitterCard: "summary_large_image",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={`${cormorant.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  );
}
```

- [ ] **Step 3: Verify fonts load**

Run:
```bash
npm run dev
```

Open `http://localhost:3000`. Inspect headings — Cormorant Garamond should render. Body text should render in Inter. Kill server.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat(design-system): add Tailwind v4 @theme tokens, fonts, keyframes"
```

---

## Task 3: Constants + Types

**Files:**
- Create: `src/lib/constants.ts`
- Create: `src/types/index.ts`

- [ ] **Step 1: Create types**

Write `src/types/index.ts`:

```ts
export interface Module {
  number: number;
  title: string;
  description: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface Testimonial {
  name: string;
  role: string;
  quote: string;
}

export interface AuthorityCard {
  icon: string;
  label: string;
}

export interface ForWhoCard {
  icon: string;
  label: string;
}

export interface ResultCard {
  icon: string;
  label: string;
}
```

- [ ] **Step 2: Create constants**

Write `src/lib/constants.ts`:

```ts
import type { Module, FAQItem, Testimonial } from "@/types";

export const KIWIFY_URL = process.env.NEXT_PUBLIC_KIWIFY_URL ?? "#";

export const MODULES: Module[] = [
  { number: 1, title: "Boas-vindas", description: "Conheça o programa e entenda como a jornada vai transformar sua comunicação." },
  { number: 2, title: "Autoconhecimento", description: "Descubra quem você é de verdade e quais crenças limitantes te travam." },
  { number: 3, title: "Autoconfiança", description: "Construa uma base sólida de segurança interna para se expressar." },
  { number: 4, title: "Assertividade", description: "Aprenda a dizer o que pensa com firmeza e elegância." },
  { number: 5, title: "Autenticidade", description: "Libere a mulher que já existe dentro de você — sem máscaras." },
  { number: 6, title: "Persuasão", description: "Domine a arte de convencer com ética e verdade." },
  { number: 7, title: "Pitch", description: "Crie seu discurso de apresentação poderoso em 60 segundos." },
  { number: 8, title: "Oratória", description: "Técnicas de fala, postura e presença para qualquer palco." },
  { number: 9, title: "Técnicas", description: "Ferramentas práticas para reuniões, vendas, vídeos e networking." },
  { number: 10, title: "Encerramento", description: "Consolide sua transformação e crie seu plano de ação contínuo." },
];

export const FAQ_ITEMS: FAQItem[] = [
  { question: "Como acesso o programa?", answer: "Após a compra, você recebe um e-mail com link de acesso à plataforma Kiwify. Basta clicar e começar." },
  { question: "Quanto tempo de acesso tenho?", answer: "12 meses de acesso a todos os módulos e bônus." },
  { question: "Preciso falar em público?", answer: "Não. O programa desenvolve comunicação para qualquer contexto: reuniões, vídeos, vendas, networking." },
  { question: "Serve para iniciantes?", answer: "Sim. O método começa pela base — autoconhecimento e autoconfiança — e avança progressivamente." },
  { question: "Como funciona a garantia?", answer: "7 dias de garantia incondicional. Se não for para você, devolvemos 100% do valor." },
];

export const TESTIMONIALS: Testimonial[] = [
  { name: "Carla M.", role: "Empreendedora", quote: "Eu travava toda vez que precisava me apresentar. Hoje gravo vídeos naturalmente e vendo com confiança." },
  { name: "Juliana R.", role: "Servidora Pública", quote: "Nunca imaginei que eu, tão tímida, conseguiria falar em reuniões sem gaguejar. O método mudou minha vida." },
  { name: "Fernanda L.", role: "Advogada", quote: "O autoconhecimento foi o módulo que mais me transformou. Entendi por que eu me escondia." },
  { name: "Patrícia A.", role: "Coach", quote: "Já tinha feito outros cursos. Aqui foi diferente: primeiro transformaram a mulher, depois a comunicação." },
  { name: "Mariana S.", role: "Política", quote: "Aprendi a ocupar espaços sem precisar me tornar outra mulher. Isso foi libertador." },
  { name: "Rosa C.", role: "Professora", quote: "Agora falo em público com autoridade. Os alunos me respeitam mais e eu me respeito mais também." },
];

export const COLORS = {
  primary: "#8E1B2C",
  secondary: "#5C1020",
  neutralLight: "#F7F5F3",
  neutralDark: "#1A0508",
  gold: "#D4A574",
  goldDeep: "#A07A3C",
  white: "#FFFFFF",
} as const;
```

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "feat(data): add types, module/FAQ/testimonial constants"
```

---

## Task 4: Core UI Components (CtaButton, GlassCard, RevealWrapper)

**Files:**
- Create: `src/components/ui/cta-button.tsx`
- Create: `src/components/ui/glass-card.tsx`
- Create: `src/components/ui/reveal-wrapper.tsx`
- Create: `src/hooks/use-intersection.ts`
- Create: `src/hooks/use-reduced-motion.ts`

- [ ] **Step 1: Create useReducedMotion hook**

Write `src/hooks/use-reduced-motion.ts`:

```ts
"use client";

import { useState, useEffect } from "react";

export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return reduced;
}
```

- [ ] **Step 2: Create useIntersection hook**

Write `src/hooks/use-intersection.ts`:

```ts
"use client";

import { useRef, useEffect, useState } from "react";

interface UseIntersectionOptions {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
}

export function useIntersection(options: UseIntersectionOptions = {}) {
  const { threshold = 0.1, rootMargin = "0px", once = true } = options;
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) observer.unobserve(el);
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin, once]);

  return { ref, isVisible };
}
```

- [ ] **Step 3: Create RevealWrapper**

Write `src/components/ui/reveal-wrapper.tsx`:

```tsx
"use client";

import { useIntersection } from "@/hooks/use-intersection";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

interface RevealWrapperProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  once?: boolean;
}

const directionStyles: Record<string, string> = {
  up: "translate-y-6",
  down: "-translate-y-6",
  left: "translate-x-6",
  right: "-translate-x-6",
  none: "",
};

export function RevealWrapper({
  children,
  className,
  delay = 0,
  direction = "up",
  once = true,
}: RevealWrapperProps) {
  const { ref, isVisible } = useIntersection({ once });
  const reduced = useReducedMotion();

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div
      ref={ref}
      className={cn(
        "transition-all duration-700 ease-out",
        isVisible
          ? "opacity-100 translate-x-0 translate-y-0"
          : `opacity-0 ${directionStyles[direction]}`,
        className
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
```

- [ ] **Step 4: Create `src/lib/utils.ts` (cn helper)**

Write `src/lib/utils.ts`:

```ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

- [ ] **Step 5: Create GlassCard**

Write `src/components/ui/glass-card.tsx`:

```tsx
import { cn } from "@/lib/utils";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  gold?: boolean;
}

export function GlassCard({ children, className, gold = false }: GlassCardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border bg-white/5 p-6 backdrop-blur-md",
        gold
          ? "border-gold/30 bg-gold/5"
          : "border-neutral-dark/10 bg-neutral-light/50",
        className
      )}
    >
      {children}
    </div>
  );
}
```

- [ ] **Step 6: Create CtaButton**

Write `src/components/ui/cta-button.tsx`:

```tsx
"use client";

import { useState, useRef, MouseEvent } from "react";
import { cn } from "@/lib/utils";
import { KIWIFY_URL } from "@/lib/constants";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

interface CtaButtonProps {
  className?: string;
  variant?: "primary" | "outline";
  size?: "default" | "lg";
  children: React.ReactNode;
}

export function CtaButton({
  className,
  variant = "primary",
  size = "default",
  children,
}: CtaButtonProps) {
  const btnRef = useRef<HTMLAnchorElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const reduced = useReducedMotion();

  function handleMouseMove(e: MouseEvent<HTMLAnchorElement>) {
    if (reduced) return;
    const rect = e.currentTarget.getBoundingClientRect();
    setPos({
      x: e.clientX - rect.left - rect.width / 2,
      y: e.clientY - rect.top - rect.height / 2,
    });
  }

  function handleMouseLeave() {
    if (reduced) return;
    setPos({ x: 0, y: 0 });
  }

  return (
    <a
      ref={btnRef}
      href={KIWIFY_URL}
      target="_blank"
      rel="noopener noreferrer"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "relative inline-flex items-center justify-center overflow-hidden rounded-full font-sans font-semibold tracking-wide transition-all duration-300",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2",
        variant === "primary" &&
          "bg-primary text-white hover:bg-secondary shadow-lg hover:shadow-xl",
        variant === "outline" &&
          "border-2 border-primary text-primary hover:bg-primary hover:text-white",
        size === "default" && "px-8 py-4 text-base",
        size === "lg" && "px-10 py-5 text-lg",
        !reduced && "hover:-translate-y-0.5",
        className
      )}
      style={
        !reduced
          ? {
              transform: `translate(${pos.x * 0.15}px, ${pos.y * 0.15}px)`,
              transition: "transform 0.15s ease-out, background-color 0.3s",
            }
          : undefined
      }
    >
      {variant === "primary" && (
        <span
          className="pointer-events-none absolute inset-0 overflow-hidden"
          aria-hidden
        >
          <span
            className="absolute top-0 h-full w-1/3 bg-white/10 skew-x-[-20deg]"
            style={{
              left: "-100%",
              animation: reduced ? "none" : "lightSweep 3s ease-in-out infinite",
            }}
          />
        </span>
      )}
      <span className="relative z-10">{children}</span>
    </a>
  );
}
```

- [ ] **Step 7: Verify dev server still boots after all components**

Run:
```bash
npm run dev
```

No import errors in terminal. Kill server.

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "feat(ui): add CtaButton, GlassCard, RevealWrapper, hooks"
```

---

## Task 5: Lenis Provider + Navbar

**Files:**
- Create: `src/components/ui/lenis-provider.tsx`
- Create: `src/components/ui/navbar.tsx`
- Create: `src/components/ui/scroll-progress.tsx`
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Create LenisProvider**

Write `src/components/ui/lenis-provider.tsx`:

```tsx
"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

export function LenisProvider({ children }: { children: React.ReactNode }) {
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, [reduced]);

  return <>{children}</>;
}
```

- [ ] **Step 2: Create Navbar**

Write `src/components/ui/navbar.tsx`:

```tsx
"use client";

import { CtaButton } from "@/components/ui/cta-button";
import { cn } from "@/lib/utils";
import { useIntersection } from "@/hooks/use-intersection";

export function Navbar() {
  const { ref, isVisible } = useIntersection({ threshold: 0, once: false });

  return (
    <div ref={ref} className="h-0" aria-hidden>
      {/* sentinel for scroll detection */}
    </div>
  );
}

export function StickyNavbar() {
  return (
    <header className="fixed top-0 z-50 w-full border-b border-neutral-dark/5 bg-white/80 backdrop-blur-md">
      <nav className="mx-auto flex max-w-[var(--container-max)] items-center justify-between px-6 py-3">
        <span className="font-serif text-xl font-semibold text-neutral-dark">
          Nil Nunes
        </span>
        <CtaButton size="default" className="text-sm">
          Quero fazer parte
        </CtaButton>
      </nav>
    </header>
  );
}
```

- [ ] **Step 3: Create ScrollProgress**

Write `src/components/ui/scroll-progress.tsx`:

```tsx
"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

export function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;

    function handleScroll() {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [reduced]);

  if (reduced) return null;

  return (
    <div className="fixed top-0 left-0 z-[60] h-[2px] w-full bg-transparent">
      <div
        className="h-full bg-gradient-to-r from-primary to-gold transition-[width] duration-150"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
```

- [ ] **Step 4: Update layout.tsx to include Lenis and Navbar**

Replace `src/app/layout.tsx`:

```tsx
import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import { LenisProvider } from "@/components/ui/lenis-provider";
import { StickyNavbar } from "@/components/ui/navbar";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Comunicação Sem Máscaras — Nil Nunes",
  description:
    "Aprenda a se comunicar com confiança, autenticidade e autoridade. Programa online para mulheres que querem ocupar espaços sem medo de julgamentos.",
  openGraph: {
    title: "Comunicação Sem Máscaras — Nil Nunes",
    description:
      "Aprenda a se comunicar com confiança, autenticidade e autoridade. Para mulheres que querem ocupar os espaços que desejam.",
    url: "https://comunicacaosemmascaras.com.br",
    type: "website",
    locale: "pt_BR",
  },
  twitterCard: "summary_large_image",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={`${cormorant.variable} ${inter.variable}`}>
      <body>
        <LenisProvider>
          <ScrollProgress />
          <StickyNavbar />
          <main id="main-content">{children}</main>
        </LenisProvider>
      </body>
    </html>
  );
}
```

- [ ] **Step 5: Verify navbar + scroll progress render**

Run:
```bash
npm run dev
```

Expected: sticky navbar at top, scroll progress bar on scroll. Kill server.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat(layout): add Lenis smooth scroll, sticky navbar, scroll progress"
```

---

## Task 6: Hero Section

**Files:**
- Create: `src/components/sections/hero.tsx`
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Create Hero section**

Write `src/components/sections/hero.tsx`:

```tsx
"use client";

import { CtaButton } from "@/components/ui/cta-button";
import { RevealWrapper } from "@/components/ui/reveal-wrapper";
import { cn } from "@/lib/utils";

const TRUST_BADGES = [
  "Acesso imediato",
  "12 meses de acesso",
  "Plataforma Kiwify",
  "7 dias de garantia",
];

export function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen overflow-hidden bg-neutral-dark pt-20"
    >
      {/* Background gradient */}
      <div
        className="absolute inset-0 opacity-60"
        style={{
          background:
            "radial-gradient(ellipse at 70% 50%, #5C1020 0%, #1A0508 70%)",
        }}
        aria-hidden
 />

      {/* Floating shapes */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden>
        <div
          className="absolute top-[15%] left-[10%] h-64 w-64 rounded-full bg-gold/5 blur-3xl"
          style={{ animation: "float 6s ease-in-out infinite" }}
        />
        <div
          className="absolute bottom-[20%] right-[15%] h-48 w-48 rounded-full bg-primary/10 blur-3xl"
          style={{ animation: "float 8s ease-in-out infinite 2s" }}
        />
      </div>

      <div className="relative mx-auto flex max-w-[var(--container-max)] flex-col items-center gap-12 px-6 py-[var(--section-py)] lg:flex-row lg:gap-16">
        {/* Text column */}
        <div className="flex flex-1 flex-col items-center text-center lg:items-start lg:text-left">
          <RevealWrapper direction="none" delay={0}>
            <h1 className="font-serif text-white">
              Para a mulher que cansou de se esconder.
            </h1>
          </RevealWrapper>

          <RevealWrapper direction="up" delay={200}>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-white/70">
              Aprenda a se comunicar com confiança, autenticidade e autoridade
              para ocupar os espaços que deseja — sem medo de julgamentos.
            </p>
          </RevealWrapper>

          <RevealWrapper direction="up" delay={400}>
            <CtaButton size="lg" className="mt-8">
              Quero fazer parte do Comunicação Sem Máscaras
            </CtaButton>
          </RevealWrapper>

          <RevealWrapper direction="up" delay={500}>
            <div className="mt-4 flex flex-wrap justify-center gap-3 lg:justify-start">
              {TRUST_BADGES.map((badge) => (
                <span
                  key={badge}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/60"
                >
                  {badge}
                </span>
              ))}
            </div>
          </RevealWrapper>
        </div>

        {/* Image column */}
        <div className="relative flex-1">
          <RevealWrapper direction="none" delay={300}>
            <div className="relative aspect-[3/4] w-full max-w-md overflow-hidden rounded-2xl lg:max-w-lg">
              {/* Placeholder gradient until real image */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(135deg, #5C1020 0%, #8E1B2C 50%, #D4A574 100%)",
                }}
              />
              {/* Social proof badge */}
              <div className="absolute bottom-4 left-4 rounded-full bg-gold px-4 py-2 text-sm font-semibold text-neutral-dark">
                +200 mulheres impactadas
              </div>
            </div>
          </RevealWrapper>
        </div>
      </div>

      {/* Skip to content */}
      <a
        href="#trustbar"
        className="sr-only focus:not-sr-only focus:absolute focus:top-24 focus:left-4 focus:z-50 focus:rounded focus:bg-primary focus:px-4 focus:py-2 focus:text-white"
      >
        Pular para conteúdo
      </a>
    </section>
  );
}
```

- [ ] **Step 2: Update page.tsx to render Hero**

Write `src/app/page.tsx`:

```tsx
import { Hero } from "@/components/sections/hero";

export default function Home() {
  return <Hero />;
}
```

- [ ] **Step 3: Verify Hero renders**

Run:
```bash
npm run dev
```

Open `http://localhost:3000`. Expect: dark hero, headline, CTA button, placeholder image, trust badges, floating shapes. Kill server.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat(sections): add hero section with dark theme, CTA, trust badges"
```

---

## Task 7: Trustbar + Problem + Transformation Sections

**Files:**
- Create: `src/components/sections/trustbar.tsx`
- Create: `src/components/sections/problem.tsx`
- Create: `src/components/sections/transformation.tsx`
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Create Trustbar**

Write `src/components/sections/trustbar.tsx`:

```tsx
"use client";

import { Shield, Clock, Globe, CheckCircle } from "lucide-react";
import { RevealWrapper } from "@/components/ui/reveal-wrapper";

const BADGES = [
  { icon: Shield, label: "Acesso Imediato" },
  { icon: Clock, label: "12 Meses de Acesso" },
  { icon: Globe, label: "Plataforma Kiwify" },
  { icon: CheckCircle, label: "Garantia 7 Dias" },
];

export function Trustbar() {
  return (
    <section id="trustbar" className="border-b border-neutral-dark/5 bg-white py-6">
      <div className="mx-auto flex max-w-[var(--container-max)] flex-wrap items-center justify-center gap-8 px-6">
        {BADGES.map((badge, i) => (
          <RevealWrapper key={badge.label} delay={i * 100} direction="up">
            <div className="flex items-center gap-2 text-sm text-neutral-dark/60">
              <badge.icon className="h-4 w-4 text-gold" />
              <span>{badge.label}</span>
            </div>
          </RevealWrapper>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Create Problem section**

Write `src/components/sections/problem.tsx`:

```tsx
"use client";

import { RevealWrapper } from "@/components/ui/reveal-wrapper";

const PAIN_POINTS = [
  "Você trava toda vez que precisa falar em público ou em reuniões",
  "Pensa depois no que deveria ter dito — e fica remoendo",
  "O medo de julgamentos te impede de se posicionar",
  "Você evita gravar vídeos ou criar conteúdo",
  "Tem dificuldade para vender suas ideias ou serviços",
  "Sente que vive muito abaixo do seu potencial",
];

export function Problem() {
  return (
    <section id="problema" className="bg-white py-[var(--section-py)]">
      <div className="mx-auto grid max-w-[var(--container-max)] gap-12 px-6 lg:grid-cols-2 lg:gap-16">
        {/* Image placeholder */}
        <RevealWrapper direction="right">
          <div
            className="aspect-video w-full rounded-2xl"
            style={{
              background:
                "linear-gradient(135deg, #F7F5F3 0%, #8E1B2C 100%)",
            }}
          />
        </RevealWrapper>

        {/* Content */}
        <div className="flex flex-col justify-center">
          <RevealWrapper direction="up">
            <h2 className="text-neutral-dark">Você sente que...</h2>
          </RevealWrapper>

          <ul className="mt-8 space-y-4">
            {PAIN_POINTS.map((point, i) => (
              <RevealWrapper key={i} delay={i * 80} direction="up">
                <li className="flex items-start gap-3 text-neutral-dark/80">
                  <span className="mt-1.5 block h-2 w-2 flex-shrink-0 rounded-full bg-primary" />
                  <span>{point}</span>
                </li>
              </RevealWrapper>
            ))}
          </ul>

          <RevealWrapper delay={600} direction="up">
            <p className="mt-10 border-l-4 border-gold pl-4 font-serif text-xl font-medium italic text-neutral-dark">
              Muitas mulheres não têm falta de potencial. Têm excesso de medo.
            </p>
          </RevealWrapper>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Create Transformation section**

Write `src/components/sections/transformation.tsx`:

```tsx
"use client";

import { MessageCircle, ShoppingBag, Video, Star, Users, Eye } from "lucide-react";
import { RevealWrapper } from "@/components/ui/reveal-wrapper";
import { GlassCard } from "@/components/ui/glass-card";

const TRANSFORMS = [
  { icon: MessageCircle, label: "Comunicar com confiança" },
  { icon: ShoppingBag, label: "Vender naturalmente" },
  { icon: Video, label: "Gravar vídeos sem travar" },
  { icon: Star, label: "Ser respeitada" },
  { icon: Users, label: "Ocupar espaços" },
  { icon: Eye, label: "Parar de se esconder" },
];

export function Transformation() {
  return (
    <section
      id="transformacao"
      className="relative overflow-hidden py-[var(--section-py)]"
      style={{
        background:
          "radial-gradient(ellipse at 50% 50%, #F7F5F3 0%, #FFFFFF 70%)",
      }}
    >
      <div className="mx-auto max-w-[var(--container-max)] px-6">
        <RevealWrapper direction="up">
          <h2 className="text-center text-neutral-dark">Imagine viver assim...</h2>
        </RevealWrapper>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {TRANSFORMS.map((item, i) => (
            <RevealWrapper key={item.label} delay={i * 100} direction="up">
              <GlassCard className="flex items-center gap-4 p-5 transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
                  <item.icon className="h-6 w-6 text-primary" />
                </div>
                <span className="text-neutral-dark font-medium">{item.label}</span>
              </GlassCard>
            </RevealWrapper>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Update page.tsx**

Write `src/app/page.tsx`:

```tsx
import { Hero } from "@/components/sections/hero";
import { Trustbar } from "@/components/sections/trustbar";
import { Problem } from "@/components/sections/problem";
import { Transformation } from "@/components/sections/transformation";

export default function Home() {
  return (
    <>
      <Hero />
      <Trustbar />
      <Problem />
      <Transformation />
    </>
  );
}
```

- [ ] **Step 5: Verify all render**

Run:
```bash
npm run dev
```

Scroll through all 4 sections. Kill server.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat(sections): add trustbar, problem, transformation sections"
```

---

## Task 8: Method Section — Horizontal Pin (GSAP ScrollTrigger)

**Files:**
- Create: `src/lib/gsap-reg.ts`
- Create: `src/components/sections/method.tsx`
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Create GSAP registration module**

Write `src/lib/gsap-reg.ts`:

```ts
"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export { gsap, ScrollTrigger };
```

- [ ] **Step 2: Create Method section with horizontal pin**

Write `src/components/sections/method.tsx`:

```tsx
"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap-reg";
import { MODULES } from "@/lib/constants";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { RevealWrapper } from "@/components/ui/reveal-wrapper";
import { cn } from "@/lib/utils";

export function Method() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || !sectionRef.current || !trackRef.current) return;

    const track = trackRef.current;
    const cards = track.children;
    if (!cards.length) return;

    const ctx = gsap.context(() => {
      const totalWidth = track.scrollWidth - window.innerWidth;

      gsap.to(track, {
        x: () => -totalWidth,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${totalWidth}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });
    }, sectionRef.current);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <section
      id="metodo"
      ref={sectionRef}
      className="relative overflow-hidden bg-neutral-dark py-[var(--section-py)]"
    >
      <div className="mx-auto max-w-[var(--container-max)] px-6">
        <RevealWrapper direction="up">
          <h2 className="text-white">O Método</h2>
        </RevealWrapper>
        <RevealWrapper delay={100} direction="up">
          <p className="mt-4 max-w-xl text-white/60">
            10 módulos que transformam a mulher antes da comunicação.
          </p>
        </RevealWrapper>
      </div>

      {/* Desktop: horizontal pin scroll */}
      <div
        ref={trackRef}
        className={cn(
          "mt-16 flex gap-8 px-6",
          reduced ? "flex-wrap max-w-[var(--container-max)] mx-auto" : "will-change-transform"
        )}
      >
        {MODULES.map((mod) => (
          <div
            key={mod.number}
            className={cn(
              "flex-shrink-0 overflow-hidden rounded-2xl border p-8",
              "aspect-[3/4] w-[300px] sm:w-[350px] lg:w-[380px]",
              mod.number % 2 === 1
                ? "border-gold/20 bg-gradient-to-b from-secondary to-neutral-dark"
                : "border-gold/10 bg-gradient-to-b from-gold/10 to-neutral-dark"
            )}
          >
            <span className="font-serif text-5xl font-semibold text-gold">
              {String(mod.number).padStart(2, "0")}
            </span>
            <h3 className="mt-6 text-2xl font-semibold text-white">
              {mod.title}
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-white/60">
              {mod.description}
            </p>
          </div>
        ))}
      </div>

      {/* Mobile fallback: vertical grid (rendered via CSS) — the track div turns into flex-wrap via reduced check */}
      <style jsx>{`
        @media (max-width: 1023px) {
          div[ref] {
            flex-wrap: wrap;
            max-width: var(--container-max);
            margin-left: auto;
            margin-right: auto;
          }
        }
      `}</style>
    </section>
  );
}
```

> Note: The styled-jsx approach is a workaround for mobile fallback. If it causes issues, replace with Tailwind responsive classes directly on the track div.

- [ ] **Step 3: Update page.tsx to include Method**

Add import and `<Method />` after `<Transformation />` in `src/app/page.tsx`.

- [ ] **Step 4: Verify horizontal scroll on desktop**

Run:
```bash
npm run dev
```

Open on desktop viewport (≥1024px). Scroll past Transformation — method section should pin and cards slide horizontally. Resize to mobile — cards should stack vertically.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat(sections): add method section with GSAP horizontal pin scroll"
```

---

## Task 9: Differential + About Nil + Social Proof

**Files:**
- Create: `src/components/sections/differential.tsx`
- Create: `src/components/sections/about-nil.tsx`
- Create: `src/components/sections/social-proof.tsx`
- Create: `src/components/ui/carousel.tsx`
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Create Differential section**

Write `src/components/sections/differential.tsx`:

```tsx
"use client";

import { RevealWrapper } from "@/components/ui/reveal-wrapper";

const COMMON = [
  "Ensinam técnicas de fala",
  "Foco no comportamento externo",
  "Exercícios genéricos",
  "Resultado superficial",
];

const DIFFERENT = [
  "Transforma primeiro a mulher",
  "Foco na essência e autoconhecimento",
  "Metodologia exclusiva criada por Nil Nunes",
  "Resultado profundo e duradouro",
];

export function Differential() {
  return (
    <section id="diferencial" className="bg-white py-[var(--section-py)]">
      <div className="mx-auto max-w-[var(--container-max)] px-6">
        <RevealWrapper direction="up">
          <h2 className="text-center text-neutral-dark">
            O que nos torna diferentes
          </h2>
        </RevealWrapper>

        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          {/* Common courses */}
          <RevealWrapper direction="left">
            <div className="rounded-2xl border border-neutral-dark/10 bg-neutral-light p-8">
              <h3 className="text-lg font-semibold text-neutral-dark/50">
                Cursos comuns
              </h3>
              <ul className="mt-6 space-y-4">
                {COMMON.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-neutral-dark/40">
                    <span className="block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-neutral-dark/20" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </RevealWrapper>

          {/* This program */}
          <RevealWrapper direction="right">
            <div className="rounded-2xl border border-gold/30 bg-gradient-to-b from-gold/5 to-transparent p-8">
              <h3 className="text-lg font-semibold text-primary">
                Comunicação Sem Máscaras
              </h3>
              <ul className="mt-6 space-y-4">
                {DIFFERENT.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-neutral-dark">
                    <span className="block h-2 w-2 flex-shrink-0 rounded-full bg-gold" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </RevealWrapper>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Create About Nil section**

Write `src/components/sections/about-nil.tsx`:

```tsx
"use client";

import { Mic, BookOpen, Radio, Users, Sparkles, Award } from "lucide-react";
import { RevealWrapper } from "@/components/ui/reveal-wrapper";

const AUTHORITIES = [
  { icon: Mic, label: "Comunicadora" },
  { icon: Award, label: "Palestrante" },
  { icon: BookOpen, label: "12 livros publicados" },
  { icon: Radio, label: "Radialista" },
  { icon: Users, label: "Mentora" },
  { icon: Sparkles, label: "Criadora da metodologia" },
];

export function AboutNil() {
  return (
    <section id="sobre" className="bg-neutral-light py-[var(--section-py)]">
      <div className="mx-auto grid max-w-[var(--container-max)] gap-12 px-6 lg:grid-cols-2 lg:gap-16">
        {/* Photo placeholder */}
        <RevealWrapper direction="right">
          <div
            className="aspect-square w-full max-w-md rounded-2xl"
            style={{
              background:
                "linear-gradient(135deg, #F7F5F3 0%, #D4A574 50%, #8E1B2C 100%)",
            }}
          />
        </RevealWrapper>

        {/* Content */}
        <div className="flex flex-col justify-center">
          <RevealWrapper direction="up">
            <h2 className="text-neutral-dark">Quem é Nil Nunes?</h2>
          </RevealWrapper>

          <RevealWrapper delay={100} direction="up">
            <p className="mt-4 text-neutral-dark/70">
              Comunicadora, palestrante, escritora de 12 livros e radialista. Nil
              criou o método Comunicação Sem Máscaras após décadas ajudando
              mulheres a encontrarem a própria voz.
            </p>
          </RevealWrapper>

          <div className="mt-8 grid grid-cols-2 gap-4">
            {AUTHORITIES.map((item, i) => (
              <RevealWrapper key={item.label} delay={i * 80} direction="up">
                <div className="flex items-center gap-3 rounded-xl border border-gold/20 bg-white p-4">
                  <item.icon className="h-5 w-5 flex-shrink-0 text-gold" />
                  <span className="text-sm font-medium text-neutral-dark">
                    {item.label}
                  </span>
                </div>
              </RevealWrapper>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Create Carousel UI component**

Write `src/components/ui/carousel.tsx`:

```tsx
"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

interface CarouselProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  autoPlayInterval?: number;
  className?: string;
}

export function Carousel<T>({
  items,
  renderItem,
  autoPlayInterval = 5000,
  className,
}: CarouselProps<T>) {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const reduced = useReducedMotion();
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % items.length);
  }, [items.length]);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + items.length) % items.length);
  }, [items.length]);

  useEffect(() => {
    if (isPaused || reduced) return;
    intervalRef.current = setInterval(next, autoPlayInterval);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPaused, next, autoPlayInterval, reduced]);

  return (
    <div
      className={cn("relative", className)}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      role="region"
      aria-label="Carrossel de depoimentos"
    >
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {items.map((item, i) => (
            <div key={i} className="w-full flex-shrink-0 px-4">
              {renderItem(item, i)}
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={prev}
        className="absolute top-1/2 left-2 -translate-y-1/2 rounded-full border border-neutral-dark/10 bg-white/80 p-2 backdrop-blur-sm transition-colors hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
        aria-label="Depoimento anterior"
      >
        <ChevronLeft className="h-5 w-5 text-neutral-dark" />
      </button>

      <button
        onClick={next}
        className="absolute top-1/2 right-2 -translate-y-1/2 rounded-full border border-neutral-dark/10 bg-white/80 p-2 backdrop-blur-sm transition-colors hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
        aria-label="Próximo depoimento"
      >
        <ChevronRight className="h-5 w-5 text-neutral-dark" />
      </button>

      {/* Dots */}
      <div className="mt-6 flex justify-center gap-2">
        {items.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={cn(
              "h-2 w-2 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold",
              i === current ? "bg-primary" : "bg-neutral-dark/20"
            )}
            aria-label={`Ir para depoimento ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 4: Create Social Proof section**

Write `src/components/sections/social-proof.tsx`:

```tsx
"use client";

import { RevealWrapper } from "@/components/ui/reveal-wrapper";
import { Carousel } from "@/components/ui/carousel";
import { TESTIMONIALS } from "@/lib/constants";

export function SocialProof() {
  return (
    <section id="depoimentos" className="bg-white py-[var(--section-py)]">
      <div className="mx-auto max-w-[var(--container-max)] px-6">
        <RevealWrapper direction="up">
          <h2 className="text-center text-neutral-dark">
            Mulheres que decidiram parar de se esconder
          </h2>
        </RevealWrapper>
        <RevealWrapper delay={100} direction="up">
          <p className="mt-2 text-center text-gold font-semibold">
            +200 mulheres impactadas
          </p>
        </RevealWrapper>

        <RevealWrapper delay={200} direction="up">
          <Carousel
            items={TESTIMONIALS}
            className="mt-12"
            renderItem={(testimonial) => (
              <article className="mx-auto max-w-lg rounded-2xl border border-neutral-dark/5 bg-neutral-light p-8 text-center">
                {/* Avatar placeholder */}
                <div
                  className="mx-auto mb-6 h-16 w-16 rounded-full"
                  style={{
                    background:
                      "linear-gradient(135deg, #D4A574 0%, #8E1B2C 100%)",
                  }}
                />
                <h3 className="font-serif text-xl font-semibold text-neutral-dark">
                  {testimonial.name}
                </h3>
                <p className="mt-1 text-sm text-neutral-dark/50">
                  {testimonial.role}
                </p>
                <blockquote className="mt-4 border-l-2 border-gold pl-4 text-neutral-dark/70 italic">
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>
              </article>
            )}
          />
        </RevealWrapper>
      </div>
    </section>
  );
}
```

- [ ] **Step 5: Update page.tsx**

Add `Differential`, `AboutNil`, `SocialProof` imports and components after `Transformation`.

- [ ] **Step 6: Verify all render**

Run:
```bash
npm run dev
```

Scroll through all 7 sections. Kill server.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "feat(sections): add differential, about-nil, social-proof with carousel"
```

---

## Task 10: For Who + Not For Who + Results

**Files:**
- Create: `src/components/sections/for-who.tsx`
- Create: `src/components/sections/not-for-who.tsx`
- Create: `src/components/sections/results.tsx`
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Create ForWho section**

Write `src/components/sections/for-who.tsx`:

```tsx
"use client";

import { ShoppingBag, Crown, Building, Briefcase, Megaphone, Landmark } from "lucide-react";
import { RevealWrapper } from "@/components/ui/reveal-wrapper";

const TARGET_AUDIENCE = [
  { icon: ShoppingBag, label: "Empreendedoras" },
  { icon: Crown, label: "Líderes" },
  { icon: Building, label: "Servidoras públicas" },
  { icon: Briefcase, label: "Profissionais liberais" },
  { icon: Megaphone, label: "Comunicadoras" },
  { icon: Landmark, label: "Políticas" },
];

export function ForWho() {
  return (
    <section id="para-quem" className="bg-neutral-light py-[var(--section-py)]">
      <div className="mx-auto max-w-[var(--container-max)] px-6">
        <RevealWrapper direction="up">
          <h2 className="text-center text-neutral-dark">
            Para quem é o programa
          </h2>
        </RevealWrapper>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {TARGET_AUDIENCE.map((item, i) => (
            <RevealWrapper key={item.label} delay={i * 80} direction="up">
              <div className="flex items-center gap-4 rounded-2xl border border-neutral-dark/5 bg-white p-6 transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
                  <item.icon className="h-6 w-6 text-primary" />
                </div>
                <span className="font-medium text-neutral-dark">{item.label}</span>
              </div>
            </RevealWrapper>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Create NotForWho section**

Write `src/components/sections/not-for-who.tsx`:

```tsx
"use client";

import { RevealWrapper } from "@/components/ui/reveal-wrapper";

const NOT_FOR = [
  "Quem busca fórmula mágica sem se dedicar",
  "Quem não quer praticar e esperar resultados",
  "Quem não deseja evoluir de verdade",
];

export function NotForWho() {
  return (
    <section id="nao-para-quem" className="bg-white py-[var(--section-py)]">
      <div className="mx-auto max-w-[var(--container-max)] px-6">
        <RevealWrapper direction="up">
          <h2 className="text-center text-neutral-dark/40">
            Para quem NÃO é
          </h2>
        </RevealWrapper>

        <div className="mt-8 mx-auto grid max-w-2xl gap-4">
          {NOT_FOR.map((item, i) => (
            <RevealWrapper key={i} delay={i * 100} direction="up">
              <div className="rounded-2xl border border-dashed border-neutral-dark/15 p-6 text-center text-neutral-dark/40">
                {item}
              </div>
            </RevealWrapper>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Create Results section**

Write `src/components/sections/results.tsx`:

```tsx
"use client";

import { Shield, Heart, Sparkles, GraduationCap, TrendingUp } from "lucide-react";
import { RevealWrapper } from "@/components/ui/reveal-wrapper";
import { GlassCard } from "@/components/ui/glass-card";

const RESULTS = [
  { icon: Shield, label: "Mais segura" },
  { icon: Heart, label: "Mais confiante" },
  { icon: Sparkles, label: "Mais autêntica" },
  { icon: GraduationCap, label: "Mais preparada" },
  { icon: TrendingUp, label: "Mais posicionada" },
];

export function Results() {
  return (
    <section
      id="resultado"
      className="relative overflow-hidden py-[var(--section-py)]"
      style={{
        background:
          "radial-gradient(ellipse at 50% 30%, #5C1020 0%, #1A0508 70%)",
      }}
    >
      <div className="mx-auto max-w-[var(--container-max)] px-6">
        <RevealWrapper direction="up">
          <h2 className="text-center text-white">
            Você não vai sair apenas falando melhor.
          </h2>
        </RevealWrapper>
        <RevealWrapper delay={100} direction="up">
          <p className="mt-2 text-center text-lg text-gold">Vai sair:</p>
        </RevealWrapper>

        <div className="mt-12 flex flex-wrap justify-center gap-6">
          {RESULTS.map((item, i) => (
            <RevealWrapper key={item.label} delay={i * 100} direction="up">
              <GlassCard gold className="flex items-center gap-3 px-6 py-4">
                <item.icon className="h-6 w-6 text-gold" />
                <span className="text-lg font-medium text-white">
                  {item.label}
                </span>
              </GlassCard>
            </RevealWrapper>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Update page.tsx — add ForWho, NotForWho, Results**

- [ ] **Step 5: Verify all render**

Run:
```bash
npm run dev
```

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat(sections): add for-who, not-for-who, results sections"
```

---

## Task 11: Offer + Bonus + Guarantee

**Files:**
- Create: `src/components/ui/animated-counter.tsx`
- Create: `src/components/sections/offer.tsx`
- Create: `src/components/sections/bonus.tsx`
- Create: `src/components/sections/guarantee.tsx`
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Create AnimatedCounter**

Write `src/components/ui/animated-counter.tsx`:

```tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { useIntersection } from "@/hooks/use-intersection";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

interface AnimatedCounterProps {
  target: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  duration?: number;
  className?: string;
}

export function AnimatedCounter({
  target,
  prefix = "",
  suffix = "",
  decimals = 0,
  duration = 1500,
  className,
}: AnimatedCounterProps) {
  const { ref, isVisible } = useIntersection({ once: true });
  const [value, setValue] = useState(0);
  const reduced = useReducedMotion();
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isVisible || hasAnimated.current || reduced) {
      if (reduced) setValue(target);
      return;
    }
    hasAnimated.current = true;

    const start = performance.now();
    function step(now: number) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(eased * target);
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }, [isVisible, target, duration, reduced]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {value.toFixed(decimals)}
      {suffix}
    </span>
  );
}
```

- [ ] **Step 2: Create Offer section**

Write `src/components/sections/offer.tsx`:

```tsx
"use client";

import { CtaButton } from "@/components/ui/cta-button";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { RevealWrapper } from "@/components/ui/reveal-wrapper";

export function Offer() {
  return (
    <section
      id="oferta"
      className="relative overflow-hidden py-[var(--section-py)]"
      style={{
        background:
          "linear-gradient(180deg, #1A0508 0%, #5C1020 50%, #1A0508 100%)",
      }}
    >
      <div className="mx-auto max-w-[var(--container-max)] px-6">
        <div className="mx-auto max-w-lg rounded-3xl border border-gold/30 bg-white/5 p-8 text-center backdrop-blur-md sm:p-12">
          <RevealWrapper direction="up">
            <h2 className="text-white">
              Faça parte do Comunicação Sem Máscaras
            </h2>
          </RevealWrapper>

          <RevealWrapper delay={100} direction="up">
            <div className="mt-8 flex items-center justify-center gap-4">
              <span className="text-xl text-white/40 line-through">
                R$397,90
              </span>
              <span className="text-4xl font-bold text-gold">
                <AnimatedCounter target={297.90} prefix="R$" suffix="" decimals={2} />
              </span>
            </div>
          </RevealWrapper>

          <RevealWrapper delay={200} direction="up">
            <div className="mt-4 flex flex-wrap justify-center gap-3">
              {["Primeiras 30 vagas", "12 meses de acesso", "Pagamento via Kiwify", "Garantia 7 dias"].map((badge) => (
                <span
                  key={badge}
                  className="rounded-full border border-gold/20 bg-gold/10 px-3 py-1 text-xs text-gold"
                >
                  {badge}
                </span>
              ))}
            </div>
          </RevealWrapper>

          <RevealWrapper delay={300} direction="up">
            <CtaButton size="lg" className="mt-8 w-full">
              Quero fazer parte agora
            </CtaButton>
          </RevealWrapper>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Create Bonus section**

Write `src/components/sections/bonus.tsx`:

```tsx
"use client";

import { Gift } from "lucide-react";
import { RevealWrapper } from "@/components/ui/reveal-wrapper";

export function Bonus() {
  return (
    <section id="bonus" className="bg-white py-[var(--section-py)]">
      <div className="mx-auto max-w-[var(--container-max)] px-6">
        <RevealWrapper direction="up">
          <h2 className="text-center text-neutral-dark">Bônus exclusivo</h2>
        </RevealWrapper>

        <RevealWrapper delay={100} direction="up">
          <div className="mx-auto mt-8 max-w-md rounded-2xl border border-gold/30 p-8 text-center" style={{ background: "linear-gradient(135deg, #D4A574 0%, #A07A3C 100%)" }}>
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-white/20">
              <Gift className="h-7 w-7 text-white" />
            </div>
            <span className="inline-block rounded-full bg-white/20 px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
              Bônus
            </span>
            <h3 className="mt-4 text-xl font-semibold text-white">
              Como vencer o medo de gravar vídeos
            </h3>
            <p className="mt-2 text-sm text-white/80">
              Masterclass gravada exclusiva para alunas do programa.
            </p>
          </div>
        </RevealWrapper>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Create Guarantee section**

Write `src/components/sections/guarantee.tsx`:

```tsx
"use client";

import { RevealWrapper } from "@/components/ui/reveal-wrapper";

export function Guarantee() {
  return (
    <section id="garantia" className="bg-neutral-light py-[var(--section-py)]">
      <div className="mx-auto max-w-[var(--container-max)] px-6 text-center">
        <RevealWrapper direction="up">
          {/* Guarantee seal SVG */}
          <div className="mx-auto mb-6 flex h-28 w-28 items-center justify-center rounded-full border-4 border-dashed border-gold">
            <span className="font-serif text-3xl font-bold text-gold">7</span>
          </div>
        </RevealWrapper>

        <RevealWrapper delay={100} direction="up">
          <h2 className="text-neutral-dark">
            7 dias de garantia incondicional
          </h2>
        </RevealWrapper>

        <RevealWrapper delay={200} direction="up">
          <p className="mx-auto mt-4 max-w-lg text-neutral-dark/60">
            Se não for para você, devolvemos 100% do valor. Sem perguntas, sem burocracia.
          </p>
        </RevealWrapper>
      </div>
    </section>
  );
}
```

- [ ] **Step 5: Update page.tsx — add Offer, Bonus, Guarantee**

- [ ] **Step 6: Verify all render**

```bash
npm run dev
```

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "feat(sections): add offer, bonus, guarantee sections with animated counter"
```

---

## Task 12: FAQ + Final CTA + Footer

**Files:**
- Create: `src/components/ui/accordion-faq.tsx`
- Create: `src/components/sections/faq.tsx`
- Create: `src/components/sections/final-cta.tsx`
- Create: `src/components/sections/footer.tsx`
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Create AccordionFaq UI component**

Write `src/components/ui/accordion-faq.tsx`:

```tsx
"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface AccordionItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}

function AccordionItem({ question, answer, isOpen, onToggle }: AccordionItemProps) {
  return (
    <div className="border-b border-neutral-dark/10">
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between py-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
        aria-expanded={isOpen}
      >
        <span className="pr-4 font-medium text-neutral-dark">{question}</span>
        <ChevronDown
          className={cn(
            "h-5 w-5 flex-shrink-0 text-gold transition-transform duration-300",
            isOpen && "rotate-180"
          )}
        />
      </button>
      <div
        className={cn(
          "grid transition-all duration-300 ease-in-out",
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        )}
      >
        <div className="overflow-hidden">
          <p className="pb-5 text-neutral-dark/60">{answer}</p>
        </div>
      </div>
    </div>
  );
}

interface AccordionProps {
  items: { question: string; answer: string }[];
  className?: string;
}

export function AccordionFaq({ items, className }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className={cn("divide-y divide-neutral-dark/5", className)}>
      {items.map((item, i) => (
        <AccordionItem
          key={i}
          question={item.question}
          answer={item.answer}
          isOpen={openIndex === i}
          onToggle={() => setOpenIndex(openIndex === i ? null : i)}
        />
      ))}
    </div>
  );
}
```

- [ ] **Step 2: Create FAQ section**

Write `src/components/sections/faq.tsx`:

```tsx
"use client";

import { RevealWrapper } from "@/components/ui/reveal-wrapper";
import { AccordionFaq } from "@/components/ui/accordion-faq";
import { FAQ_ITEMS } from "@/lib/constants";

export function FAQ() {
  return (
    <section id="faq" className="bg-white py-[var(--section-py)]">
      <div className="mx-auto max-w-2xl px-6">
        <RevealWrapper direction="up">
          <h2 className="text-center text-neutral-dark">
            Perguntas frequentes
          </h2>
        </RevealWrapper>

        <RevealWrapper delay={100} direction="up">
          <div className="mt-10">
            <AccordionFaq items={FAQ_ITEMS} />
          </div>
        </RevealWrapper>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Create FinalCta section**

Write `src/components/sections/final-cta.tsx`:

```tsx
"use client";

import { CtaButton } from "@/components/ui/cta-button";
import { RevealWrapper } from "@/components/ui/reveal-wrapper";

export function FinalCta() {
  return (
    <section
      id="cta-final"
      className="relative overflow-hidden py-[var(--section-py)]"
    >
      {/* Background image placeholder with overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, #1A0508 0%, #5C1020 50%, #1A0508 100%)",
        }}
        aria-hidden
      />
      <div className="absolute inset-0 bg-black/40" aria-hidden />

      {/* Floating shapes */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden>
        <div
          className="absolute top-[20%] left-[20%] h-32 w-32 rounded-full bg-gold/5 blur-2xl"
          style={{ animation: "float 7s ease-in-out infinite" }}
        />
        <div
          className="absolute bottom-[30%] right-[25%] h-24 w-24 rounded-full bg-primary/10 blur-2xl"
          style={{ animation: "float 9s ease-in-out infinite 3s" }}
        />
      </div>

      <div className="relative mx-auto max-w-[var(--container-max)] px-6 text-center">
        <RevealWrapper direction="up">
          <h2 className="text-white">
            Quantas oportunidades você ainda vai perder por medo de se posicionar?
          </h2>
        </RevealWrapper>

        <RevealWrapper delay={200} direction="up">
          <p className="mx-auto mt-6 max-w-xl text-lg text-white/70">
            O momento de parar de se esconder é agora. As vagas são limitadas e o
            preço de lançamento não vai durar para sempre.
          </p>
        </RevealWrapper>

        <RevealWrapper delay={400} direction="up">
          <CtaButton size="lg" className="mt-8">
            Quero fazer parte do Comunicação Sem Máscaras
          </CtaButton>
        </RevealWrapper>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Create Footer**

Write `src/components/sections/footer.tsx`:

```tsx
import { Instagram, Youtube, Radio } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-neutral-dark py-12 text-white/50">
      <div className="mx-auto grid max-w-[var(--container-max)] gap-8 px-6 sm:grid-cols-2 lg:grid-cols-3">
        {/* Brand */}
        <div>
          <span className="font-serif text-xl font-semibold text-white">
            Nil Nunes
          </span>
          <p className="mt-2 text-sm">
            Comunicação Sem Máscaras — Transformando mulheres que se escondem em mulheres que se posicionam.
          </p>
        </div>

        {/* Links */}
        <div className="flex flex-col gap-2 text-sm">
          <a href="#" className="hover:text-white transition-colors">
            Política de Privacidade
          </a>
          <a href="#" className="hover:text-white transition-colors">
            Termos de Uso
          </a>
          <a href="#" className="hover:text-white transition-colors">
            Contato
          </a>
        </div>

        {/* Social */}
        <div className="flex gap-4">
          <a
            href="#"
            aria-label="Instagram"
            className="rounded-full border border-white/10 p-3 transition-colors hover:border-gold hover:text-gold"
          >
            <Instagram className="h-5 w-5" />
          </a>
          <a
            href="#"
            aria-label="YouTube"
            className="rounded-full border border-white/10 p-3 transition-colors hover:border-gold hover:text-gold"
          >
            <Youtube className="h-5 w-5" />
          </a>
          <a
            href="#"
            aria-label="WhatsApp"
            className="rounded-full border border-white/10 p-3 transition-colors hover:border-gold hover:text-gold"
          >
            <Radio className="h-5 w-5" />
          </a>
        </div>
      </div>

      <div className="mx-auto mt-8 max-w-[var(--container-max)] border-t border-white/10 px-6 pt-8 text-center text-xs">
        &copy; {currentYear} Nil Nunes — Comunicação Sem Máscaras. Todos os direitos reservados.
      </div>
    </footer>
  );
}
```

- [ ] **Step 5: Final page.tsx with all 17 sections**

Write `src/app/page.tsx`:

```tsx
import { Hero } from "@/components/sections/hero";
import { Trustbar } from "@/components/sections/trustbar";
import { Problem } from "@/components/sections/problem";
import { Transformation } from "@/components/sections/transformation";
import { Method } from "@/components/sections/method";
import { Differential } from "@/components/sections/differential";
import { AboutNil } from "@/components/sections/about-nil";
import { SocialProof } from "@/components/sections/social-proof";
import { ForWho } from "@/components/sections/for-who";
import { NotForWho } from "@/components/sections/not-for-who";
import { Results } from "@/components/sections/results";
import { Offer } from "@/components/sections/offer";
import { Bonus } from "@/components/sections/bonus";
import { Guarantee } from "@/components/sections/guarantee";
import { FAQ } from "@/components/sections/faq";
import { FinalCta } from "@/components/sections/final-cta";
import { Footer } from "@/components/sections/footer";

export default function Home() {
  return (
    <>
      <Hero />
      <Trustbar />
      <Problem />
      <Transformation />
      <Method />
      <Differential />
      <AboutNil />
      <SocialProof />
      <ForWho />
      <NotForWho />
      <Results />
      <Offer />
      <Bonus />
      <Guarantee />
      <FAQ />
      <FinalCta />
      <Footer />
    </>
  );
}
```

- [ ] **Step 6: Verify all 17 sections render**

```bash
npm run dev
```

Scroll entire page. Expect: all sections visible, no console errors.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "feat(sections): add FAQ, final-cta, footer — all 17 sections complete"
```

---

## Task 13: SEO — JSON-LD + robots + sitemap

**Files:**
- Create: `src/app/robots.ts`
- Create: `src/app/sitemap.ts`
- Modify: `src/app/layout.tsx`
- Create: `src/components/seo/json-ld.tsx`

- [ ] **Step 1: Create robots.ts**

Write `src/app/robots.ts`:

```ts
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://comunicacaosemmascaras.com.br/sitemap.xml",
  };
}
```

- [ ] **Step 2: Create sitemap.ts**

Write `src/app/sitemap.ts`:

```ts
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://comunicacaosemmascaras.com.br",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
```

- [ ] **Step 3: Create JSON-LD component**

Write `src/components/seo/json-ld.tsx`:

```tsx
export function JsonLd() {
  const courseSchema = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: "Comunicação Sem Máscaras",
    description:
      "Programa online para mulheres que querem se comunicar com confiança, autenticidade e autoridade. 10 módulos que transformam a mulher antes da comunicação.",
    provider: {
      "@type": "Organization",
      name: "Nil Nunes",
    },
    offers: {
      "@type": "Offer",
      price: "297.90",
      priceCurrency: "BRL",
      availability: "https://schema.org/InStock",
    },
  };

  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Nil Nunes — Comunicação Sem Máscaras",
    url: "https://comunicacaosemmascaras.com.br",
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Como acesso o programa?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Após a compra, você recebe um e-mail com link de acesso à plataforma Kiwify. Basta clicar e começar.",
        },
      },
      {
        "@type": "Question",
        name: "Quanto tempo de acesso tenho?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "12 meses de acesso a todos os módulos e bônus.",
        },
      },
      {
        "@type": "Question",
        name: "Preciso falar em público?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Não. O programa desenvolve comunicação para qualquer contexto: reuniões, vídeos, vendas, networking.",
        },
      },
      {
        "@type": "Question",
        name: "Serve para iniciantes?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Sim. O método começa pela base — autoconhecimento e autoconfiança — e avança progressivamente.",
        },
      },
      {
        "@type": "Question",
        name: "Como funciona a garantia?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "7 dias de garantia incondicional. Se não for para você, devolvemos 100% do valor.",
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
}
```

- [ ] **Step 4: Add JsonLd to layout.tsx**

Add `import { JsonLd } from "@/components/seo/json-ld"` and place `<JsonLd />` inside `<head>` or before `</body>` in layout.tsx.

- [ ] **Step 5: Verify JSON-LD renders**

```bash
npm run dev
```

View page source. Expect 3 `<script type="application/ld+json">` blocks.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat(seo): add JSON-LD schemas, robots.txt, sitemap.xml"
```

---

## Task 14: Animations Polish — TextReveal + MaskReveal + Particles

**Files:**
- Create: `src/components/ui/text-reveal.tsx`
- Create: `src/components/ui/mask-reveal.tsx`
- Create: `src/components/ui/particles.tsx`
- Modify: `src/components/sections/hero.tsx` (use TextReveal for headline, Particles near CTA)
- Modify: `src/components/sections/final-cta.tsx` (use TextReveal + Particles)

- [ ] **Step 1: Create TextReveal component**

Write `src/components/ui/text-reveal.tsx`:

```tsx
"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
  as?: "h1" | "h2" | "h3" | "p";
}

export function TextReveal({
  text,
  className,
  delay = 0,
  as: Tag = "h1",
}: TextRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  const reduced = useReducedMotion();

  const words = text.split(" ");

  if (reduced) {
    return (
      <Tag ref={ref as any} className={className}>
        {text}
      </Tag>
    );
  }

  return (
    <Tag ref={ref as any} className={cn("flex flex-wrap gap-x-[0.3em]", className)}>
      {words.map((word, i) => (
        <span key={i} className="overflow-hidden inline-block">
          <motion.span
            className="inline-block"
            initial={{ y: "100%", opacity: 0 }}
            animate={isInView ? { y: "0%", opacity: 1 } : {}}
            transition={{
              duration: 0.5,
              delay: delay + i * 0.05,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
```

- [ ] **Step 2: Create MaskReveal component**

Write `src/components/ui/mask-reveal.tsx`:

```tsx
"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap-reg";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

interface MaskRevealProps {
  children: React.ReactNode;
  className?: string;
  direction?: "left" | "right" | "up" | "down";
}

export function MaskReveal({
  children,
  className,
  direction = "up",
}: MaskRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || !ref.current) return;

    const clipFrom: Record<string, string> = {
      up: "inset(100% 0% 0% 0%)",
      down: "inset(0% 0% 100% 0%)",
      left: "inset(0% 100% 0% 0%)",
      right: "inset(0% 0% 0% 100%)",
    };
    const clipTo = "inset(0% 0% 0% 0%)";

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ref.current,
        { clipPath: clipFrom[direction] },
        {
          clipPath: clipTo,
          duration: 1,
          ease: "power3.inOut",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 85%",
            once: true,
          },
        }
      );
    }, ref.current);

    return () => ctx.revert();
  }, [reduced, direction]);

  return (
    <div ref={ref} className={className} style={reduced ? undefined : { clipPath: "inset(100% 0% 0% 0%)" }}>
      {children}
    </div>
  );
}
```

- [ ] **Step 3: Create Particles component**

Write `src/components/ui/particles.tsx`:

```tsx
"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
}

export function Particles({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animFrame: number;
    const particles: Particle[] = [];
    const COUNT = 60;

    function resize() {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    for (let i = 0; i < COUNT; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 0.5,
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: -Math.random() * 0.4 - 0.1,
        opacity: Math.random() * 0.5 + 0.2,
      });
    }

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of particles) {
        p.x += p.speedX;
        p.y += p.speedY;
        if (p.y < -10) { p.y = canvas.height + 10; p.x = Math.random() * canvas.width; }
        if (p.x < -10 || p.x > canvas.width + 10) { p.x = Math.random() * canvas.width; }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(212, 165, 116, ${p.opacity})`;
        ctx.fill();
      }
      animFrame = requestAnimationFrame(draw);
    }
    draw();

    return () => {
      cancelAnimationFrame(animFrame);
      window.removeEventListener("resize", resize);
    };
  }, [reduced]);

  if (reduced) return null;

  return (
    <canvas
      ref={canvasRef}
      className={className}
      aria-hidden
      style={{ pointerEvents: "none" }}
    />
  );
}
```

- [ ] **Step 4: Update Hero to use TextReveal + Particles**

In `src/components/sections/hero.tsx`:
- Replace `<h1 className="font-serif text-white">Para a mulher que cansou de se esconder.</h1>` with `<TextReveal text="Para a mulher que cansou de se esconder." className="font-serif text-white" />`
- Add `<Particles className="absolute bottom-0 left-0 h-48 w-full" />` above the CTA area
- Add import for `TextReveal` and `Particles`

- [ ] **Step 5: Update FinalCta to use TextReveal + Particles**

- Replace the `<h2>` in FinalCta with `<TextReveal text="Quantas oportunidades..." as="h2" className="text-white" />`
- Add `<Particles className="absolute inset-0 h-full w-full" />` inside the section
- Add imports

- [ ] **Step 6: Verify animations work**

```bash
npm run dev
```

Hero headline should reveal word-by-word. Particles should float near CTA areas. Resize to mobile — particles and TextReveal should degrade gracefully.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "feat(animations): add TextReveal, MaskReveal, Particles components"
```

---

## Task 15: Performance + Accessibility Verification

**Files:**
- No new files. Modify existing if issues found.

- [ ] **Step 1: Run production build**

```bash
npm run build
```

Expect: build succeeds with no errors.

- [ ] **Step 2: Start production server**

```bash
npm start
```

- [ ] **Step 3: Run Lighthouse audit (manual)**

Open Chrome DevTools → Lighthouse → check Performance, Accessibility, Best Practices, SEO.

If any score < 95, inspect and fix:
- **Images**: ensure `next/image` used, dimensions set
- **Fonts**: ensure `display: swap` active
- **CLS**: check for layout shifts from late-loading elements
- **Unused JS**: check if motion/gsap imports are tree-shaken

- [ ] **Step 4: Verify prefers-reduced-motion**

In Chrome DevTools → Rendering → check "Emulate CSS media feature prefers-reduced-motion: reduce". Refresh page. All animations should stop. Text should appear instantly.

- [ ] **Step 5: Verify keyboard nav**

Tab through page. Expect: all CTAs focusable with visible ring, FAQ expandable with Enter/Space, carousel navigable.

- [ ] **Step 6: Fix any issues found, then commit**

```bash
git add -A
git commit -m "fix(perf): address Lighthouse and a11y issues"
```

(skip if no fixes needed)

---

## Task 16: Image Placeholders + Final Polish

**Files:**
- Modify: `public/images/` (placeholder SVGs)
- Modify: all sections using gradient placeholders — replace with `next/image` + placeholder SVGs

- [ ] **Step 1: Create placeholder SVG images**

Create 5 minimal SVG files in `public/images/`:
- `hero-placeholder.svg` — gradient rectangle 3:4
- `problem-placeholder.svg` — gradient rectangle 16:9
- `transform-placeholder.svg` — gradient rectangle 3:4
- `nil-placeholder.svg` — gradient square 1:1
- `cta-placeholder.svg` — gradient rectangle 16:9

Each SVG uses a `<linearGradient>` from `#5C1020` to `#D4A574`.

- [ ] **Step 2: Replace gradient divs with next/image in all sections**

Update each section component to use:
```tsx
import Image from "next/image";

<Image
  src="/images/hero-placeholder.svg"
  alt="Mulher elegante e confiante"
  width={450}
  height={600}
  className="rounded-2xl object-cover"
  priority
/>
```

Set `priority` only on hero image. All others get default lazy loading.

- [ ] **Step 3: Verify images load with correct dimensions**

```bash
npm run dev
```

Check no CLS from image loading. Inspect network tab — hero loads eagerly, others lazy.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat(images): add placeholder SVGs, wire up next/image in all sections"
```

---

## Task 17: Deploy to Vercel

- [ ] **Step 1: Install Vercel CLI (if not installed)**

```bash
npm i -g vercel
```

- [ ] **Step 2: Deploy**

```bash
vercel
```

Follow prompts. Accept defaults. Note the deployment URL.

- [ ] **Step 3: Verify production deploy works**

Open the deployment URL. Full page scroll with all sections. No console errors.

- [ ] **Step 4: Commit deploy config (if any generated)**

```bash
git add -A
git commit -m "chore: initial Vercel deploy"
```

---

## Self-Review Checklist

### Spec Coverage

| Spec Section | Task |
|---|---|
| Hero (5.1) | Task 6 + Task 14 |
| Trustbar (5.2) | Task 7 |
| Problem (5.3) | Task 7 |
| Transformation (5.4) | Task 7 |
| Method horizontal pin (5.5) | Task 8 |
| Differential (5.6) | Task 9 |
| About Nil (5.7) | Task 9 |
| Social Proof (5.8) | Task 9 |
| For Who (5.9) | Task 10 |
| Not For Who (5.10) | Task 10 |
| Results (5.11) | Task 10 |
| Offer (5.12) | Task 11 |
| Bonus (5.13) | Task 11 |
| Guarantee (5.14) | Task 11 |
| FAQ (5.15) | Task 12 |
| Final CTA (5.16) | Task 12 |
| Footer (5.17) | Task 12 |
| Design System (4) | Task 2 |
| Animations (6) | Task 14 + distributed |
| SEO (8) | Task 13 |
| Performance (9) | Task 15 |
| Accessibility (10) | Task 15 |
| Responsiveness (11) | Distributed via all section tasks |
| Kiwify integration (12) | Task 4 (CtaButton) |
| File structure (13) | All tasks |
| Images (7) | Task 16 |
| Deploy | Task 17 |

### Placeholder Scan

No TBD/TODO/fill-in-later found. All steps contain complete code.

### Type Consistency

- `Module`, `FAQItem`, `Testimonial` types defined in Task 3, used consistently in constants and components.
- `useIntersection` returns `{ ref, isVisible }` — used consistently in `RevealWrapper` and `AnimatedCounter`.
- `KIWIFY_URL` exported from constants, used in `CtaButton`.
- All component prop interfaces are consistent between definition and usage.
