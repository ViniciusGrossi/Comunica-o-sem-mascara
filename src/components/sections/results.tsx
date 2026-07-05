"use client";

import { Shield, Heart, Sparkles, GraduationCap, TrendingUp } from "lucide-react";
import { RevealWrapper } from "@/components/ui/reveal-wrapper";

const RESULTS = [
  { icon: Shield, label: "Mais segura", detail: "para falar em qualquer lugar" },
  { icon: Heart, label: "Mais confiante", detail: "na sua própria voz" },
  { icon: Sparkles, label: "Mais autêntica", detail: "sem máscaras, sem personagem" },
  { icon: GraduationCap, label: "Mais preparada", detail: "para qualquer conversa" },
  { icon: TrendingUp, label: "Mais posicionada", detail: "nos espaços que importam" },
];

export function Results() {
  return (
    <section
      id="resultado"
      className="relative overflow-hidden py-[var(--section-py)]"
      style={{
        background:
          "linear-gradient(180deg, var(--color-neutral-dark) 0%, var(--color-secondary) 50%, var(--color-neutral-dark) 100%)",
      }}
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 80% 20%, color-mix(in srgb, var(--color-gold) 8%, transparent) 0%, transparent 50%)",
        }}
        aria-hidden
      />

      <div className="relative mx-auto max-w-4xl px-6">
        <RevealWrapper direction="up">
          <div className="text-center">
            <span className="eyebrow text-gold/80">O resultado</span>
            <h2 className="mt-4 text-white">
              Você não vai sair apenas falando melhor.
            </h2>
            <p className="mt-3 font-serif text-2xl italic text-gold">
              Vai sair:
            </p>
          </div>
        </RevealWrapper>

        <div className="mt-16">
          {RESULTS.map((item, i) => (
            <RevealWrapper key={item.label} delay={i * 120} direction="up">
              <div className="group flex cursor-default items-baseline gap-5 border-t border-gold/15 py-6 transition-colors duration-500 last:border-b hover:border-gold/40 sm:gap-8 sm:py-8">
                <span className="font-serif text-sm text-gold/50 transition-colors duration-500 group-hover:text-gold sm:text-base">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="flex flex-1 flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                  <span className="font-serif text-3xl font-medium italic text-white transition-all duration-500 group-hover:translate-x-2 group-hover:text-gold sm:text-5xl">
                    {item.label}
                  </span>
                  <span className="text-sm text-white/40 transition-colors duration-500 group-hover:text-white/70 sm:text-base">
                    {item.detail}
                  </span>
                </div>
                <item.icon
                  className="h-6 w-6 self-center text-gold/30 transition-all duration-500 group-hover:scale-125 group-hover:text-gold sm:h-7 sm:w-7"
                  aria-hidden
                />
              </div>
            </RevealWrapper>
          ))}
        </div>
      </div>
    </section>
  );
}
