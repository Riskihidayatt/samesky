import { Briefcase, GraduationCap, Mountain, Plane, Sofa, TreePalm, type LucideIcon } from "lucide-react";
import { PhotoPlaceholder } from "@/shared/components/PhotoPlaceholder";
import { CloudDivider } from "@/shared/components/CloudDivider";
import { Reveal } from "@/shared/components/Reveal";
import { SectionHeading } from "@/shared/components/SectionHeading";
import { cn } from "@/shared/lib/cn";

type Look = { scene: string; caption: string; icon: LucideIcon; gradient: string; span: string; src?: string };

// Add `src: "/images/lookbook/xxx.webp"` to each entry once the photoshoot is ready.
const looks: Look[] = [
  { scene: "Kampus", caption: "Raka, 20 — Everyday Logo Tee", icon: GraduationCap, gradient: "from-dawn to-dawn-soft", span: "row-span-2" },
  { scene: "Kantor", caption: "Dinda, 28 — Everyday Polo", icon: Briefcase, gradient: "from-cream-deep to-[#D8C7AE]", span: "" },
  { scene: "Liburan keluarga", caption: "Keluarga Hartono — Little Sky Family Set", icon: TreePalm, gradient: "from-dusk to-dusk-soft", span: "row-span-2" },
  { scene: "Perjalanan", caption: "Pak Budi, 58 — Everyday Crewneck", icon: Plane, gradient: "from-midnight-soft to-dawn", span: "" },
  { scene: "Pendakian akhir pekan", caption: "Sekar, 34 — Same Sky Hoodie", icon: Mountain, gradient: "from-[#9DB8A0] to-cream-deep", span: "" },
  { scene: "Santai di rumah", caption: "Ibu Ratna, 52 — Wherever You Are Tee", icon: Sofa, gradient: "from-brown/70 to-dusk-soft", span: "" },
];

export function Lookbook() {
  return (
    <section aria-labelledby="lookbook-title" className="bg-cream-mist pt-20 sm:pt-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            id="lookbook-title"
            eyebrow="Lookbook"
            title="Dipakai ke mana saja, oleh siapa saja"
            description="Ke kampus, ke kantor, liburan bareng keluarga, atau perjalanan jauh. Pakaian yang sama, cerita yang berbeda."
          />
        </Reveal>
        <ul className="mt-12 grid auto-rows-[180px] grid-cols-2 gap-4 sm:auto-rows-[220px] lg:grid-cols-4">
          {looks.map((look, i) => (
            <Reveal as="li" key={look.scene} delay={(i % 4) * 0.06} className={cn("group relative overflow-hidden rounded-4xl shadow-soft", look.span)}>
              <div className="absolute inset-0 transition-transform duration-700 motion-safe:group-hover:scale-105">
                <PhotoPlaceholder src={look.src} alt={`Lookbook ${look.scene}: ${look.caption}`} icon={look.icon} gradient={look.gradient} />
              </div>
              <div className="absolute inset-x-3 bottom-3 rounded-2xl bg-cream/90 px-4 py-2.5 backdrop-blur">
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-brown">{look.scene}</p>
                <p className="text-sm text-ink">{look.caption}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
      <CloudDivider color="var(--color-dawn-soft)" className="mt-16 sm:mt-24" />
    </section>
  );
}
