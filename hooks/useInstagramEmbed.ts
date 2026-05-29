"use client";

import { useEffect } from "react";

const SCRIPT_SRC = "https://www.instagram.com/embed.js";

type Instgrm = { Embeds?: { process: () => void } };

// Loads Instagram's official embed.js exactly once per page, then asks it to
// (re)process the blockquotes on the page. Run it whenever the set of embedded
// posts changes (pass a key that changes with the list). No-ops when there are
// no posts, so the script never loads on pages without embeds.
export function useInstagramEmbed(postCount: number) {
  useEffect(() => {
    if (postCount === 0) return;

    const process = () =>
      (window as unknown as { instgrm?: Instgrm }).instgrm?.Embeds?.process();

    const existing = document.querySelector<HTMLScriptElement>(
      `script[src="${SCRIPT_SRC}"]`,
    );

    if (existing) {
      process();
      return;
    }

    const script = document.createElement("script");
    script.src = SCRIPT_SRC;
    script.async = true;
    script.onload = process;
    document.body.appendChild(script);
  }, [postCount]);
}
