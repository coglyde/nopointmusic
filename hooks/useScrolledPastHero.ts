"use client";

import { useEffect, useState } from "react";

// True once the user has scrolled below the full-viewport hero video, used to
// switch the header from clean/transparent to frosted. Threshold accounts for
// the fixed header's height so the frost kicks in as the video leaves view.
export function useScrolledPastHero() {
  const [past, setPast] = useState(false);

  useEffect(() => {
    const check = () => setPast(window.scrollY > window.innerHeight - 130);

    const frame = window.requestAnimationFrame(check); // initial, post-mount
    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
    };
  }, []);

  return past;
}
