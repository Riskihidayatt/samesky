import { Collections } from "@/features/collections/Collections";
import { Community } from "@/features/community/Community";
import { Hero } from "@/features/hero/Hero";
import { Highlights } from "@/features/highlights/Highlights";
import { Lookbook } from "@/features/lookbook/Lookbook";
import { Newsletter } from "@/features/newsletter/Newsletter";
import { BestSellers } from "@/features/products/BestSellers";
import { BrandStory } from "@/features/story/BrandStory";
import { Testimonials } from "@/features/testimonials/Testimonials";
import { Footer } from "@/shared/components/Footer";
import { Navbar } from "@/shared/components/Navbar";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main id="main">
        <Hero />
        <Highlights />
        <Collections />
        <BestSellers />
        <BrandStory />
        <Lookbook />
        <Community />
        <Testimonials />
        <Newsletter />
      </main>
      <Footer />
    </>
  );
}
