import type { CSSProperties } from "react";
import type { SkyPhase } from "@/shared/lib/sky";
import { cn } from "@/shared/lib/cn";

const gradients: Record<SkyPhase, string> = {
  morning: "bg-linear-to-b from-[#BCD6EE] via-[#DCEAF6] to-cream",
  dusk: "bg-linear-to-b from-[#EE9A6B] via-[#F7CDA6] to-cream",
  night: "bg-linear-to-b from-midnight via-[#2B3961] to-[#56658F]",
};

// Deterministic positions so server and client markup match.
const clouds = [
  { top: "12%", width: 220, duration: 95, delay: -10, opacity: 0.9 },
  { top: "28%", width: 140, duration: 70, delay: -40, opacity: 0.75 },
  { top: "8%", width: 120, duration: 120, delay: -80, opacity: 0.6 },
  { top: "46%", width: 260, duration: 110, delay: -25, opacity: 0.7 },
  { top: "62%", width: 170, duration: 85, delay: -60, opacity: 0.55 },
];

const stars = Array.from({ length: 28 }, (_, i) => ({
  left: `${(i * 37) % 100}%`,
  top: `${(i * 23) % 60}%`,
  size: i % 5 === 0 ? 3 : 2,
  delay: `${(i % 7) * 0.5}s`,
}));

function CloudShape({ className, style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 200 80" className={className} style={style} aria-hidden>
      <path fill="currentColor" d="M40 78a28 28 0 0 1 2-56 36 36 0 0 1 66-8 28 28 0 0 1 50 14 24 24 0 0 1 4 50z" />
    </svg>
  );
}

export function SkyBackdrop({ phase }: { phase: SkyPhase }) {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {(Object.keys(gradients) as SkyPhase[]).map((p) => (
        <div key={p} className={cn("absolute inset-0 transition-opacity duration-1000", gradients[p], p === phase ? "opacity-100" : "opacity-0")} />
      ))}

      {/* Sun / moon */}
      <div
        className={cn(
          "absolute right-[8%] top-[14%] h-28 w-28 rounded-full transition-all duration-1000 sm:h-36 sm:w-36",
          phase === "morning" && "bg-[#FFF3D6] opacity-80 shadow-[0_0_80px_30px_rgba(255,243,214,0.8)]",
          phase === "dusk" && "translate-y-24 bg-[#F7B26B] shadow-[0_0_90px_40px_rgba(247,178,107,0.65)]",
          phase === "night" && "h-20 w-20 bg-[#F6E7C1] shadow-[0_0_60px_18px_rgba(246,231,193,0.35)] sm:h-24 sm:w-24",
        )}
      />

      <div className={cn("absolute inset-0 transition-opacity duration-1000", phase === "night" ? "opacity-100" : "opacity-0")}>
        {stars.map((s, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-cream animate-twinkle"
            style={{ left: s.left, top: s.top, width: s.size, height: s.size, animationDelay: s.delay }}
          />
        ))}
      </div>

      {clouds.map((c, i) => (
        <div
          key={i}
          className="cloud-drift absolute"
          style={{ top: c.top, animationDuration: `${c.duration}s`, animationDelay: `${c.delay}s`, "--rest-x": `${(i * 21 + 4) % 80}%` } as CSSProperties}
        >
          <CloudShape
            className={cn("h-auto transition-colors duration-1000", phase === "night" ? "text-[#8B97BA]" : "text-white")}
            style={{ width: c.width, opacity: phase === "night" ? c.opacity * 0.35 : c.opacity }}
          />
        </div>
      ))}
    </div>
  );
}
