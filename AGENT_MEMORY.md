# AGENT MEMORY — SAMESKY Landing Page

> File ini WAJIB dibaca AI agent di awal sesi kerja, dan WAJIB diupdate di akhir sesi setelah fitur selesai+ditest.
> Terakhir diupdate: 2026-10-02 oleh sesi: tambah produk New Arrivals.

## 1. Ringkasan Project
- Landing page brand pakaian lokal Indonesia "SAMESKY" (tagline: "Different streets, same sky."). Target pasar lintas usia, tone hangat, Bahasa Indonesia + sedikit English.
- Stack: Next.js 16 App Router, React 19, TypeScript, Tailwind CSS v4 (CSS-first, token di `src/app/globals.css` `@theme`), Framer Motion, lucide-react. Test: Vitest + Testing Library (jsdom).
- Single repo, frontend saja + 1 route handler (`/api/newsletter`).

## 2. Keputusan Arsitektur (jangan diubah tanpa diskusi eksplisit)
- Feature-based folder (`src/features/<fitur>`) + `src/shared` untuk komponen/hook/lib lintas fitur.
- Tidak ada `tailwind.config.*`: Tailwind v4 memakai `@theme` di `globals.css`. Warna brand: `cream`, `dawn`, `dusk`, `midnight`, `brown`, `ink` (+ varian `-soft`, `-deep`, `-mist`).
- Maskot diakses lewat registry `src/shared/config/mascot.ts` + komponen `<Mascot pose=...>`, jangan hardcode path gambar maskot.
- Fase langit (morning/dusk/night) dari `SkyProvider`; SSR selalu "morning", client sync ke jam lokal setelah mount (hindari hydration mismatch).
- Keranjang: `useReducer` + Context, disimpan di localStorage key `samesky-cart-v1`; data dari storage divalidasi di reducer (`hydrate`).
- Validasi email dipakai bersama oleh form (client) dan API (server): `src/shared/lib/validation.ts`.
- Semua animasi menghormati `prefers-reduced-motion` (CSS media query + `MotionConfig reducedMotion="user"`).

## 3. Konvensi yang harus diikuti
- Icon: `lucide-react` saja, TANPA emoji di UI. Brand icon Instagram/TikTok digambar manual di `SocialIcons.tsx` (lucide tidak punya brand icon).
- Tombol/link bergaya tombol: pakai `buttonStyles(variant, size)` dari `shared/components/button-styles.ts`.
- Dialog/drawer: pakai hook `useModal` (Escape, focus trap, scroll lock, kembalikan fokus).
- Format error API: `{ "error": { "code": string, "message": string } }`, sukses `{ "message": string }`.
- Harga: integer Rupiah, tampilkan via `formatRupiah()` → "Rp 149.000".
- Pemisah antar section: `<CloudDivider color="var(--color-<warna section berikutnya>)" />` di bagian BAWAH section sebelumnya.

## 4. Status Fitur
| Fitur | Status | Catatan |
|---|---|---|
| Semua 11 section landing page | Done | Hero → Footer sesuai brief |
| Langit hero ikut waktu lokal + switcher manual | Done, tested | `getSkyPhase` di `shared/lib/sky.ts` |
| Best Sellers (swatch, hover tampak belakang, quick add) | Done, tested | `ProductCard.test.tsx`; 8 produk = `bestSellers` |
| New Arrivals (carousel scroll-snap, 5 produk) | Done, tested | `newArrival: true` di `products.data.ts`; section ini yang punya anchor `#shop`, Best Sellers = `#best-sellers` |
| Keranjang (drawer, qty, empty state maskot, persist) | Done, tested | Checkout belum terhubung (demo) |
| Pencarian produk (dialog) | Done, tested | filter lokal dari `products.data.ts` |
| Newsletter form + `POST /api/newsletter` | Done, tested | Belum disimpan ke ESP |
| 404 & loading dengan maskot | Done | |

## 5. Yang sedang dikerjakan sesi ini
- Sesi 3: perbaikan presisi: semua foto produk diseragamkan, kartu produk selalu menyediakan baris catatan agar harga/swatch sejajar, carousel New Arrivals dikunci ke lebar container (4 kartu pas), placeholder siluet diganti. 54 test lulus.
- Sesi 2: tambah 5 produk baru (Sky Friends Camp Shirt, Mega Mendung Shirt, Sunrise Linen Shirt, Under the Same Sky Tee, For New Beginnings Tee) + section New Arrivals. 52 test lulus.
- Selesai: setup project, semua section, tests, lint + typecheck bersih, build produksi sukses.
- Next step: ganti maskot placeholder dengan file asli dari character sheet user (pose Waving, Walking, Dreaming, Sunset Watching), foto lookbook/community asli, sambungkan newsletter ke penyedia email, checkout.

## 6. Known issues / hutang teknis
- Maskot di `public/mascot/*.svg` masih PLACEHOLDER buatan (bukan artwork asli). Prioritas: tinggi.
- Lookbook & Community masih placeholder gradien (field `src` kosong). Prioritas: sedang.
- Everyday Polo, Little Sky Kids Tee, Little Sky Family Set, dan beberapa swatch warna belum punya foto; tampil sebagai `GarmentPlaceholder` (lingkaran warna + maskot + label "Foto segera hadir"). Prioritas: sedang.
- `/api/newsletter` belum ada rate limiting dan belum meneruskan email ke provider. Prioritas: sedang (wajib sebelum production).
- Nomor WhatsApp di `site.ts` masih placeholder.

## 7. Hal yang perlu diketahui agent berikutnya
- Foto produk di `public/images/products/` WAJIB dibuat lewat `scripts/frame-product-photo.sh` (dari mockup berdampingan: kiri depan, kanan belakang). Script menyeragamkan ukuran garmen (box 520x610 di kanvas 600x750) dan latar `#E7E5E1` = token `bg-photo`. Jangan crop manual, nanti ukuran/latar tidak konsisten.
- Produk baru masuk Best Sellers atau New Arrivals lewat flag `newArrival`; jangan buat array terpisah.
- Env var opsional: `NEXT_PUBLIC_SITE_URL` (untuk metadataBase/Open Graph). Lihat `.env.example`.
- Jalankan `npm run lint && npm run typecheck && npm test && npm run build` sebelum menutup sesi.
