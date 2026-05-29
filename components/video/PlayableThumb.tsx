"use client";

import { Play } from "lucide-react";
import { youtubeThumb, youtubeThumbHd } from "@/lib/youtube";

type Props = {
  id: string;
  alt: string;
  onPlay: () => void;
  // Show a larger play button for feature placements.
  feature?: boolean;
};

// A 16:9 YouTube still with a play affordance. Tries the hi-res thumb, falls
// back to hqdefault if it 404s. Clicking calls onPlay (the parent opens the
// lightbox). The image is cover-cropped so 4:3 fallbacks lose their bars.
export function PlayableThumb({ id, alt, onPlay, feature = false }: Props) {
  return (
    <button
      type="button"
      onClick={onPlay}
      aria-label={`Play ${alt}`}
      className="group relative block aspect-video w-full overflow-hidden bg-ink"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={youtubeThumbHd(id)}
        alt={alt}
        loading="lazy"
        onError={(e) => {
          const img = e.currentTarget;
          if (img.src.includes("maxres")) img.src = youtubeThumb(id);
        }}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
      />
      <span className="absolute inset-0 bg-ink/10 transition-colors duration-300 group-hover:bg-ink/0" />

      <span
        className={`absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-cream/95 text-ink transition-transform duration-300 group-hover:scale-110 ${
          feature ? "h-16 w-16" : "h-12 w-12"
        }`}
      >
        <Play
          className={feature ? "h-6 w-6" : "h-4 w-4"}
          strokeWidth={2}
          fill="currentColor"
        />
      </span>
    </button>
  );
}
