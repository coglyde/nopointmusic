import { MANUAL_EVENTS, type NpEvent } from "@/lib/content/events";
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

// Pulls every live + past night from Eventbrite, merges the manually-added
// events and optional copy overrides, and returns newest-first. If Eventbrite is
// unavailable the manual events still show; if both are empty the page shows the
// quiet empty states.
export async function getEvents(): Promise<NpEvent[]> {
  let eventbrite: NpEvent[] = [];
  try {
    const raw = await fetchOrganizerEvents(
      process.env.EVENTBRITE_ORGANIZER_ID ?? EVENTBRITE_ORGANIZER_ID,
    );
    eventbrite = raw.map((eb) => applyOverrides(mapEventbriteEvent(eb) as NpEvent));
  } catch (err) {
    console.error("[events] Eventbrite sync failed:", err);
  }

  return [...MANUAL_EVENTS, ...eventbrite].sort((a, b) => b.date.localeCompare(a.date));
}
