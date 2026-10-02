import { Quote } from "lucide-react";
import { CloudDivider } from "@/shared/components/CloudDivider";
import { Reveal } from "@/shared/components/Reveal";
import { StoryIllustration } from "./StoryIllustration";

export function BrandStory() {
  return (
    <section id="story" aria-labelledby="story-title" className="bg-cream pt-20 sm:pt-28">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
        <Reveal className="order-2 lg:order-1">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brown">Our Story</p>
          <h2 id="story-title" className="mt-3 text-3xl font-semibold text-midnight sm:text-4xl">
            Berawal dari teman yang terpisah jarak
          </h2>
          <div className="mt-6 space-y-4 text-lg text-ink-soft">
            <p>
              SAMESKY lahir dari sekelompok teman yang tumbuh bersama, lalu satu per satu pergi: ada yang kuliah di kota lain, ada
              yang merantau, ada yang pindah mengikuti pekerjaan.
            </p>
            <p>
              Setiap kali menatap langit, kami sadar bahwa di mana pun berada, kami masih di bawah langit yang sama. Dari situ kami
              membuat pakaian sehari-hari yang nyaman dan timeless, untuk siapa saja yang sedang menjalani perjalanannya masing-masing.
            </p>
          </div>
          <figure className="mt-8 rounded-4xl bg-white/70 p-6 shadow-soft ring-1 ring-ink/5 sm:p-8">
            <Quote aria-hidden className="h-8 w-8 text-dusk" />
            <blockquote className="mt-3 font-display text-2xl font-medium leading-snug text-midnight sm:text-[1.75rem]">
              Jalan kita mungkin berbeda. Tapi langitnya tetap sama.
            </blockquote>
            <figcaption className="mt-3 text-sm font-semibold text-brown">— Tim SAMESKY</figcaption>
          </figure>
        </Reveal>
        <Reveal delay={0.1} className="order-1 lg:order-2">
          <StoryIllustration />
        </Reveal>
      </div>
      <CloudDivider color="var(--color-cream-mist)" className="mt-16 sm:mt-24" />
    </section>
  );
}
