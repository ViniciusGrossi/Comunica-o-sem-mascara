"use client";

import {
  MessageCircle,
  ShoppingBag,
  Video,
  Star,
  Users,
  Eye,
} from "lucide-react";
import { RevealWrapper } from "@/components/ui/reveal-wrapper";
import { TiltCard } from "@/components/ui/tilt-card";

const TRANSFORMS = [
  {
    icon: MessageCircle,
    label: "Comunicar com confiança",
    description:
      "Encontre as palavras certas em qualquer situação — sem tremer, sem travar, sem se arrepender depois.",
  },
  {
    icon: ShoppingBag,
    label: "Vender naturalmente",
    description:
      "Apresente-se e venda seu trabalho sem soar desesperada ou forçada — com leveza e verdade.",
  },
  {
    icon: Video,
    label: "Gravar vídeos sem travar",
    description:
      "Apareça com presença, mesmo na câmera. Fale com naturalidade e conecte de verdade.",
  },
  {
    icon: Star,
    label: "Ser respeitada",
    description:
      "Seja ouvida e levada a sério nos espaços onde decide entrar — sem precisar diminuir-se.",
  },
  {
    icon: Users,
    label: "Ocupar espaços",
    description:
      "Esteja presente em reuniões, palcos e decisões com a segurança de quem sabe o próprio valor.",
  },
  {
    icon: Eye,
    label: "Parar de se esconder",
    description:
      "Pare de diminuir o próprio brilho. Mostre quem você é — sem medo de ser vista por inteiro.",
  },
];

export function Transformation() {
  return (
    <section
      id="transformacao"
      className="relative overflow-hidden py-[var(--section-py)]"
      style={{
        background:
          "radial-gradient(ellipse at 50% 50%, var(--color-neutral-light) 0%, var(--color-white) 70%)",
      }}
    >
      <div className="mx-auto max-w-[var(--container-max)] px-6">
        <RevealWrapper direction="up">
          <div className="text-center">
            <span className="eyebrow text-primary/70">Imagine viver assim</span>
            <h2 className="mt-4 text-neutral-dark">
              A mulher que você sente{" "}
              <em className="text-primary">vontade de ser</em>...
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-neutral-dark/70">
              Não é uma versão melhor de quem você é. É quem você sempre foi —
              com permissão de existir.
            </p>
          </div>
        </RevealWrapper>

        <div className="mt-20 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {TRANSFORMS.map((item, i) => (
            <RevealWrapper key={item.label} delay={i * 100} direction="up">
              <TiltCard
                max={10}
                className="group h-full min-h-[260px] border border-neutral-dark/10 bg-white p-8 shadow-sm transition-shadow duration-500 hover:shadow-2xl"
              >
                <div
                  className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 transition-all duration-500 group-hover:scale-110 group-hover:bg-primary group-hover:text-white"
                  style={{ transform: "translateZ(40px)" }}
                >
                  <item.icon className="h-8 w-8 text-primary transition-colors duration-500 group-hover:text-white" />
                </div>
                <h3
                  className="mt-8 font-serif text-2xl font-medium text-neutral-dark"
                  style={{ transform: "translateZ(30px)" }}
                >
                  {item.label}
                </h3>
                <p
                  className="mt-4 text-base leading-relaxed text-neutral-dark/70"
                  style={{ transform: "translateZ(20px)" }}
                >
                  {item.description}
                </p>
                <div
                  className="mt-6 h-1 w-12 origin-left bg-gold transition-all duration-500 group-hover:w-20"
                  style={{ transform: "translateZ(10px)" }}
                />
              </TiltCard>
            </RevealWrapper>
          ))}
        </div>
      </div>
    </section>
  );
}
