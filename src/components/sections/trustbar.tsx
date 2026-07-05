"use client";

import { Shield, Clock, Globe, CheckCircle } from "lucide-react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

const BADGES = [
  { icon: Shield, label: "Acesso Imediato" },
  { icon: Clock, label: "12 Meses de Acesso" },
  { icon: Globe, label: "Plataforma Kiwify" },
  { icon: CheckCircle, label: "Garantia de 7 Dias" },
];

function BadgeRow({ ariaHidden = false }: { ariaHidden?: boolean }) {
  return (
    <div
      className="flex shrink-0 items-center"
      aria-hidden={ariaHidden || undefined}
    >
      {BADGES.map((badge) => (
        <div
          key={badge.label}
          className="flex items-center gap-3 px-8 sm:px-12"
        >
          <badge.icon className="h-4 w-4 shrink-0 text-gold" />
          <span className="whitespace-nowrap font-serif text-base italic tracking-wide text-white/70 sm:text-lg">
            {badge.label}
          </span>
          <span className="ml-8 text-gold/40 sm:ml-12" aria-hidden>
            ✦
          </span>
        </div>
      ))}
    </div>
  );
}

export function Trustbar() {
  const reduced = useReducedMotion();

  if (reduced) {
    return (
      <section id="trustbar" className="bg-neutral-dark py-6">
        <div className="mx-auto flex max-w-[var(--container-max)] flex-wrap items-center justify-center gap-x-10 gap-y-3 px-6">
          {BADGES.map((badge) => (
            <div key={badge.label} className="flex items-center gap-2 text-sm text-white/70">
              <badge.icon className="h-4 w-4 text-gold" />
              <span>{badge.label}</span>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section
      id="trustbar"
      className="relative overflow-hidden bg-neutral-dark py-5"
    >
      <div
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/25 to-transparent"
        aria-hidden
      />
      <div
        className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold/25 to-transparent"
        aria-hidden
      />

      {/* Edge fade masks */}
      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-neutral-dark to-transparent"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-neutral-dark to-transparent"
        aria-hidden
      />

      <div className="group flex w-max animate-[marquee_28s_linear_infinite] hover:[animation-play-state:paused]">
        <BadgeRow />
        <BadgeRow ariaHidden />
      </div>
    </section>
  );
}
