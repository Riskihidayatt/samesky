import { Reveal } from "@/shared/components/Reveal";
import { SectionHeading } from "@/shared/components/SectionHeading";
import { ProductCard } from "./ProductCard";
import { bestSellers } from "./products.data";

export function BestSellers() {
  return (
    <section id="best-sellers" aria-labelledby="shop-title" className="bg-cream py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            id="shop-title"
            eyebrow="Best Sellers"
            title="Yang paling sering ikut berjalan"
            description="Pilihan favorit teman-teman SAMESKY. Arahkan kursor (atau ketuk ikon putar) untuk melihat tampak belakang."
          />
        </Reveal>
        <ul className="mt-12 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-4">
          {bestSellers.map((product, i) => (
            <Reveal as="li" key={product.id} delay={(i % 4) * 0.06}>
              <ProductCard product={product} />
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
