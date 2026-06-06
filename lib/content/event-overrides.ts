import type { NpEvent } from "@/lib/content/events";

// Optional copy tweaks keyed by Eventbrite event id. Title, date, venue, image,
// and ticket link all come from the API automatically.
export const EVENT_OVERRIDES: Record<
  string,
  Partial<Pick<NpEvent, "lineup" | "description" | "venue">>
> = {
  "1090217954249": {
    description: "The one people still bring up.",
  },
};
