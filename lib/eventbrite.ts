// Eventbrite Platform API v3 — server-only. Requires EVENTBRITE_PRIVATE_TOKEN.
// Docs: https://www.eventbrite.com/platform/api

const API = "https://www.eventbriteapi.com/v3";

export const EVENTBRITE_ORGANIZER_ID = "75064910763";

type EbText = { text: string; html?: string };

type EbVenue = {
  name?: string;
  address?: {
    city?: string;
    localized_area_display?: string;
  };
};

type EbLogo = {
  url?: string;
  original?: { url?: string };
};

export type EbEvent = {
  id: string;
  name: EbText;
  description?: EbText;
  url: string;
  start: { local: string; timezone: string };
  venue?: EbVenue;
  logo?: EbLogo;
  status: string;
};

type EbListResponse = {
  events: EbEvent[];
  pagination: {
    has_more_items: boolean;
    page_number: number;
  };
};

function token(): string | undefined {
  return process.env.EVENTBRITE_PRIVATE_TOKEN;
}

function stripHtml(html: string): string {
  return html
    .replace(/<br\s*\/?>/gi, " ")
    .replace(/<\/p>/gi, " ")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, " ")
    .trim();
}

function slugFromUrl(url: string, id: string): string {
  const match = url.match(/eventbrite\.com\/e\/([^/?]+)/i);
  if (match) {
    return match[1]
      .replace(/-tickets-\d+$/, "")
      .replace(/-tickets$/, "")
      .toLowerCase();
  }
  return `eb-${id}`;
}

// 390 Industrial Ave and similar addresses all read as Platform 9 on the site.
function normalizeVenue(raw?: string): string {
  if (!raw) return "TBD";
  const lower = raw.toLowerCase();
  if (
    lower.includes("390 industrial") ||
    lower.includes("industrial ave") ||
    lower.includes("platform 9") ||
    lower.includes("platform9")
  ) {
    return "Platform 9";
  }
  if (lower.includes("commercial dr")) return "Village Studios";
  if (lower === "vancouver" || lower === "tbd") return "Vancouver";
  return raw;
}

export function mapEventbriteEvent(event: EbEvent) {
  const description = event.description?.text
    ? stripHtml(event.description.text)
    : "";

  const imageUrl =
    event.logo?.original?.url ?? event.logo?.url ?? undefined;

  return {
    eventbriteId: event.id,
    slug: slugFromUrl(event.url, event.id),
    title: event.name.text.trim(),
    date: event.start.local.slice(0, 10),
    venue: normalizeVenue(event.venue?.name),
    city: event.venue?.address?.city ?? "Vancouver",
    lineup: ["No Point Crew"] as const,
    description:
      description ||
      "A No Point night in Vancouver. Tickets and details on Eventbrite.",
    ticket: event.url,
    imageUrl,
  };
}

async function fetchPage(
  organizerId: string,
  page: number,
  auth: string,
): Promise<EbListResponse> {
  const params = new URLSearchParams({
    expand: "venue,logo",
    // Past nights need status=all; the default/live filter returns nothing
    // once every listing has ended.
    status: "all",
    "start_date.range_start": "2010-01-01T00:00:00",
    page: String(page),
  });

  const res = await fetch(
    `${API}/organizers/${organizerId}/events/?${params}`,
    {
      headers: { Authorization: `Bearer ${auth}` },
      next: { revalidate: 3600 },
    },
  );

  if (!res.ok) {
    const body = await res.text();
    throw new Error(
      `Eventbrite API ${res.status}: ${body.slice(0, 200)}`,
    );
  }

  return res.json() as Promise<EbListResponse>;
}

export async function fetchOrganizerEvents(
  organizerId = process.env.EVENTBRITE_ORGANIZER_ID ?? EVENTBRITE_ORGANIZER_ID,
): Promise<EbEvent[]> {
  const auth = token();
  if (!auth) return [];

  const all: EbEvent[] = [];
  let page = 1;
  let hasMore = true;

  while (hasMore) {
    const data = await fetchPage(organizerId, page, auth);
    all.push(...data.events);
    hasMore = data.pagination.has_more_items;
    page += 1;
    if (page > 20) break;
  }

  return all;
}
