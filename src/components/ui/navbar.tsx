"use client";

import { useEffect, useState } from "react";
import { CtaButton } from "@/components/ui/cta-button";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

const NAV_LINKS = [
  { href: "#metodo", label: "O Método" },
  { href: "#sobre", label: "A Mentora" },
  { href: "#depoimentos", label: "Depoimentos" },
  { href: "#oferta", label: "Oferta" },
  { href: "#faq", label: "FAQ" },
];

export function StickyNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    let lastY = window.scrollY;
    function onScroll() {
      const y = window.scrollY;
      setScrolled(y > 40);
      setHidden(y > 160 && y > lastY);
      lastY = y;
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={[
        "fixed top-0 z-50 w-full transition-all duration-500",
        scrolled
          ? "border-b border-gold/15 bg-neutral-dark/80 shadow-[0_8px_32px_-12px_rgba(0,0,0,0.5)] backdrop-blur-xl"
          : "border-b border-transparent bg-transparent",
        !reduced && hidden ? "-translate-y-full" : "translate-y-0",
      ].join(" ")}
    >
      <nav
        aria-label="Menu principal"
        className="mx-auto flex max-w-[var(--container-max)] items-center justify-between px-6 py-3"
      >
        <a
          href="#hero"
          className="group flex items-baseline gap-2 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-dark"
        >
          <span className="font-serif text-xl font-semibold italic text-white transition-colors group-hover:text-gold">
            Nyll Nunes
          </span>
          <span className="hidden text-[0.6rem] font-medium uppercase tracking-[0.25em] text-gold/70 sm:block">
            Comunicação sem máscaras
          </span>
        </a>

        <div className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="group relative rounded-sm text-sm text-white/70 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-dark"
            >
              {link.label}
              <span
                className="absolute -bottom-1 left-0 h-px w-0 bg-gold transition-all duration-300 group-hover:w-full"
                aria-hidden
              />
            </a>
          ))}
        </div>

        <CtaButton size="default" className="!px-6 !py-3 text-sm">
          Quero fazer parte
        </CtaButton>
      </nav>
    </header>
  );
}
