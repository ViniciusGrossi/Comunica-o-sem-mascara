import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import localFont from "next/font/local";
import { LenisProvider } from "@/components/ui/lenis-provider";
import { StickyNavbar } from "@/components/ui/navbar";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
});

const dancingScript = localFont({
  src: "../../public/fonts/DancingScript-Bold.ttf",
  variable: "--font-signature",
  display: "swap",
});

export const metadata: Metadata = {
    title: "Comunicação Sem Máscaras — Nyll Nunes",
  description:
    "Aprenda a se comunicar com confiança, autenticidade e autoridade. Programa online para mulheres que querem ocupar espaços sem medo de julgamentos.",
  openGraph: {
  title: "Comunicação Sem Máscaras — Nyll Nunes",
    description:
      "Aprenda a se comunicar com confiança, autenticidade e autoridade. Para mulheres que querem ocupar os espaços que desejam.",
    url: "https://comunicacaosemmascaras.com.br",
    type: "website",
    locale: "pt_BR",
  },
  twitter: {
    card: "summary_large_image",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Course",
  name: "Comunicação Sem Máscaras",
  description:
    "Programa online para mulheres que querem se comunicar com confiança, autenticidade e autoridade — sem precisar se transformar em outra pessoa.",
  provider: {
    "@type": "Person",
    name: "Nyll Nunes",
    url: "https://comunicacaosemmascaras.com.br",
  },
  url: "https://comunicacaosemmascaras.com.br",
  inLanguage: "pt-BR",
  coursePrerequisites: "Nenhuma experiência prévia necessária",
  educationalLevel: "Beginner",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={`${cormorant.variable} ${inter.variable} ${dancingScript.variable}`}>
      <body>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded focus:bg-primary focus:px-4 focus:py-2 focus:text-white focus:outline-none"
        >
          Pular para conteúdo
        </a>
        <LenisProvider>
          <ScrollProgress />
          <StickyNavbar />
          <main id="main-content">{children}</main>
        </LenisProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
