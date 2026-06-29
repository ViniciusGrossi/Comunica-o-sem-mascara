"use client";

import { CtaButton } from "@/components/ui/cta-button";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { RevealWrapper } from "@/components/ui/reveal-wrapper";

export function Offer() {
  return (
    <section
      id="oferta"
      className="relative overflow-hidden py-[var(--section-py)]"
      style={{
        background:
          "linear-gradient(180deg, #1A0508 0%, #5C1020 50%, #1A0508 100%)",
      }}
    >
      <div className="mx-auto max-w-[var(--container-max)] px-6">
        <div className="mx-auto max-w-lg rounded-3xl border border-gold/30 bg-white/5 p-8 text-center backdrop-blur-md sm:p-12">
          <RevealWrapper direction="up">
            <h2 className="text-white">
              Faça parte do Comunicação Sem Máscaras
            </h2>
          </RevealWrapper>

          <RevealWrapper delay={100} direction="up">
            <div className="mt-8 flex items-center justify-center gap-4">
              <span className="text-xl text-white/40 line-through">
                R$397,90
              </span>
              <span className="text-4xl font-bold text-gold">
                <AnimatedCounter target={297.9} prefix="R$" suffix="" decimals={2} />
              </span>
            </div>
          </RevealWrapper>

          <RevealWrapper delay={200} direction="up">
            <div className="mt-4 flex flex-wrap justify-center gap-3">
              {["Primeiras 30 vagas", "12 meses de acesso", "Pagamento via Kiwify", "Garantia 7 dias"].map((badge) => (
                <span
                  key={badge}
                  className="rounded-full border border-gold/20 bg-gold/10 px-3 py-1 text-xs text-gold"
                >
                  {badge}
                </span>
              ))}
            </div>
          </RevealWrapper>

          <RevealWrapper delay={300} direction="up">
            <CtaButton size="lg" className="mt-8 w-full">
              Quero fazer parte agora
            </CtaButton>
          </RevealWrapper>
        </div>
      </div>
    </section>
  );
}
