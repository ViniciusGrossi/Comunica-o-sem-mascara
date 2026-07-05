"use client";

import { RevealWrapper } from "@/components/ui/reveal-wrapper";
import { TestimonialsCarousel } from "@/components/ui/testimonials-carousel";
import { TESTIMONIALS } from "@/lib/constants";

export function SocialProof() {
  return (
    <section id="depoimentos" className="bg-white py-[var(--section-py)]">
      <div className="mx-auto max-w-[var(--container-max)] px-6">
        <RevealWrapper direction="up">
          <div className="text-center">
            <span className="eyebrow text-primary/70">
              +200 mulheres impactadas
            </span>
            <h2 className="mt-4 text-neutral-dark">
              Mulheres que decidiram{" "}
              <em className="text-primary">parar de se esconder</em>
            </h2>
          </div>
        </RevealWrapper>

        <RevealWrapper delay={200} direction="up">
          <TestimonialsCarousel
            items={TESTIMONIALS}
            className="mt-14"
          />
        </RevealWrapper>
      </div>
    </section>
  );
}
