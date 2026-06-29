"use client";

import { Mic, BookOpen, Radio, Users, Sparkles, Award } from "lucide-react";
import { RevealWrapper } from "@/components/ui/reveal-wrapper";
import Image from "next/image";

const AUTHORITIES = [
  { icon: Mic, label: "Comunicadora" },
  { icon: Award, label: "Palestrante" },
  { icon: BookOpen, label: "12 livros publicados" },
  { icon: Radio, label: "Radialista" },
  { icon: Users, label: "Mentora" },
  { icon: Sparkles, label: "Criadora da metodologia" },
];

export function AboutNil() {
  return (
    <section id="sobre" className="bg-neutral-light py-[var(--section-py)]">
      <div className="mx-auto grid max-w-[var(--container-max)] gap-12 px-6 lg:grid-cols-2 lg:gap-16">
          <RevealWrapper direction="right">
            <div className="aspect-square w-full max-w-md overflow-hidden rounded-2xl">
              <Image
                src="/images/nil-placeholder.svg"
                alt="Foto de Nil Nunes"
                fill
                className="object-cover"
              />
            </div>
          </RevealWrapper>

        <div className="flex flex-col justify-center">
          <RevealWrapper direction="up">
            <h2 className="text-neutral-dark">Quem é Nil Nunes?</h2>
          </RevealWrapper>

          <RevealWrapper delay={100} direction="up">
            <p className="mt-4 text-neutral-dark/70">
              Comunicadora, palestrante, escritora de 12 livros e radialista. Nil
              criou o método Comunicação Sem Máscaras após décadas ajudando
              mulheres a encontrarem a própria voz.
            </p>
          </RevealWrapper>

          <div className="mt-8 grid grid-cols-2 gap-4">
            {AUTHORITIES.map((item, i) => (
              <RevealWrapper key={item.label} delay={i * 80} direction="up">
                <div className="flex items-center gap-3 rounded-xl border border-gold/20 bg-white p-4">
                  <item.icon className="h-5 w-5 flex-shrink-0 text-gold" />
                  <span className="text-sm font-medium text-neutral-dark">
                    {item.label}
                  </span>
                </div>
              </RevealWrapper>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
