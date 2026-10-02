/**
 * Mascot artwork registry — cut-outs from the official SAMESKY mascot character sheet.
 *
 * To update the art, replace the files in /public/mascot (transparent background) and keep
 * `width`/`height` in sync with the new files so the aspect ratio stays correct.
 * For sharper results on large/retina screens, export the originals at 2–3x this size.
 */
export const mascotPoses = {
  wave: { src: "/mascot/wave.webp", width: 295, height: 254, alt: "Maskot awan SAMESKY melambai menyambutmu" },
  walk: { src: "/mascot/walk.webp", width: 269, height: 254, alt: "Maskot awan SAMESKY berjalan membawa ransel" },
  sleep: { src: "/mascot/sleep.webp", width: 294, height: 298, alt: "Maskot awan SAMESKY tertidur di atas awan" },
  gaze: { src: "/mascot/gaze.webp", width: 319, height: 282, alt: "Maskot awan SAMESKY duduk menatap senja" },
} as const;

export type MascotPose = keyof typeof mascotPoses;

export const logoMark = { src: "/brand/logo-mark.webp", width: 283, height: 186 } as const;
