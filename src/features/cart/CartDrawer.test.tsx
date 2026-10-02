import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CartDrawer } from "./CartDrawer";
import { CartProvider, useCart } from "./CartProvider";

function OpenButton() {
  const { open } = useCart();
  return (
    <button type="button" onClick={open}>
      open
    </button>
  );
}

describe("CartDrawer", () => {
  beforeEach(() => window.localStorage.clear());

  it("shows the mascot empty state with a call to action", async () => {
    render(
      <CartProvider>
        <OpenButton />
        <CartDrawer />
      </CartProvider>,
    );
    await userEvent.click(screen.getByRole("button", { name: "open" }));
    expect(await screen.findByText("Ranselmu masih kosong")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Mulai belanja" })).toHaveAttribute("href", "#shop");
  });

  it("closes with the Escape key", async () => {
    render(
      <CartProvider>
        <OpenButton />
        <CartDrawer />
      </CartProvider>,
    );
    await userEvent.click(screen.getByRole("button", { name: "open" }));
    await screen.findByRole("dialog");
    await userEvent.keyboard("{Escape}");
    await vi.waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
  });
});
