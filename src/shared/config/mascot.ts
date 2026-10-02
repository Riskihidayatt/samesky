/**
 * Mascot artwork registry — cut-outs from the official SAMESKY mascot character sheet.
 *
 * The sheet only had ~300px per pose, so these were upscaled 4x with an AI super-resolution
 * model (EDSR) before cutting out the background. If the original high-resolution artwork is
 * available, replace the files in /public/mascot (transparent background) and keep
 * `width`/`height` in sync with the new files so the aspect ratio stays correct.
 */
export const mascotPoses = {
  wave: { src: "/mascot/wave.webp", width: 943, height: 813, alt: "Maskot awan SAMESKY melambai menyambutmu" },
  walk: { src: "/mascot/walk.webp", width: 862, height: 813, alt: "Maskot awan SAMESKY berjalan membawa ransel" },
  sleep: { src: "/mascot/sleep.webp", width: 940, height: 965, alt: "Maskot awan SAMESKY tertidur di atas awan" },
  gaze: { src: "/mascot/gaze.webp", width: 1021, height: 910, alt: "Maskot awan SAMESKY duduk menatap senja" },
} as const;

export type MascotPose = keyof typeof mascotPoses;

export const logoMark = { src: "/brand/logo-mark.webp", width: 360, height: 237 } as const;
