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

      <div
        ref={trackRef}
        className={cn(
          "mt-16 flex gap-8 px-6",
          reduced ? "flex-wrap max-w-[var(--container-max)] mx-auto" : "will-change-transform lg:flex-nowrap"
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
                : "border-gold/10 bg-gradient-to-b from-gold/10 to-neutral-dark",
              reduced && "w-full aspect-auto"
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
    </section>
  );
}
