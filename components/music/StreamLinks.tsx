import { OutboundLink } from "@/components/ui/OutboundLink";
import type { Release } from "@/lib/content/releases";

type Props = {
  links: Release["links"];
};

// Renders a release's streaming homes as a row of restrained outbound links.
// Order is fixed so the list reads consistently regardless of object key order.
const ORDER = ["Spotify", "Apple Music", "Bandcamp", "SoundCloud"] as const;

export function StreamLinks({ links }: Props) {
  const present = ORDER.filter((service) => links[service]);

  if (present.length === 0) {
    return (
      <span className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-ink-soft/60">
        Streaming soon
      </span>
    );
  }

  return (
    <div className="flex flex-wrap gap-x-6 gap-y-2">
      {present.map((service) => (
        <OutboundLink key={service} href={links[service]!}>
          {service}
        </OutboundLink>
      ))}
    </div>
  );
}
