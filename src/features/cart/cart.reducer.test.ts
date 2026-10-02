import { cartReducer, cartTotals, MAX_QUANTITY, type CartState } from "./cart.reducer";

const tee = { productId: "tee", name: "Everyday Logo Tee", color: "Cloud Cream", swatch: "#F1EBDD", price: 149000 };
const empty: CartState = { items: [] };

describe("cartReducer", () => {
  it("adds a new line and merges the same product + colour", () => {
    let s = cartReducer(empty, { type: "add", item: tee });
    s = cartReducer(s, { type: "add", item: tee });
    expect(s.items).toHaveLength(1);
    expect(s.items[0].quantity).toBe(2);
  });

  it("keeps different colours as separate lines", () => {
    let s = cartReducer(empty, { type: "add", item: tee });
    s = cartReducer(s, { type: "add", item: { ...tee, color: "Dawn Blue" } });
    expect(s.items).toHaveLength(2);
  });

  it("caps quantity at the maximum", () => {
    const s = cartReducer(empty, { type: "add", item: tee, quantity: 99 });
    expect(s.items[0].quantity).toBe(MAX_QUANTITY);
  });

  it("removes a line when quantity drops to zero", () => {
    let s = cartReducer(empty, { type: "add", item: tee });
    s = cartReducer(s, { type: "setQuantity", productId: "tee", color: "Cloud Cream", quantity: 0 });
    expect(s.items).toEqual([]);
  });

  it("drops malformed items when hydrating from storage", () => {
    const s = cartReducer(empty, {
      type: "hydrate",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      items: [{ ...tee, quantity: 2 }, { productId: 1 } as any, { ...tee, color: "X", quantity: 0 }],
    });
    expect(s.items).toEqual([{ ...tee, quantity: 2 }]);
  });

  it("computes count and subtotal", () => {
    let s = cartReducer(empty, { type: "add", item: tee, quantity: 2 });
    s = cartReducer(s, { type: "add", item: { ...tee, productId: "hoodie", price: 349000 } });
    expect(cartTotals(s)).toEqual({ count: 3, subtotal: 2 * 149000 + 349000 });
  });
});
