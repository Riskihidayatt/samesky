import { EMAIL_MAX_LENGTH, validateEmail } from "./validation";

describe("validateEmail", () => {
  it("accepts a normal address and normalises it", () => {
    expect(validateEmail("  Halo@SameSky.id ")).toEqual({ ok: true, value: "halo@samesky.id" });
  });

  it.each([undefined, null, 42, "", "   "])("rejects empty or non-string input (%s)", (input) => {
    expect(validateEmail(input)).toEqual({ ok: false, message: "Email belum diisi." });
  });

  it.each(["halo", "halo@", "halo@samesky", "ha lo@samesky.id", "@samesky.id", "a@b.c"])("rejects malformed %s", (input) => {
    const result = validateEmail(input);
    expect(result.ok).toBe(false);
  });

  it("rejects addresses that are too long", () => {
    const long = `${"a".repeat(EMAIL_MAX_LENGTH)}@samesky.id`;
    expect(validateEmail(long)).toEqual({ ok: false, message: "Email terlalu panjang." });
  });
});
