"use client";

export function ShineBorder({
  children,
  className = "",
  rounded = "rounded-2xl",
}: {
  children: React.ReactNode;
  className?: string;
  rounded?: string;
}) {
  return (
    <div className={`relative overflow-hidden ${rounded} ${className}`}>
      <div
        className="absolute inset-0 animate-[shine-border_4s_linear_infinite]"
        style={{
          background:
            "conic-gradient(from 0deg, transparent 0%, var(--color-gold) 5%, var(--color-primary) 10%, transparent 15%, transparent 100%)",
          padding: "1.5px",
        }}
        aria-hidden
      >
        <div className={`h-full w-full ${rounded} bg-neutral-dark`} />
      </div>
      <div className={`relative z-10 m-[1.5px] ${rounded}`}>{children}</div>
    </div>
  );
}
