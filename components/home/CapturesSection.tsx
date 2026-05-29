"use client";

import { useState } from "react";
import { PolaroidShuffle, type PolaroidItem } from "@/components/gallery/PolaroidShuffle";
import { VideoLightbox } from "@/components/video/VideoLightbox";
import { CAPTURES } from "@/lib/content/youtube";

// Build polaroids from the real captures: caption is the place, meta the year.
const ITEMS: PolaroidItem[] = CAPTURES.map((v) => ({
  id: v.id,
  caption: v.venue ?? v.title,
  meta: `'${v.date.slice(2, 4)}`,
}));

// Home "from the floor" section: an editorial split, words on the left, a
// draggable pile of instant-prints on the right. Tap a print and the actual set
// plays in a lightbox. This is the playful, tactile centerpiece; the rest of
// the home stays quiet around it.
export function CapturesSection() {
  const [open, setOpen] = useState<PolaroidItem | null>(null);
  const openVideo = CAPTURES.find((v) => v.id === open?.id);

  return (
    <section className="mx-auto max-w-6xl px-6 py-28 sm:px-10">
      <div className="grid grid-cols-1 items-center gap-14 sm:grid-cols-2">
        <div>
          <div className="flex items-center gap-3 font-mono text-[0.7rem] uppercase tracking-[0.3em] text-ink-soft">
            <span className="text-accent">→</span>
            <span>From the floor</span>
          </div>

          <h2 className="mt-5 text-4xl font-black uppercase leading-[1.02] tracking-[-0.02em] text-ink sm:text-5xl">
            Nights,
            <br />
            in hand.
          </h2>

          <p className="mt-6 max-w-md text-base leading-relaxed text-ink-soft">
            Platform 9, Village Studios, Prospect Point, a New Year&apos;s set
            that ran long. Shuffle the stack. Tap a print to play the night
            back, recorded live and in full.
          </p>

          <p className="mt-6 font-mono text-[0.65rem] uppercase tracking-[0.2em] text-ink-soft/70">
            {ITEMS.length} captures · vancouver
          </p>
        </div>

        <div className="flex justify-center sm:justify-end">
          <PolaroidShuffle items={ITEMS} onOpen={setOpen} />
        </div>
      </div>

      <VideoLightbox
        video={
          openVideo
            ? {
                id: openVideo.id,
                title: `${openVideo.venue ?? openVideo.title}`,
                sub: openVideo.artist,
              }
            : null
        }
        onClose={() => setOpen(null)}
      />
    </section>
  );
}
