"use client";

import { useEffect } from "react";
import { X } from "lucide-react";
import { youtubeEmbed } from "@/lib/youtube";

type Props = {
  // The open video's id + label, or null when closed.
  video: { id: string; title: string; sub?: string } | null;
  onClose: () => void;
};

// A focused player overlay: dim the room, drop the set into a cream-framed 16:9
// stage, autoplay. Closes on backdrop click, the X, or Escape. Locks scroll
// while open. Render-only beyond that - playback is YouTube's iframe.
export function VideoLightbox({ video, onClose }: Props) {
  useEffect(() => {
    if (!video) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [video, onClose]);

  if (!video) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={video.title}
      onClick={onClose}
      className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/85 px-4 py-10 backdrop-blur-sm"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-4xl"
      >
        <div className="mb-3 flex items-end justify-between gap-4">
          <div className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-cream">
            <span className="text-accent">▶</span> {video.title}
            {video.sub ? (
              <span className="ml-2 text-cream/60">{video.sub}</span>
            ) : null}
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="inline-flex items-center gap-1.5 font-mono text-[0.65rem] uppercase tracking-[0.2em] text-cream/70 transition-colors hover:text-accent"
          >
            Close <X className="h-4 w-4" strokeWidth={2} />
          </button>
        </div>

        <div className="relative aspect-video w-full overflow-hidden bg-black ring-1 ring-cream/15">
          <iframe
            src={youtubeEmbed(video.id)}
            title={video.title}
            allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
            allowFullScreen
            className="absolute inset-0 h-full w-full"
          />
        </div>
      </div>
    </div>
  );
}
