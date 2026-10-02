import { cn } from "@/shared/lib/cn";

type CloudDividerProps = {
  /** Colour of the section *below* the divider, so the clouds blend into it. */
  color: string;
  className?: string;
  flip?: boolean;
};

const WIDTH = 1440;

/** A row of evenly spaced cloud bumps spanning exactly 0..WIDTH, closed along the bottom edge. */
function bumps(count: number, baseY: number, height: number, offset = 0) {
  const step = WIDTH / count;
  let d = `M0 120V${baseY}`;
  // Start half a bump early (offset) so the layers interlock instead of lining up.
  let x = -offset;
  if (offset) d += `L${x} ${baseY}`;
  while (x < WIDTH) {
    const next = x + step;
    d += `C${x + step * 0.1} ${baseY - height} ${next - step * 0.1} ${baseY - height} ${next} ${baseY}`;
    x = next;
  }
  return `${d}L${WIDTH} ${baseY}V120H0Z`;
}

const back = bumps(11, 82, 44, 65);
const front = bumps(14, 100, 36);

/** Puffy cloud edge used to separate sections instead of a hard line. */
export function CloudDivider({ color, className, flip }: CloudDividerProps) {
  return (
    <div aria-hidden className={cn("pointer-events-none relative h-14 w-full overflow-hidden sm:h-20", flip && "rotate-180", className)}>
      <svg viewBox={`0 0 ${WIDTH} 120`} preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
        <path fill={color} opacity="0.55" d={back} />
        <path fill={color} d={front} />
      </svg>
    </div>
  );
}
