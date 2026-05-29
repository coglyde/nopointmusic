import { ArrowUpRight } from "lucide-react";

type Props = {
  href: string;
  children: React.ReactNode;
  className?: string;
};

// A restrained outbound link: mono label, hairline rule, and a small NE arrow
// that nudges on hover. Used everywhere the site points off-site (streaming,
// tickets, stores). Brand red is reserved, this stays ink until hovered.
export function OutboundLink({ href, children, className = "" }: Props) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={`group inline-flex items-center gap-1.5 font-mono text-[0.7rem] uppercase tracking-[0.18em] text-ink-soft transition-colors hover:text-accent ${className}`}
    >
      <span className="border-b border-ink-soft/40 pb-0.5 transition-colors group-hover:border-accent">
        {children}
      </span>
      <ArrowUpRight
        className="h-3 w-3 shrink-0 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
        strokeWidth={2}
      />
    </a>
  );
}
