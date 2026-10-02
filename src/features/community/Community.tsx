import { Camera, MapPin } from "lucide-react";
import { buttonStyles } from "@/shared/components/button-styles";
import { CloudDivider } from "@/shared/components/CloudDivider";
import { PhotoPlaceholder } from "@/shared/components/PhotoPlaceholder";
import { Reveal } from "@/shared/components/Reveal";
import { SectionHeading } from "@/shared/components/SectionHeading";
import { InstagramIcon } from "@/shared/components/SocialIcons";
import { site } from "@/shared/config/site";

// Replace with curated customer photos (with permission). Add `src` per entry.
const posts: { city: string; handle: string; gradient: string; src?: string }[] = [
  { city: "Jakarta", handle: "@nadia.r", gradient: "from-dawn to-dawn-soft" },
  { city: "Bandung", handle: "@kevinpratama", gradient: "from-dusk to-dusk-soft" },
  { city: "Yogyakarta", handle: "@sekar.ayu", gradient: "from-cream-deep to-[#D8C7AE]" },
  { city: "Surabaya", handle: "@keluargawijaya", gradient: "from-midnight-soft to-dawn" },
  { city: "Medan", handle: "@bangtigor", gradient: "from-[#9DB8A0] to-cream-deep" },
  { city: "Makassar", handle: "@andi.fitri", gradient: "from-dusk-soft to-dawn-soft" },
  { city: "Denpasar", handle: "@putu.arya", gradient: "from-brown/70 to-dusk-soft" },
  { city: "Balikpapan", handle: "@mamanyaalya", gradient: "from-dawn-soft to-cream-deep" },
];

export function Community() {
  return (
    <section id="community" aria-labelledby="community-title" className="relative bg-dawn-soft">
      <div className="mx-auto max-w-7xl px-4 pb-16 pt-6 sm:px-6 sm:pb-20 lg:px-8">
        <Reveal>
          <SectionHeading
            id="community-title"
            eyebrow="Community"
            title="Under the Same Sky"
            description="Dari berbagai kota di Indonesia, teman-teman SAMESKY berbagi langit mereka masing-masing."
          />
        </Reveal>
        <ul className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
          {posts.map((post, i) => (
            <Reveal as="li" key={post.handle} delay={(i % 4) * 0.05} className="group relative aspect-square overflow-hidden rounded-3xl shadow-soft">
              <div className="absolute inset-0 transition-transform duration-700 motion-safe:group-hover:scale-105">
                <PhotoPlaceholder src={post.src} alt={`Foto pelanggan ${post.handle} dari ${post.city}`} icon={Camera} gradient={post.gradient} sizes="(min-width: 640px) 25vw, 50vw" />
              </div>
              <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-cream/90 px-3 py-1 text-xs font-semibold text-midnight backdrop-blur">
                <MapPin aria-hidden className="h-3.5 w-3.5 text-brown" />
                {post.city}
              </span>
              <span className="absolute bottom-3 left-3 rounded-full bg-midnight/70 px-3 py-1 text-xs font-medium text-cream">{post.handle}</span>
            </Reveal>
          ))}
        </ul>
        <Reveal className="mt-10 flex flex-col items-center gap-4 text-center">
          <p className="text-lg text-midnight">
            Tag <strong className="font-semibold">{site.instagram.handle}</strong> untuk masuk galeri ini.
          </p>
          <a href={site.instagram.url} target="_blank" rel="noopener noreferrer" className={buttonStyles("primary", "md")}>
            <InstagramIcon className="h-5 w-5" /> Follow di Instagram
          </a>
        </Reveal>
      </div>
      <CloudDivider color="var(--color-cream)" />
    </section>
  );
}
