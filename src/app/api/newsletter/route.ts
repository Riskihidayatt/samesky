import { NextResponse } from "next/server";
import { validateEmail } from "@/shared/lib/validation";

/**
 * POST /api/newsletter
 * Request:  { "email": string }
 * 201:      { "message": string }
 * 4xx:      { "error": { "code": string, "message": string } }
 *
 * Public endpoint (no auth). Input is validated with the same rules as the form.
 * TODO: forward `email` to the email provider (Mailchimp, Brevo, …) and add rate limiting
 * at the edge/proxy before going to production.
 */
const MAX_BODY_BYTES = 1024;

function error(status: number, code: string, message: string) {
  return NextResponse.json({ error: { code, message } }, { status });
}

export async function POST(request: Request) {
  if (!request.headers.get("content-type")?.includes("application/json")) {
    return error(415, "unsupported_media_type", "Kirim data dalam format JSON.");
  }

  const raw = await request.text();
  if (raw.length > MAX_BODY_BYTES) {
    return error(413, "payload_too_large", "Data yang dikirim terlalu besar.");
  }

  let body: unknown;
  try {
    body = JSON.parse(raw);
  } catch {
    return error(400, "invalid_json", "Format data tidak valid.");
  }

  const email = body && typeof body === "object" ? (body as Record<string, unknown>).email : undefined;
  const result = validateEmail(email);
  if (!result.ok) {
    return error(422, "invalid_email", result.message);
  }

  return NextResponse.json(
    { message: "Terima kasih sudah bergabung! Sampai jumpa di bawah langit yang sama." },
    { status: 201 },
  );
}
