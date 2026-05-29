import Link from "next/link";
import { SpinningVinyl } from "@/components/site/SpinningVinyl";
import { ESTABLISHED, LOCATION } from "@/lib/social";

// Interior top bar shared by every section page. Mirrors the home SiteHeader
// rhythm (wordmark left · vinyl center · stamp right) but in the cream theme:
// the back-link returns to the deck, and the small vinyl keeps the turntable
// metaphor present even off the home page. Sticky, with a faint hairline.
export function PageHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-ink/10 bg-cream/85 backdrop-blur-md">
      <div className="mx-auto grid max-w-6xl grid-cols-2 items-center gap-4 px-6 py-4 sm:grid-cols-3 sm:px-10">
        <Link
          href="/"
          className="group inline-flex items-center gap-2 justify-self-start font-mono text-[0.65rem] uppercase tracking-[0.25em] text-ink-soft transition-colors hover:text-ink"
        >
          <span className="transition-transform duration-200 group-hover:-translate-x-0.5">
            ←
          </span>
          the deck
        </Link>

        <Link
          href="/"
          aria-label="nopointmusic - home"
          className="hidden justify-self-center sm:block"
        >
          <SpinningVinyl size={44} />
        </Link>

        <p className="justify-self-end text-right font-mono text-[0.6rem] uppercase leading-relaxed tracking-[0.25em] text-ink-soft">
          {LOCATION}
          <br />
          {ESTABLISHED}
        </p>
      </div>
    </header>
  );
}
