"use client";

import { useState } from "react";
import { VideoLightbox } from "@/components/video/VideoLightbox";
import type { Video } from "@/lib/content/youtube";
import { RADIO_SHOWS } from "@/lib/content/radio";
import { RadioFeature } from "./RadioFeature";
import { RadioRow } from "./RadioRow";

// The broadcast archive. The newest show gets the feature stage; the rest fall
// into a hairline-divided list. Owns the lightbox so any show plays in place.
export function RadioShows() {
  const [open, setOpen] = useState<Video | null>(null);
  const [latest, ...rest] = RADIO_SHOWS;

  return (
    <div className="mt-16 pb-8">
      {latest ? <RadioFeature show={latest} onPlay={setOpen} /> : null}

      {rest.length > 0 ? (
        <div className="mt-20">
          <div className="mb-2 flex items-baseline gap-3 border-b border-ink/15 pb-4 font-mono text-[0.7rem] uppercase tracking-[0.3em] text-ink-soft">
            <span className="text-accent">↓</span>
            <span>The archive</span>
          </div>
          <div className="divide-y divide-ink/10">
            {rest.map((show) => (
              <RadioRow key={show.id} show={show} onPlay={setOpen} />
            ))}
          </div>
        </div>
      ) : null}

      <VideoLightbox
        video={
          open
            ? { id: open.id, title: open.artist, sub: open.title }
            : null
        }
        onClose={() => setOpen(null)}
      />
    </div>
  );
}
