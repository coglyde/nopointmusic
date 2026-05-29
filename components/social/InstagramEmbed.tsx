"use client";

import { useInstagramEmbed } from "@/hooks/useInstagramEmbed";

type Props = {
  permalinks: readonly string[];
};

// Renders one or more public Instagram posts using the official embed markup.
// Instagram's embed.js (loaded by the hook) swaps each blockquote for the live
// post. Render-only beyond that, content and styling are Instagram's iframe.
export function InstagramEmbed({ permalinks }: Props) {
  useInstagramEmbed(permalinks.length);

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {permalinks.map((url) => (
        <blockquote
          key={url}
          className="instagram-media mx-auto w-full"
          data-instgrm-permalink={url}
          data-instgrm-version="14"
          style={{ background: "transparent", margin: 0, minWidth: 0 }}
        />
      ))}
    </div>
  );
}
