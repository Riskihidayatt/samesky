"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Reveal } from "@/shared/components/Reveal";
import { SectionHeading } from "@/shared/components/SectionHeading";
import { cn } from "@/shared/lib/cn";
import { ProductCard } from "./ProductCard";
import { newArrivals } from "./products.data";

/** Horizontal, snap-scrolling row so any number of new products fits without gaps in a grid. */
export function NewArrivals() {
  const trackRef = useRef<HTMLUListElement>(null);
  const [edges, setEdges] = useState({ start: true, end: false });

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const update = () =>
      setEdges({ start: el.scrollLeft <= 4, end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 4 });
    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const scrollBy = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: reduce ? "auto" : "smooth" });
  };

  const arrow = "flex h-11 w-11 items-center justify-center rounded-full border-2 border-midnight/15 text-midnight transition hover:border-midnight hover:bg-midnight hover:text-cream disabled:pointer-events-none disabled:opacity-35";

  return (
    <section id="shop" aria-labelledby="new-title" className="bg-cream pt-20 sm:pt-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Reveal>
            <SectionHeading
              id="new-title"
              align="left"
              eyebrow="New Arrivals"
              title="Baru turun dari langit"
              description="Kemeja camp, motif Mega Mendung, dan kaos grafis terbaru untuk menemani langkah berikutnya."
            />
          </Reveal>
          <div className="flex gap-2">
            <button type="button" onClick={() => scrollBy(-1)} disabled={edges.start} aria-label="Produk sebelumnya" className={arrow}>
              <ChevronLeft aria-hidden className="h-5 w-5" />
            </button>
            <button type="button" onClick={() => scrollBy(1)} disabled={edges.end} aria-label="Produk berikutnya" className={arrow}>
              <ChevronRight aria-hidden className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      <ul
        ref={trackRef}
        aria-label="Produk terbaru"
        className={cn(
          "mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 sm:gap-6",
          // Align the first card with the page container, let the row bleed to the right edge.
          "scroll-px-4 px-4 sm:scroll-px-6 sm:px-6 lg:scroll-px-[max(2rem,calc((100vw-80rem)/2+2rem))] lg:px-[max(2rem,calc((100vw-80rem)/2+2rem))]",
          "[scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
        )}
      >
        {newArrivals.map((product, i) => (
          <Reveal as="li" key={product.id} delay={i * 0.06} className="w-[72%] shrink-0 snap-start sm:w-[42%] lg:w-[calc((80rem-4rem-4.5rem)/4)]">
            <ProductCard product={product} />
          </Reveal>
        ))}
      </ul>
    </section>
  );
}
