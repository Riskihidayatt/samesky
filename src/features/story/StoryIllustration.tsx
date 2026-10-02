"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Mascot } from "@/shared/components/Mascot";

/** Line-art skyline (Monas, Gedung Sate, Tugu Jogja) with the mascot walking a dashed path. */
export function StoryIllustration() {
  const reduce = useReducedMotion();
  return (
    <div className="relative aspect-[6/5] w-full overflow-hidden rounded-5xl bg-linear-to-b from-dawn-soft via-[#EAF1F7] to-cream-deep shadow-soft">
      <svg viewBox="0 0 600 500" className="absolute inset-0 h-full w-full" aria-hidden>
        <g fill="#fff" opacity="0.85">
          <path d="M70 120a22 22 0 0 1 4-43 30 30 0 0 1 56-6 22 22 0 0 1 40 12 18 18 0 0 1 2 37z" />
          <path d="M390 80a18 18 0 0 1 3-35 25 25 0 0 1 46-5 18 18 0 0 1 33 10 15 15 0 0 1 2 30z" />
        </g>
        <circle cx="500" cy="150" r="34" fill="#F4A261" opacity="0.35" />
        <g fill="none" stroke="#8B5E3C" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" opacity="0.55">
          {/* Monas */}
          <path d="M92 330 v-18 h44 v18 M100 312 l6 -120 h16 l6 120 M106 192 h16 M114 192 v-14 M108 178 q6 -16 12 0 z" />
          <path d="M40 330 v-40 h26 v40 M150 330 v-26 h22 v26" />
          {/* Gedung Sate */}
          <path d="M230 330 v-50 h140 v50 M262 280 v-24 h76 v24 M276 256 l24 -26 l24 26 M300 230 v-26 M294 214 h12 M294 222 h12" />
          <path d="M246 300 h12 M342 300 h12 M276 300 h12 M312 300 h12" />
          {/* Tugu Jogja */}
          <path d="M470 330 v-20 h34 v20 M476 310 l4 -70 h14 l4 70 M480 240 l7 -30 l7 30" />
          <path d="M520 330 v-34 l18 -14 l18 14 v34 M410 330 v-28 h30 v28" />
          {/* trees */}
          <path d="M190 330 v-18 M190 312 a12 12 0 1 1 0.1 0 M560 330 v-14 M560 316 a10 10 0 1 1 0.1 0" />
          <path d="M20 330 H580" />
        </g>
        <path d="M10 420 C 140 380, 230 450, 350 405 S 540 380, 590 400" fill="none" stroke="#8B5E3C" strokeWidth="3" strokeDasharray="2 12" strokeLinecap="round" />
      </svg>

      <motion.div
        className="absolute bottom-[12%] w-[28%]"
        initial={{ left: reduce ? "58%" : "-4%" }}
        whileInView={{ left: "58%" }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 6, ease: "easeInOut" }}
      >
        <motion.div animate={reduce ? undefined : { y: [0, -6, 0] }} transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}>
          <Mascot pose="walk" size={200} className="h-auto w-full drop-shadow-md" />
        </motion.div>
      </motion.div>
    </div>
  );
}
