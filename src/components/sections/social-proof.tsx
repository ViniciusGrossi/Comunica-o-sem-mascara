"use client";

import { RevealWrapper } from "@/components/ui/reveal-wrapper";
import { Carousel } from "@/components/ui/carousel";
import { TESTIMONIALS } from "@/lib/constants";

export function SocialProof() {
  return (
    <section id="depoimentos" className="bg-white py-[var(--section-py)]">
      <div className="mx-auto max-w-[var(--container-max)] px-6">
        <RevealWrapper direction="up">
          <h2 className="text-center text-neutral-dark">
            Mulheres que decidiram parar de se esconder
          </h2>
        </RevealWrapper>
        <RevealWrapper delay={100} direction="up">
          <p className="mt-2 text-center text-gold font-semibold">
            +200 mulheres impactadas
          </p>
        </RevealWrapper>

        <RevealWrapper delay={200} direction="up">
          <Carousel
            items={TESTIMONIALS}
            className="mt-12"
            renderItem={(testimonial) => (
              <article className="mx-auto max-w-lg rounded-2xl border border-neutral-dark/5 bg-neutral-light p-8 text-center">
                <div
                  className="mx-auto mb-6 h-16 w-16 rounded-full"
                  aria-hidden="true"
                  style={{
                    background:
                      "linear-gradient(135deg, #D4A574 0%, #8E1B2C 100%)",
                  }}
                />
                <h3 className="font-serif text-xl font-semibold text-neutral-dark">
                  {testimonial.name}
                </h3>
                <p className="mt-1 text-sm text-neutral-dark/70">
                  {testimonial.role}
                </p>
                <blockquote className="mt-4 border-l-2 border-gold pl-4 text-neutral-dark/70 italic">
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>
              </article>
            )}
          />
        </RevealWrapper>
      </div>
    </section>
  );
}
