import Image from "next/image";
import { logoMark } from "@/shared/config/mascot";
import { cn } from "@/shared/lib/cn";

/** Mascot mark + wordmark. The mark is decorative; links using the logo carry their own aria-label. */
export function Logo({ className, tone = "dark" }: { className?: string; tone?: "dark" | "light" }) {
  return (
    <span className={cn("inline-flex items-center gap-2 font-display text-xl font-semibold tracking-[0.14em]", tone === "dark" ? "text-midnight" : "text-cream", className)}>
      <Image src={logoMark.src} alt="" width={logoMark.width} height={logoMark.height} sizes="56px" className="h-9 w-auto" />
      SAMESKY
    </span>
  );
}
