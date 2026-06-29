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
          <RevealWrapper direction="left">
            <div className="rounded-2xl border border-neutral-dark/10 bg-neutral-light p-8">
              <h3 className="text-lg font-semibold text-neutral-dark/70">
                Cursos comuns
              </h3>
              <ul className="mt-6 space-y-4">
                {COMMON.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-neutral-dark/60">
                    <span className="block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-neutral-dark/20" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </RevealWrapper>

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
