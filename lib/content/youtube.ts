// Real No Point Music video catalogue, pulled from youtube.com/@NoPointMusic.
// Full sets and recaps from real nights (Platform9, Village Studios, Prospect
// Point, NYE). Radio shows live in content/radio.json (dashboard-editable).
// Titles are cleaned for display; `id` is the real YouTube id, so thumbnails and
// embeds are live.

export type VideoKind = "radio" | "set" | "recap";

export type Video = {
  id: string; // real YouTube video id
  title: string;
  artist: string;
  kind: VideoKind;
  // ISO date of the night / broadcast.
  date: string;
  venue?: string;
  presentedBy?: string;
};

export const VIDEOS: readonly Video[] = [
  {
    id: "Hc_d9FSEz1g",
    title: "NYE 2026",
    artist: "Gentt b2b Cenk Saraç",
    kind: "set",
    date: "2025-12-31",
    venue: "Platform 9",
  },
  {
    id: "h-_5cVb5aSg",
    title: "Platform 9",
    artist: "Gentt b2b Cenk Saraç",
    kind: "set",
    date: "2025-09-13",
    venue: "Platform 9",
  },
  {
    id: "geSk3bC3n7s",
    title: "A Night to Remember",
    artist: "No Point Crew",
    kind: "recap",
    date: "2024-11-23",
    venue: "Platform 9",
  },
  {
    id: "dM7dzkOUq9U",
    title: "Village Studios",
    artist: "No Point Crew",
    kind: "recap",
    date: "2024-10-19",
    venue: "Village Studios",
  },
  {
    id: "29xKO4qgh_U",
    title: "Prospect Point",
    artist: "No Point Crew",
    kind: "recap",
    date: "2024-05-01",
    venue: "Prospect Point",
  },
];

// Full sets for the home polaroid shuffle. Add a video with kind: "set" to
// VIDEOS above and it appears here automatically, newest first.
export const CAPTURES: readonly Video[] = VIDEOS.filter(
  (v) => v.kind === "set",
).sort((a, b) => b.date.localeCompare(a.date));
