"use client";

import Link from "next/link";
import { useCallback, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Search, ShoppingBag, X } from "lucide-react";
import { useCart } from "@/features/cart/CartProvider";
import { SearchDialog } from "@/features/search/SearchDialog";
import { useSky } from "@/features/sky/SkyProvider";
import { navLinks } from "@/shared/config/site";
import { useScrolled } from "@/shared/hooks/useScrolled";
import { cn } from "@/shared/lib/cn";
import { Logo } from "./Logo";

export function Navbar({ overHero = true }: { overHero?: boolean }) {
  const scrolled = useScrolled();
  const { phase } = useSky();
  const { count, open: openCart } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const closeSearch = useCallback(() => setSearchOpen(false), []);

  // Over the night sky (and not yet scrolled) the bar is transparent, so use light text.
  const light = overHero && !scrolled && !menuOpen && phase === "night";
  const iconBtn = cn(
    "relative flex h-11 w-11 items-center justify-center rounded-full transition",
    light ? "text-cream hover:bg-white/10" : "text-midnight hover:bg-midnight/5",
  );

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-300",
          scrolled || menuOpen || !overHero ? "bg-cream/75 shadow-[0_1px_0_rgb(34_34_34/0.06)] backdrop-blur-lg" : "bg-transparent",
        )}
      >
        <nav aria-label="Navigasi utama" className="mx-auto flex h-18 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" aria-label="SAMESKY, kembali ke beranda" className="rounded-lg">
            <Logo tone={light ? "light" : "dark"} />
          </Link>

          <ul className="hidden items-center gap-1 md:flex">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a
                  href={overHero ? l.href : `/${l.href}`}
                  className={cn(
                    "rounded-full px-4 py-2 text-[0.95rem] font-medium transition",
                    light ? "text-cream/90 hover:bg-white/10 hover:text-cream" : "text-ink-soft hover:bg-midnight/5 hover:text-midnight",
                  )}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-1">
            <button type="button" onClick={() => setSearchOpen(true)} aria-label="Cari produk" className={iconBtn}>
              <Search aria-hidden className="h-5 w-5" />
            </button>
            <button type="button" onClick={openCart} aria-label={`Buka keranjang, ${count} barang`} className={iconBtn}>
              <ShoppingBag aria-hidden className="h-5 w-5" />
              {count > 0 && (
                <span aria-hidden className="absolute right-1 top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-dusk px-1 text-[0.7rem] font-bold text-ink">
                  {count}
                </span>
              )}
            </button>
            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? "Tutup menu" : "Buka menu"}
              className={cn(iconBtn, "md:hidden")}
            >
              {menuOpen ? <X aria-hidden className="h-5 w-5" /> : <Menu aria-hidden className="h-5 w-5" />}
            </button>
          </div>
        </nav>

        <AnimatePresence>
          {menuOpen && (
            <motion.ul
              id="mobile-menu"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden px-4 md:hidden"
            >
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a
                    href={overHero ? l.href : `/${l.href}`}
                    onClick={() => setMenuOpen(false)}
                    className="block rounded-2xl px-4 py-3 text-lg font-medium text-midnight hover:bg-midnight/5"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
              <li className="h-4" aria-hidden />
            </motion.ul>
          )}
        </AnimatePresence>
      </header>
      <SearchDialog open={searchOpen} onClose={closeSearch} />
    </>
  );
}
