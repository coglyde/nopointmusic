"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";

// The home statement, sized like a headline and revealed word-by-word as you
// scroll through it - each word warms from dim to full as the reading edge
// passes. Replaces the old small paragraph that floated in the void.
const STATEMENT =
  "People show up to post a story, not to feel the moment. No Point Music exists for those who still want to be present - spaces where the energy is real and the music does the talking. Every night we build comes down to one thing: human connection.";

// How many words the bright-to-dim gradient spans as it sweeps the paragraph.
const SOFT = 8;

export function ManifestoReveal() {
  const { ref, progress } = useScrollReveal<HTMLDivElement>();
  const words = STATEMENT.split(" ");
  const n = words.length;

  return (
    <section className="flex min-h-[85svh] items-center px-6 py-[18vh] sm:px-10">
      <div ref={ref} className="mx-auto max-w-4xl">
        <p className="text-2xl font-medium leading-[1.35] tracking-[-0.01em] text-ink sm:text-4xl sm:leading-[1.3] lg:text-[2.9rem]">
          {words.map((word, i) => {
            const lit = Math.min(
              1,
              Math.max(0, (progress * (n + SOFT) - i) / SOFT),
            );
            return (
              <span
                key={`${word}-${i}`}
                style={{ opacity: 0.16 + 0.84 * lit }}
                className="transition-opacity duration-100 ease-out"
              >
                {word}{" "}
              </span>
            );
          })}
        </p>
      </div>
    </section>
  );
}
