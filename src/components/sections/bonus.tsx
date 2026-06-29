"use client";

import { Gift } from "lucide-react";
import { RevealWrapper } from "@/components/ui/reveal-wrapper";

export function Bonus() {
  return (
    <section id="bonus" className="bg-white py-[var(--section-py)]">
      <div className="mx-auto max-w-[var(--container-max)] px-6">
        <RevealWrapper direction="up">
          <h2 className="text-center text-neutral-dark">Bônus exclusivo</h2>
        </RevealWrapper>

        <RevealWrapper delay={100} direction="up">
          <div className="mx-auto mt-8 max-w-md rounded-2xl border border-gold/30 p-8 text-center" style={{ background: "linear-gradient(135deg, #D4A574 0%, #A07A3C 100%)" }}>
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-white/20">
              <Gift className="h-7 w-7 text-white" />
            </div>
            <span className="inline-block rounded-full bg-white/20 px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
              Bônus
            </span>
            <h3 className="mt-4 text-xl font-semibold text-white">
              Como vencer o medo de gravar vídeos
            </h3>
            <p className="mt-2 text-sm text-white/80">
              Masterclass gravada exclusiva para alunas do programa.
            </p>
          </div>
        </RevealWrapper>
      </div>
    </section>
  );
}
