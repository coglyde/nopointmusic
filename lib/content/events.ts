import data from "@/content/events.json";

// Event shape for the /events page. Rows are synced from Eventbrite at request
// time and merged with the manual list below (see lib/events.ts). Optional copy
// tweaks for Eventbrite rows live in event-overrides.ts.

export type NpEvent = {
  slug: string;
  title: string;
  // ISO date of the night.
  date: string;
  venue: string;
  city: string;
  lineup: readonly string[];
  description: string;
  // Outbound ticketing, Eventbrite / RA / etc.
  ticket?: string;
  // Eventbrite listing image (flyer / cover).
  imageUrl?: string;
  // Set when sourced from Eventbrite, used for override lookups.
  eventbriteId?: string;
};

// Manually-added nights. Data lives in content/events.json (dashboard-editable);
// these merge with the Eventbrite rows on the /events page. The slug is derived
// from the title + date, so the form never has to deal with it.
type RawEvent = {
  title: string;
  date: string;
  venue: string;
  city: string;
  lineup?: string[];
  description?: string;
  ticket?: string;
  imageUrl?: string;
};

function slugify(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export const MANUAL_EVENTS: NpEvent[] = (data as RawEvent[]).map((e) => ({
  slug: slugify(`${e.title}-${e.date}`),
  title: e.title,
  date: e.date,
  venue: e.venue,
  city: e.city,
  lineup: e.lineup ?? [],
  description: e.description ?? "",
  ticket: e.ticket,
  imageUrl: e.imageUrl,
}));
