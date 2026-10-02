import Image from "next/image";
import { mascotPoses, type MascotPose } from "@/shared/config/mascot";
import { cn } from "@/shared/lib/cn";

type MascotProps = {
  pose: MascotPose;
  size?: number;
  className?: string;
  /** Gentle up-and-down floating (disabled automatically for reduced motion). */
  float?: boolean;
  preload?: boolean;
  /** Use when the mascot is purely decorative next to text that says the same thing. */
  decorative?: boolean;
};

export function Mascot({ pose, size = 240, className, float, preload, decorative }: MascotProps) {
  const { src, alt } = mascotPoses[pose];
  return (
    <Image
      src={src}
      alt={decorative ? "" : alt}
      width={size}
      height={size}
      preload={preload}
      // SVG placeholders don't benefit from the optimizer; real PNG/WebP art will.
      unoptimized={src.endsWith(".svg")}
      className={cn("select-none", float && "animate-float", className)}
      draggable={false}
    />
  );
}
