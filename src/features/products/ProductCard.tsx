"use client";

import Image from "next/image";
import { useState } from "react";
import { Repeat2, ShoppingBag } from "lucide-react";
import { useCart } from "@/features/cart/CartProvider";
import { formatRupiah } from "@/shared/lib/format";
import { cn } from "@/shared/lib/cn";
import { GarmentPlaceholder } from "./GarmentPlaceholder";
import { collectionLabels } from "./products.data";
import type { Product } from "./types";

export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [colorIndex, setColorIndex] = useState(0);
  const [showBack, setShowBack] = useState(false);
  const color = product.colors[colorIndex];

  const renderSide = (side: "front" | "back") =>
    color.images ? (
      <Image
        src={color.images[side]}
        alt={`${product.name} warna ${color.name}, tampak ${side === "front" ? "depan" : "belakang"}`}
        fill
        sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
        className="object-cover"
        loading="lazy"
      />
    ) : (
      <GarmentPlaceholder
        kind={product.kind}
        color={color.hex}
        side={side}
        label={`Ilustrasi ${product.name} warna ${color.name}, tampak ${side === "front" ? "depan" : "belakang"}`}
      />
    );

  return (
    <article className="group flex h-full flex-col">
      <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-photo shadow-soft transition-shadow duration-300 group-hover:shadow-lift">
        <div className="absolute inset-0 transition-transform duration-700 ease-out motion-safe:group-hover:scale-[1.03]">
          {renderSide("front")}
        </div>
        <div
          className={cn(
            "absolute inset-0 transition-opacity duration-500 group-hover:opacity-100",
            showBack ? "opacity-100" : "opacity-0",
          )}
          aria-hidden={!showBack}
        >
          {renderSide("back")}
        </div>

        {product.badge && (
          <span
            className={cn(
              "absolute left-3 top-3 rounded-full px-3 py-1 text-xs font-bold tracking-wide",
              product.badge === "New" ? "bg-dawn text-midnight" : "bg-dusk text-ink",
            )}
          >
            {product.badge}
          </span>
        )}

        <button
          type="button"
          onClick={() => setShowBack((v) => !v)}
          aria-pressed={showBack}
          aria-label={showBack ? `Lihat tampak depan ${product.name}` : `Lihat tampak belakang ${product.name}`}
          className="absolute bottom-3 left-3 flex h-11 w-11 items-center justify-center rounded-full bg-cream/90 text-midnight backdrop-blur transition hover:bg-white"
        >
          <Repeat2 aria-hidden className="h-5 w-5" />
        </button>
        <button
          type="button"
          onClick={() =>
            addItem({
              productId: product.id,
              name: product.name,
              color: color.name,
              swatch: color.hex,
              price: product.price,
              image: color.images?.front,
            })
          }
          aria-label={`Tambah ${product.name} warna ${color.name} ke keranjang`}
          className="absolute bottom-3 right-3 flex h-11 items-center gap-2 rounded-full bg-midnight px-4 text-sm font-semibold text-cream shadow-soft transition hover:bg-midnight-soft motion-safe:hover:-translate-y-0.5"
        >
          <ShoppingBag aria-hidden className="h-4 w-4" />
          <span className="hidden sm:inline">Tambah</span>
        </button>
      </div>

      <div className="mt-4 flex flex-1 flex-col px-1">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brown">{collectionLabels[product.collection]}</p>
        <h3 className="mt-1 font-sans text-base font-semibold text-midnight sm:text-lg">{product.name}</h3>
        {product.note && <p className="text-sm text-ink-soft">{product.note}</p>}
        <p className="mt-1 font-semibold text-ink">{formatRupiah(product.price)}</p>

        <div className="mt-2 flex flex-wrap items-center gap-x-1" role="group" aria-label={`Pilihan warna ${product.name}`}>
          {product.colors.map((c, i) => (
            <button
              key={c.name}
              type="button"
              onClick={() => setColorIndex(i)}
              aria-pressed={i === colorIndex}
              aria-label={`Warna ${c.name}`}
              title={c.name}
              className="flex h-9 w-9 items-center justify-center rounded-full"
            >
              <span
                className={cn(
                  "h-6 w-6 rounded-full border border-ink/15 transition",
                  i === colorIndex ? "ring-2 ring-brown ring-offset-2 ring-offset-cream" : "hover:scale-110",
                )}
                style={{ backgroundColor: c.hex }}
              />
            </button>
          ))}
          <span className="w-full pl-1 text-sm text-ink-soft sm:ml-1 sm:w-auto sm:pl-0">{color.name}</span>
        </div>
      </div>
    </article>
  );
}
