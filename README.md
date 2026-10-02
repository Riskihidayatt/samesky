# SAMESKY — Landing Page

> *Different streets, same sky.*

Landing page untuk brand pakaian lokal SAMESKY. Dibangun dengan **Next.js 16 (App Router) + TypeScript + Tailwind CSS v4 + Framer Motion**, icon dari **lucide-react**.

## Menjalankan

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start   # mode produksi
```

Cek kualitas:

```bash
npm run lint
npm run typecheck
npm test           # Vitest + Testing Library
```

## Struktur file

```
src/
├── app/
│   ├── layout.tsx            # font (Fraunces + Plus Jakarta Sans), metadata, skip link, Providers
│   ├── page.tsx              # urutan section landing page
│   ├── not-found.tsx         # halaman 404 dengan maskot
│   ├── loading.tsx           # loading state dengan maskot
│   ├── globals.css           # design token (@theme), animasi, prefers-reduced-motion
│   ├── icon.png, apple-icon.png  # favicon dari maskot
│   └── api/newsletter/route.ts   # POST /api/newsletter (validasi email)
├── features/                 # satu folder per section/fitur
│   ├── hero/                 # Hero + SkyBackdrop (langit ikut jam lokal)
│   ├── highlights/           # 4 keunggulan
│   ├── collections/          # 4 kartu koleksi
│   ├── products/             # data produk, ProductCard, NewArrivals, BestSellers, GarmentPlaceholder
│   ├── story/                # Brand Story + ilustrasi maskot berjalan
│   ├── lookbook/  community/  testimonials/
│   ├── newsletter/           # Sky Club + form
│   ├── cart/                 # reducer, context (localStorage), drawer + empty state
│   ├── search/               # dialog pencarian produk
│   └── sky/                  # SkyProvider (fase pagi / senja / malam)
└── shared/
    ├── components/           # Navbar, Footer, Mascot, Reveal, CloudDivider, Logo, dll.
    ├── config/               # site.ts (kontak, sosmed, menu), mascot.ts (registry gambar maskot)
    ├── hooks/                # useScrolled, useModal (Escape, focus trap, scroll lock)
    └── lib/                  # format Rupiah, sky phase, validasi email, cn()
scripts/frame-product-photo.sh  # seragamkan framing & warna latar foto produk
public/
├── mascot/                   # maskot resmi (WebP transparan): wave, walk, sleep, gaze
├── brand/logo-mark.webp      # ikon logo (kepala maskot melambai)
└── images/products/          # foto produk (depan/belakang) dari mockup
```

## Mengganti aset placeholder

| Aset | Cara ganti |
|---|---|
| **Maskot** | Sudah memakai potongan dari character sheet resmi. Untuk versi lebih tajam, ganti file di `public/mascot/` dengan ekspor resolusi 2–3x (latar transparan) dan sesuaikan `width`/`height` di `src/shared/config/mascot.ts`. Pose: `wave` (Waving), `walk` (Walking), `sleep` (Dreaming), `gaze` (Sunset Watching). |
| **Logo** | `src/shared/components/Logo.tsx`: ikon `public/brand/logo-mark.webp` + wordmark teks. Favicon: `src/app/icon.png` & `apple-icon.png`. |
| **Foto produk baru** | Jalankan `scripts/frame-product-photo.sh <mockup> <nama-depan> <nama-belakang>` untuk mockup berdampingan (depan kiri, belakang kanan). Untuk layout lain (mis. 3 tampilan dengan caption), beri area crop sendiri: `scripts/frame-product-photo.sh <mockup> 470x650+0+0 <nama-depan> 440x650+936+0 <nama-belakang>`. Hasilnya otomatis seukuran dan selatar dengan foto lain. |
| **Produk** | `src/features/products/products.data.ts`. Set `newArrival: true` agar tampil di New Arrivals, selain itu masuk Best Sellers. Warna tanpa `images` otomatis memakai ilustrasi siluet berwarna. |
| **Lookbook / Community** | Tambahkan `src` pada tiap entri di `Lookbook.tsx` / `Community.tsx`; tanpa `src` tampil placeholder gradien. |
| **Kontak & sosmed** | `src/shared/config/site.ts` (nomor WhatsApp masih placeholder). |

## Catatan

- Newsletter API hanya memvalidasi email dan belum menyimpan ke mana pun (lihat TODO di `route.ts`).
- Checkout di drawer keranjang belum terhubung (versi demo).
