import { formatRupiah } from "./format";

describe("formatRupiah", () => {
  it("formats thousands with dots and the Rp prefix", () => {
    expect(formatRupiah(149000)).toBe("Rp 149.000");
    expect(formatRupiah(1250000)).toBe("Rp 1.250.000");
  });

  it("rounds fractional amounts and handles zero", () => {
    expect(formatRupiah(99999.6)).toBe("Rp 100.000");
    expect(formatRupiah(0)).toBe("Rp 0");
  });
});
