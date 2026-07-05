"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface AccordionItemProps {
  index: number;
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}

function AccordionItem({
  index,
  question,
  answer,
  isOpen,
  onToggle,
}: AccordionItemProps) {
  return (
    <div
      className={cn(
        "border-b border-neutral-dark/10 transition-colors duration-300",
        isOpen && "border-gold/40"
      )}
    >
      <button
        onClick={onToggle}
        className="group flex w-full items-center gap-5 py-6 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
        aria-expanded={isOpen}
      >
        <span
          className={cn(
            "font-serif text-sm transition-colors duration-300",
            isOpen ? "text-gold-deep" : "text-neutral-dark/30"
          )}
        >
          {String(index + 1).padStart(2, "0")}
        </span>
        <span
          className={cn(
            "flex-1 pr-4 font-serif text-lg font-medium transition-colors duration-300 sm:text-xl",
            isOpen ? "text-primary" : "text-neutral-dark group-hover:text-primary"
          )}
        >
          {question}
        </span>
        <span
          className={cn(
            "flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border transition-all duration-300",
            isOpen
              ? "rotate-45 border-gold bg-gold text-white"
              : "border-neutral-dark/15 text-neutral-dark/50 group-hover:border-gold group-hover:text-gold-deep"
          )}
        >
          <Plus className="h-4 w-4" />
        </span>
      </button>
      <div
        className={cn(
          "grid transition-all duration-300 ease-in-out",
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        )}
      >
        <div className="overflow-hidden">
          <p className="pb-6 pl-10 pr-12 leading-relaxed text-neutral-dark/60">
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
}

interface AccordionProps {
  items: { question: string; answer: string }[];
  className?: string;
}

export function AccordionFaq({ items, className }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className={cn("border-t border-neutral-dark/10", className)}>
      {items.map((item, i) => (
        <AccordionItem
          key={i}
          index={i}
          question={item.question}
          answer={item.answer}
          isOpen={openIndex === i}
          onToggle={() => setOpenIndex(openIndex === i ? null : i)}
        />
      ))}
    </div>
  );
}
