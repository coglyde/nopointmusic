"use client";

import { useState } from "react";
import { VideoLightbox } from "@/components/video/VideoLightbox";
import { EVENTS, type NpEvent } from "@/lib/content/events";
import { isUpcoming } from "@/lib/format";
import { PastNightCard } from "./PastNightCard";

// B-side: the archive. Past nights, most recent first, as a grid of captured
// stills. Clicking a still plays that set/recap in the lightbox without leaving
// the page. Owns the lightbox state for the whole archive.
export function PastNights() {
  const [open, setOpen] = useState<NpEvent | null>(null);

  const past = EVENTS.filter((e) => !isUpcoming(e.date)).sort((a, b) =>
    b.date.localeCompare(a.date),
  );

  return (
    <section className="mt-24">
      <div className="mb-10 flex items-baseline gap-3 border-b border-ink/15 pb-4 font-mono text-[0.7rem] uppercase tracking-[0.3em] text-ink-soft">
        <span className="text-accent">B-side</span>
        <span>Past</span>
        <span className="ml-auto tabular-nums text-ink-soft/60">
          {String(past.length).padStart(2, "0")}
        </span>
      </div>

      <div className="grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
        {past.map((event) => (
          <PastNightCard key={event.slug} event={event} onPlay={setOpen} />
        ))}
      </div>

      <VideoLightbox
        video={
          open?.videoId
            ? { id: open.videoId, title: open.title, sub: open.lineup.join(" · ") }
            : null
        }
        onClose={() => setOpen(null)}
      />
    </section>
  );
}
