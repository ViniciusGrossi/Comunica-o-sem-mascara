"use client";

import Image from "next/image";
import { RevealWrapper } from "@/components/ui/reveal-wrapper";

const PAIN_POINTS = [
  "Você trava toda vez que precisa falar em público ou em reuniões",
  "Pensa depois no que deveria ter dito — e fica remoendo",
  "O medo de julgamentos te impede de se posicionar",
  "Você evita gravar vídeos ou criar conteúdo",
  "Tem dificuldade para vender suas ideias ou serviços",
  "Sente que vive muito abaixo do seu potencial",
];

export function Problem() {
  return (
    <section id="problema" className="bg-white py-[var(--section-py)]">
      <div className="mx-auto grid max-w-[var(--container-max)] gap-12 px-6 lg:grid-cols-2 lg:gap-16">
          <RevealWrapper direction="right">
            <div className="aspect-video w-full overflow-hidden rounded-2xl">
              <Image
                src="/images/problem-placeholder.svg"
                alt="Mulher frustrada tentando se comunicar"
                fill
                className="object-cover"
              />
            </div>
          </RevealWrapper>

        <div className="flex flex-col justify-center">
          <RevealWrapper direction="up">
            <h2 className="text-neutral-dark">Você sente que...</h2>
          </RevealWrapper>

          <ul className="mt-8 space-y-4">
            {PAIN_POINTS.map((point, i) => (
              <RevealWrapper key={i} delay={i * 80} direction="up">
                <li className="flex items-start gap-3 text-neutral-dark/80">
                  <span className="mt-1.5 block h-2 w-2 flex-shrink-0 rounded-full bg-primary" />
                  <span>{point}</span>
                </li>
              </RevealWrapper>
            ))}
          </ul>

          <RevealWrapper delay={600} direction="up">
            <p className="mt-10 border-l-4 border-gold pl-4 font-serif text-xl font-medium italic text-neutral-dark">
              Muitas mulheres não têm falta de potencial. Têm excesso de medo.
            </p>
          </RevealWrapper>
        </div>
      </div>
    </section>
  );
}
