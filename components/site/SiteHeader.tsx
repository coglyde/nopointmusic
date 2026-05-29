"use client";

import Image from "next/image";
import Link from "next/link";
import { SpinningVinyl } from "@/components/site/SpinningVinyl";
import { useScrolledPastHero } from "@/hooks/useScrolledPastHero";

type Props = {
  // "hero": fixed over the home video, clear at the top then the solid bg fades
  // in on scroll. "page": sticky on interior pages, solid at all times.
  variant?: "hero" | "page";
};

// The one standard top bar used on every page: wordmark left, a large vinyl
// centered (spins as you scroll), location stamp right. Its background is the
// page background color itself (no blur), so header and page read as one
// surface. Artwork/text flip with the theme once the bar is solid (white on
// dark, black on light), and stay white while clear over the hero video.
export function SiteHeader({ variant = "hero" }: Props) {
  const scrolledPast = useScrolledPastHero();
  const solid = variant === "page" ? true : scrolledPast;
  const overVideo = !solid; // clear bar over the hero video: keep art white

  return (
    <header
      className={`${variant === "page" ? "sticky" : "fixed"} inset-x-0 top-0 z-40`}
    >
      {/* Hero only: faint scrim keeps the white art legible over the video
          before the solid background fades in. No blur. */}
      {variant === "hero" ? (
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/40 to-transparent" />
      ) : null}

      {/* Solid background = the page background color, so header and page match
          exactly. Always on for pages; fades in on the hero after scroll. */}
      <div
        className={`pointer-events-none absolute inset-0 border-b border-ink/10 bg-cream transition-opacity duration-300 ${
          solid ? "opacity-100" : "opacity-0"
        }`}
      />

      <div className="relative grid grid-cols-3 items-center px-6 py-5 sm:px-10">
        <Link
          href="/"
          aria-label="nopointmusic - home"
          className={`site-logo justify-self-start ${overVideo ? "over-video" : ""}`}
        >
          <Image
            src="/logos/text-logo-white.png"
            alt="nopointmusic"
            width={280}
            height={142}
            preload
            className="logo-dark-bg h-10 w-auto sm:h-12"
          />
          <Image
            src="/logos/text-logo-black.png"
            alt="nopointmusic"
            width={280}
            height={142}
            className="logo-light-bg h-10 w-auto sm:h-12"
          />
        </Link>

        <div className="justify-self-center">
          <SpinningVinyl size={80} />
        </div>

        <p
          className={`hidden justify-self-end text-right font-mono text-[0.65rem] uppercase leading-relaxed tracking-[0.3em] sm:block ${
            overVideo ? "text-white/70" : "text-ink-soft"
          }`}
        >
          based in vancouver
          <br />
          est. 2024
        </p>
      </div>
    </header>
  );
}
