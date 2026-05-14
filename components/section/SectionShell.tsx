import Link from "next/link";
import type { ReactNode } from "react";

type Props = {
  title: string;
  children?: ReactNode;
};

export function SectionShell({ title, children }: Props) {
  return (
    <main className="relative min-h-dvh flex flex-col">
      <header className="flex items-start justify-between px-10 pt-8 font-mono text-[0.65rem] uppercase tracking-[0.25em] text-ink-soft">
        <Link href="/" className="hover:text-accent">
          ← nopointmusic
        </Link>
        <div className="text-right leading-relaxed">
          based in vancouver
          <br />
          est. 2017
        </div>
      </header>

      <section className="flex flex-1 flex-col items-start justify-center px-10 max-w-3xl">
        <h1 className="font-mono text-xs uppercase tracking-[0.3em] text-ink-soft mb-6">
          {title}
        </h1>
        {children ?? (
          <p className="text-ink-soft text-sm">soon.</p>
        )}
      </section>
    </main>
  );
}
