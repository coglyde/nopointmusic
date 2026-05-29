// Real No Point Music video catalogue, pulled from youtube.com/@NoPointMusic.
// Two are radio shows; the rest are full sets and recaps from real nights
// (Platform9, Village Studios, Prospect Point, NYE). Titles are cleaned for
// display; `id` is the real YouTube id, so thumbnails and embeds are live.

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
    id: "ayfYfOOaNXw",
    title: "No Point Radio",
    artist: "Mr. Stee",
    kind: "radio",
    date: "2026-05-19",
    presentedBy: "Parallel 49",
  },
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
    id: "k9EMATKtFxM",
    title: "No Point Radio Series",
    artist: "Sotto Voce",
    kind: "radio",
    date: "2024-05-14",
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

// Radio broadcasts only, newest first.
export const RADIO_SHOWS: readonly Video[] = VIDEOS.filter(
  (v) => v.kind === "radio",
).sort((a, b) => b.date.localeCompare(a.date));

// Sets and recaps captured at events, newest first. These feed the home
// "captures" shuffle and the events B-side.
export const CAPTURES: readonly Video[] = VIDEOS.filter(
  (v) => v.kind !== "radio",
).sort((a, b) => b.date.localeCompare(a.date));
