"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Clock, Moon, Sunrise, Sunset, type LucideIcon } from "lucide-react";
import { useSky } from "@/features/sky/SkyProvider";
import { buttonStyles } from "@/shared/components/button-styles";
import { CloudDivider } from "@/shared/components/CloudDivider";
import { Mascot } from "@/shared/components/Mascot";
import { cn } from "@/shared/lib/cn";
import type { SkyPhase } from "@/shared/lib/sky";
import { SkyBackdrop } from "./SkyBackdrop";

const phaseMeta: Record<SkyPhase, { label: string; greeting: string; icon: LucideIcon }> = {
  morning: { label: "Pagi", greeting: "Selamat pagi, penjelajah", icon: Sunrise },
  dusk: { label: "Senja", greeting: "Selamat sore, saatnya pulang", icon: Sunset },
  night: { label: "Malam", greeting: "Selamat malam, istirahat dulu ya", icon: Moon },
};

export function Hero() {
  const { phase, isAuto, setPhase, resetToAuto } = useSky();
  const isNight = phase === "night";
  const GreetingIcon = phaseMeta[phase].icon;

  return (
    <section aria-labelledby="hero-title" className="relative isolate overflow-hidden">
      <SkyBackdrop phase={phase} />

      <div className="relative mx-auto grid min-h-[88svh] max-w-7xl items-center gap-6 px-4 pb-10 pt-28 sm:px-6 md:grid-cols-[1.1fr_0.9fr] md:pt-32 lg:px-8">
        <div className={cn("max-w-xl transition-colors duration-1000", isNight ? "text-cream" : "text-midnight")}>
          <motion.p
            key={phase}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={cn(
              "inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-semibold backdrop-blur",
              isNight ? "bg-white/10 text-cream" : "bg-white/60 text-brown",
            )}
          >
            <GreetingIcon aria-hidden className="h-4 w-4" />
            {phaseMeta[phase].greeting}
          </motion.p>

          <motion.h1
            id="hero-title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="mt-5 text-[2.6rem] font-semibold leading-[1.05] sm:text-6xl lg:text-7xl"
          >
            Different streets, <span className={cn("italic", isNight ? "text-dawn" : "text-brown")}>same sky.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            className={cn("mt-5 max-w-md text-lg sm:text-xl", isNight ? "text-cream/85" : "text-ink-soft")}
          >
            Pakaian sehari-hari untuk setiap perjalanan, sejauh apa pun kamu melangkah.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <a href="#shop" className={buttonStyles(isNight ? "light" : "primary", "lg")}>
              Shop Now <ArrowRight aria-hidden className="h-5 w-5" />
            </a>
            <a
              href="#story"
              className={buttonStyles(
                "secondary",
                "lg",
                isNight ? "border-cream/70 text-cream hover:bg-cream hover:text-midnight" : "bg-white/40 backdrop-blur",
              )}
            >
              Our Story
            </a>
          </motion.div>

          <div role="group" aria-label="Ubah suasana langit" className="mt-10 inline-flex flex-wrap gap-1 rounded-full bg-white/50 p-1 backdrop-blur">
            {(Object.keys(phaseMeta) as SkyPhase[]).map((p) => {
              const Icon = phaseMeta[p].icon;
              const active = !isAuto && phase === p;
              return (
                <button
                  key={p}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setPhase(p)}
                  className={cn(
                    "inline-flex min-h-10 items-center gap-1.5 rounded-full px-3 text-sm font-medium transition",
                    active ? "bg-midnight text-cream" : "text-midnight hover:bg-white/70",
                  )}
                >
                  <Icon aria-hidden className="h-4 w-4" />
                  {phaseMeta[p].label}
                </button>
              );
            })}
            <button
              type="button"
              aria-pressed={isAuto}
              onClick={resetToAuto}
              title="Ikuti jam di perangkatmu"
              className={cn(
                "inline-flex min-h-10 items-center gap-1.5 rounded-full px-3 text-sm font-medium transition",
                isAuto ? "bg-midnight text-cream" : "text-midnight hover:bg-white/70",
              )}
            >
              <Clock aria-hidden className="h-4 w-4" />
              Otomatis
            </button>
          </div>
        </div>

        <div className="relative mx-auto flex w-full max-w-sm items-end justify-center md:max-w-md">
          <div aria-hidden className="absolute bottom-2 h-16 w-[85%] rounded-[50%] bg-white/50 blur-2xl" />
          <AnimatePresence mode="wait">
            <motion.div
              key={isNight ? "sleep" : "wave"}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.5 }}
              className="relative w-full"
            >
              <Mascot pose={isNight ? "sleep" : "wave"} size={440} preload float className="h-auto w-full drop-shadow-xl" />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <CloudDivider color="var(--color-cream)" className="-mt-6" />
    </section>
  );
}
