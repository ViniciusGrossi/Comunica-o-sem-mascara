"use client";

import { RevealWrapper } from "@/components/ui/reveal-wrapper";
import { AccordionFaq } from "@/components/ui/accordion-faq";
import { FAQ_ITEMS } from "@/lib/constants";

export function FAQ() {
  return (
    <section id="faq" className="bg-white py-[var(--section-py)]">
      <div className="mx-auto max-w-2xl px-6">
        <RevealWrapper direction="up">
          <h2 className="text-center text-neutral-dark">
            Perguntas frequentes
          </h2>
        </RevealWrapper>

        <RevealWrapper delay={100} direction="up">
          <div className="mt-10">
            <AccordionFaq items={FAQ_ITEMS} />
          </div>
        </RevealWrapper>
      </div>
    </section>
  );
}
