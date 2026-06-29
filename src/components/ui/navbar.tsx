"use client";

import { CtaButton } from "@/components/ui/cta-button";

export function StickyNavbar() {
  return (
    <header className="fixed top-0 z-50 w-full border-b border-neutral-dark/5 bg-white/80 backdrop-blur-md">
      <nav aria-label="Menu principal" className="mx-auto flex max-w-[var(--container-max)] items-center justify-between px-6 py-3">
        <span className="font-serif text-xl font-semibold text-neutral-dark">
          Nil Nunes
        </span>
        <CtaButton size="default" className="text-sm">
          Quero fazer parte
        </CtaButton>
      </nav>
    </header>
  );
}
