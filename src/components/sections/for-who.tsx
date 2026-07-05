"use client";

import {
  ShoppingBag,
  Crown,
  Building,
  Briefcase,
  Megaphone,
  Landmark,
} from "lucide-react";
import { RevealWrapper } from "@/components/ui/reveal-wrapper";
import { TiltCard } from "@/components/ui/tilt-card";

const TARGET_AUDIENCE = [
  {
    icon: ShoppingBag,
    label: "Empreendedoras",
    description: "que precisam vender sem soar forçadas",
  },
  {
    icon: Crown,
    label: "Líderes",
    description: "que querem inspirar com presença real",
  },
  {
    icon: Building,
    label: "Servidoras públicas",
    description: "que desejam se posicionar com firmeza",
  },
  {
    icon: Briefcase,
    label: "Profissionais liberais",
    description: "que vivem de comunicar seu valor",
  },
  {
    icon: Megaphone,
    label: "Comunicadoras",
    description: "que buscam autenticidade no microfone",
  },
  {
    icon: Landmark,
    label: "Políticas",
    description: "que ocupam espaços de decisão",
  },
];

export function ForWho() {
  return (
    <section id="para-quem" className="bg-neutral-light py-[var(--section-py)]">
      <div className="mx-auto max-w-[var(--container-max)] px-6">
        <RevealWrapper direction="up">
          <div className="text-center">
            <span className="eyebrow text-primary/70">Este lugar é seu</span>
            <h2 className="mt-4 text-neutral-dark">Para quem é o programa</h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-neutral-dark/70">
              Se você se identifica com algum desses perfis, esse programa foi
              feito para você.
            </p>
          </div>
        </RevealWrapper>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {TARGET_AUDIENCE.map((item, i) => (
            <RevealWrapper key={item.label} delay={i * 80} direction="up">
              <TiltCard
                max={6}
                className="group h-full cursor-default border border-gold/25 bg-white shadow-sm transition-shadow duration-500 hover:shadow-xl hover:shadow-gold/10"
              >
                <div className="flex h-full min-h-[180px] flex-col items-center justify-center gap-4 p-8 text-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full border border-gold/40 bg-gold/10 transition-all duration-500 group-hover:scale-110 group-hover:bg-gold group-hover:shadow-lg group-hover:shadow-gold/30">
                    <item.icon className="h-6 w-6 text-gold-deep transition-colors duration-500 group-hover:text-white" />
                  </div>
                  <span className="font-serif text-xl font-medium text-neutral-dark">
                    {item.label}
                  </span>
                  <p className="text-sm italic text-neutral-dark/55">
                    {item.description}
                  </p>
                </div>
              </TiltCard>
            </RevealWrapper>
          ))}
        </div>
      </div>
    </section>
  );
}
