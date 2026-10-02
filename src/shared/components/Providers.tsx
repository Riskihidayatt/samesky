"use client";

import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";
import { CartDrawer } from "@/features/cart/CartDrawer";
import { CartProvider } from "@/features/cart/CartProvider";
import { SkyProvider } from "@/features/sky/SkyProvider";

export function Providers({ children }: { children: ReactNode }) {
  return (
    // reducedMotion="user" makes every Framer Motion animation respect prefers-reduced-motion.
    <MotionConfig reducedMotion="user">
      <SkyProvider>
        <CartProvider>
          {children}
          <CartDrawer />
        </CartProvider>
      </SkyProvider>
    </MotionConfig>
  );
}
