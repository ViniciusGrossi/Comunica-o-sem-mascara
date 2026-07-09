"use client";

import { X, Check } from "lucide-react";
import { RevealWrapper } from "@/components/ui/reveal-wrapper";
import { TiltCard } from "@/components/ui/tilt-card";

const COMMON = [
  { label: "Ensinam técnicas de fala", description: "Enfoque apenas na forma de falar, ignorando a essência da comunicadora." },
  { label: "Foco no comportamento externo", description: "Trabalho atua somente na superfície, sem tocar nas crenças internas." },
  { label: "Exercícios genéricos", description: "Metodologias padronizadas que não consideram a individualidade de cada mulher." },
  { label: "Resultado superficial", description: "Efeitos temporários que não geram mudança real e duradoura na pessoa." },
];

const DIFFERENT = [
  { label: "Transforma primeiro a mulher", description: "Aborda a vestida transformando o ser, não apenas o fazer, com profundidade." },
  { label: "Foco na essência e autoconhecimento", description: "Metodologia voltada para o interior, revelando a verdadeira voz de cada pessoa." },
  { label: "Metodologia exclusiva de Nyll Nunes", description: "Abordagem única e personalizada, resultados de décadas de experiência prática." },
  { label: "Resultado profundo e duradouro", description: "Mudanças que transcendem o método, criando impacto permanente na comunicação." },
];

export function Differential() {
  return (
    <section id="diferencial" className="bg-white py-[var(--section-py)]">
      <div className="mx-auto max-w-[var(--container-max)] px-6">
        <RevealWrapper direction="up">
          <div className="text-center">
            <span className="eyebrow text-primary/70">O diferencial</span>
            <h2 className="mt-4 text-neutral-dark">
              O que nos torna diferentes
            </h2>
          </div>
        </RevealWrapper>

        <div className="relative mx-auto mt-16 grid max-w-4xl gap-6 lg:grid-cols-2 lg:gap-10">
          {/* VS medallion */}
          <div
            className="pointer-events-none absolute left-1/2 top-1/2 z-20 hidden -translate-x-1/2 -translate-y-1/2 lg:flex"
            aria-hidden
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-full border border-gold/40 bg-neutral-dark shadow-xl shadow-primary/20">
              <span className="font-serif text-lg font-semibold italic text-gold">
                vs
              </span>
            </div>
          </div>

          <RevealWrapper direction="left">
            <TiltCard
              max={6}
              className="group flex h-full flex-col rounded-2xl border border-neutral-dark/10 bg-neutral-light/60 p-8 opacity-90 grayscale-[0.15] transition-all duration-500 hover:opacity-100 hover:grayscale-0 hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5"
            >
              <span className="text-[0.65rem] font-semibold uppercase tracking-[0.25em] text-neutral-dark/65">
                O caminho comum
              </span>
              <h3 className="mt-2 text-lg font-semibold text-neutral-dark/80 transition-colors duration-300 group-hover:text-primary">
                Cursos de oratória
              </h3>
              <ul className="mt-6 space-y-5">
                {COMMON.map((item) => (
                  <li
                    key={item.label}
                    className="flex flex-col gap-1 text-neutral-dark/80 transition-colors duration-300 group-hover:text-neutral-dark"
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-neutral-dark/8 transition-colors duration-300 group-hover:bg-primary/10">
                        <X className="h-3 w-3 text-neutral-dark/55 transition-colors duration-300 group-hover:text-primary" />
                      </span>
                      <span className="font-medium">{item.label}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </TiltCard>
          </RevealWrapper>

          <RevealWrapper direction="right">
            <TiltCard
              max={6}
              className="group relative flex h-full flex-col overflow-hidden rounded-2xl border-2 border-gold/40 bg-gradient-to-b from-[#FDF9F3] to-white p-8 shadow-[0_24px_64px_-24px_rgba(160,122,60,0.35)] transition-all duration-500 hover:border-primary hover:shadow-[0_32px_80px_-20px_rgba(140,27,44,0.45)]"
            >
              {/* Wine shade wash that rises from the base on hover */}
              <div
                className="pointer-events-none absolute inset-0 origin-bottom scale-y-0 bg-gradient-to-t from-primary via-primary/85 to-secondary opacity-0 transition-all duration-500 ease-out group-hover:scale-y-100 group-hover:opacity-100"
                aria-hidden
              />

              <div
                className="absolute inset-x-0 top-0 z-10 h-1 rounded-t-2xl bg-gradient-to-r from-gold-deep via-gold to-gold-deep transition-all duration-500 group-hover:from-gold-light group-hover:via-gold group-hover:to-gold-light"
                aria-hidden
              />
              <span className="relative z-10 text-[0.65rem] font-semibold uppercase tracking-[0.25em] text-primary transition-colors duration-300 group-hover:text-gold-light">
                O nosso caminho
              </span>
              <h3 className="relative z-10 mt-2 font-serif text-xl font-semibold italic text-primary transition-colors duration-300 group-hover:text-white">
                Comunicação Sem Máscaras
              </h3>
              <ul className="relative z-10 mt-6 space-y-5">
                {DIFFERENT.map((item) => (
                  <li
                    key={item.label}
                    className="flex flex-col gap-1 transition-colors duration-300"
                  >
                    <div className="flex items-center gap-3 font-medium text-neutral-dark transition-colors duration-300 group-hover:text-white">
                      <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-gold/20 transition-all duration-300 group-hover:bg-white/20 group-hover:shadow-sm group-hover:shadow-white/20">
                        <Check className="h-3 w-3 text-gold-deep transition-colors duration-300 group-hover:text-gold-light" />
                      </span>
                      <span>{item.label}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </TiltCard>
          </RevealWrapper>
        </div>
      </div>
    </section>
  );
}
