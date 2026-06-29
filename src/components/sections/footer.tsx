export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-neutral-dark py-12 text-white/60">
      <div className="mx-auto grid max-w-[var(--container-max)] gap-8 px-6 sm:grid-cols-2 lg:grid-cols-3">
        <div>
          <span className="font-serif text-xl font-semibold text-white">
            Nil Nunes
          </span>
          <p className="mt-2 text-sm">
            Comunicação Sem Máscaras — Transformando mulheres que se escondem em mulheres que se posicionam.
          </p>
        </div>

        <div className="flex flex-col gap-2 text-sm">
          <a href="#" className="hover:text-white transition-colors">
            Política de Privacidade
          </a>
          <a href="#" className="hover:text-white transition-colors">
            Termos de Uso
          </a>
          <a href="#" className="hover:text-white transition-colors">
            Contato
          </a>
        </div>

        <div className="flex gap-4">
          <a
            href="#"
            aria-label="Instagram"
            className="rounded-full border border-white/10 p-3 transition-colors hover:border-gold hover:text-gold"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
              <rect x="2" y="2" width="20" height="20" rx="5" />
              <circle cx="12" cy="12" r="5" />
              <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
            </svg>
          </a>
          <a
            href="#"
            aria-label="YouTube"
            className="rounded-full border border-white/10 p-3 transition-colors hover:border-gold hover:text-gold"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
              <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.4 19.6C5.12 20 12 20 12 20s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
              <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="currentColor" stroke="none" />
            </svg>
          </a>
          <a
            href="#"
            aria-label="WhatsApp"
            className="rounded-full border border-white/10 p-3 transition-colors hover:border-gold hover:text-gold"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
            </svg>
          </a>
        </div>
      </div>

      <div className="mx-auto mt-8 max-w-[var(--container-max)] border-t border-white/10 px-6 pt-8 text-center text-xs">
        &copy; {currentYear} Nil Nunes — Comunicação Sem Máscaras. Todos os direitos reservados.
      </div>
    </footer>
  );
}
