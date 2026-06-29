"use client";

import { Shield, Clock, Globe, CheckCircle } from "lucide-react";
import { RevealWrapper } from "@/components/ui/reveal-wrapper";

const BADGES = [
  { icon: Shield, label: "Acesso Imediato" },
  { icon: Clock, label: "12 Meses de Acesso" },
  { icon: Globe, label: "Plataforma Kiwify" },
  { icon: CheckCircle, label: "Garantia 7 Dias" },
];

export function Trustbar() {
  return (
    <section id="trustbar" className="border-b border-neutral-dark/5 bg-white py-6">
      <div className="mx-auto flex max-w-[var(--container-max)] flex-wrap items-center justify-center gap-8 px-6">
        {BADGES.map((badge, i) => (
          <RevealWrapper key={badge.label} delay={i * 100} direction="up">
            <div className="flex items-center gap-2 text-sm text-neutral-dark/60">
              <badge.icon className="h-4 w-4 text-gold" />
              <span>{badge.label}</span>
            </div>
          </RevealWrapper>
        ))}
      </div>
    </section>
  );
}
