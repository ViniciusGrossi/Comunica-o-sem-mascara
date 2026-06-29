"use client";

import { ShoppingBag, Crown, Building, Briefcase, Megaphone, Landmark } from "lucide-react";
import { RevealWrapper } from "@/components/ui/reveal-wrapper";

const TARGET_AUDIENCE = [
  { icon: ShoppingBag, label: "Empreendedoras" },
  { icon: Crown, label: "Líderes" },
  { icon: Building, label: "Servidoras públicas" },
  { icon: Briefcase, label: "Profissionais liberais" },
  { icon: Megaphone, label: "Comunicadoras" },
  { icon: Landmark, label: "Políticas" },
];

export function ForWho() {
  return (
    <section id="para-quem" className="bg-neutral-light py-[var(--section-py)]">
      <div className="mx-auto max-w-[var(--container-max)] px-6">
        <RevealWrapper direction="up">
          <h2 className="text-center text-neutral-dark">
            Para quem é o programa
          </h2>
        </RevealWrapper>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {TARGET_AUDIENCE.map((item, i) => (
            <RevealWrapper key={item.label} delay={i * 80} direction="up">
              <div className="flex items-center gap-4 rounded-2xl border border-neutral-dark/5 bg-white p-6 transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
                  <item.icon className="h-6 w-6 text-primary" />
                </div>
                <span className="font-medium text-neutral-dark">{item.label}</span>
              </div>
            </RevealWrapper>
          ))}
        </div>
      </div>
    </section>
  );
}
