import { POST } from "./route";

const post = (body: string, contentType = "application/json") =>
  POST(new Request("http://localhost/api/newsletter", { method: "POST", headers: { "Content-Type": contentType }, body }));

describe("POST /api/newsletter", () => {
  it("returns 201 for a valid email", async () => {
    const res = await post(JSON.stringify({ email: "halo@samesky.id" }));
    expect(res.status).toBe(201);
    expect(await res.json()).toEqual({ message: expect.any(String) });
  });

  it("returns 422 with an error shape for an invalid email", async () => {
    const res = await post(JSON.stringify({ email: "bukan-email" }));
    expect(res.status).toBe(422);
    expect(await res.json()).toEqual({ error: { code: "invalid_email", message: expect.any(String) } });
  });

  it("returns 400 for malformed JSON", async () => {
    const res = await post("{oops");
    expect(res.status).toBe(400);
  });

  it("returns 415 for non-JSON bodies", async () => {
    const res = await post("email=halo@samesky.id", "application/x-www-form-urlencoded");
    expect(res.status).toBe(415);
  });

  it("returns 413 for oversized bodies", async () => {
    const res = await post(JSON.stringify({ email: "a@b.id", pad: "x".repeat(2000) }));
    expect(res.status).toBe(413);
  });
});
