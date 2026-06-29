"use client";

import { CtaButton } from "@/components/ui/cta-button";
import { RevealWrapper } from "@/components/ui/reveal-wrapper";
import { TextReveal } from "@/components/ui/text-reveal";
import { Particles } from "@/components/ui/particles";
import Image from "next/image";

const TRUST_BADGES = [
  "Acesso imediato",
  "12 meses de acesso",
  "Plataforma Kiwify",
  "7 dias de garantia",
];

export function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen overflow-hidden bg-neutral-dark pt-20"
    >
      <div
        className="absolute inset-0 opacity-60"
        style={{
          background:
            "radial-gradient(ellipse at 70% 50%, #5C1020 0%, #1A0508 70%)",
        }}
        aria-hidden
      />

      <div className="absolute inset-0 overflow-hidden" aria-hidden>
        <div
          className="absolute top-[15%] left-[10%] h-64 w-64 rounded-full bg-gold/5 blur-3xl"
          style={{ animation: "float 6s ease-in-out infinite" }}
        />
        <div
          className="absolute bottom-[20%] right-[15%] h-48 w-48 rounded-full bg-primary/10 blur-3xl"
          style={{ animation: "float 8s ease-in-out infinite 2s" }}
        />
      </div>

      <div className="relative mx-auto flex max-w-[var(--container-max)] flex-col items-center gap-12 px-6 py-[var(--section-py)] lg:flex-row lg:gap-16">
        <div className="flex flex-1 flex-col items-center text-center lg:items-start lg:text-left">
          <RevealWrapper direction="none" delay={0}>
            <TextReveal
              text="Para a mulher que cansou de se esconder."
              as="h1"
              className="font-serif text-white"
            />
          </RevealWrapper>

          <RevealWrapper direction="up" delay={200}>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-white/70">
              Aprenda a se comunicar com confiança, autenticidade e autoridade
              para ocupar os espaços que deseja — sem medo de julgamentos.
            </p>
          </RevealWrapper>

          <RevealWrapper direction="up" delay={400}>
            <Particles className="absolute bottom-0 left-0 h-48 w-full" />
            <CtaButton size="lg" className="mt-8">
              Quero fazer parte do Comunicação Sem Máscaras
            </CtaButton>
          </RevealWrapper>

          <RevealWrapper direction="up" delay={500}>
            <div className="mt-4 flex flex-wrap justify-center gap-3 lg:justify-start">
              {TRUST_BADGES.map((badge) => (
                <span
                  key={badge}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/60"
                >
                  {badge}
                </span>
              ))}
            </div>
          </RevealWrapper>
        </div>

        <div className="relative flex-1">
          <RevealWrapper direction="none" delay={300}>
            <div className="relative aspect-[3/4] w-full max-w-md overflow-hidden rounded-2xl lg:max-w-lg">
              <Image
                src="/images/hero-placeholder.svg"
                alt="Mulher elegante e confiante"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute bottom-4 left-4 rounded-full bg-gold px-4 py-2 text-sm font-semibold text-neutral-dark">
                +200 mulheres impactadas
              </div>
            </div>
          </RevealWrapper>
        </div>
      </div>
    </section>
  );
}
