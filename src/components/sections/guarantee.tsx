"use client";

import { RevealWrapper } from "@/components/ui/reveal-wrapper";

export function Guarantee() {
  return (
    <section id="garantia" className="bg-neutral-light py-[var(--section-py)]">
      <div className="mx-auto max-w-[var(--container-max)] px-6 text-center">
        <RevealWrapper direction="up">
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
