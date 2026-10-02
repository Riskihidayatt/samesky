export type CollectionId = "everyday" | "dusk" | "midnight" | "little-sky";

export type GarmentKind = "tee" | "polo" | "shirt" | "crewneck" | "hoodie" | "jacket" | "bag";

export type ProductColor = {
  name: string;
  hex: string;
  /** Product photos for this colour. Without them a tinted garment placeholder is shown. */
  images?: { front: string; back: string };
};

export type Product = {
  id: string;
  name: string;
  collection: CollectionId;
  kind: GarmentKind;
  price: number;
  badge?: "New" | "Best Seller";
  colors: ProductColor[];
  note?: string;
  /** Shown in the New Arrivals row instead of the Best Sellers grid. */
  newArrival?: boolean;
};
