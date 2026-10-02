import { Star } from "lucide-react";
import { CloudDivider } from "@/shared/components/CloudDivider";
import { Reveal } from "@/shared/components/Reveal";
import { SectionHeading } from "@/shared/components/SectionHeading";

const reviews = [
  { name: "Alya Putri", city: "Malang", role: "Mahasiswi", rating: 5, text: "Bahannya adem banget, cocok buat kuliah seharian. Dicuci berkali-kali juga warnanya masih bagus." },
  { name: "Bapak Hendra", city: "Semarang", role: "Pensiunan guru", rating: 5, text: "Awalnya dibelikan anak. Ternyata ukurannya pas dan nyaman, sekarang saya beli sendiri warna lain." },
  { name: "Rina Kusuma", city: "Bekasi", role: "Ibu dua anak", rating: 5, text: "Set Little Sky jadi baju kembaran kami tiap liburan. Anak-anak suka gambar awannya yang lucu." },
  { name: "Fajar Nugroho", city: "Balikpapan", role: "Pekerja kantoran, perantau", rating: 4, text: "Crewneck-nya rapi dipakai ke kantor. Ceritanya juga bikin ingat teman-teman di kampung halaman." },
];

export function Testimonials() {
  return (
    <section aria-labelledby="reviews-title" className="bg-cream pt-16 sm:pt-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading id="reviews-title" eyebrow="Kata mereka" title="Cerita dari teman perjalanan" />
        </Reveal>
        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {reviews.map((r, i) => (
            <Reveal as="li" key={r.name} delay={i * 0.06} className="flex flex-col rounded-4xl bg-white/80 p-6 shadow-soft ring-1 ring-ink/5 transition hover:-translate-y-1 hover:shadow-lift">
              <div className="flex gap-0.5" role="img" aria-label={`Rating ${r.rating} dari 5`}>
                {Array.from({ length: 5 }, (_, s) => (
                  <Star key={s} aria-hidden className={s < r.rating ? "h-5 w-5 fill-dusk text-dusk" : "h-5 w-5 text-ink/20"} />
                ))}
              </div>
              <p className="mt-4 flex-1 text-ink">&ldquo;{r.text}&rdquo;</p>
              <div className="mt-6 flex items-center gap-3">
                <span aria-hidden className="flex h-11 w-11 items-center justify-center rounded-full bg-dawn-soft font-semibold text-midnight">
                  {r.name.replace("Bapak ", "").charAt(0)}
                </span>
                <div>
                  <p className="font-semibold text-midnight">{r.name}</p>
                  <p className="text-sm text-ink-soft">
                    {r.role} · {r.city}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
      <CloudDivider color="var(--color-midnight)" className="mt-16 sm:mt-24" />
    </section>
  );
}
