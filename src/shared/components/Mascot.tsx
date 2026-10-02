import Image from "next/image";
import { mascotPoses, type MascotPose } from "@/shared/config/mascot";
import { cn } from "@/shared/lib/cn";

type MascotProps = {
  pose: MascotPose;
  /** Rendered width in px; height follows the artwork's aspect ratio. */
  size?: number;
  className?: string;
  /** Gentle up-and-down floating (disabled automatically for reduced motion). */
  float?: boolean;
  preload?: boolean;
  /** Use when the mascot is purely decorative next to text that says the same thing. */
  decorative?: boolean;
};

export function Mascot({ pose, size = 240, className, float, preload, decorative }: MascotProps) {
  const { src, alt, width, height } = mascotPoses[pose];
  return (
    <Image
      src={src}
      alt={decorative ? "" : alt}
      width={size}
      height={Math.round((size * height) / width)}
      preload={preload}
      sizes={`${size}px`}
      unoptimized={src.endsWith(".svg")}
      className={cn("select-none", float && "animate-float", className)}
      draggable={false}
    />
  );
}
