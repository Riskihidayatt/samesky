"use client";

import Image from "next/image";
import { useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Search, X } from "lucide-react";
import { collectionLabels, products } from "@/features/products/products.data";
import { Mascot } from "@/shared/components/Mascot";
import { useModal } from "@/shared/hooks/useModal";
import { formatRupiah } from "@/shared/lib/format";

export function searchProducts(query: string) {
  const q = query.trim().toLowerCase();
  if (!q) return products;
  return products.filter((p) =>
    [p.name, collectionLabels[p.collection], ...p.colors.map((c) => c.name)].some((s) => s.toLowerCase().includes(q)),
  );
}

export function SearchDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [query, setQuery] = useState("");
  const panelRef = useRef<HTMLDivElement>(null);
  const results = useMemo(() => searchProducts(query), [query]);
  useModal(open, onClose, panelRef);

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[60] flex items-start justify-center px-4 pt-20 sm:pt-28">
          <motion.div
            className="absolute inset-0 bg-midnight/40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            aria-hidden
          />
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Cari produk"
            className="relative w-full max-w-xl overflow-hidden rounded-4xl bg-cream shadow-lift"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
          >
            <div className="flex items-center gap-3 border-b border-ink/10 px-5">
              <Search aria-hidden className="h-5 w-5 text-brown" />
              <label htmlFor="site-search" className="sr-only">
                Cari produk
              </label>
              <input
                id="site-search"
                data-autofocus
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Cari kaos, hoodie, koleksi…"
                className="h-16 flex-1 bg-transparent text-lg outline-none placeholder:text-ink-soft/70"
                autoComplete="off"
              />
              <button type="button" onClick={onClose} aria-label="Tutup pencarian" className="flex h-11 w-11 items-center justify-center rounded-full hover:bg-ink/5">
                <X aria-hidden className="h-5 w-5" />
              </button>
            </div>
            <div className="max-h-[60vh] overflow-y-auto p-3" aria-live="polite">
              {results.length === 0 ? (
                <div className="flex flex-col items-center px-6 py-10 text-center">
                  <Mascot pose="gaze" size={120} decorative />
                  <p className="mt-3 font-semibold text-midnight">Belum ketemu &ldquo;{query}&rdquo;</p>
                  <p className="text-sm text-ink-soft">Coba kata lain, misalnya &ldquo;hoodie&rdquo; atau &ldquo;Little Sky&rdquo;.</p>
                </div>
              ) : (
                <ul>
                  {results.map((p) => (
                    <li key={p.id}>
                      <a href="#shop" onClick={onClose} className="flex items-center gap-4 rounded-2xl p-3 transition hover:bg-white">
                        <span className="relative h-16 w-14 shrink-0 overflow-hidden rounded-xl bg-photo">
                          {p.colors[0].images ? (
                            <Image src={p.colors[0].images.front} alt="" fill sizes="56px" className="object-cover" />
                          ) : (
                            <span className="absolute inset-3 rounded-lg" style={{ backgroundColor: p.colors[0].hex }} />
                          )}
                        </span>
                        <span className="flex-1">
                          <span className="block font-semibold text-midnight">{p.name}</span>
                          <span className="block text-sm text-ink-soft">{collectionLabels[p.collection]}</span>
                        </span>
                        <span className="text-sm font-semibold">{formatRupiah(p.price)}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
