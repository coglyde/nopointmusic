import data from "@/content/radio.json";
import type { Video } from "./youtube";

// Radio broadcasts, newest first. Data lives in content/radio.json
// (dashboard-editable); this module types it and tags it as radio. The `id`
// field accepts a full YouTube link or a bare id; we extract the 11-char id so
// thumbnails and embeds always work.
type RawRadio = {
  id: string;
  title: string;
  artist: string;
  date: string;
  presentedBy?: string;
};

const ID = /[A-Za-z0-9_-]{11}/;

/** Pull the YouTube video id out of a full URL (watch / youtu.be / embed /
 *  shorts / live) or pass through a bare id. */
export function youtubeId(input: string): string {
  const s = input.trim();
  if (/^[A-Za-z0-9_-]{11}$/.test(s)) return s;
  const fromUrl =
    s.match(new RegExp(`[?&]v=(${ID.source})`)) ??
    s.match(new RegExp(`(?:youtu\\.be|/embed|/shorts|/live)/(${ID.source})`)) ??
    s.match(new RegExp(`(${ID.source})`));
  return fromUrl ? fromUrl[1] : s;
}

export const RADIO_SHOWS: readonly Video[] = (data as RawRadio[])
  .map((d) => ({ ...d, id: youtubeId(d.id), kind: "radio" as const }))
  .sort((a, b) => b.date.localeCompare(a.date));
