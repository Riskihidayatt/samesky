import type { Product } from "./types";

const img = (name: string) => `/images/products/${name}.webp`;

export const collectionLabels: Record<Product["collection"], string> = {
  everyday: "Everyday Essentials",
  dusk: "Dusk Edition",
  midnight: "Midnight Edition",
  "little-sky": "Little Sky",
};

// Placeholder catalogue — replace with data from your commerce backend / CMS.
export const products: Product[] = [
  {
    id: "everyday-logo-tee",
    name: "Everyday Logo Tee",
    collection: "everyday",
    kind: "tee",
    price: 149000,
    badge: "Best Seller",
    colors: [
      { name: "Cloud Cream", hex: "#F1EBDD", images: { front: img("cream-tee-front"), back: img("cream-tee-back") } },
      { name: "Dawn Blue", hex: "#A7C7E7" },
      { name: "Midnight Navy", hex: "#1B2541" },
    ],
  },
  {
    id: "wherever-you-are-tee",
    name: "Wherever You Are Tee",
    collection: "dusk",
    kind: "tee",
    price: 179000,
    badge: "Best Seller",
    colors: [{ name: "Washed Black", hex: "#2A2A2A", images: { front: img("black-tee-front"), back: img("dusk-tee-back") } }],
  },
  {
    id: "rest-under-the-same-sky-hoodie",
    name: "Same Sky Hoodie",
    collection: "midnight",
    kind: "hoodie",
    price: 349000,
    badge: "New",
    colors: [{ name: "Midnight Navy", hex: "#1B2541", images: { front: img("midnight-hoodie-front"), back: img("midnight-hoodie-back") } }],
  },
  {
    id: "different-streets-tee",
    name: "Different Streets Tee",
    collection: "everyday",
    kind: "tee",
    price: 169000,
    badge: "Best Seller",
    colors: [
      { name: "Sand", hex: "#D9C7A7", images: { front: img("sand-tee-front"), back: img("streets-tee-back") } },
      { name: "Cloud Cream", hex: "#F1EBDD" },
    ],
  },
  {
    id: "everyday-crewneck",
    name: "Everyday Crewneck",
    collection: "everyday",
    kind: "crewneck",
    price: 289000,
    colors: [
      { name: "Heather Grey", hex: "#B9B9B7", images: { front: img("grey-crewneck-front"), back: img("grey-crewneck-back") } },
      { name: "Midnight Navy", hex: "#1B2541" },
    ],
  },
  {
    id: "everyday-polo",
    name: "Everyday Polo",
    collection: "everyday",
    kind: "polo",
    price: 219000,
    badge: "New",
    colors: [
      { name: "Cloud Cream", hex: "#F1EBDD" },
      { name: "Backpack Brown", hex: "#8B5E3C" },
      { name: "Midnight Navy", hex: "#1B2541" },
    ],
  },
  {
    id: "little-sky-kids-tee",
    name: "Little Sky Kids Tee",
    collection: "little-sky",
    kind: "tee",
    price: 99000,
    badge: "New",
    colors: [
      { name: "Dawn Blue", hex: "#A7C7E7" },
      { name: "Dusk Orange", hex: "#F4A261" },
      { name: "Cloud Cream", hex: "#F1EBDD" },
    ],
    note: "Usia 2–10 tahun",
  },
  {
    id: "little-sky-family-set",
    name: "Little Sky Family Set",
    collection: "little-sky",
    kind: "tee",
    price: 399000,
    badge: "Best Seller",
    colors: [
      { name: "Cloud Cream", hex: "#F1EBDD" },
      { name: "Dawn Blue", hex: "#A7C7E7" },
    ],
    note: "Isi 3: ayah, ibu & anak",
  },
];
