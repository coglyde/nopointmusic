import type { NpEvent } from "@/lib/content/events";
import { PastNights } from "./PastNights";
import { UpcomingFeature } from "./UpcomingFeature";

type Props = {
  events: NpEvent[];
};

export function EventsPageContent({ events }: Props) {
  return (
    <>
      <UpcomingFeature events={events} />
      <PastNights events={events} />
    </>
  );
}
