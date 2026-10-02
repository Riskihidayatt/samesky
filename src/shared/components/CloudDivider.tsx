import { cn } from "@/shared/lib/cn";

type CloudDividerProps = {
  /** Colour of the section *below* the divider, so the clouds blend into it. */
  color: string;
  className?: string;
  flip?: boolean;
};

/** Puffy cloud edge used to separate sections instead of a hard line. */
export function CloudDivider({ color, className, flip }: CloudDividerProps) {
  return (
    <div aria-hidden className={cn("pointer-events-none relative h-14 w-full overflow-hidden sm:h-20", flip && "rotate-180", className)}>
      <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
        <path
          fill={color}
          opacity="0.55"
          d="M0 120V78c40-26 92-30 132-8 30-36 96-44 136-10 34-30 98-34 132 2 44-34 116-34 156 4 36-28 98-28 134 4 42-36 118-38 160 0 40-30 104-30 140 2 38-28 98-30 136-4 36-26 86-26 114 2L1440 78V120H0z"
        />
        <path
          fill={color}
          d="M0 120V96c30-22 80-26 112-4 34-30 94-32 128-2 40-30 108-28 144 6 38-26 98-26 132 6 46-34 120-34 162 2 34-24 92-26 126 4 40-28 108-28 146 2 36-26 94-26 128 6 32-22 84-24 116-4 30-20 72-22 104-4 32-16 64-16 90 0L1440 96V120H0z"
        />
      </svg>
    </div>
  );
}
