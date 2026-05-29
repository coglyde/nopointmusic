import { Hero } from "@/components/hero/Hero";

export default function Home() {
  return (
    <main className="relative">
      <Hero />

      <section className="mx-auto max-w-2xl px-10 py-32 font-sans text-base leading-relaxed text-ink">
        <p>
          art for art. a vancouver-based collective, hosting electronic
          performances, radio broadcasts, and exhibitions in a single venue.
        </p>
        <p className="mt-10">
          we don&apos;t sell tickets here. every event links out to its own
          ticket source. every release links out to its own streaming home. this
          site is a directory and an object — not a checkout.
        </p>
      </section>
    </main>
  );
}
