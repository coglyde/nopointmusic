import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { NAV_ITEMS } from "@/lib/nav";
import { EMAIL, ESTABLISHED, LOCATION, SOCIALS } from "@/lib/social";

// Site-wide footer for the interior + home. Opens on a compact CTA, then three
// quiet columns (Index runs two-up so the six links don't tower). Behind it
// all, the wordmark sits as an oversized tone-on-tone engraving, cropped by the
// footer edge, so the page signs off in the brand's own hand.
export function SiteFooter() {
  return (
    <footer className="relative isolate mt-20 overflow-hidden border-t border-brass/30 bg-cream-deep">
      <div className="relative z-10 mx-auto max-w-6xl px-6 pt-14 sm:px-10">
        {/* CTA */}
        <div className="flex flex-col gap-8 border-b border-ink/10 pb-14 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-mono text-[0.7rem] uppercase tracking-[0.3em] text-accent">
              Say hello
            </p>
            <h2 className="mt-4 text-4xl font-black tracking-[-0.03em] text-ink sm:text-5xl">
              Be in the room.
            </h2>
            <a
              href={`mailto:${EMAIL}`}
              className="group mt-6 inline-flex items-center gap-3 border border-ink/80 px-6 py-3.5 font-mono text-[0.72rem] uppercase tracking-[0.2em] text-ink transition-colors hover:border-ink hover:bg-ink hover:text-cream"
            >
              {EMAIL}
              <ArrowUpRight
                className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                strokeWidth={2}
              />
            </a>
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-ink-soft">
            Bookings, demos, collaborations, or just to be in the room. We read
            everything.
          </p>
        </div>

        {/* Columns. Index spans two so its six links sit in a 3×2 block */}
        <div className="mt-14 grid grid-cols-2 gap-10 sm:grid-cols-4">
          <nav aria-label="Sections" className="sm:col-span-2">
            <p className="mb-4 font-mono text-[0.65rem] uppercase tracking-[0.3em] text-ink-soft">
              Index
            </p>
            <div className="grid grid-flow-col grid-cols-2 grid-rows-3 gap-x-8 gap-y-3">
              <Link
                href="/"
                className="w-fit text-sm text-ink transition-colors hover:text-accent"
              >
                Home
              </Link>
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="w-fit text-sm text-ink transition-colors hover:text-accent"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </nav>

          <div className="flex flex-col gap-3">
            <p className="mb-1 font-mono text-[0.65rem] uppercase tracking-[0.3em] text-ink-soft">
              Channels
            </p>
            {SOCIALS.map((s) => (
              <a
                key={s.href}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="group flex w-fit flex-col gap-0.5 text-sm text-ink transition-colors hover:text-accent sm:flex-row sm:items-baseline sm:gap-2"
              >
                {s.label}
                <span className="font-mono text-[0.65rem] tracking-[0.1em] text-ink-soft transition-colors group-hover:text-accent">
                  {s.handle}
                </span>
              </a>
            ))}
          </div>

          <div className="flex flex-col gap-3">
            <p className="mb-1 font-mono text-[0.65rem] uppercase tracking-[0.3em] text-ink-soft">
              Spaces
            </p>
            <span className="text-sm text-ink">Platform 9</span>
            <span className="text-sm text-ink">NOP Studios</span>
            <span className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-ink-soft">
              {LOCATION}
            </span>
          </div>
        </div>

        {/* Baseline sits above the engraving, with room below for it */}
        <div className="mt-16 flex flex-col gap-2 border-t border-ink/10 pb-28 pt-6 font-mono text-[0.6rem] uppercase tracking-[0.25em] text-ink-soft sm:flex-row sm:items-center sm:justify-between sm:pb-56">
          <span>art for art</span>
          <span>{ESTABLISHED}</span>
          <span>© {new Date().getFullYear()} No Point Music</span>
        </div>
      </div>

      {/* Engraved wordmark, oversized, tone-on-tone, the descenders cropped by
          the footer's bottom edge. Set in the body black weight. */}
      <span
        aria-hidden
        className="text-engrave pointer-events-none absolute inset-x-0 bottom-0 z-0 block translate-y-[8%] select-none whitespace-nowrap text-center text-[17vw] font-black leading-[0.74] tracking-[-0.05em] sm:translate-y-[20%] sm:text-[15.5vw]"
      >
        nopointmusic
      </span>
    </footer>
  );
}
