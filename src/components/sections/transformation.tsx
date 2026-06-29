"use client";

import { MessageCircle, ShoppingBag, Video, Star, Users, Eye } from "lucide-react";
import { RevealWrapper } from "@/components/ui/reveal-wrapper";
import { GlassCard } from "@/components/ui/glass-card";

const TRANSFORMS = [
  { icon: MessageCircle, label: "Comunicar com confiança" },
  { icon: ShoppingBag, label: "Vender naturalmente" },
  { icon: Video, label: "Gravar vídeos sem travar" },
  { icon: Star, label: "Ser respeitada" },
  { icon: Users, label: "Ocupar espaços" },
  { icon: Eye, label: "Parar de se esconder" },
];

export function Transformation() {
  return (
    <section
      id="transformacao"
      className="relative overflow-hidden py-[var(--section-py)]"
      style={{
        background:
          "radial-gradient(ellipse at 50% 50%, #F7F5F3 0%, #FFFFFF 70%)",
      }}
    >
      <div className="mx-auto max-w-[var(--container-max)] px-6">
        <RevealWrapper direction="up">
          <h2 className="text-center text-neutral-dark">Imagine viver assim...</h2>
        </RevealWrapper>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {TRANSFORMS.map((item, i) => (
            <RevealWrapper key={item.label} delay={i * 100} direction="up">
              <GlassCard className="flex items-center gap-4 p-5 transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
                  <item.icon className="h-6 w-6 text-primary" />
                </div>
                <span className="text-neutral-dark font-medium">{item.label}</span>
              </GlassCard>
            </RevealWrapper>
          ))}
        </div>
      </div>
    </section>
  );
}
