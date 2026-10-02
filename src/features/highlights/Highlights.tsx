import { HeartHandshake, Shirt, Truck, Users } from "lucide-react";
import { Reveal } from "@/shared/components/Reveal";

const items = [
  { icon: Shirt, title: "Katun premium", body: "Combed cotton yang adem, lembut, dan tetap rapi setelah berkali-kali dicuci." },
  { icon: Users, title: "Unisex, untuk semua usia", body: "Potongan santai yang nyaman dipakai kamu, orang tua, sampai si kecil." },
  { icon: HeartHandshake, title: "Produksi lokal", body: "Dijahit bersama mitra konveksi lokal di Indonesia, dengan upah yang layak." },
  { icon: Truck, title: "Gratis ongkir se-Indonesia", body: "Dari Sabang sampai Merauke, pesananmu kami antar tanpa biaya kirim." },
];

export function Highlights() {
  return (
    <section aria-label="Keunggulan SAMESKY" className="bg-cream">
      <ul className="mx-auto grid max-w-7xl grid-cols-1 gap-4 px-4 py-12 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
        {items.map(({ icon: Icon, title, body }, i) => (
          <Reveal as="li" key={title} delay={i * 0.08} className="rounded-3xl bg-white/70 p-6 shadow-soft ring-1 ring-ink/5 transition hover:-translate-y-1 hover:shadow-lift">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-dawn-soft text-midnight">
              <Icon aria-hidden className="h-6 w-6" strokeWidth={1.8} />
            </span>
            <h3 className="mt-4 font-sans text-lg font-semibold text-midnight">{title}</h3>
            <p className="mt-1 text-[0.98rem] text-ink-soft">{body}</p>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}
