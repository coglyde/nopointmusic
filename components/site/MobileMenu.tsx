"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { X } from "lucide-react";
import { NAV_ITEMS } from "@/lib/nav";
import { SOCIALS } from "@/lib/social";
import { BRAND_ICONS, PRIMARY_SOCIALS } from "@/components/social/brandIcons";
import { useScrollSpin } from "@/hooks/useScrollSpin";
import { useTheme } from "@/hooks/useTheme";

// Degrees the record spins each time it is tapped (1.5 turns), always forward.
const SPIN_STEP = 540;

// Mobile-only navigation where the centered vinyl IS the trigger: tapping it
// spins the record and rises the full-screen drawer up from below in sync, so
// the spin reads as winding the menu open. Desktop never renders this (the
// header shows the decorative scroll-spun vinyl instead).
export function MobileMenu({ size = 80 }: { size?: number }) {
  const [open, setOpen] = useState(false);
  const [spin, setSpin] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  useScrollSpin(scrollRef);
  const { theme, toggle } = useTheme();

  const toggleOpen = () => {
    setOpen((o) => !o);
    setSpin((s) => s + SPIN_STEP);
  };
  const close = () => {
    setOpen(false);
    setSpin((s) => s + SPIN_STEP);
  };

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <>
      {/* The record is the hamburger. Spins on each tap. */}
      <button
        type="button"
        onClick={toggleOpen}
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        className="relative z-[80] block select-none"
        style={{ width: size, height: size }}
      >
        {/* Outer layer rotates with page scroll; the inner image adds the
            tap spin, so the two compose. */}
        <div ref={scrollRef} className="relative h-full w-full will-change-transform">
          <Image
            src="/deck/vinyl.png"
            alt=""
            aria-hidden
            fill
            sizes={`${size}px`}
            draggable={false}
            className="[transition:transform_800ms_cubic-bezier(0.22,1,0.36,1)] motion-reduce:[transition:none]"
            style={{ transform: `rotate(${spin}deg)` }}
          />
        </div>
      </button>

      {/* Drawer rises from below as the record spins. Stays mounted so it can
          slide; parked off-screen and inert when closed. */}
      <div
        aria-hidden={!open}
        className={`fixed inset-0 z-[70] flex flex-col bg-cream px-6 py-5 text-ink transition-transform duration-[650ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
          open ? "translate-y-0" : "pointer-events-none translate-y-full"
        }`}
      >
        {/* X sits top-left, in a row as tall as the vinyl so it centers on the
            floating trigger vinyl (top-right), which also closes the drawer. */}
        <div className="flex items-center" style={{ minHeight: size }}>
          <button
            type="button"
            onClick={close}
            aria-label="Close menu"
            className="-ml-1 p-1 text-ink transition-opacity hover:opacity-70"
          >
            <X className="h-7 w-7" strokeWidth={1.75} />
          </button>
        </div>

        <nav className="flex flex-1 flex-col justify-center gap-1">
          <Link
            href="/"
            onClick={close}
            className="text-4xl font-black uppercase tracking-[-0.02em] text-ink transition-colors hover:text-accent"
          >
            Home
          </Link>
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={close}
              className="text-4xl font-black uppercase tracking-[-0.02em] text-ink transition-colors hover:text-accent"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center justify-between border-t border-ink/15 pt-5">
          <button
            type="button"
            onClick={toggle}
            aria-label="Switch theme"
            className="font-mono text-[0.65rem] uppercase tracking-[0.3em] text-ink-soft"
          >
            <span className="opacity-60">[ </span>
            <span className={theme === "light" ? "text-ink" : ""}>light</span>
            <span className="opacity-60"> · </span>
            <span className={theme === "dark" ? "text-ink" : ""}>dark</span>
            <span className="opacity-60"> ]</span>
          </button>

          <div className="flex items-center gap-5">
            {PRIMARY_SOCIALS.map((label) => {
              const social = SOCIALS.find((s) => s.label === label);
              if (!social) return null;
              return (
                <a
                  key={label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="block h-[18px] w-[18px] text-ink-soft transition-colors hover:text-ink"
                >
                  {BRAND_ICONS[label]}
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
