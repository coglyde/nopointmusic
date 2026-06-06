import type { NpEvent } from "@/lib/content/events";
import { EVENT_OVERRIDES } from "@/lib/content/event-overrides";
import {
  EVENTBRITE_ORGANIZER_ID,
  fetchOrganizerEvents,
  mapEventbriteEvent,
} from "@/lib/eventbrite";

function applyOverrides(event: NpEvent): NpEvent {
  const id = event.eventbriteId;
  if (!id) return event;
  const patch = EVENT_OVERRIDES[id];
  if (!patch) return event;
  return { ...event, ...patch };
}

// Pulls every live + past night from Eventbrite, merges optional copy overrides,
// and returns newest-first. Without EVENTBRITE_PRIVATE_TOKEN the
// list is empty and the page shows the quiet empty states.
export async function getEvents(): Promise<NpEvent[]> {
  try {
    const raw = await fetchOrganizerEvents(
      process.env.EVENTBRITE_ORGANIZER_ID ?? EVENTBRITE_ORGANIZER_ID,
    );

    return raw
      .map((eb) => applyOverrides(mapEventbriteEvent(eb) as NpEvent))
      .sort((a, b) => b.date.localeCompare(a.date));
  } catch (err) {
    console.error("[events] Eventbrite sync failed:", err);
    return [];
  }
}
