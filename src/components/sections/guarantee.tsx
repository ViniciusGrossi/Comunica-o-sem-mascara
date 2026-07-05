"use client";

import { RevealWrapper } from "@/components/ui/reveal-wrapper";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

/** Rotating gold seal with circular text */
function GuaranteeSeal() {
  const reduced = useReducedMotion();

  return (
    <div className="relative mx-auto h-44 w-44" aria-hidden>
      {/* Rotating circular text */}
      <svg
        viewBox="0 0 200 200"
        className={`absolute inset-0 h-full w-full ${
          reduced ? "" : "animate-[sealSpin_24s_linear_infinite]"
        }`}
      >
        <defs>
          <path
            id="seal-circle"
            d="M 100,100 m -78,0 a 78,78 0 1,1 156,0 a 78,78 0 1,1 -156,0"
          />
        </defs>
        <text
          fill="var(--color-gold-deep)"
          fontSize="15.5"
          fontWeight="600"
          letterSpacing="4"
          style={{ textTransform: "uppercase" }}
        >
          <textPath href="#seal-circle">
            Garantia incondicional · risco zero ·
          </textPath>
        </text>
      </svg>

      {/* Inner medallion */}
      <div className="absolute inset-[26%] flex flex-col items-center justify-center rounded-full border-2 border-dashed border-gold bg-gradient-to-b from-gold/10 to-transparent">
        <span className="font-serif text-4xl font-bold leading-none text-gold-deep">
          7
        </span>
        <span className="mt-0.5 text-[0.55rem] font-semibold uppercase tracking-[0.25em] text-gold-deep">
          dias
        </span>
      </div>
    </div>
  );
}

export function Guarantee() {
  return (
    <section id="garantia" className="bg-neutral-light py-[var(--section-py)]">
      <div className="mx-auto max-w-[var(--container-max)] px-6 text-center">
        <RevealWrapper direction="up">
          <GuaranteeSeal />
        </RevealWrapper>

        <RevealWrapper delay={100} direction="up">
          <h2 className="mt-8 text-neutral-dark">
            7 dias de garantia{" "}
            <em className="whitespace-nowrap text-gold-gradient">incondicional</em>
          </h2>
        </RevealWrapper>

        <RevealWrapper delay={200} direction="up">
          <p className="mx-auto mt-4 max-w-lg text-lg text-neutral-dark/60">
            Entre, assista às aulas, sinta o método. Se não for para você,
            devolvemos 100% do valor.{" "}
            <span className="font-medium text-neutral-dark">
              Sem perguntas, sem burocracia.
            </span>
          </p>
        </RevealWrapper>
      </div>
    </section>
  );
}
