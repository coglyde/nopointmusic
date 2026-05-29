import type { ReactNode } from "react";
import { SiteHeader } from "@/components/site/SiteHeader";
import { PageIntro } from "./PageIntro";
import { SiteFooter } from "@/components/site/SiteFooter";

type Props = {
  index: string;
  kicker: string;
  title: string;
  lede?: string;
  children: ReactNode;
};

// The cream-theme layout every interior page composes: sticky header, indexed
// masthead, the page's own body, then the shared footer. Keeps each page file
// down to its content - the chrome lives here.
export function PageShell({ index, kicker, title, lede, children }: Props) {
  return (
    <div className="flex min-h-dvh flex-col bg-cream">
      <SiteHeader variant="page" />
      <main className="flex-1">
        <PageIntro index={index} kicker={kicker} title={title} lede={lede} />
        <div className="mx-auto max-w-6xl px-6 sm:px-10">{children}</div>
      </main>
      <SiteFooter />
    </div>
  );
}
