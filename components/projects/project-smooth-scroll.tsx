"use client";

import Lenis from "lenis";
import { useEffect } from "react";

export default function ProjectSmoothScroll() {
  useEffect(() => {
    const reducedMotionQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );

    if (reducedMotionQuery.matches) {
      return;
    }

    const lenis = new Lenis({
      duration: 0.68,
      smoothWheel: true,
      wheelMultiplier: 1.04,
      touchMultiplier: 1,
      easing: (t) => 1 - Math.pow(1 - t, 3),
    });

    let frameId = 0;

    const onFrame = (time: number) => {
      lenis.raf(time);
      frameId = window.requestAnimationFrame(onFrame);
    };

    frameId = window.requestAnimationFrame(onFrame);

    return () => {
      window.cancelAnimationFrame(frameId);
      lenis.destroy();
    };
  }, []);

  return null;
}
