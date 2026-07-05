"use client";

import { Check } from "lucide-react";
import { CtaButton } from "@/components/ui/cta-button";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { RevealWrapper } from "@/components/ui/reveal-wrapper";
import { ShineBorder } from "@/components/ui/shine-border";

const INCLUDED = [
  "10 módulos do método completo",
  "4 bônus exclusivos para acelerar sua transformação",
  "12 meses de acesso a todo o conteúdo",
  "Acesso imediato após a confirmação",
  "Garantia incondicional de 7 dias",
];

export function Offer() {
  return (
    <section
      id="oferta"
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
            "radial-gradient(circle at 50% 30%, color-mix(in srgb, var(--color-gold) 10%, transparent) 0%, transparent 55%)",
        }}
        aria-hidden
      />

      <div className="relative mx-auto max-w-[var(--container-max)] px-6">
        <RevealWrapper direction="up">
          <ShineBorder className="mx-auto max-w-xl" rounded="rounded-3xl">
            <div className="rounded-3xl bg-neutral-dark/95 p-8 text-center backdrop-blur-md sm:p-12">
              <span className="eyebrow text-gold/80">Investimento</span>
              <h2 className="mt-4 text-white">
                Faça parte do{" "}
                <em className="text-gold-gradient">
                  Comunicação Sem Máscaras
                </em>
              </h2>

              <ul className="mx-auto mt-8 max-w-sm space-y-3 text-left">
                {INCLUDED.map((item, i) => (
                  <RevealWrapper key={item} delay={100 + i * 80} direction="up">
                    <li className="flex items-start gap-3 text-sm text-white/75 sm:text-base">
                      <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-gold/15">
                        <Check className="h-3 w-3 text-gold" />
                      </span>
                      <span>{item}</span>
                    </li>
                  </RevealWrapper>
                ))}
              </ul>

              <RevealWrapper delay={500} direction="up">
                <div
                  className="mx-auto mt-8 h-px w-2/3 bg-gradient-to-r from-transparent via-gold/30 to-transparent"
                  aria-hidden
                />
                <div className="mt-6 flex flex-col items-center gap-1">
                  <span className="text-sm text-white/40">
                    de{" "}
                    <span className="line-through">R$397,90</span> por apenas
                  </span>
                  <span className="font-serif text-5xl font-semibold text-gold-gradient sm:text-6xl">
                    <AnimatedCounter
                      target={297.9}
                      prefix="R$"
                      suffix=""
                      decimals={2}
                    />
                  </span>
                </div>
              </RevealWrapper>

              <RevealWrapper delay={600} direction="up">
                <div className="mt-5 flex flex-wrap justify-center gap-3">
                  {[
                    "Primeiras 30 vagas",
                    "12 meses de acesso",
                    "Pagamento via Kiwify",
                    "Garantia 7 dias",
                  ].map((badge) => (
                    <span
                      key={badge}
                      className="rounded-full border border-gold/20 bg-gold/10 px-3 py-1 text-xs text-gold"
                    >
                      {badge}
                    </span>
                  ))}
                </div>
              </RevealWrapper>

              <RevealWrapper delay={700} direction="up">
                <CtaButton
                  size="lg"
                  className="mt-8 w-full animate-[pulseGlow_3s_ease-in-out_infinite]"
                >
                  Quero fazer parte agora
                </CtaButton>
                <p className="mt-4 text-xs text-white/40">
                  Compra segura · Acesso imediato · 7 dias de garantia
                  incondicional
                </p>
              </RevealWrapper>
            </div>
          </ShineBorder>
        </RevealWrapper>
      </div>
    </section>
  );
}
