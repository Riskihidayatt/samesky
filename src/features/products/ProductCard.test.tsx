import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CartDrawer } from "@/features/cart/CartDrawer";
import { CartProvider } from "@/features/cart/CartProvider";
import { ProductCard } from "./ProductCard";
import { products } from "./products.data";

const logoTee = products.find((p) => p.id === "everyday-logo-tee")!;

function setup() {
  return render(
    <CartProvider>
      <ProductCard product={logoTee} />
      <CartDrawer />
    </CartProvider>,
  );
}

describe("ProductCard", () => {
  beforeEach(() => window.localStorage.clear());

  it("renders name, Rupiah price and badge", () => {
    setup();
    expect(screen.getByRole("heading", { name: "Everyday Logo Tee" })).toBeInTheDocument();
    expect(screen.getByText("Rp 149.000")).toBeInTheDocument();
    expect(screen.getByText("Best Seller")).toBeInTheDocument();
  });

  it("switches colour via swatches", async () => {
    setup();
    const swatch = screen.getByRole("button", { name: "Warna Dawn Blue" });
    await userEvent.click(swatch);
    expect(swatch).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByRole("button", { name: "Warna Cloud Cream" })).toHaveAttribute("aria-pressed", "false");
  });

  it("toggles the back view for touch and keyboard users", async () => {
    setup();
    const toggle = screen.getByRole("button", { name: /tampak belakang/i });
    await userEvent.click(toggle);
    expect(toggle).toHaveAttribute("aria-pressed", "true");
  });

  it("shows the 'foto segera hadir' placeholder for a colour without photos", async () => {
    setup();
    await userEvent.click(screen.getByRole("button", { name: "Warna Midnight Navy" }));
    expect(screen.getAllByRole("img", { name: /warna Midnight Navy, tampak depan \(foto segera hadir\)/ })).toHaveLength(1);
  });

  it("reserves the note line even when a product has no note, keeping rows aligned", () => {
    setup();
    const heading = screen.getByRole("heading", { name: "Everyday Logo Tee" });
    const note = heading.nextElementSibling as HTMLElement;
    expect(note.tagName).toBe("P");
    expect(note).toHaveClass("min-h-[1.375rem]");
  });

  it("adds the selected colour to the cart and opens the drawer", async () => {
    setup();
    await userEvent.click(screen.getByRole("button", { name: "Warna Dawn Blue" }));
    await userEvent.click(screen.getByRole("button", { name: /tambah everyday logo tee warna dawn blue ke keranjang/i }));

    const dialog = await screen.findByRole("dialog", { name: /keranjang/i });
    expect(within(dialog).getByText("Dawn Blue")).toBeInTheDocument();
    expect(within(dialog).getAllByText("Rp 149.000").length).toBeGreaterThan(0);
  });
});
