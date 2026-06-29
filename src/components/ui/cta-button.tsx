"use client";

import { useState, useRef, MouseEvent } from "react";
import { cn } from "@/lib/utils";
import { KIWIFY_URL } from "@/lib/constants";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

interface CtaButtonProps {
  className?: string;
  variant?: "primary" | "outline";
  size?: "default" | "lg";
  children: React.ReactNode;
}

export function CtaButton({
  className,
  variant = "primary",
  size = "default",
  children,
}: CtaButtonProps) {
  const btnRef = useRef<HTMLAnchorElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const reduced = useReducedMotion();

  function handleMouseMove(e: MouseEvent<HTMLAnchorElement>) {
    if (reduced) return;
    const rect = e.currentTarget.getBoundingClientRect();
    setPos({
      x: e.clientX - rect.left - rect.width / 2,
      y: e.clientY - rect.top - rect.height / 2,
    });
  }

  function handleMouseLeave() {
    if (reduced) return;
    setPos({ x: 0, y: 0 });
  }

  return (
    <a
      ref={btnRef}
      href={KIWIFY_URL}
      target="_blank"
      rel="noopener noreferrer"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      aria-label={`${typeof children === 'string' ? children : 'Inscreva-se'} (abre em nova aba)`}
      className={cn(
        "relative inline-flex items-center justify-center overflow-hidden rounded-full font-sans font-semibold tracking-wide transition-all duration-300",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2",
        variant === "primary" &&
          "bg-primary text-white hover:bg-secondary shadow-lg hover:shadow-xl",
        variant === "outline" &&
          "border-2 border-primary text-primary hover:bg-primary hover:text-white",
        size === "default" && "px-8 py-4 text-base",
        size === "lg" && "px-10 py-5 text-lg",
        !reduced && "hover:-translate-y-0.5",
        className
      )}
      style={
        !reduced
          ? {
              transform: `translate(${pos.x * 0.15}px, ${pos.y * 0.15}px)`,
              transition: "transform 0.15s ease-out, background-color 0.3s",
            }
          : undefined
      }
    >
      {variant === "primary" && (
        <span
          className="pointer-events-none absolute inset-0 overflow-hidden"
          aria-hidden
        >
          <span
            className="absolute top-0 h-full w-1/3 bg-white/10 skew-x-[-20deg]"
            style={{
              left: "-100%",
              animation: reduced ? "none" : "lightSweep 3s ease-in-out infinite",
            }}
          />
        </span>
      )}
      <span className="relative z-10">{children}</span>
    </a>
  );
}
