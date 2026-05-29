// Events - A-side (upcoming) and B-side (past). One flat list; the page splits
// and sorts it against the current date, so an event auto-archives simply by
// its date passing.
//
// Past nights are REAL - Platform9, Village Studios, Prospect Point, NYE - // each linked to its captured set/recap on YouTube via `videoId`. The upcoming
// entry is a sample placeholder (the label swaps in real dates + ticket links).

export type NpEvent = {
  slug: string;
  title: string;
  // ISO date of the night.
  date: string;
  venue: string;
  city: string;
  lineup: readonly string[];
  description: string;
  // Outbound ticketing - Eventbrite / RA / etc. Upcoming only.
  ticket?: string;
  // Real captured set/recap on YouTube (past nights).
  videoId?: string;
};

export const EVENTS: readonly NpEvent[] = [
  // -- Upcoming (sample placeholder) ------------------------------
  {
    slug: "summer-session",
    title: "Summer Session",
    date: "2026-07-18",
    venue: "Platform 9",
    city: "Vancouver",
    lineup: ["Gentt", "Cenk Saraç", "Mr. Stee"],
    description:
      "One room, one system, doors at ten. No headliner billing - the music does the talking. Capacity is the room, and when it's gone it's gone.",
    ticket: "https://www.eventbrite.com/o/no-point-music-75064910763",
  },

  // -- Past (real nights, real captures) --------------------------
  {
    slug: "nye-2026",
    title: "NYE 2026",
    date: "2025-12-31",
    venue: "Platform 9",
    city: "Vancouver",
    lineup: ["Gentt b2b Cenk Saraç"],
    description:
      "New Year's. A back-to-back that ran long past midnight and never lost the room.",
    videoId: "Hc_d9FSEz1g",
  },
  {
    slug: "platform9-sep25",
    title: "Platform 9",
    date: "2025-09-13",
    venue: "Platform 9",
    city: "Vancouver",
    lineup: ["Gentt b2b Cenk Saraç"],
    description:
      "Late-summer session under the bridge. Dub-leaning house into deep, hypnotic techno.",
    videoId: "h-_5cVb5aSg",
  },
  {
    slug: "a-night-to-remember",
    title: "A Night to Remember",
    date: "2024-11-23",
    venue: "Platform 9",
    city: "Vancouver",
    lineup: ["No Point Crew"],
    description: "The one people still bring up. Recap reel on the channel.",
    videoId: "geSk3bC3n7s",
  },
  {
    slug: "village-studios",
    title: "Village Studios",
    date: "2024-10-19",
    venue: "Village Studios",
    city: "Vancouver",
    lineup: ["No Point Crew"],
    description: "Studio session, unannounced IDs, cameras rolling.",
    videoId: "dM7dzkOUq9U",
  },
  {
    slug: "prospect-point",
    title: "Prospect Point",
    date: "2024-05-01",
    venue: "Prospect Point",
    city: "Vancouver",
    lineup: ["No Point Crew"],
    description: "Outdoors, overlooking the water. Where the crew first played.",
    videoId: "29xKO4qgh_U",
  },
];
