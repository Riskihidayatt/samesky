import { Cloud } from "lucide-react";
import { cn } from "@/shared/lib/cn";

/** Text wordmark. Swap the inner content for an <Image> once the official logo file exists. */
export function Logo({ className, tone = "dark" }: { className?: string; tone?: "dark" | "light" }) {
  return (
    <span className={cn("inline-flex items-center gap-2 font-display text-xl font-semibold tracking-[0.14em]", tone === "dark" ? "text-midnight" : "text-cream", className)}>
      <Cloud aria-hidden className={cn("h-6 w-6", tone === "dark" ? "fill-dawn-soft text-brown" : "fill-cream/20 text-dusk")} strokeWidth={1.8} />
      SAMESKY
    </span>
  );
}
