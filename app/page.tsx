import { Deck } from "@/components/deck/Deck";

export default function Home() {
  return (
    <main className="relative">
      <header className="fixed inset-x-0 top-0 z-20 flex items-start justify-between px-10 pt-7">
        <a
          href="/"
          className="block text-3xl font-black italic leading-none tracking-[-0.04em] text-ink lowercase select-none"
        >
          no<span className="text-accent">.</span>point
          <span className="text-accent">.</span>music
        </a>
        <div className="text-right font-mono text-[0.65rem] uppercase tracking-[0.3em] text-ink-soft leading-relaxed">
          based in vancouver
          <br />
          est. 2024
        </div>
      </header>

      <section className="flex min-h-dvh items-center justify-center px-6">
        <Deck />
      </section>

      <section className="mx-auto max-w-2xl px-10 pb-32 font-mono text-[0.65rem] uppercase tracking-[0.25em] text-ink-soft">
        <p className="mt-32 mb-3">— scroll to spin —</p>
        <p className="text-ink text-base normal-case tracking-normal font-sans leading-relaxed">
          art for art. a vancouver-based collective, hosting electronic
          performances, radio broadcasts, and exhibitions in a single venue.
        </p>
        <p className="mt-32 text-ink text-base normal-case tracking-normal font-sans leading-relaxed">
          we don&apos;t sell tickets here. every event links out to its own
          ticket source. every release links out to its own streaming home. this
          site is a directory and an object — not a checkout.
        </p>
      </section>
    </main>
  );
}
