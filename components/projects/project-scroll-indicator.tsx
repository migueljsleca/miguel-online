"use client";

import { useEffect, useState } from "react";

const SEGMENT_COUNT = 28;

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export default function ProjectScrollIndicator() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;

      if (maxScroll <= 0) {
        setProgress(0);
        return;
      }

      setProgress(clamp(scrollTop / maxScroll, 0, 1));
    };

    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);

    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, []);

  const activeIndex = Math.round(progress * (SEGMENT_COUNT - 1));
  return (
    <div aria-hidden="true" className="portfolio-project-scroll">
      <div className="portfolio-project-scroll__track">
        {Array.from({ length: SEGMENT_COUNT }).map((_, index) => (
          <span
            key={index}
            className="portfolio-project-scroll__segment"
            data-filled={index <= activeIndex ? "true" : "false"}
          />
        ))}
      </div>
    </div>
  );
}
