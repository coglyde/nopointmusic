import Link from "next/link";
import { SpinningVinyl } from "@/components/site/SpinningVinyl";
import { NAV_ITEMS } from "@/lib/nav";
import { LOCATION, ESTABLISHED } from "@/lib/social";

// Branded not-found, kept in the turntable language: a slowly spinning record
// with the run-out groove that goes nowhere. Cream theme, quiet, with the full
// nav so a dead end still routes somewhere good.
export default function NotFound() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center bg-cream px-6 text-center">
      <div className="opacity-90">
        <SpinningVinyl size={120} driver="auto" spinSeconds={9} />
      </div>

      <p className="mt-10 font-mono text-[0.7rem] uppercase tracking-[0.35em] text-accent">
        404 - run-out groove
      </p>

      <h1 className="mt-4 text-4xl font-black uppercase leading-[1.02] tracking-[-0.02em] text-ink sm:text-6xl">
        No point here
      </h1>

      <p className="mt-5 max-w-md text-base leading-relaxed text-ink-soft">
        The needle reached the end of the record and found nothing. This page
        doesn&apos;t exist - but the rest of the deck does.
      </p>

      <nav
        aria-label="Sections"
        className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-3"
      >
        <Link
          href="/"
          className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-ink transition-colors hover:text-accent"
        >
          The deck
        </Link>
        {NAV_ITEMS.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-ink-soft transition-colors hover:text-accent"
          >
            {item.label}
          </Link>
        ))}
      </nav>

      <p className="mt-16 font-mono text-[0.6rem] uppercase tracking-[0.25em] text-ink-soft/70">
        {LOCATION} · {ESTABLISHED}
      </p>
    </main>
  );
}
