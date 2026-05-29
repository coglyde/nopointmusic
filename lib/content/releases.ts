// Releases, the catalogue. Newest first; the page renders them in array order.
//
// SAMPLE DATA. The shape is real; the entries are on-brand placeholders so the
// layout can be reviewed before the label drops in actual catalogue numbers,
// cover art, and streaming URLs. Add a cover image under /public/releases/ and
// point `cover` at it; leave it undefined for the engraved-vinyl fallback.

export type StreamingService = "Spotify" | "Apple Music" | "Bandcamp" | "SoundCloud";

export type Release = {
  catalogue: string; // e.g. "NP004"
  title: string;
  artist: string;
  // ISO date, used for display and sort.
  releasedOn: string;
  format: string; // "Single" · "EP" · "VA" · "Mix"
  cover?: string; // /public path, optional
  links: Partial<Record<StreamingService, string>>;
};

export const RELEASES: readonly Release[] = [
  {
    catalogue: "NP004",
    title: "Low Tide",
    artist: "Hervé Mensa",
    releasedOn: "2026-04-18",
    format: "EP",
    links: {
      Spotify: "https://open.spotify.com/",
      "Apple Music": "https://music.apple.com/",
      SoundCloud: "https://soundcloud.com/nopointmusic",
    },
  },
  {
    catalogue: "NP003",
    title: "Concrete Garden",
    artist: "Sølja",
    releasedOn: "2026-02-07",
    format: "Single",
    links: {
      Spotify: "https://open.spotify.com/",
      Bandcamp: "https://bandcamp.com/",
      SoundCloud: "https://soundcloud.com/nopointmusic",
    },
  },
  {
    catalogue: "NP002",
    title: "No Point, Vol. I",
    artist: "Various Artists",
    releasedOn: "2025-11-21",
    format: "VA",
    links: {
      Spotify: "https://open.spotify.com/",
      "Apple Music": "https://music.apple.com/",
      Bandcamp: "https://bandcamp.com/",
    },
  },
  {
    catalogue: "NP001",
    title: "Opening Statement",
    artist: "Kaya Drift",
    releasedOn: "2025-08-30",
    format: "Single",
    links: {
      SoundCloud: "https://soundcloud.com/nopointmusic",
      Bandcamp: "https://bandcamp.com/",
    },
  },
];
