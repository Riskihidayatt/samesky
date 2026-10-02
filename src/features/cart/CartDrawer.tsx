"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Info, Minus, Plus, Trash2, Truck, X } from "lucide-react";
import { buttonStyles } from "@/shared/components/button-styles";
import { Mascot } from "@/shared/components/Mascot";
import { useModal } from "@/shared/hooks/useModal";
import { formatRupiah } from "@/shared/lib/format";
import { MAX_QUANTITY } from "./cart.reducer";
import { useCart } from "./CartProvider";

export function CartDrawer() {
  const { items, count, subtotal, isOpen, close, dispatch } = useCart();
  const panelRef = useRef<HTMLDivElement>(null);
  const [checkoutNote, setCheckoutNote] = useState(false);
  useModal(isOpen, close, panelRef);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[60]">
          <motion.div
            className="absolute inset-0 bg-midnight/40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            aria-hidden
          />
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="cart-title"
            className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col rounded-l-4xl bg-cream shadow-lift"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <header className="flex items-center justify-between border-b border-ink/10 px-6 py-5">
              <h2 id="cart-title" className="text-2xl font-semibold text-midnight">
                Keranjang {count > 0 && <span className="font-sans text-base font-medium text-ink-soft">({count})</span>}
              </h2>
              <button type="button" onClick={close} aria-label="Tutup keranjang" className="flex h-11 w-11 items-center justify-center rounded-full hover:bg-ink/5">
                <X aria-hidden className="h-5 w-5" />
              </button>
            </header>

            {items.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
                <Mascot pose="walk" size={180} float decorative />
                <h3 className="mt-4 text-2xl font-semibold text-midnight">Ranselmu masih kosong</h3>
                <p className="mt-2 text-ink-soft">Belum ada barang di sini. Yuk, cari teman baru untuk perjalananmu.</p>
                <a href="#shop" onClick={close} className={buttonStyles("primary", "md", "mt-6")}>
                  Mulai belanja
                </a>
              </div>
            ) : (
              <>
                <ul className="flex-1 divide-y divide-ink/10 overflow-y-auto px-6">
                  {items.map((item) => (
                    <li key={`${item.productId}-${item.color}`} className="flex gap-4 py-5">
                      <div className="relative h-24 w-20 shrink-0 overflow-hidden rounded-2xl bg-photo">
                        {item.image ? (
                          <Image src={item.image} alt="" fill sizes="80px" className="object-cover" />
                        ) : (
                          <span className="absolute inset-4 rounded-xl border border-ink/10" style={{ backgroundColor: item.swatch }} />
                        )}
                      </div>
                      <div className="flex flex-1 flex-col">
                        <p className="font-semibold text-midnight">{item.name}</p>
                        <p className="text-sm text-ink-soft">{item.color}</p>
                        <p className="mt-1 text-sm font-semibold">{formatRupiah(item.price)}</p>
                        <div className="mt-auto flex items-center justify-between pt-2">
                          <div className="flex items-center rounded-full border border-ink/15">
                            <button
                              type="button"
                              aria-label={`Kurangi jumlah ${item.name}`}
                              onClick={() => dispatch({ type: "setQuantity", productId: item.productId, color: item.color, quantity: item.quantity - 1 })}
                              className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-ink/5"
                            >
                              <Minus aria-hidden className="h-4 w-4" />
                            </button>
                            <span className="w-8 text-center text-sm font-semibold" aria-live="polite">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              aria-label={`Tambah jumlah ${item.name}`}
                              disabled={item.quantity >= MAX_QUANTITY}
                              onClick={() => dispatch({ type: "setQuantity", productId: item.productId, color: item.color, quantity: item.quantity + 1 })}
                              className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-ink/5 disabled:opacity-40"
                            >
                              <Plus aria-hidden className="h-4 w-4" />
                            </button>
                          </div>
                          <button
                            type="button"
                            aria-label={`Hapus ${item.name} dari keranjang`}
                            onClick={() => dispatch({ type: "remove", productId: item.productId, color: item.color })}
                            className="flex h-10 w-10 items-center justify-center rounded-full text-brown hover:bg-brown/10"
                          >
                            <Trash2 aria-hidden className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
                <footer className="border-t border-ink/10 px-6 py-5">
                  <p className="flex items-center gap-2 rounded-2xl bg-dawn-soft px-4 py-3 text-sm text-midnight">
                    <Truck aria-hidden className="h-4 w-4 shrink-0" /> Gratis ongkir ke seluruh Indonesia.
                  </p>
                  <div className="mt-4 flex items-center justify-between text-lg">
                    <span>Subtotal</span>
                    <span className="font-semibold">{formatRupiah(subtotal)}</span>
                  </div>
                  <button type="button" onClick={() => setCheckoutNote(true)} className={buttonStyles("primary", "lg", "mt-4 w-full")}>
                    Lanjut ke Checkout
                  </button>
                  {checkoutNote && (
                    <p role="status" className="mt-3 flex items-start gap-2 text-sm text-ink-soft">
                      <Info aria-hidden className="mt-0.5 h-4 w-4 shrink-0" /> Checkout belum terhubung di versi demo ini.
                    </p>
                  )}
                </footer>
              </>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
