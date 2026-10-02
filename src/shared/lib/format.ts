const rupiah = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  maximumFractionDigits: 0,
});

/** Format an integer amount of Rupiah, e.g. 149000 -> "Rp 149.000". */
export function formatRupiah(amount: number): string {
  // Intl inserts a non-breaking space after "Rp"; normalise it so output is predictable.
  return rupiah.format(Math.round(amount)).replace(/ /g, " ");
}
