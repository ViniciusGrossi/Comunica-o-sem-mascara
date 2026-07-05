"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { MODULES } from "@/lib/constants";
import { TiltCard } from "@/components/ui/tilt-card";
import { RevealWrapper } from "@/components/ui/reveal-wrapper";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

function GradientMesh({ variant }: { variant: number }) {
  const colorPairs = [
    ["#8E1B2C", "#5C1020"],
    ["#D4A574", "#A07A3C"],
    ["#8E1B2C", "#D4A574"],
    ["#5C1020", "#8E1B2C"],
    ["#A07A3C", "#5C1020"],
  ];
  const [a, b] = colorPairs[variant % colorPairs.length];

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute -top-1/2 -left-1/2 h-[200%] w-[200%] opacity-40"
        animate={{
          rotate: [0, 360],
        }}
        transition={{
          duration: 20 + variant * 3,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{
          background: `
            radial-gradient(circle at 30% 30%, ${a}66, transparent 50%),
            radial-gradient(circle at 70% 70%, ${b}44, transparent 50%),
            radial-gradient(circle at 50% 50%, ${a}22, transparent 70%)
          `,
        }}
      />
      <motion.div
        className="absolute -top-1/2 -left-1/2 h-[200%] w-[200%] opacity-30"
        animate={{
          rotate: [360, 0],
        }}
        transition={{
          duration: 15 + variant * 2,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{
          background: `
            radial-gradient(circle at 60% 40%, ${b}55, transparent 45%),
            radial-gradient(circle at 20% 80%, ${a}33, transparent 60%)
          `,
        }}
      />
    </div>
  );
}

function MethodCard({
  mod,
  index,
}: {
  mod: (typeof MODULES)[number];
  index: number;
}) {
  const [expanded, setExpanded] = useState(false);
  const reduced = useReducedMotion();

  return (
    <TiltCard max={8} className="h-full">
      <motion.div
        className="group relative flex h-full cursor-pointer flex-col overflow-hidden rounded-2xl border border-gold/10 bg-neutral-dark p-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-dark"
        role="button"
        tabIndex={0}
        aria-expanded={expanded}
        onMouseEnter={() => setExpanded(true)}
        onMouseLeave={() => setExpanded(false)}
        onClick={() => setExpanded((v) => !v)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setExpanded((v) => !v);
          }
        }}
      >
        <GradientMesh variant={mod.number} />

        <div className="relative z-10 flex flex-1 flex-col">
          <span className="font-serif text-3xl font-semibold text-gold">
            {String(mod.number).padStart(2, "0")}
          </span>

          <h3 className="mt-3 text-lg font-semibold text-white leading-tight">
            {mod.title}
          </h3>

          <motion.div
            initial={false}
            animate={{
              height: expanded ? "auto" : 0,
              opacity: expanded ? 1 : 0,
            }}
            transition={{ duration: reduced ? 0 : 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="mt-3 text-sm leading-relaxed text-white/60">
              {mod.description}
            </p>
          </motion.div>

          <motion.div
            className="mt-auto pt-3"
            initial={false}
            animate={{ opacity: expanded ? 1 : 0.4 }}
            transition={{ duration: reduced ? 0 : 0.2 }}
          >
            <div className="h-1 w-full overflow-hidden rounded-full bg-white/10">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-primary to-gold"
                initial={{ width: "0%" }}
                animate={{ width: expanded ? "100%" : "0%" }}
                transition={{ duration: reduced ? 0 : 0.5, ease: "easeOut" }}
              />
            </div>
          </motion.div>
        </div>
      </motion.div>
    </TiltCard>
  );
}

export function Method() {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="metodo"
      ref={ref}
      className="relative overflow-hidden bg-neutral-dark py-[var(--section-py)]"
    >
      <div className="mx-auto max-w-[var(--container-max)] px-6">
        <RevealWrapper direction="none">
          <span className="eyebrow text-gold">O caminho</span>
        </RevealWrapper>
        <RevealWrapper delay={100} direction="up">
          <h2 className="mt-4 text-white">
            O <em className="text-gold-gradient">Método</em>
          </h2>
        </RevealWrapper>
        <RevealWrapper delay={200} direction="up">
          <p className="mt-4 max-w-xl text-white/60">
            10 módulos que transformam a mulher antes da comunicação. Passe o
            mouse sobre cada módulo para descobrir.
          </p>
        </RevealWrapper>
      </div>

      <div className="mx-auto mt-16 grid max-w-[var(--container-max)] grid-cols-1 gap-4 px-6 sm:grid-cols-2 lg:grid-cols-5">
        {MODULES.map((mod, i) => (
          <motion.div
            key={mod.number}
            initial={reduced ? {} : { opacity: 0, y: 30 }}
            animate={
              inView
                ? { opacity: 1, y: 0 }
                : reduced
                  ? {}
                  : { opacity: 0, y: 30 }
            }
            transition={{ duration: 0.5, delay: i * 0.07, ease: "easeOut" }}
          >
            <MethodCard mod={mod} index={i} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
