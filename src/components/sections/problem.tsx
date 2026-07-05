"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
} from "motion/react";
import Image from "next/image";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

const PAIN_POINTS = [
  "Você trava toda vez que precisa falar em público ou em reuniões",
  "Pensa depois no que deveria ter dito — e fica remoendo",
  "O medo de julgamentos te impede de se posicionar",
  "Você evita gravar vídeos ou criar conteúdo",
  "Tem dificuldade para vender suas ideias ou serviços",
  "Sente que vive muito abaixo do seu potencial",
];

const POWER_POINTS = [
  "Você fala com clareza e presença em qualquer situação",
  "Sabe exatamente o que dizer — e diz no momento certo",
  "Se posiciona sem medo, com segurança e autenticidade",
  "Grava vídeos com naturalidade e conecta de verdade",
  "Vende suas ideias e serviços com leveza e verdade",
  "Vive no nível que sempre soube que merecia",
];

const PAIN_QUOTE =
  "Muitas mulheres não têm falta de potencial. Têm excesso de medo.";
const POWER_QUOTE =
  "Quando a mulher se permite existir sem máscara, o mundo faz silêncio para ouvir.";

export function Problem() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // ── PAIN PANEL: enter 0→0.05, visible 0.05→0.52, exit 0.52→0.64 ──
  const painPanelOpacity = useTransform(
    scrollYProgress,
    [0.00, 0.05, 0.52, 0.64],
    [0, 1, 1, 0]
  );
  const painPanelY = useTransform(
    scrollYProgress,
    [0.52, 0.64],
    [0, -30]
  );

  // pain lines: each enters in 0.04→0.34
  const painLineMotions = PAIN_POINTS.map((_, i) => ({
    opacity: useTransform(
      scrollYProgress,
      [0.04 + i * 0.05, 0.04 + i * 0.05 + 0.04],
      [0, 1]
    ),
    y: useTransform(
      scrollYProgress,
      [0.04 + i * 0.05, 0.04 + i * 0.05 + 0.04],
      [15, 0]
    ),
  }));

  // ── LOCK PANEL: enter 0.38→0.48, exit 0.54→0.64 ──
  const lockEnterOpacity = useTransform(
    scrollYProgress,
    [0.38, 0.48],
    [0, 1]
  );
  const lockExitOpacity = useTransform(
    scrollYProgress,
    [0.54, 0.64],
    [1, 0]
  );
  const lockOpacity = useTransform(
    [lockEnterOpacity, lockExitOpacity],
    ([a, b]) => Math.min(a as number, b as number)
  );
  const lockScale = useTransform(
    scrollYProgress,
    [0.38, 0.48],
    [0.8, 1]
  );

  // ── POWER PANEL: enter 0.66→0.76, visible 0.76→0.96, exit 0.96→1.00 ──
  const powerPanelOpacity = useTransform(
    scrollYProgress,
    [0.64, 0.76, 0.96, 1.00],
    [0, 1, 1, 0]
  );
  const powerPanelY = useTransform(
    scrollYProgress,
    [0.64, 0.76],
    [30, 0]
  );

  // power lines: each enters in 0.70→0.93
  const powerLineMotions = POWER_POINTS.map((_, i) => ({
    opacity: useTransform(
      scrollYProgress,
      [0.70 + i * 0.04, 0.70 + i * 0.04 + 0.04],
      [0, 1]
    ),
    y: useTransform(
      scrollYProgress,
      [0.70 + i * 0.04, 0.70 + i * 0.04 + 0.04],
      [15, 0]
    ),
  }));

  // ── IMAGE CROSS-FADE ── (explicit hold at 1.00: without it, Motion's
  // native scroll-timeline optimization wraps the tail back to the first value)
  const imageBeforeOpacity = useTransform(
    scrollYProgress,
    [0.52, 0.70, 1.00],
    [1, 0, 0]
  );
  const imageAfterOpacity = useTransform(
    scrollYProgress,
    [0.64, 0.82, 1.00],
    [0, 1, 1]
  );

  // ── BG GLOW ──
  const bgGlowOpacity = useTransform(
    scrollYProgress,
    [0.30, 0.70],
    [0, 1]
  );

  // ── PROGRESS BAR ──
  const progressBarScale = useTransform(
    scrollYProgress,
    [0, 1],
    [0, 1]
  );

  const pinHeight = "600vh";

  if (reduced) {
    return (
      <section
        id="problema"
        className="relative overflow-hidden bg-neutral-dark py-[var(--section-py)]"
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 30% 40%, color-mix(in srgb, var(--color-secondary) 40%, transparent) 0%, var(--color-neutral-dark) 60%)",
          }}
          aria-hidden
        />
        <div className="relative z-10 mx-auto max-w-[var(--container-max)] px-6 lg:grid lg:grid-cols-2 lg:gap-16 lg:items-center">
          <div className="mx-auto aspect-[3/4] w-full max-w-xs overflow-hidden rounded-2xl shadow-2xl shadow-primary/20 md:max-w-sm">
            <Image
              src="/images/problem-placeholder.png"
              alt="Mulher frustrada tentando se comunicar"
              fill
              className="object-cover"
              priority
              sizes="340px"
            />
          </div>
          <div>
            <h2 className="text-white">Você sente que...</h2>
            <ul className="mt-8 space-y-4">
              {PAIN_POINTS.map((point, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 text-white/70"
                >
                  <span className="mt-1.5 block h-2 w-2 flex-shrink-0 rounded-full bg-primary" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
            <p className="mt-10 border-l-4 border-gold/40 pl-4 font-serif text-xl font-medium italic text-white/60">
              {PAIN_QUOTE}
            </p>
            <hr className="my-12 border-gold/15" />
            <h2 className="text-white">Imagine viver assim...</h2>
            <ul className="mt-8 space-y-4">
              {POWER_POINTS.map((point, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 text-white/80"
                >
                  <span className="mt-1.5 block h-2 w-2 flex-shrink-0 rounded-full bg-gold" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
            <p className="mt-10 border-l-4 border-gold pl-4 font-serif text-xl font-medium italic text-white">
              {POWER_QUOTE}
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="problema"
      ref={sectionRef}
      className="relative"
      style={{ height: pinHeight }}
    >
      <div
        className="sticky top-0 flex h-screen flex-col items-center justify-center overflow-hidden"
        style={{
          background:
            "radial-gradient(ellipse at 50% 40%, color-mix(in srgb, var(--color-secondary) 40%, transparent) 0%, var(--color-neutral-dark) 70%, var(--color-neutral-dark) 100%)",
        }}
      >
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at 50% 45%, color-mix(in srgb, var(--color-gold) 10%, transparent) 0%, transparent 60%)",
            opacity: bgGlowOpacity,
          }}
          aria-hidden
        />

        <div
          className="relative z-10 mx-auto flex w-full max-w-[var(--container-max)] items-center gap-8 px-6 lg:gap-16"
          style={{ minHeight: "min(80vh, 600px)" }}
        >
          {/* ── IMAGE COLUMN ── */}
          <div className="relative hidden flex-shrink-0 lg:block">
            <div className="relative aspect-[3/4] w-[280px] overflow-hidden rounded-2xl shadow-2xl shadow-primary/30 xl:w-[340px]">
              <motion.div
                className="absolute inset-0"
                style={{ opacity: imageBeforeOpacity }}
              >
                <Image
                  src="/images/problem-placeholder.png"
                  alt="Mulher frustrada tentando se comunicar"
                  fill
                  className="object-cover"
                  priority
                  sizes="340px"
                />
              </motion.div>
              <motion.div
                className="absolute inset-0"
                style={{ opacity: imageAfterOpacity }}
              >
                <Image
                  src="/images/problem-after-placeholder.png"
                  alt="Mulher confiante e realizada"
                  fill
                  className="object-cover"
                  sizes="340px"
                />
              </motion.div>
            </div>
          </div>

          {/* ── TEXT COLUMN (3 stacked panels) ── */}
          <div className="relative flex-1" style={{ minHeight: "min(55vh, 440px)" }}>

            {/* PAIN PANEL */}
            <motion.div
              className="absolute inset-0 flex flex-col justify-center"
              style={{ opacity: painPanelOpacity, y: painPanelY }}
            >
              <h2 className="text-white">Você sente que...</h2>
              <ul className="mt-8 space-y-4">
                {PAIN_POINTS.map((point, i) => (
                  <motion.li
                    key={i}
                    className="flex items-start gap-3 text-white/70"
                    style={{
                      opacity: painLineMotions[i].opacity,
                      y: painLineMotions[i].y,
                    }}
                  >
                    <span className="mt-1.5 block h-2 w-2 flex-shrink-0 rounded-full bg-primary/60" />
                    <span>{point}</span>
                  </motion.li>
                ))}
              </ul>
              <p className="mt-10 border-l-4 border-gold/40 pl-4 font-serif text-xl font-medium italic text-white/60">
                {PAIN_QUOTE}
              </p>
            </motion.div>

            {/* POWER PANEL */}
            <motion.div
              className="absolute inset-0 flex flex-col justify-center"
              style={{ opacity: powerPanelOpacity, y: powerPanelY }}
            >
              <h2 className="text-white">Imagine viver assim...</h2>
              <ul className="mt-8 space-y-4">
                {POWER_POINTS.map((point, i) => (
                  <motion.li
                    key={i}
                    className="flex items-start gap-3 text-white/80"
                    style={{
                      opacity: powerLineMotions[i].opacity,
                      y: powerLineMotions[i].y,
                    }}
                  >
                    <span className="mt-1.5 block h-2 w-2 flex-shrink-0 rounded-full bg-gold" />
                    <span>{point}</span>
                  </motion.li>
                ))}
              </ul>
              <motion.p
                className="mt-10 border-l-4 border-gold pl-4 font-serif text-xl font-medium italic text-white"
                style={{
                  opacity: useTransform(
                    scrollYProgress,
                    [0.92, 0.97],
                    [0, 1]
                  ),
                }}
              >
                {POWER_QUOTE}
              </motion.p>
            </motion.div>
          </div>
        </div>

        {/* LOCK PANEL — anchored to bottom of viewport, never overlaps the text column */}
        <motion.div
          className="pointer-events-none absolute inset-x-0 bottom-8 z-30 flex flex-col items-center gap-3 md:bottom-12"
          style={{
            opacity: lockOpacity,
            scale: lockScale,
          }}
          aria-hidden
        >
          <div
            className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-gold/30 bg-neutral-dark/80 backdrop-blur-md"
            style={{
              boxShadow:
                "0 0 28px color-mix(in srgb, var(--color-gold) 18%, transparent)",
            }}
          >
            <svg
              className="h-6 w-6 text-gold"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
              aria-hidden
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
              />
            </svg>
          </div>
          <span className="text-xs tracking-[0.3em] text-gold/70 uppercase">
            Continue descendo
          </span>
        </motion.div>

        {/* ── PROGRESS BAR ── */}
        <motion.div
          className="absolute inset-x-0 bottom-0 z-10 h-1 origin-left bg-gradient-to-r from-primary via-gold to-primary"
          style={{ scaleX: progressBarScale }}
          aria-hidden
        />
      </div>
    </section>
  );
}
