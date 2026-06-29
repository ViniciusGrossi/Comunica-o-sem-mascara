"use client";

import { Shield, Heart, Sparkles, GraduationCap, TrendingUp } from "lucide-react";
import { RevealWrapper } from "@/components/ui/reveal-wrapper";
import { GlassCard } from "@/components/ui/glass-card";

const RESULTS = [
  { icon: Shield, label: "Mais segura" },
  { icon: Heart, label: "Mais confiante" },
  { icon: Sparkles, label: "Mais autêntica" },
  { icon: GraduationCap, label: "Mais preparada" },
  { icon: TrendingUp, label: "Mais posicionada" },
];

export function Results() {
  return (
    <section
      id="resultado"
      className="relative overflow-hidden py-[var(--section-py)]"
      style={{
        background:
          "radial-gradient(ellipse at 50% 30%, #5C1020 0%, #1A0508 70%)",
      }}
    >
      <div className="mx-auto max-w-[var(--container-max)] px-6">
        <RevealWrapper direction="up">
          <h2 className="text-center text-white">
            Você não vai sair apenas falando melhor.
          </h2>
        </RevealWrapper>
        <RevealWrapper delay={100} direction="up">
          <p className="mt-2 text-center text-lg text-gold">Vai sair:</p>
        </RevealWrapper>

        <div className="mt-12 flex flex-wrap justify-center gap-6">
          {RESULTS.map((item, i) => (
            <RevealWrapper key={item.label} delay={i * 100} direction="up">
              <GlassCard gold className="flex items-center gap-3 px-6 py-4">
                <item.icon className="h-6 w-6 text-gold" />
                <span className="text-lg font-medium text-white">
                  {item.label}
                </span>
              </GlassCard>
            </RevealWrapper>
          ))}
        </div>
      </div>
    </section>
  );
}
