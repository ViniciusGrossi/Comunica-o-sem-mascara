"use client";

import { Video, Paintbrush, Gem, BookOpen } from "lucide-react";
import { RevealWrapper } from "@/components/ui/reveal-wrapper";
import { TiltCard } from "@/components/ui/tilt-card";

const BONUSES = [
  {
    icon: Video,
    title: "Como vencer o medo de gravar vídeos",
    description: "Masterclass gravada exclusiva para alunas do programa.",
  },
  {
    icon: Paintbrush,
    title: "Kit Presença Digital",
    description: "Templates de stories e posts para fortalecer sua imagem.",
  },
  {
    icon: Gem,
    title: "Meditation Journey",
    description: "Áudios de meditação guiada para autoconfiança.",
  },
  {
    icon: BookOpen,
    title: "Guia Comunicação Sem Máscaras",
    description: "Ebook com resumos e exercícios práticos.",
  },
];

export function Bonus() {
  return (
    <section id="bonus" className="bg-white py-[var(--section-py)]">
      <div className="mx-auto max-w-[var(--container-max)] px-6">
        <RevealWrapper direction="up">
          <div className="text-center">
            <span className="eyebrow text-primary/70">E tem mais</span>
            <h2 className="mt-4 text-neutral-dark">Bônus exclusivos</h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-neutral-dark/70">
              Além do programa, você recebe conteúdo extra para acelerar sua
              transformação.
            </p>
          </div>
        </RevealWrapper>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {BONUSES.map((item, i) => (
            <RevealWrapper key={item.title} delay={i * 100} direction="up">
              <div className="group h-full cursor-default">
                <TiltCard
                  max={8}
                  className="flex h-full min-h-[280px] flex-col rounded-2xl border border-gold/30 bg-gradient-to-b from-gold/5 to-white p-7 shadow-lg backdrop-blur-md transition-all duration-500 hover:shadow-gold/30"
                >
                  <span className="text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-gold-deep">
                    Bônus {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="mt-5 flex h-14 w-14 items-center justify-center rounded-full bg-gold/10 transition-all duration-500 group-hover:scale-110 group-hover:bg-gold group-hover:shadow-gold/30">
                    <item.icon className="h-7 w-7 text-gold-deep transition-colors duration-500 group-hover:text-white" />
                  </div>
                  <h3 className="mt-5 font-serif text-lg font-medium leading-snug text-neutral-dark">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm text-neutral-dark/70">
                    {item.description}
                  </p>
                  <div className="mt-auto pt-5">
                    <span className="inline-block rounded-full bg-primary/8 px-3 py-1 text-xs font-medium text-primary">
                      Incluso no programa
                    </span>
                  </div>
                </TiltCard>
              </div>
            </RevealWrapper>
          ))}
        </div>
      </div>
    </section>
  );
}
