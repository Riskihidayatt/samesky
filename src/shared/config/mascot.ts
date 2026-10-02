/**
 * Mascot artwork registry.
 *
 * The files in /public/mascot are PLACEHOLDERS. To use the real illustrations,
 * either overwrite those files (same names) or point `src` to the new files,
 * e.g. "/mascot/wave.png". Keep the artwork on a transparent background.
 */
export const mascotPoses = {
  wave: { src: "/mascot/wave.svg", alt: "Maskot awan SAMESKY melambai menyambutmu" },
  walk: { src: "/mascot/walk.svg", alt: "Maskot awan SAMESKY berjalan membawa ransel" },
  sleep: { src: "/mascot/sleep.svg", alt: "Maskot awan SAMESKY tertidur di atas awan" },
  gaze: { src: "/mascot/gaze.svg", alt: "Maskot awan SAMESKY duduk menatap senja" },
} as const;

export type MascotPose = keyof typeof mascotPoses;
