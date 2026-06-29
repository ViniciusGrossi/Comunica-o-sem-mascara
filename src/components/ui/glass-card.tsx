import { cn } from "@/lib/utils";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  gold?: boolean;
}

export function GlassCard({ children, className, gold = false }: GlassCardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border bg-white/5 p-6 backdrop-blur-md",
        gold
          ? "border-gold/30 bg-gold/5"
          : "border-neutral-dark/10 bg-neutral-light/50",
        className
      )}
    >
      {children}
    </div>
  );
}
