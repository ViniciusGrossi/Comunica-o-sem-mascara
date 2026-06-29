"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap-reg";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

interface MaskRevealProps {
  children: React.ReactNode;
  className?: string;
  direction?: "left" | "right" | "up" | "down";
}

export function MaskReveal({
  children,
  className,
  direction = "up",
}: MaskRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || !ref.current) return;

    const clipFrom: Record<string, string> = {
      up: "inset(100% 0% 0% 0%)",
      down: "inset(0% 0% 100% 0%)",
      left: "inset(0% 100% 0% 0%)",
      right: "inset(0% 0% 0% 100%)",
    };
    const clipTo = "inset(0% 0% 0% 0%)";

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ref.current,
        { clipPath: clipFrom[direction] },
        {
          clipPath: clipTo,
          duration: 1,
          ease: "power3.inOut",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 85%",
            once: true,
          },
        }
      );
    }, ref.current);

    return () => ctx.revert();
  }, [reduced, direction]);

  return (
    <div ref={ref} className={className} style={reduced ? undefined : { clipPath: "inset(100% 0% 0% 0%)" }}>
      {children}
    </div>
  );
}
