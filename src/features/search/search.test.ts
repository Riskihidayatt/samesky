import { searchProducts } from "./SearchDialog";
import { products } from "@/features/products/products.data";

describe("searchProducts", () => {
  it("returns everything for an empty query", () => {
    expect(searchProducts("  ")).toHaveLength(products.length);
  });

  it("matches product names case-insensitively", () => {
    expect(searchProducts("HOODIE").map((p) => p.id)).toEqual(["rest-under-the-same-sky-hoodie"]);
  });

  it("matches by collection and colour name", () => {
    expect(searchProducts("little sky").every((p) => p.collection === "little-sky")).toBe(true);
    expect(searchProducts("heather").map((p) => p.id)).toEqual(["everyday-crewneck"]);
  });

  it("returns nothing for unknown terms", () => {
    expect(searchProducts("sepatu")).toEqual([]);
  });
});
