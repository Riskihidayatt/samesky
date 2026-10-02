import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Mascot } from "@/shared/components/Mascot";
import { Reveal } from "@/shared/components/Reveal";
import { SectionHeading } from "@/shared/components/SectionHeading";
import { cn } from "@/shared/lib/cn";

const linkClass = "mt-6 inline-flex min-h-11 items-center gap-2 self-start rounded-full px-5 font-semibold transition motion-safe:group-hover:translate-x-1";

function Stars() {
  const pts = [[12, 18], [28, 8], [44, 30], [62, 12], [78, 26], [88, 8], [20, 40], [70, 44]];
  return (
    <div aria-hidden className="absolute inset-0">
      {pts.map(([x, y], i) => (
        <span key={i} className="absolute h-1 w-1 rounded-full bg-cream animate-twinkle" style={{ left: `${x}%`, top: `${y}%`, animationDelay: `${i * 0.4}s` }} />
      ))}
    </div>
  );
}

export function Collections() {
  return (
    <section id="collections" aria-labelledby="collections-title" className="bg-cream pb-8 pt-16 sm:pt-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            id="collections-title"
            eyebrow="Collections"
            title="Satu langit, banyak suasana"
            description="Setiap koleksi lahir dari satu momen kecil dalam perjalanan: pagi yang sibuk, pulang di kala senja, dan malam yang tenang."
          />
        </Reveal>

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {/* EVERYDAY ESSENTIALS */}
          <Reveal>
            <a href="#shop" className="group relative flex min-h-[420px] flex-col overflow-hidden rounded-5xl bg-cream-deep p-8 shadow-soft transition hover:shadow-lift sm:p-10">
              <div className="relative z-10 max-w-[60%]">
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-brown">Everyday Essentials</p>
                <h3 className="mt-3 text-3xl font-semibold text-midnight sm:text-4xl">Basic yang selalu bisa diandalkan.</h3>
                <p className="mt-3 text-ink-soft">Kaos logo, crewneck, dan polo dalam warna netral yang gampang dipadukan.</p>
              </div>
              <span className={cn(linkClass, "relative z-10 mt-auto bg-midnight text-cream")}>
                Lihat koleksi <ArrowUpRight aria-hidden className="h-4 w-4" />
              </span>
              <div className="absolute -bottom-6 -right-10 w-[58%] max-w-[300px] rotate-3 overflow-hidden rounded-4xl shadow-lift transition-transform duration-700 motion-safe:group-hover:rotate-0">
                <Image src="/images/products/grey-crewneck-front.webp" alt="Everyday Crewneck warna Heather Grey" width={600} height={750} sizes="(min-width: 768px) 300px, 55vw" loading="lazy" />
              </div>
            </a>
          </Reveal>

          {/* DUSK EDITION */}
          <Reveal delay={0.08}>
            <a
              href="#shop"
              className="group relative flex min-h-[420px] flex-col overflow-hidden rounded-5xl bg-linear-to-b from-[#F08C5A] via-dusk to-[#FBD3AE] p-8 shadow-soft transition hover:shadow-lift sm:p-10"
            >
              <span aria-hidden className="absolute right-[14%] top-[44%] h-28 w-28 rounded-full bg-[#FFE2B8] opacity-90 shadow-[0_0_80px_30px_rgba(255,226,184,0.7)]" />
              <div className="relative z-10 max-w-[62%]">
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-midnight/80">Dusk Edition</p>
                <h3 className="mt-3 text-3xl font-semibold text-midnight sm:text-4xl">Untuk perjalanan pulang.</h3>
                <p className="mt-3 text-ink">Warna jingga hangat dari langit sore, saat semua orang sedang menuju rumah.</p>
              </div>
              <span className={cn(linkClass, "relative z-10 mt-auto bg-midnight text-cream")}>
                Lihat koleksi <ArrowUpRight aria-hidden className="h-4 w-4" />
              </span>
              <Mascot pose="gaze" size={260} decorative className="absolute -right-4 bottom-0 h-auto w-[52%] max-w-[260px] transition-transform duration-700 motion-safe:group-hover:-translate-y-2" />
            </a>
          </Reveal>

          {/* MIDNIGHT EDITION */}
          <Reveal>
            <a
              href="#shop"
              className="group relative flex min-h-[420px] flex-col overflow-hidden rounded-5xl bg-linear-to-b from-midnight to-midnight-soft p-8 shadow-soft transition hover:shadow-lift sm:p-10"
            >
              <Stars />
              <div className="relative z-10 max-w-[62%]">
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-dawn">Midnight Edition</p>
                <h3 className="mt-3 text-3xl font-semibold text-cream sm:text-4xl">Untuk istirahat yang tenang.</h3>
                <p className="mt-3 text-cream/80">Navy yang dalam dan bintang-bintang kecil. Hoodie dan setelan santai untuk malam yang pelan.</p>
              </div>
              <span className={cn(linkClass, "relative z-10 mt-auto bg-cream text-midnight")}>
                Lihat koleksi <ArrowUpRight aria-hidden className="h-4 w-4" />
              </span>
              <Mascot pose="sleep" size={280} decorative className="absolute -right-4 bottom-0 h-auto w-[54%] max-w-[280px] animate-float" />
            </a>
          </Reveal>

          {/* LITTLE SKY */}
          <Reveal delay={0.08}>
            <a href="#shop" className="group relative flex min-h-[420px] flex-col overflow-hidden rounded-5xl bg-dawn-soft p-8 shadow-soft transition hover:shadow-lift sm:p-10">
              <div className="relative z-10 max-w-[60%]">
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-brown">Little Sky</p>
                <h3 className="mt-3 text-3xl font-semibold text-midnight sm:text-4xl">Untuk keluarga kecilmu.</h3>
                <p className="mt-3 text-ink-soft">Set kaos kembar untuk ayah, ibu, dan anak. Jalan bareng, pakai yang sama.</p>
              </div>
              <span className={cn(linkClass, "relative z-10 mt-auto bg-midnight text-cream")}>
                Lihat koleksi <ArrowUpRight aria-hidden className="h-4 w-4" />
              </span>
              <div className="absolute -right-6 bottom-0 flex w-[56%] max-w-[300px] items-end">
                <Mascot pose="wave" size={200} decorative className="relative z-10 -mr-12 h-auto w-[62%]" />
                <Mascot pose="walk" size={120} decorative className="h-auto w-[40%] -scale-x-100" />
              </div>
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
