export type SkyPhase = "morning" | "dusk" | "night";

export const SKY_PHASES: SkyPhase[] = ["morning", "dusk", "night"];

/**
 * Map a local hour (0-23) to a sky phase.
 * 05:00–14:59 morning (blue), 15:00–18:59 dusk (orange), 19:00–04:59 night (navy).
 */
export function getSkyPhase(hour: number): SkyPhase {
  const h = ((Math.floor(hour) % 24) + 24) % 24;
  if (h >= 5 && h < 15) return "morning";
  if (h >= 15 && h < 19) return "dusk";
  return "night";
}
