import { ImageOff } from "lucide-react";
import { Mascot } from "@/shared/components/Mascot";

type GarmentPlaceholderProps = {
  color: string;
  side: "front" | "back";
  label: string;
};

/**
 * Shown while a product colour has no photo yet. It keeps the card's look (same backdrop,
 * same proportions) and reflects the chosen colour, instead of an off-brand drawing.
 */
export function GarmentPlaceholder({ color, side, label }: GarmentPlaceholderProps) {
  return (
    <div role="img" aria-label={`${label} (foto segera hadir)`} className="absolute inset-0 flex flex-col items-center justify-center bg-photo">
      <div aria-hidden className="absolute inset-0 opacity-25" style={{ background: `radial-gradient(circle at 50% 42%, ${color} 0%, transparent 70%)` }} />
      <div className="relative flex aspect-square w-[58%] items-center justify-center rounded-full shadow-soft" style={{ backgroundColor: color }}>
        <div className="absolute inset-[6%] rounded-full border-2 border-dashed border-white/50" />
        <Mascot pose={side === "front" ? "wave" : "walk"} size={160} decorative className="relative h-auto w-[78%] drop-shadow-md" />
      </div>
      <span className="relative mt-4 inline-flex items-center gap-1.5 rounded-full bg-cream/90 px-3 py-1 text-xs font-semibold text-ink-soft">
        <ImageOff aria-hidden className="h-3.5 w-3.5" /> Foto segera hadir
      </span>
    </div>
  );
}
