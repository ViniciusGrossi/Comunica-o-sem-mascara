import { ArrowUp } from "lucide-react";

const FOOTER_LINKS = [
  { href: "#", label: "Política de Privacidade" },
  { href: "#", label: "Termos de Uso" },
  { href: "#", label: "Contato" },
];

const SOCIALS = [
  {
    href: "#",
    label: "Instagram",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="5" />
        <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    href: "#",
    label: "YouTube",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.4 19.6C5.12 20 12 20 12 20s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
        <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    href: "#",
    label: "WhatsApp",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
      </svg>
    ),
  },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-neutral-dark text-white/60">
      {/* Gold hairline top */}
      <div
        className="h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent"
        aria-hidden
      />

      {/* Giant watermark wordmark */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 select-none overflow-hidden text-center"
        aria-hidden
      >
        <span className="block translate-y-[35%] font-serif text-[18vw] font-semibold italic leading-none text-white/[0.03]">
          Nyll Nunes
        </span>
      </div>

      <div className="relative mx-auto max-w-[var(--container-max)] px-6 pb-10 pt-16">
        <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr_1fr]">
          {/* Brand */}
          <div>
            <span className="font-serif text-3xl font-semibold italic text-white">
              Nyll Nunes
            </span>
            <p className="mt-1 text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-gold/80">
              Comunicação sem máscaras
            </p>
            <p className="mt-5 max-w-sm text-sm leading-relaxed">
              Transformando mulheres que se escondem em mulheres que se
              posicionam — com verdade, presença e autoridade.
            </p>
          </div>

          {/* Links */}
          <div>
            <span className="text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-white/40">
              Institucional
            </span>
            <div className="mt-5 flex flex-col gap-3 text-sm">
              {FOOTER_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="group inline-flex w-fit items-center gap-2 rounded-sm transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-dark"
                >
                  <span
                    className="h-px w-0 bg-gold transition-all duration-300 group-hover:w-4"
                    aria-hidden
                  />
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Social */}
          <div>
            <span className="text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-white/40">
              Acompanhe
            </span>
            <div className="mt-5 flex gap-3">
              {SOCIALS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="rounded-full border border-white/10 p-3 transition-all duration-300 hover:-translate-y-1 hover:border-gold hover:text-gold hover:shadow-lg hover:shadow-gold/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-dark"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-xs sm:flex-row">
          <span>
            &copy; {currentYear} Nyll Nunes — Comunicação Sem Máscaras. Todos os
            direitos reservados.
          </span>
          <a
            href="#hero"
            className="group inline-flex items-center gap-2 rounded-sm transition-colors hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-dark"
          >
            Voltar ao topo
            <span className="flex h-7 w-7 items-center justify-center rounded-full border border-white/15 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:border-gold">
              <ArrowUp className="h-3.5 w-3.5" />
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
}
