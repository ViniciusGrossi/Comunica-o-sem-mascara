"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { CtaButton } from "@/components/ui/cta-button";
import { RevealWrapper } from "@/components/ui/reveal-wrapper";
import { Particles } from "@/components/ui/particles";
import { BackgroundPaths } from "@/components/ui/background-paths";
import { ShineBorder } from "@/components/ui/shine-border";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { KIWIFY_URL } from "@/lib/constants";
import Image from "next/image";

const TRUST_BADGES = [
  "Acesso imediato",
  "12 meses de acesso",
  "Plataforma Kiwify",
  "7 dias de garantia",
];

const STATS = [
  { value: 200, suffix: "+", label: "mulheres impactadas" },
  { value: 12, suffix: "", label: "anos de metodologia" },
  { value: 97, suffix: "%", label: "taxa de satisfação" },
];

function NumberTicker({
  value,
  suffix = "",
  className = "",
}: {
  value: number;
  suffix?: string;
  className?: string;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 2000;
          const start = performance.now();
          const step = (now: number) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * value));
            if (progress < 1) requestAnimationFrame(step);
            else setCount(value);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [value]);

  return (
    <span ref={ref} className={className}>
      {count}
      {suffix}
    </span>
  );
}

/** Hand-drawn gold underline that draws itself in */
function GoldUnderline({ animate }: { animate: boolean }) {
  return (
    <svg
      className="absolute -bottom-2 left-0 w-full"
      viewBox="0 0 300 20"
      fill="none"
      preserveAspectRatio="none"
      aria-hidden
    >
      <motion.path
        d="M4 14 C 60 6, 150 4, 296 10"
        stroke="var(--color-gold)"
        strokeWidth={4}
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={animate ? { pathLength: 1, opacity: 0.9 } : {}}
        transition={{ duration: 0.9, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
      />
    </svg>
  );
}

/** Editorial line-mask headline reveal */
function HeroHeadline({ reduced }: { reduced: boolean }) {
  const emphasis = (
    <span className="relative inline-block whitespace-nowrap">
      <em className="text-gold-gradient font-medium">se esconder.</em>
      {!reduced && <GoldUnderline animate />}
      {reduced && (
        <svg
          className="absolute -bottom-2 left-0 w-full"
          viewBox="0 0 300 20"
          fill="none"
          preserveAspectRatio="none"
          aria-hidden
        >
          <path
            d="M4 14 C 60 6, 150 4, 296 10"
            stroke="var(--color-gold)"
            strokeWidth={4}
            strokeLinecap="round"
            opacity={0.9}
          />
        </svg>
      )}
    </span>
  );

  if (reduced) {
    return (
      <h1 className="font-serif text-white">
        Para a mulher que
        <br />
        cansou de {emphasis}
      </h1>
    );
  }

  const lines: React.ReactNode[] = [
    "Para a mulher que",
    <>cansou de {emphasis}</>,
  ];

  return (
    <h1 className="font-serif text-white">
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-1">
          <motion.span
            className="block"
            initial={{ y: "110%" }}
            animate={{ y: "0%" }}
            transition={{
              duration: 0.9,
              delay: 0.15 + i * 0.15,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </h1>
  );
}

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const imageRotate = useTransform(scrollYProgress, [0, 1], [0, -2]);

  if (reduced) {
    return (
      <section
        id="hero"
        className="relative min-h-screen overflow-hidden bg-neutral-dark pt-20"
      >
        <div
          className="absolute inset-0 opacity-60"
          style={{
            background:
              "radial-gradient(ellipse at 70% 50%, var(--color-secondary) 0%, var(--color-neutral-dark) 70%)",
          }}
          aria-hidden
        />
        <div className="relative mx-auto flex max-w-[var(--container-max)] flex-col items-center gap-12 px-6 py-[var(--section-py)] lg:flex-row lg:gap-16">
          <div className="flex flex-1 flex-col items-center text-center lg:items-start lg:text-left">
            <span className="eyebrow mb-6 text-gold">
              Programa Comunicação Sem Máscaras
            </span>
            <HeroHeadline reduced />
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-white/70">
              Aprenda a se comunicar com confiança, autenticidade e autoridade
              para ocupar os espaços que deseja — sem medo de julgamentos.
            </p>
            <a
              href={KIWIFY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center justify-center rounded-full bg-primary px-8 py-4 text-base font-semibold text-white hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-dark"
            >
              Quero fazer parte do Comunicação Sem Máscaras
            </a>
            <ShineBorder className="mt-8 w-full max-w-md lg:mt-0 lg:max-w-lg">
              <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl">
                <Image
                  src="/images/hero-placeholder.png"
                  alt="Mulher elegante e confiante"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </ShineBorder>
          </div>
        </div>
        <div className="absolute inset-x-0 bottom-0 z-20 border-t border-gold/10 bg-neutral-dark/90 px-6 py-5 backdrop-blur-md">
          <div className="mx-auto flex max-w-[var(--container-max)] flex-col items-center gap-4 sm:flex-row sm:justify-between">
            <p className="font-serif text-lg italic text-white/80">
              Sua transformação começa agora.
            </p>
            <CtaButton size="default" className="text-sm">
              Quero fazer parte
            </CtaButton>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden bg-neutral-dark pt-20"
    >
      <div
        className="absolute inset-0 opacity-60"
        style={{
          background:
            "radial-gradient(ellipse at 70% 50%, #5C1020 0%, #1A0508 70%)",
        }}
        aria-hidden
      />

      <BackgroundPaths />

      {/* Vignette for depth */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, transparent 55%, color-mix(in srgb, var(--color-neutral-dark) 55%, transparent) 100%)",
        }}
        aria-hidden
      />

      <div className="relative mx-auto flex max-w-[var(--container-max)] flex-col items-center gap-12 px-6 py-[var(--section-py)] pb-32 lg:flex-row lg:gap-16">
        <div className="flex flex-1 flex-col items-center text-center lg:items-start lg:text-left">
          <RevealWrapper direction="none" delay={0}>
            <span className="eyebrow mb-6 text-gold">
              Programa Comunicação Sem Máscaras
            </span>
          </RevealWrapper>

          <HeroHeadline reduced={false} />

          <RevealWrapper direction="up" delay={300}>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-white/70">
              Aprenda a se comunicar com confiança, autenticidade e autoridade
              para ocupar os espaços que deseja — sem medo de julgamentos.
            </p>
          </RevealWrapper>

          <RevealWrapper direction="up" delay={400}>
            <Particles className="absolute bottom-0 left-0 h-48 w-full" />
            <CtaButton size="lg" className="mt-8">
              Quero fazer parte do Comunicação Sem Máscaras
            </CtaButton>
          </RevealWrapper>

          <RevealWrapper direction="up" delay={500}>
            <div className="mt-4 flex flex-wrap justify-center gap-3 lg:justify-start">
              {TRUST_BADGES.map((badge) => (
                <span
                  key={badge}
                  className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/60"
                >
                  <span className="block h-1 w-1 rounded-full bg-gold" aria-hidden />
                  {badge}
                </span>
              ))}
            </div>
          </RevealWrapper>

          <RevealWrapper direction="up" delay={600}>
            <div className="mt-10 flex divide-x divide-gold/15">
              {STATS.map((stat, i) => (
                <div
                  key={stat.label}
                  className={`text-center lg:text-left ${i === 0 ? "pr-6 lg:pr-8" : "px-6 lg:px-8"}`}
                >
                  <span className="block font-serif text-3xl font-semibold text-gold md:text-4xl">
                    <NumberTicker value={stat.value} suffix={stat.suffix} />
                  </span>
                  <span className="mt-1 block text-xs text-white/50 md:text-sm">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </RevealWrapper>
        </div>

        <div className="relative flex-1">
          <RevealWrapper direction="none" delay={300}>
            <motion.div
              style={{
                y: imageY,
                scale: imageScale,
                rotate: imageRotate,
              }}
            >
              <ShineBorder className="w-full max-w-md lg:max-w-lg">
                <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl">
                  <Image
                    src="/images/hero-placeholder.png"
                    alt="Mulher elegante e confiante"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </ShineBorder>
            </motion.div>

            <div className="mt-4 flex items-center justify-center gap-2 lg:justify-start">
              <div className="flex -space-x-2">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="h-8 w-8 rounded-full border-2 border-neutral-dark bg-gradient-to-br from-primary to-gold"
                    style={{ opacity: 0.4 + i * 0.2 }}
                  />
                ))}
              </div>
              <span className="text-sm text-white/60">
                +200 mulheres já transformaram sua comunicação
              </span>
            </div>
          </RevealWrapper>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 z-20 bg-neutral-dark/90 px-6 py-5 backdrop-blur-md">
        <div
          className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent"
          aria-hidden
        />
        <div className="mx-auto flex max-w-[var(--container-max)] flex-col items-center gap-4 sm:flex-row sm:justify-between">
          <p className="font-serif text-lg italic text-white/80">
            Sua transformação começa agora.
          </p>
          <CtaButton size="default" className="text-sm">
            Quero fazer parte
          </CtaButton>
        </div>
      </div>
    </section>
  );
}
