import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { NewsletterForm } from "./NewsletterForm";

describe("NewsletterForm", () => {
  afterEach(() => vi.unstubAllGlobals());

  it("shows an inline error and does not call the API for an invalid email", async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
    render(<NewsletterForm />);

    await userEvent.type(screen.getByLabelText("Alamat email"), "halo@");
    await userEvent.click(screen.getByRole("button", { name: /gabung/i }));

    expect(screen.getByRole("alert")).toHaveTextContent("Format email belum benar");
    expect(screen.getByLabelText("Alamat email")).toHaveAttribute("aria-invalid", "true");
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("submits a valid email and shows the success message", async () => {
    const fetchMock = vi.fn().mockResolvedValue(new Response(JSON.stringify({ message: "Terima kasih sudah bergabung!" }), { status: 201 }));
    vi.stubGlobal("fetch", fetchMock);
    render(<NewsletterForm />);

    await userEvent.type(screen.getByLabelText("Alamat email"), "Halo@SameSky.id");
    await userEvent.click(screen.getByRole("button", { name: /gabung/i }));

    expect(await screen.findByRole("status")).toHaveTextContent("Terima kasih sudah bergabung!");
    expect(fetchMock).toHaveBeenCalledWith("/api/newsletter", expect.objectContaining({ body: JSON.stringify({ email: "halo@samesky.id" }) }));
  });

  it("shows a friendly message when the server fails", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response("boom", { status: 500 })));
    render(<NewsletterForm />);

    await userEvent.type(screen.getByLabelText("Alamat email"), "halo@samesky.id");
    await userEvent.click(screen.getByRole("button", { name: /gabung/i }));

    expect(await screen.findByRole("alert")).toHaveTextContent("Maaf, ada gangguan");
  });
});
