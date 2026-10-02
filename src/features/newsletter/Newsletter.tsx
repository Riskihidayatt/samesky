import { Mascot } from "@/shared/components/Mascot";
import { Reveal } from "@/shared/components/Reveal";
import { CloudDivider } from "@/shared/components/CloudDivider";
import { NewsletterForm } from "./NewsletterForm";

const stars = [[8, 20], [18, 64], [30, 12], [44, 40], [58, 16], [70, 70], [82, 28], [92, 54], [50, 82], [24, 86]];

export function Newsletter() {
  return (
    <section aria-labelledby="newsletter-title" className="relative overflow-hidden bg-midnight">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        {stars.map(([x, y], i) => (
          <span key={i} className="absolute h-1 w-1 rounded-full bg-cream animate-twinkle" style={{ left: `${x}%`, top: `${y}%`, animationDelay: `${i * 0.35}s` }} />
        ))}
        <span className="absolute right-[10%] top-[14%] h-16 w-16 rounded-full bg-[#F6E7C1] shadow-[0_0_60px_16px_rgba(246,231,193,0.3)]" />
      </div>
      <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 sm:px-6 md:grid-cols-[0.9fr_1.1fr] lg:px-8">
        <Reveal className="mx-auto w-full max-w-xs md:max-w-sm">
          <Mascot pose="sleep" size={380} float className="h-auto w-full" />
        </Reveal>
        <Reveal delay={0.1}>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-dusk">Newsletter</p>
          <h2 id="newsletter-title" className="mt-3 text-3xl font-semibold text-cream sm:text-5xl">
            Join the Sky Club
          </h2>
          <p className="mt-4 max-w-lg text-lg text-cream/80">
            Jadi yang pertama tahu saat koleksi baru rilis, plus promo kecil khusus member. Tenang, kami tidak akan memenuhi inbox-mu.
          </p>
          <div className="mt-8 max-w-lg">
            <NewsletterForm />
          </div>
        </Reveal>
      </div>
      <CloudDivider color="var(--color-cream-deep)" />
    </section>
  );
}
