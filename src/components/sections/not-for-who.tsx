"use client";

import { X, AlertTriangle } from "lucide-react";
import { RevealWrapper } from "@/components/ui/reveal-wrapper";
import { TiltCard } from "@/components/ui/tilt-card";

const NOT_FOR = [
  {
    icon: AlertTriangle,
    label: "Quem busca fórmula mágica",
    description: "Sem esforço não há transformação.",
  },
  {
    icon: X,
    label: "Quem não quer praticar",
    description: "Prática é o único caminho verdadeiro.",
  },
  {
    icon: X,
    label: "Quem não deseja evoluir",
    description: "O programa exige abertura para mudança.",
  },
];

export function NotForWho() {
  return (
    <section id="nao-para-quem" className="bg-white py-[var(--section-py)]">
      <div className="mx-auto max-w-[var(--container-max)] px-6">
        <RevealWrapper direction="up">
          <h2 className="text-center font-serif text-3xl font-medium text-neutral-dark/60">
            Para quem NÃO é
          </h2>
        </RevealWrapper>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {NOT_FOR.map((item, i) => (
            <RevealWrapper key={i} delay={i * 100} direction="up">
              <div className="group cursor-default">
                <TiltCard
                  max={6}
                  className="flex h-full min-h-[200px] flex-col items-center justify-center gap-4 rounded-2xl border-2 border-dashed border-neutral-dark/20 bg-gradient-to-b from-neutral-light/70 to-white/80 p-6 text-center opacity-70 shadow-sm backdrop-blur-md transition-all duration-500 group-hover:opacity-100 group-hover:shadow-lg"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-neutral-dark/10 transition-all duration-500 group-hover:scale-110 group-hover:bg-red-900/20 group-hover:shadow-md">
                    <item.icon className="h-7 w-7 text-neutral-dark/40 transition-all duration-500 group-hover:text-red-900/80 group-hover:scale-110" />
                  </div>
                  <span className="font-serif text-lg font-medium text-neutral-dark">
                    {item.label}
                  </span>
                  <p className="mt-1 text-sm text-neutral-dark/60">
                    {item.description}
                  </p>
                </TiltCard>
              </div>
            </RevealWrapper>
          ))}
        </div>
      </div>
    </section>
  );
}
