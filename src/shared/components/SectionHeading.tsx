import { cn } from "@/shared/lib/cn";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  tone?: "dark" | "light";
  id?: string;
  className?: string;
};

export function SectionHeading({ eyebrow, title, description, align = "center", tone = "dark", id, className }: SectionHeadingProps) {
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}>
      <p className={cn("text-sm font-semibold uppercase tracking-[0.18em]", tone === "dark" ? "text-brown" : "text-dusk")}>{eyebrow}</p>
      <h2 id={id} className={cn("mt-3 text-3xl font-semibold sm:text-4xl", tone === "dark" ? "text-midnight" : "text-cream")}>
        {title}
      </h2>
      {description && <p className={cn("mt-4 text-lg", tone === "dark" ? "text-ink-soft" : "text-cream/80")}>{description}</p>}
    </div>
  );
}
