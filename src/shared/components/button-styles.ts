import { cn } from "@/shared/lib/cn";

type Variant = "primary" | "secondary" | "ghost" | "light" | "accent";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-300 ease-out disabled:cursor-not-allowed disabled:opacity-60 motion-safe:hover:-translate-y-0.5 motion-safe:active:translate-y-0";

const variants: Record<Variant, string> = {
  primary: "bg-midnight text-cream shadow-soft hover:bg-midnight-soft hover:shadow-lift",
  secondary: "border-2 border-brown text-brown hover:bg-brown hover:text-cream",
  ghost: "text-ink hover:bg-ink/5",
  accent: "bg-dusk text-ink shadow-soft hover:bg-[#F6B37D] hover:shadow-lift",
  light: "bg-cream text-midnight shadow-soft hover:bg-white hover:shadow-lift",
};

const sizes: Record<Size, string> = {
  md: "min-h-11 px-5 text-[0.95rem]",
  lg: "min-h-13 px-7 text-base",
};

/** Shared button look for <button> and <a> so links and buttons stay consistent. */
export function buttonStyles(variant: Variant = "primary", size: Size = "md", className?: string) {
  return cn(base, variants[variant], sizes[size], className);
}
