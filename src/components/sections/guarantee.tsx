"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { RevealWrapper } from "@/components/ui/reveal-wrapper";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

/** Rotating gold seal with circular text */
function GuaranteeSeal() {
  const reduced = useReducedMotion();

  return (
    <div className="relative mx-auto h-44 w-44" aria-hidden>
      {/* Rotating circular text */}
      <svg
        viewBox="0 0 200 200"
        className={`absolute inset-0 h-full w-full ${
          reduced ? "" : "animate-[sealSpin_24s_linear_infinite]"
        }`}
      >
        <defs>
          <path
            id="seal-circle"
            d="M 100,100 m -78,0 a 78,78 0 1,1 156,0 a 78,78 0 1,1 -156,0"
          />
        </defs>
        <text
          fill="var(--color-gold-deep)"
          fontSize="15.5"
          fontWeight="600"
          letterSpacing="4"
          style={{ textTransform: "uppercase" }}
        >
          <textPath href="#seal-circle">
            Garantia incondicional · risco zero ·
          </textPath>
        </text>
      </svg>

      {/* Inner medallion */}
      <div className="absolute inset-[26%] flex flex-col items-center justify-center rounded-full border-2 border-dashed border-gold-deep bg-gradient-to-b from-gold/20 to-transparent">
        <span className="font-serif text-4xl font-bold leading-none text-gold-deep">
          7
        </span>
        <span className="mt-0.5 text-[0.55rem] font-semibold uppercase tracking-[0.25em] text-gold-deep">
          dias
        </span>
      </div>
    </div>
  );
}

/**
 * Filigree pilaster, viewBox 0 0 140 520. Built as an exact mirror pair:
 * every lower element is its upper twin reflected about y=260 (y' = 520 - y),
 * every right element about x=70 (x' = 140 - x). Reading top → bottom:
 * bead · teardrop · palmette · leaf pair · volute pair · leaflets · rosette ·
 * leaflets · volute pair · leaf pair · palmette · teardrop · bead.
 */

/** Stroked outlines — these draw themselves via `pathLength`. [d, strokeWidth] */
const STROKES: readonly [string, number][] = [
  ["M70,58 L70,462", 3.4], // central stem
  ["M70,46 C56,40 42,46 40,60 C39,72 54,72 58,60", 2.2], // palmette top L
  ["M70,46 C84,40 98,46 100,60 C101,72 86,72 82,60", 2.2], // palmette top R
  ["M70,474 C56,480 42,474 40,460 C39,448 54,448 58,460", 2.2], // palmette bottom L
  ["M70,474 C84,480 98,474 100,460 C101,448 86,448 82,460", 2.2], // palmette bottom R
  ["M70,126 C50,126 30,138 30,158 C30,176 46,184 58,174 C66,167 62,156 52,158 C46,159 45,166 50,168", 2.4], // volute top L
  ["M70,126 C90,126 110,138 110,158 C110,176 94,184 82,174 C74,167 78,156 88,158 C94,159 95,166 90,168", 2.4], // volute top R
  ["M70,394 C50,394 30,382 30,362 C30,344 46,336 58,346 C66,353 62,364 52,362 C46,361 45,354 50,352", 2.4], // volute bottom L
  ["M70,394 C90,394 110,382 110,362 C110,344 94,336 82,346 C74,353 78,364 88,362 C94,361 95,354 90,352", 2.4], // volute bottom R
  ["M70,250 L78,260 L70,270 L62,260 Z", 1.1], // rosette inner lozenge
  ["M54,260 C40,248 24,254 22,266 C21,276 34,278 40,270", 1.9], // rosette flourish L
  ["M86,260 C100,248 116,254 118,266 C119,276 106,278 100,270", 1.9], // rosette flourish R
];

/** Filled shapes — `pathLength` only animates strokes, so these fade in. */
const FILLS: readonly [string, number][] = [
  ["M70,124 C58,118 50,104 52,90 C64,96 70,110 70,124 Z", 1.3], // leaf top L
  ["M70,124 C82,118 90,104 88,90 C76,96 70,110 70,124 Z", 1.3], // leaf top R
  ["M70,396 C58,402 50,416 52,430 C64,424 70,410 70,396 Z", 1.3], // leaf bottom L
  ["M70,396 C82,402 90,416 88,430 C76,424 70,410 70,396 Z", 1.3], // leaf bottom R
  ["M70,200 C62,198 54,204 52,214 C60,216 68,210 70,200 Z", 1.1], // leaflet upper L
  ["M70,200 C78,198 86,204 88,214 C80,216 72,210 70,200 Z", 1.1], // leaflet upper R
  ["M70,320 C62,322 54,316 52,306 C60,304 68,310 70,320 Z", 1.1], // leaflet lower L
  ["M70,320 C78,322 86,316 88,306 C80,304 72,310 70,320 Z", 1.1], // leaflet lower R
  ["M70,240 L86,260 L70,280 L54,260 Z", 1.4], // rosette lozenge
  ["M70,14 C76,28 80,40 70,58 C60,40 64,28 70,14", 1.5], // finial teardrop top
  ["M70,506 C76,492 80,480 70,462 C60,480 64,492 70,506", 1.5], // finial teardrop bottom
];

/** Beading — [cx, cy, r] */
const BEADS: readonly [number, number, number][] = [
  [70, 10, 3.2], [70, 510, 3.2], // finial tips
  [40, 60, 2.2], [100, 60, 2.2], [40, 460, 2.2], [100, 460, 2.2], // palmette tips
  [52, 158, 2], [88, 158, 2], [52, 362, 2], [88, 362, 2], // volute eyes
  [52, 214, 1.5], [88, 214, 1.5], [52, 306, 1.5], [88, 306, 1.5], // leaflet tips
];

function SideArabesque({
  side,
  opacity,
  draw,
  fills,
  dots,
}: {
  side: "left" | "right";
  opacity: MotionValue<number> | number;
  draw: MotionValue<number> | number;
  fills: MotionValue<number> | number;
  dots: MotionValue<number> | number;
}) {
  const stroke = `arabesque-stroke-${side}`;
  const fill = `arabesque-fill-${side}`;

  return (
    <motion.svg
      viewBox="0 0 140 520"
      fill="none"
      aria-hidden
      style={{
        opacity,
        filter:
          "drop-shadow(0 0 9px color-mix(in srgb, var(--color-gold) 40%, transparent))",
      }}
      className={`pointer-events-none absolute top-1/2 hidden h-[92%] max-h-[640px] w-auto -translate-y-1/2 lg:block ${
        side === "left" ? "left-0" : "right-0"
      }`}
    >
      <defs>
        {/* userSpaceOnUse, not the default objectBoundingBox: the central stem
            is a straight vertical line, whose bbox has zero width — that makes
            an objectBoundingBox gradient degenerate and the stem renders as
            nothing. It also gives the whole column one continuous gradient.
            Darkest gold at the top, where the bg is lightest. */}
        <linearGradient id={stroke} gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="0" y2="520">
          <stop offset="0%" stopColor="var(--color-gold-deep)" />
          <stop offset="55%" stopColor="var(--color-gold-deep)" />
          <stop offset="100%" stopColor="var(--color-gold)" />
        </linearGradient>
        <linearGradient id={fill} gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="0" y2="520">
          <stop offset="0%" stopColor="var(--color-gold-deep)" stopOpacity="0.5" />
          <stop offset="100%" stopColor="var(--color-gold)" stopOpacity="0.65" />
        </linearGradient>
      </defs>

      {STROKES.map(([d, w]) => (
        <motion.path
          key={d}
          d={d}
          stroke={`url(#${stroke})`}
          strokeWidth={w}
          strokeLinecap="round"
          style={{ pathLength: draw }}
        />
      ))}

      {FILLS.map(([d, w]) => (
        <motion.path
          key={d}
          d={d}
          fill={`url(#${fill})`}
          stroke={`url(#${stroke})`}
          strokeWidth={w}
          strokeLinecap="round"
          style={{ opacity: fills }}
        />
      ))}

      {BEADS.map(([cx, cy, r]) => (
        <motion.circle
          key={`${cx}-${cy}`}
          cx={cx}
          cy={cy}
          r={r}
          fill={`url(#${stroke})`}
          style={{ opacity: dots }}
        />
      ))}
      <motion.circle
        cx="70"
        cy="260"
        r="2.6"
        fill="var(--color-gold-light)"
        style={{ opacity: dots }}
      />
    </motion.svg>
  );
}

/** Warm cream → dusty wine. Darker than the old flat `neutral-light`, but
 *  still a light section: `neutral-dark` text keeps full contrast. */
const SECTION_BG =
  "linear-gradient(180deg, color-mix(in srgb, var(--color-neutral-light) 92%, var(--color-gold-deep)) 0%, color-mix(in srgb, var(--color-neutral-light) 78%, var(--color-secondary)) 100%)";

export function Guarantee() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const leftOpacity = useTransform(scrollYProgress, [0.08, 0.32, 0.9, 1], [0, 1, 1, 0.75]);
  const rightOpacity = useTransform(scrollYProgress, [0.12, 0.36, 0.9, 1], [0, 1, 1, 0.75]);
  // Outlines draw first, leaves/rosette bloom in behind them, beads land last.
  const draw = useTransform(scrollYProgress, [0.1, 0.5], [0, 1]);
  const fills = useTransform(scrollYProgress, [0.34, 0.56], [0, 1]);
  const dots = useTransform(scrollYProgress, [0.48, 0.62], [0, 1]);

  return (
    <section
      id="garantia"
      ref={sectionRef}
      className="relative overflow-hidden py-[var(--section-py)]"
      style={{ background: SECTION_BG }}
    >
      {/* Centered rail: pins the arabesques just outside the seal/heading
          column instead of the far section edges. */}
      <div
        className="pointer-events-none absolute inset-0 flex justify-center"
        aria-hidden
      >
        <div className="relative w-full max-w-4xl">
          {reduced ? (
            <>
              <SideArabesque side="left" opacity={0.85} draw={1} fills={1} dots={1} />
              <SideArabesque side="right" opacity={0.85} draw={1} fills={1} dots={1} />
            </>
          ) : (
            <>
              <SideArabesque side="left" opacity={leftOpacity} draw={draw} fills={fills} dots={dots} />
              <SideArabesque side="right" opacity={rightOpacity} draw={draw} fills={fills} dots={dots} />
            </>
          )}
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-[var(--container-max)] px-6 text-center">
        <RevealWrapper direction="up">
          <GuaranteeSeal />
        </RevealWrapper>

        <RevealWrapper delay={100} direction="up">
          {/* max-w-lg keeps the heading inside the rail so it never runs
              through the arabesques on wide screens. */}
          <h2 className="mx-auto mt-8 max-w-lg text-neutral-dark">
            7 dias de garantia{" "}
            {/* Solid gold-deep, not `.text-gold-gradient`: that gradient peaks
                at #F0DCBB, which is illegible on this light section. */}
            <em className="whitespace-nowrap text-gold-deep">incondicional</em>
          </h2>
        </RevealWrapper>

        <RevealWrapper delay={200} direction="up">
          <p className="mx-auto mt-4 max-w-lg text-lg text-neutral-dark/65">
            Entre, assista às aulas, sinta o método. Se não for para você,
            devolvemos 100% do valor.{" "}
            <span className="font-medium text-neutral-dark">
              Sem perguntas, sem burocracia.
            </span>
          </p>
        </RevealWrapper>
      </div>
    </section>
  );
}
