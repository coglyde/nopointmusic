"use client";

import { useState } from "react";
import Image from "next/image";
import { Play, Layers, ArrowUpRight } from "lucide-react";
import type { InstagramPost } from "@/lib/content/instagram";
import { instagramImageUrl, isReelUrl } from "@/lib/instagram";

// A single feed post as a poster tile: square crop, gentle zoom on hover, a
// darkening veil with an outbound arrow, and a corner badge for video/carousel.
// The image is a saved /feed asset (post.src) or pulled live from Instagram's
// public per-post endpoint. If that endpoint gets walled, we fall back to a
// quiet branded tile rather than a broken image. The whole tile links out.
export function PostCard({ post }: { post: InstagramPost }) {
  const [failed, setFailed] = useState(false);

  const img = post.src ?? instagramImageUrl(post.url);
  const badge = post.type ?? (isReelUrl(post.url) ? "video" : undefined);
  const showImage = Boolean(img) && !failed;

  return (
    <a
      href={post.url}
      target="_blank"
      rel="noreferrer"
      aria-label="View this post on Instagram"
      className="group relative block aspect-square overflow-hidden bg-cream-deep ring-1 ring-ink/10 transition-shadow duration-300 hover:ring-accent/60"
    >
      {showImage ? (
        <Image
          src={img as string}
          alt={post.alt ?? "No Point Music on Instagram"}
          fill
          unoptimized={!post.src}
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          onError={() => setFailed(true)}
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.06]"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center text-ink-soft">
          <ArrowUpRight className="h-6 w-6" strokeWidth={1.5} />
        </div>
      )}

      {/* Veil + glyph on hover */}
      <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-300 group-hover:bg-black/35">
        <ArrowUpRight
          className="h-8 w-8 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100 [filter:drop-shadow(0_1px_4px_rgb(0_0_0/0.6))]"
          strokeWidth={1.75}
        />
      </div>

      {/* Type badge */}
      {badge === "video" || badge === "carousel" ? (
        <span className="absolute right-2 top-2 text-white [filter:drop-shadow(0_1px_3px_rgb(0_0_0/0.7))]">
          {badge === "video" ? (
            <Play className="h-4 w-4 fill-white" />
          ) : (
            <Layers className="h-4 w-4" strokeWidth={2} />
          )}
        </span>
      ) : null}
    </a>
  );
}
