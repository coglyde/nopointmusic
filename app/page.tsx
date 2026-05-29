import { Hero } from "@/components/hero/Hero";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { ManifestoReveal } from "@/components/home/ManifestoReveal";
import { CapturesSection } from "@/components/home/CapturesSection";
import { InstagramFeed } from "@/components/social/InstagramFeed";

export default function Home() {
  return (
    <main className="relative">
      <SiteHeader />
      <Hero />

      <ManifestoReveal />
      <CapturesSection />
      <InstagramFeed />
      <SiteFooter />
    </main>
  );
}
