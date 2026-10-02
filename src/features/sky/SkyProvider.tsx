"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { getSkyPhase, type SkyPhase } from "@/shared/lib/sky";

type SkyContextValue = {
  phase: SkyPhase;
  /** True while the phase follows the visitor's local clock. */
  isAuto: boolean;
  setPhase: (phase: SkyPhase) => void;
  resetToAuto: () => void;
};

const SkyContext = createContext<SkyContextValue | null>(null);

export function SkyProvider({ children }: { children: ReactNode }) {
  // Server render always starts with "morning"; the client syncs to local time after mount.
  const [phase, setPhaseState] = useState<SkyPhase>("morning");
  const [isAuto, setIsAuto] = useState(true);

  useEffect(() => {
    if (!isAuto) return;
    const sync = () => setPhaseState(getSkyPhase(new Date().getHours()));
    sync();
    const id = window.setInterval(sync, 5 * 60 * 1000);
    return () => window.clearInterval(id);
  }, [isAuto]);

  const setPhase = useCallback((next: SkyPhase) => {
    setIsAuto(false);
    setPhaseState(next);
  }, []);

  const resetToAuto = useCallback(() => setIsAuto(true), []);

  const value = useMemo(() => ({ phase, isAuto, setPhase, resetToAuto }), [phase, isAuto, setPhase, resetToAuto]);
  return <SkyContext.Provider value={value}>{children}</SkyContext.Provider>;
}

export function useSky(): SkyContextValue {
  const ctx = useContext(SkyContext);
  if (!ctx) throw new Error("useSky must be used inside <SkyProvider>");
  return ctx;
}
