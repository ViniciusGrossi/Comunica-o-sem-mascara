"use client";

import { CtaButton } from "@/components/ui/cta-button";
import { RevealWrapper } from "@/components/ui/reveal-wrapper";
import { TextReveal } from "@/components/ui/text-reveal";
import { Particles } from "@/components/ui/particles";

export function FinalCta() {
  return (
    <section
      id="cta-final"
      className="relative overflow-hidden py-[var(--section-py)]"
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, var(--color-neutral-dark) 0%, var(--color-secondary) 50%, var(--color-neutral-dark) 100%)",
        }}
        aria-hidden
      />
      <div className="absolute inset-0 bg-black/40" aria-hidden />

      <div className="absolute inset-0 overflow-hidden" aria-hidden>
        <div
          className="absolute top-[20%] left-[20%] h-32 w-32 rounded-full bg-gold/5 blur-2xl"
          style={{ animation: "float 7s ease-in-out infinite" }}
        />
        <div
          className="absolute bottom-[30%] right-[25%] h-24 w-24 rounded-full bg-primary/10 blur-2xl"
          style={{ animation: "float 9s ease-in-out infinite 3s" }}
        />
      </div>

      <Particles className="absolute inset-0 h-full w-full" />

      <div className="relative mx-auto max-w-[var(--container-max)] px-6 text-center">
        <RevealWrapper direction="none">
          <span className="eyebrow justify-center text-gold">
            Última chamada
          </span>
        </RevealWrapper>

        <RevealWrapper delay={100} direction="up">
          <TextReveal
            text="Quantas oportunidades você ainda vai perder por medo de se posicionar?"
            as="h2"
            className="mt-6 text-white"
          />
        </RevealWrapper>

        <RevealWrapper delay={200} direction="up">
          <p className="mx-auto mt-6 max-w-xl text-lg text-white/70">
            O momento de parar de se esconder é agora. As vagas são limitadas e o
            preço de lançamento não vai durar para sempre.
          </p>
        </RevealWrapper>

        <RevealWrapper delay={400} direction="up">
          <CtaButton size="lg" className="mt-8">
            Quero fazer parte do Comunicação Sem Máscaras
          </CtaButton>
          <p className="mt-5 text-xs text-white/40">
            Acesso imediato · 12 meses de acesso · 7 dias de garantia
            incondicional
          </p>
        </RevealWrapper>
      </div>
    </section>
  );
}
