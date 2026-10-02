import { Mail, MessageCircle } from "lucide-react";
import { site } from "@/shared/config/site";
import { Logo } from "./Logo";
import { InstagramIcon, TikTokIcon } from "./SocialIcons";

const groups = [
  {
    title: "Shop",
    links: [
      { label: "Everyday Essentials", href: "/#collections" },
      { label: "Dusk Edition", href: "/#collections" },
      { label: "Midnight Edition", href: "/#collections" },
      { label: "Little Sky", href: "/#collections" },
    ],
  },
  {
    title: "Bantuan",
    links: [
      { label: "Panduan ukuran", href: "#" },
      { label: "Pengiriman", href: "#" },
      { label: "Penukaran & pengembalian", href: "#" },
      { label: "FAQ", href: "#" },
    ],
  },
  {
    title: "SAMESKY",
    links: [
      { label: "Our Story", href: "/#story" },
      { label: "Community", href: "/#community" },
      { label: "Best Sellers", href: "/#shop" },
    ],
  },
];

const payments = ["BCA", "Mandiri", "BNI", "BRI", "QRIS", "GoPay", "OVO", "DANA", "ShopeePay"];

export function Footer() {
  return (
    <footer className="bg-cream-deep text-ink">
      <div className="mx-auto max-w-7xl px-4 pb-10 pt-8 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.3fr_2fr]">
          <div>
            <Logo />
            <p className="mt-3 font-display text-xl italic text-brown">{site.tagline}</p>
            <p className="mt-3 max-w-sm text-ink-soft">Pakaian sehari-hari yang nyaman dan timeless, dibuat di Indonesia untuk setiap perjalanan.</p>
            <div className="mt-5 flex gap-2">
              <a href={site.instagram.url} target="_blank" rel="noopener noreferrer" aria-label={`Instagram SAMESKY ${site.instagram.handle}`} className="flex h-11 w-11 items-center justify-center rounded-full bg-white/70 text-midnight transition hover:bg-midnight hover:text-cream">
                <InstagramIcon className="h-5 w-5" />
              </a>
              <a href={site.tiktok.url} target="_blank" rel="noopener noreferrer" aria-label={`TikTok SAMESKY ${site.tiktok.handle}`} className="flex h-11 w-11 items-center justify-center rounded-full bg-white/70 text-midnight transition hover:bg-midnight hover:text-cream">
                <TikTokIcon className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {groups.map((g) => (
              <nav key={g.title} aria-label={g.title}>
                <h2 className="font-sans text-sm font-bold uppercase tracking-[0.14em] text-midnight">{g.title}</h2>
                <ul className="mt-3 space-y-2">
                  {g.links.map((l) => (
                    <li key={l.label}>
                      <a href={l.href} className="text-ink-soft transition hover:text-brown">
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
            <div>
              <h2 className="font-sans text-sm font-bold uppercase tracking-[0.14em] text-midnight">Kontak</h2>
              <ul className="mt-3 space-y-2 text-ink-soft">
                <li>
                  <a href={`mailto:${site.email}`} className="inline-flex items-center gap-2 transition hover:text-brown">
                    <Mail aria-hidden className="h-4 w-4" /> {site.email}
                  </a>
                </li>
                <li>
                  <a href={site.whatsapp.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 transition hover:text-brown">
                    <MessageCircle aria-hidden className="h-4 w-4" /> {site.whatsapp.label}
                  </a>
                </li>
                <li className="text-sm">Senin–Sabtu, 09.00–17.00 WIB</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-ink/10 pt-6">
          <h2 className="font-sans text-sm font-bold uppercase tracking-[0.14em] text-midnight">Metode pembayaran</h2>
          <ul className="mt-3 flex flex-wrap gap-2" aria-label="Metode pembayaran yang diterima">
            {payments.map((p) => (
              <li key={p} className="rounded-xl bg-white/80 px-3 py-1.5 text-sm font-semibold text-midnight ring-1 ring-ink/5">
                {p}
              </li>
            ))}
          </ul>
        </div>

        <p className="mt-8 text-sm text-ink-soft">© {new Date().getFullYear()} SAMESKY. Dibuat dengan hangat di Indonesia.</p>
      </div>
    </footer>
  );
}
