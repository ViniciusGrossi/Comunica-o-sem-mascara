"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
} from "motion/react";
import { Mic, BookOpen, Radio, Users, Sparkles, Award } from "lucide-react";
import Image from "next/image";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

const AUTHORITIES = [
  { icon: Mic, label: "Comunicadora" },
  { icon: Award, label: "Palestrante" },
  { icon: BookOpen, label: "12 livros publicados" },
  { icon: Radio, label: "Radialista" },
  { icon: Users, label: "Mentora" },
  { icon: Sparkles, label: "Criadora da metodologia" },
];

const BIO_LINES = [
  "Comunicadora, palestrante,",
  "escritora de 12 livros e radialista.",
  "Nyll criou o método Comunicação Sem Máscaras",
  "após décadas ajudando mulheres",
  "a encontrarem a própria voz.",
];

const QUOTE_LINES = [
  "Quando a mulher se permite",
  "existir sem máscaras,",
  "a comunicação deixa de ser",
  "uma performance e se torna",
  "consequência de quem ela é.",
];

const SIG_LINE_1 = "Nyll";
const SIG_LINE_2 = "Nunes";

const SIG_START = 0.55;
const SIG_DRAW_END = 0.96;
const SIG_WORD_DRAW = 0.18;

const SIG_FONT_FAMILY =
  '"Dancing Script", "Dancing Script Bold", cursive';
const SIG_STROKE_W = 2.5;

const SIG_FONT_SIZE = 180;
const SIG_LINE1_BASELINE_Y = 150;
const SIG_LINE2_BASELINE_Y = 350;
const SIG_TEXT_X = 20;
const SIG_VIEWBOX_W = 700;
const SIG_VIEWBOX_H = 440;

function SigWord({
  word,
  x,
  y,
  start,
  scrollYProgress,
  clipId,
}: {
  word: string;
  x: number;
  y: number;
  start: number;
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
  clipId: string;
}) {
  const wordOpacity = useTransform(
    scrollYProgress,
    [start, start + 0.02, SIG_DRAW_END, 1],
    [0, 0.6, 0.6, 0.5],
  );

  const revealProgress = useTransform(
    scrollYProgress,
    [start, start + SIG_WORD_DRAW],
    [0, SIG_VIEWBOX_W],
  );

  const [clipW, setClipW] = useState(0);
  useEffect(() => {
    const unsub = revealProgress.on("change", (v) => setClipW(v));
    return unsub;
  }, [revealProgress]);

  return (
    <motion.g style={{ opacity: wordOpacity }}>
      <defs>
        <clipPath id={clipId}>
          <rect x={x} y={y - SIG_FONT_SIZE} width={clipW} height={SIG_FONT_SIZE * 1.3} />
        </clipPath>
      </defs>
      <text
        x={x}
        y={y}
        fill="var(--color-gold)"
        stroke="var(--color-gold)"
        strokeWidth={SIG_STROKE_W}
        strokeLinecap="round"
        strokeLinejoin="round"
        fontFamily={SIG_FONT_FAMILY}
        fontStyle="italic"
        fontWeight={700}
        fontSize={SIG_FONT_SIZE}
        clipPath={`url(#${clipId})`}
      >
        {word}
      </text>
    </motion.g>
  );
}

export function AboutNil() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const labelOpacity = useTransform(scrollYProgress, [0.02, 0.07, 0.94, 1.00], [0, 1, 1, 1]);
  const labelY = useTransform(scrollYProgress, [0.02, 0.07], [15, 0]);

  const titleOpacity = useTransform(scrollYProgress, [0.05, 0.11, 0.94, 1.00], [0, 1, 1, 1]);
  const titleY = useTransform(scrollYProgress, [0.05, 0.11], [15, 0]);

  const bioLineStart = 0.11;
  const bioLineSpan = 0.04;
  const bioLineMotions = BIO_LINES.map((_, i) => {
    const from = bioLineStart + i * bioLineSpan;
    return {
      opacity: useTransform(scrollYProgress, [from, from + bioLineSpan, 0.94, 1.00], [0, 1, 1, 1]),
      y: useTransform(scrollYProgress, [from, from + bioLineSpan], [15, 0]),
    };
  });

  const badgeStart = 0.34;
  const badgeSpan = 0.03;
  const badgeMotions = AUTHORITIES.map((_, i) => {
    const from = badgeStart + i * badgeSpan;
    return {
      opacity: useTransform(scrollYProgress, [from, from + badgeSpan, 0.94, 1.00], [0, 1, 1, 1]),
      y: useTransform(scrollYProgress, [from, from + badgeSpan], [12, 0]),
    };
  });

  const dividerOpacity = useTransform(scrollYProgress, [0.62, 0.67, 0.94, 1.00], [0, 1, 1, 1]);

  const quoteLineStart = 0.67;
  const quoteLineSpan = 0.035;
  const quoteLineMotions = QUOTE_LINES.map((_, i) => {
    const from = quoteLineStart + i * quoteLineSpan;
    return {
      opacity: useTransform(scrollYProgress, [from, from + quoteLineSpan, 0.94, 1.00], [0, 1, 1, 1]),
      y: useTransform(scrollYProgress, [from, from + quoteLineSpan], [15, 0]),
    };
  });

  const figcaptionOpacity = useTransform(scrollYProgress, [0.84, 0.90, 0.94, 1.00], [0, 1, 1, 1]);
  const figcaptionY = useTransform(scrollYProgress, [0.84, 0.90], [10, 0]);

  const pinHeight = "600vh";

  const sigSvg = (
    <svg
      viewBox={`-20 -20 ${SIG_VIEWBOX_W + 20} ${SIG_VIEWBOX_H + 20}`}
      fill="none"
      className="h-full w-full"
      preserveAspectRatio="xMinYMid meet"
      aria-hidden
    >
      <SigWord
        word={SIG_LINE_1}
        x={SIG_TEXT_X}
        y={SIG_LINE1_BASELINE_Y}
        start={SIG_START}
        scrollYProgress={scrollYProgress}
        clipId="sig-l1"
      />
      <SigWord
        word={SIG_LINE_2}
        x={SIG_TEXT_X}
        y={SIG_LINE2_BASELINE_Y}
        start={SIG_START + 0.22}
        scrollYProgress={scrollYProgress}
        clipId="sig-l2"
      />
    </svg>
  );

  if (reduced) {
    return (
      <section
        id="sobre"
        className="relative overflow-hidden bg-neutral-dark py-[var(--section-py)]"
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 30% 40%, color-mix(in srgb, var(--color-secondary) 40%, transparent) 0%, var(--color-neutral-dark) 60%, var(--color-neutral-dark) 100%)",
          }}
          aria-hidden
        />
        <div className="relative z-10 mx-auto max-w-[var(--container-max)] px-6 pt-20 pb-8 lg:grid lg:grid-cols-[auto_1fr] lg:gap-16 xl:gap-24 lg:items-start lg:pt-24 lg:pb-0">
          <div className="mx-auto aspect-[3/4] w-[260px] overflow-hidden rounded-2xl shadow-2xl shadow-primary/20 md:w-[300px] xl:w-[340px] lg:mx-0">
            <Image
              src="/images/nil-placeholder.png"
              alt="Foto de Nyll Nunes"
              fill
              className="object-cover"
              priority
              sizes="340px"
            />
          </div>
          <div className="relative mt-10 lg:mt-0 flex flex-col">
            <div className="pointer-events-none absolute bottom-0 right-0 -z-0 w-[60vw] max-w-[700px] h-[55%] opacity-[0.35]">
              <svg viewBox={`-20 -20 ${SIG_VIEWBOX_W + 20} ${SIG_VIEWBOX_H + 20}`} fill="none" className="h-full w-full" aria-hidden preserveAspectRatio="xMinYMid meet">
                <text
                  x={SIG_TEXT_X}
                  y={SIG_LINE1_BASELINE_Y}
                  fill="var(--color-gold)"
                  stroke="var(--color-gold)"
                  strokeWidth={SIG_STROKE_W}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fontFamily={SIG_FONT_FAMILY}
                  fontStyle="italic"
                  fontWeight={700}
                  fontSize={SIG_FONT_SIZE}
                >{SIG_LINE_1}</text>
                <text
                  x={SIG_TEXT_X}
                  y={SIG_LINE2_BASELINE_Y}
                  fill="var(--color-gold)"
                  stroke="var(--color-gold)"
                  strokeWidth={SIG_STROKE_W}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fontFamily={SIG_FONT_FAMILY}
                  fontStyle="italic"
                  fontWeight={700}
                  fontSize={SIG_FONT_SIZE}
                >{SIG_LINE_2}</text>
              </svg>
            </div>
            <div className="relative z-10 flex flex-col">
              <p className="eyebrow text-gold">
                Conheça a mentora
              </p>
              <h2 className="mt-3 text-white">Quem é Nyll Nunes?</h2>
              <p className="mt-6 max-w-lg text-[1.05rem] leading-relaxed text-white/65">
                Comunicadora, palestrante, escritora de 12 livros e radialista. Nyll
                criou o método Comunicação Sem Máscaras após décadas ajudando
                mulheres a encontrarem a própria voz.
              </p>
              <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3">
                {AUTHORITIES.map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center gap-3 rounded-xl border border-gold/12 bg-white/[0.04] px-4 py-3 backdrop-blur-sm"
                  >
                    <item.icon className="h-4 w-4 flex-shrink-0 text-gold/80" />
                    <span className="text-[0.8rem] font-medium text-white/75">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-10 h-px w-full bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
              <figure className="mt-8">
                <blockquote className="w-full font-serif text-[1.35rem] font-medium italic leading-snug text-white/85 md:text-[1.55rem] md:leading-normal">
                  &ldquo;Quando a mulher se permite existir sem máscaras, a
                  comunicação deixa de ser uma performance e se torna consequência
                  de quem ela é.&rdquo;
                </blockquote>
                <figcaption className="mt-4 text-xs font-semibold tracking-[0.2em] text-gold uppercase">
                  — Nyll Nunes
                </figcaption>
              </figure>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="sobre"
      ref={sectionRef}
      className="relative"
      style={{ height: pinHeight }}
    >
      <div
        className="sticky top-0 flex min-h-[100dvh] flex-col justify-start overflow-hidden"
        style={{
          background:
            "radial-gradient(ellipse at 30% 40%, color-mix(in srgb, var(--color-secondary) 47%, transparent) 0%, var(--color-neutral-dark) 65%, var(--color-neutral-dark) 100%)",
        }}
      >
        <div className="relative z-10 mx-auto flex w-full max-w-[var(--container-max)] items-start gap-12 px-6 pt-20 pb-8 lg:gap-16 xl:gap-24 lg:pt-24 lg:pb-0">
          <div className="hidden flex-shrink-0 lg:block">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="relative aspect-[3/4] w-[280px] overflow-hidden rounded-2xl shadow-2xl shadow-primary/30 xl:w-[340px]"
            >
              <Image
                src="/images/nil-placeholder.png"
                alt="Foto de Nyll Nunes"
                fill
                className="object-cover"
                priority
                sizes="340px"
              />
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(to top, color-mix(in srgb, var(--color-neutral-dark) 50%, transparent) 0%, transparent 40%)",
                }}
                aria-hidden
              />
            </motion.div>
          </div>

          <div className="relative flex-1 min-w-0" style={{ minHeight: "min(55vh, 440px)" }}>
            <div
              className="pointer-events-none absolute bottom-0 right-0 -z-0 w-[calc(50vw+4rem)] h-[55%] translate-x-[15%]"
              aria-hidden
            >
              <div className="h-full w-full">
                {sigSvg}
              </div>
            </div>

            <div className="relative z-10 flex flex-col">
              <motion.p
                style={{ opacity: labelOpacity, y: labelY }}
                className="eyebrow text-gold"
              >
                Conheça a mentora
              </motion.p>

              <motion.h2
                style={{ opacity: titleOpacity, y: titleY }}
                className="mt-3 text-white"
              >
                Quem é Nyll Nunes?
              </motion.h2>

              <div className="mt-4">
                {BIO_LINES.map((line, i) => (
                  <motion.span
                    key={i}
                    className="block max-w-lg text-[1rem] leading-relaxed text-white/65"
                    style={{
                      opacity: bioLineMotions[i].opacity,
                      y: bioLineMotions[i].y,
                    }}
                  >
                    {line}
                  </motion.span>
                ))}
              </div>

              <div className="mt-6 grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3">
                {AUTHORITIES.map((item, i) => (
                  <motion.div
                    key={item.label}
                    style={{
                      opacity: badgeMotions[i].opacity,
                      y: badgeMotions[i].y,
                    }}
                    className="flex items-center gap-3 rounded-xl border border-gold/12 bg-white/[0.04] px-3.5 py-2.5 backdrop-blur-sm"
                  >
                    <item.icon className="h-4 w-4 flex-shrink-0 text-gold/80" />
                    <span className="text-[0.78rem] font-medium text-white/75">
                      {item.label}
                    </span>
                  </motion.div>
                ))}
              </div>

              <motion.div
                style={{ opacity: dividerOpacity }}
                className="mt-7 h-px w-full bg-gradient-to-r from-transparent via-gold/25 to-transparent"
              />

              <div className="mt-6">
                <motion.span
                  className="font-serif text-[1.35rem] font-medium italic text-gold/70 md:text-[1.55rem]"
                  style={{
                    opacity: quoteLineMotions[0].opacity,
                    y: quoteLineMotions[0].y,
                  }}
                >
                  &ldquo;
                </motion.span>
                {QUOTE_LINES.map((line, i) => (
                  <motion.span
                    key={i}
                    className="block w-full font-serif text-[1.35rem] font-medium italic leading-snug text-white/85 md:text-[1.55rem] md:leading-normal"
                    style={{
                      opacity: quoteLineMotions[i].opacity,
                      y: quoteLineMotions[i].y,
                    }}
                  >
                    {i === QUOTE_LINES.length - 1 ? `${line}\u201D` : line}
                  </motion.span>
                ))}
                <motion.p
                  style={{ opacity: figcaptionOpacity, y: figcaptionY }}
                  className="mt-4 text-xs font-semibold tracking-[0.2em] text-gold uppercase"
                >
                  — Nyll Nunes
                </motion.p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
