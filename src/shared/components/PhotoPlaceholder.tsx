import Image from "next/image";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/shared/lib/cn";

type PhotoPlaceholderProps = {
  /** Real photo. When omitted a soft illustrated placeholder is rendered instead. */
  src?: string;
  alt: string;
  icon: LucideIcon;
  /** Tailwind gradient classes for the placeholder background. */
  gradient: string;
  sizes?: string;
  className?: string;
};

export function PhotoPlaceholder({ src, alt, icon: Icon, gradient, sizes = "(min-width: 1024px) 33vw, 50vw", className }: PhotoPlaceholderProps) {
  if (src) {
    return <Image src={src} alt={alt} fill sizes={sizes} className={cn("object-cover", className)} loading="lazy" />;
  }
  return (
    <div role="img" aria-label={alt} className={cn("absolute inset-0 flex items-center justify-center bg-linear-to-br", gradient, className)}>
      <svg aria-hidden viewBox="0 0 200 80" className="absolute right-4 top-4 w-20 text-white/50">
        <path fill="currentColor" d="M40 70a26 26 0 0 1 4-51 34 34 0 0 1 64-6 26 26 0 0 1 46 16 22 22 0 0 1 6 41z" />
      </svg>
      <Icon aria-hidden className="h-12 w-12 text-white/80" strokeWidth={1.5} />
    </div>
  );
}
