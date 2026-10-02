import { render, screen, within } from "@testing-library/react";
import { CartProvider } from "@/features/cart/CartProvider";
import { NewArrivals } from "./NewArrivals";
import { bestSellers, newArrivals, products } from "./products.data";

describe("product lists", () => {
  it("splits the catalogue into 8 best sellers and 10 new arrivals", () => {
    expect(bestSellers).toHaveLength(8);
    expect(newArrivals.map((p) => p.id)).toEqual([
      "sky-friends-camp-shirt",
      "mega-mendung-shirt",
      "sunrise-linen-shirt",
      "under-the-same-sky-tee",
      "for-new-beginnings-tee",
      "different-streets-denim-jacket",
      "dusk-dreamer-bomber",
      "dawn-windbreaker",
      "wanderer-sling-bag",
      "commuter-backpack",
    ]);
    expect(bestSellers.length + newArrivals.length).toBe(products.length);
  });

  it("gives every new arrival a front and back photo", () => {
    for (const p of newArrivals) {
      expect(p.colors[0].images).toEqual({ front: expect.stringMatching(/\.webp$/), back: expect.stringMatching(/\.webp$/) });
    }
  });
});

describe("NewArrivals", () => {
  it("renders each new product with the previous arrow disabled at the start", () => {
    render(
      <CartProvider>
        <NewArrivals />
      </CartProvider>,
    );
    const list = screen.getByRole("list", { name: "Produk terbaru" });
    expect(within(list).getAllByRole("article")).toHaveLength(newArrivals.length);
    expect(screen.getByRole("heading", { name: "Mega Mendung Shirt" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Produk sebelumnya" })).toBeDisabled();
  });
});
