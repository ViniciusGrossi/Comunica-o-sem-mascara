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
          <h2 className="text-center text-neutral-dark/60">
            Para quem NÃO é
          </h2>
        </RevealWrapper>

        <div className="mt-8 mx-auto grid max-w-2xl gap-4">
          {NOT_FOR.map((item, i) => (
            <RevealWrapper key={i} delay={i * 100} direction="up">
              <div className="rounded-2xl border border-dashed border-neutral-dark/15 p-6 text-center text-neutral-dark/60">
                {item}
              </div>
            </RevealWrapper>
          ))}
        </div>
      </div>
    </section>
  );
}
