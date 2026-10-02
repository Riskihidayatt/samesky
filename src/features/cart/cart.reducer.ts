export type CartItem = {
  productId: string;
  name: string;
  color: string;
  price: number;
  image?: string;
  swatch: string;
  quantity: number;
};

export type CartState = { items: CartItem[] };

export type CartAction =
  | { type: "add"; item: Omit<CartItem, "quantity">; quantity?: number }
  | { type: "setQuantity"; productId: string; color: string; quantity: number }
  | { type: "remove"; productId: string; color: string }
  | { type: "hydrate"; items: CartItem[] }
  | { type: "clear" };

export const MAX_QUANTITY = 10;

const sameLine = (a: Pick<CartItem, "productId" | "color">, b: Pick<CartItem, "productId" | "color">) =>
  a.productId === b.productId && a.color === b.color;

const clampQty = (n: number) => Math.min(MAX_QUANTITY, Math.max(0, Math.floor(n)));

export function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "add": {
      const qty = clampQty(action.quantity ?? 1);
      if (qty === 0) return state;
      const existing = state.items.find((i) => sameLine(i, action.item));
      if (existing) {
        return {
          items: state.items.map((i) => (sameLine(i, action.item) ? { ...i, quantity: clampQty(i.quantity + qty) } : i)),
        };
      }
      return { items: [...state.items, { ...action.item, quantity: qty }] };
    }
    case "setQuantity": {
      const qty = clampQty(action.quantity);
      if (qty === 0) return { items: state.items.filter((i) => !sameLine(i, action)) };
      return { items: state.items.map((i) => (sameLine(i, action) ? { ...i, quantity: qty } : i)) };
    }
    case "remove":
      return { items: state.items.filter((i) => !sameLine(i, action)) };
    case "hydrate":
      return { items: action.items.filter(isValidItem).map((i) => ({ ...i, quantity: clampQty(i.quantity) })).filter((i) => i.quantity > 0) };
    case "clear":
      return { items: [] };
  }
}

export function cartTotals(state: CartState) {
  return state.items.reduce(
    (acc, i) => ({ count: acc.count + i.quantity, subtotal: acc.subtotal + i.quantity * i.price }),
    { count: 0, subtotal: 0 },
  );
}

/** Guards against malformed data coming back from localStorage. */
function isValidItem(i: unknown): i is CartItem {
  if (!i || typeof i !== "object") return false;
  const c = i as Record<string, unknown>;
  return (
    typeof c.productId === "string" &&
    typeof c.name === "string" &&
    typeof c.color === "string" &&
    typeof c.swatch === "string" &&
    typeof c.price === "number" &&
    Number.isFinite(c.price) &&
    typeof c.quantity === "number"
  );
}
