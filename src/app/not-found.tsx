import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { buttonStyles } from "@/shared/components/button-styles";
import { Footer } from "@/shared/components/Footer";
import { Mascot } from "@/shared/components/Mascot";
import { Navbar } from "@/shared/components/Navbar";

export default function NotFound() {
  return (
    <>
      <Navbar overHero={false} />
      <main id="main" className="bg-linear-to-b from-dawn-soft to-cream">
        <div className="mx-auto flex min-h-[80svh] max-w-2xl flex-col items-center justify-center px-4 pb-16 pt-28 text-center">
          <Mascot pose="gaze" size={240} float decorative />
          <p className="mt-6 text-sm font-semibold uppercase tracking-[0.18em] text-brown">Error 404</p>
          <h1 className="mt-2 text-4xl font-semibold text-midnight sm:text-5xl">Sepertinya kamu tersesat</h1>
          <p className="mt-4 text-lg text-ink-soft">
            Halaman yang kamu cari tidak ada atau sudah pindah. Tenang, langitnya masih sama. Yuk, kembali ke jalan pulang.
          </p>
          <Link href="/" className={buttonStyles("primary", "lg", "mt-8")}>
            <ArrowLeft aria-hidden className="h-5 w-5" /> Kembali ke beranda
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
