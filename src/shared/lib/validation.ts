export const EMAIL_MAX_LENGTH = 254;

// Pragmatic check: one "@", no spaces, a dot in the domain, TLD of 2+ letters.
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export type EmailValidation = { ok: true; value: string } | { ok: false; message: string };

/** Shared by the newsletter form (client) and /api/newsletter (server). */
export function validateEmail(input: unknown): EmailValidation {
  if (typeof input !== "string" || input.trim() === "") {
    return { ok: false, message: "Email belum diisi." };
  }
  const value = input.trim().toLowerCase();
  if (value.length > EMAIL_MAX_LENGTH) {
    return { ok: false, message: "Email terlalu panjang." };
  }
  if (!EMAIL_PATTERN.test(value)) {
    return { ok: false, message: "Format email belum benar, contoh: nama@email.com" };
  }
  return { ok: true, value };
}
