"use client";

import { useEffect, useRef, useState, type RefObject } from "react";

type Particle = {
  id: number;
  x: number;
  y: number;
  src: string;
  rotate: number;
  exiting: boolean;
};

type Props = {
  trackRef: RefObject<HTMLElement | null>;
  items: readonly string[];
  maxParticles?: number;
  spawnDistance?: number;
  size?: number; // px
};

const EXIT_MS = 280;

const isVideo = (src: string) => /\.(mp4|webm|mov|m4v)$/i.test(src);

export function VideoTrail({
  trackRef,
  items,
  maxParticles = 3,
  spawnDistance = 60,
  size = 176,
}: Props) {
  const [particles, setParticles] = useState<Particle[]>([]);
  const idRef = useRef(0);
  const overRef = useRef(false);

  useEffect(() => {
    const target = trackRef.current;
    if (!target || items.length === 0) return;
    let lastX = -9999;
    let lastY = -9999;

    const markExiting = (id: number) => {
      setParticles((curr) =>
        curr.map((c) => (c.id === id ? { ...c, exiting: true } : c)),
      );
      window.setTimeout(() => {
        setParticles((curr) => curr.filter((c) => c.id !== id));
      }, EXIT_MS);
    };

    const onEnter = () => {
      overRef.current = true;
    };
    const onLeave = () => {
      overRef.current = false;
      setParticles((curr) => {
        curr
          .filter((p) => !p.exiting)
          .forEach((p) => window.setTimeout(() => markExiting(p.id), 0));
        return curr;
      });
    };

    const onMove = (e: MouseEvent) => {
      if (!overRef.current) return;
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      if (Math.hypot(dx, dy) < spawnDistance) return;
      lastX = e.clientX;
      lastY = e.clientY;

      const id = ++idRef.current;
      const src = items[id % items.length];
      const rotate = (Math.random() - 0.5) * 16;
      const next: Particle = {
        id,
        x: e.clientX,
        y: e.clientY,
        src,
        rotate,
        exiting: false,
      };

      setParticles((prev) => {
        const alive = prev.filter((p) => !p.exiting);
        if (alive.length >= maxParticles) {
          const oldestId = alive[0].id;
          window.setTimeout(() => markExiting(oldestId), 0);
        }
        return [...prev, next];
      });
    };

    target.addEventListener("mouseenter", onEnter);
    target.addEventListener("mouseleave", onLeave);
    window.addEventListener("mousemove", onMove);
    return () => {
      target.removeEventListener("mouseenter", onEnter);
      target.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("mousemove", onMove);
    };
  }, [trackRef, items, maxParticles, spawnDistance]);

  if (items.length === 0) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-40 overflow-hidden"
    >
      {particles.map((p) => (
        <TrailParticle key={p.id} particle={p} size={size} />
      ))}
    </div>
  );
}

function TrailParticle({
  particle,
  size,
}: {
  particle: Particle;
  size: number;
}) {
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    const raf = window.requestAnimationFrame(() => setEntered(true));
    return () => window.cancelAnimationFrame(raf);
  }, []);

  const visible = entered && !particle.exiting;
  const scale = particle.exiting ? 0.65 : visible ? 1 : 0.5;
  const opacity = visible ? 1 : 0;
  const isVid = isVideo(particle.src);

  return (
    <span
      style={{
        position: "absolute",
        left: particle.x,
        top: particle.y,
        width: size,
        height: size,
        transform: `translate(-50%, -50%) rotate(${particle.rotate}deg) scale(${scale})`,
        opacity,
        transition:
          "opacity 280ms ease, transform 280ms cubic-bezier(0.22, 0.61, 0.36, 1)",
        willChange: "transform, opacity",
      }}
    >
      {isVid ? (
        <video
          src={particle.src}
          autoPlay
          loop
          muted
          playsInline
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            borderRadius: 8,
            boxShadow: "0 8px 24px rgba(24,20,16,0.25)",
          }}
        />
      ) : (
        <span
          className="animate-[spin_8s_linear_infinite]"
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url(${particle.src})`,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            filter: "drop-shadow(0 6px 14px rgba(24,20,16,0.22))",
          }}
        />
      )}
    </span>
  );
}
