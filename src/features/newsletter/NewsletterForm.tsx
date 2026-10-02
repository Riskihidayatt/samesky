"use client";

import { useId, useState, type FormEvent } from "react";
import { CheckCircle2, CircleAlert, LoaderCircle, Send } from "lucide-react";
import { buttonStyles } from "@/shared/components/button-styles";
import { EMAIL_MAX_LENGTH, validateEmail } from "@/shared/lib/validation";

type Status = "idle" | "submitting" | "success" | "error";

export function NewsletterForm() {
  const inputId = useId();
  const messageId = useId();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState<string | null>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "submitting") return;

    const check = validateEmail(email);
    if (!check.ok) {
      setStatus("error");
      setMessage(check.message);
      return;
    }

    setStatus("submitting");
    setMessage(null);
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: check.value }),
      });
      const data: { message?: string; error?: { message?: string } } = await res.json().catch(() => ({}));
      if (!res.ok) {
        setStatus("error");
        setMessage(res.status < 500 && data.error?.message ? data.error.message : "Maaf, ada gangguan. Coba lagi sebentar lagi ya.");
        return;
      }
      setStatus("success");
      setMessage(data.message ?? "Terima kasih sudah bergabung!");
      setEmail("");
    } catch {
      setStatus("error");
      setMessage("Koneksi terputus. Periksa internetmu lalu coba lagi.");
    }
  }

  if (status === "success") {
    return (
      <p role="status" className="flex items-start gap-3 rounded-3xl bg-white/10 p-5 text-lg text-cream">
        <CheckCircle2 aria-hidden className="mt-1 h-6 w-6 shrink-0 text-dawn" />
        {message}
      </p>
    );
  }

  const invalid = status === "error";
  return (
    <form onSubmit={onSubmit} noValidate className="w-full">
      <label htmlFor={inputId} className="mb-2 block text-sm font-semibold text-cream/90">
        Alamat email
      </label>
      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          id={inputId}
          type="email"
          inputMode="email"
          autoComplete="email"
          maxLength={EMAIL_MAX_LENGTH}
          placeholder="nama@email.com"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (invalid) {
              setStatus("idle");
              setMessage(null);
            }
          }}
          aria-invalid={invalid}
          aria-describedby={message ? messageId : undefined}
          className="min-h-13 flex-1 rounded-full border-2 border-transparent bg-cream px-6 text-base text-ink outline-none transition placeholder:text-ink-soft/70 focus:border-dusk aria-[invalid=true]:border-[#E8835A]"
        />
        <button type="submit" disabled={status === "submitting"} className={buttonStyles("accent", "lg")}>
          {status === "submitting" ? (
            <>
              <LoaderCircle aria-hidden className="h-5 w-5 animate-spin" /> Mengirim…
            </>
          ) : (
            <>
              Gabung <Send aria-hidden className="h-4 w-4" />
            </>
          )}
        </button>
      </div>
      {message && (
        <p id={messageId} role="alert" className="mt-3 flex items-center gap-2 text-sm font-medium text-dusk-soft">
          <CircleAlert aria-hidden className="h-4 w-4 shrink-0" />
          {message}
        </p>
      )}
      <p className="mt-3 text-sm text-cream/70">Info koleksi baru dan promo, paling banyak dua kali sebulan. Bisa berhenti kapan saja.</p>
    </form>
  );
}
