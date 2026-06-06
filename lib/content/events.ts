// Event shape for the /events page. Rows are synced from Eventbrite at request
// time (see lib/events.ts). Optional copy tweaks live in event-overrides.ts.

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
