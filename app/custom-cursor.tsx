"use client";

import { useEffect, useRef } from "react";

const DESKTOP_POINTER_QUERY = "(hover: hover) and (pointer: fine)";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLSpanElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const label = labelRef.current;
    if (!cursor || !label) {
      return;
    }

    const mediaQuery = window.matchMedia(DESKTOP_POINTER_QUERY);
    const root = document.documentElement;
    const body = document.body;
    const previousRootCursor = root.style.cursor;
    const previousBodyCursor = body.style.cursor;

    function setMode(mode: "dot" | "tooltip", nextLabel = "") {
      cursor.dataset.mode = mode;
      label.textContent = nextLabel;
    }

    function applyPointerMode(isEnabled: boolean) {
      root.toggleAttribute("data-custom-cursor", isEnabled);
      root.style.cursor = isEnabled ? "none" : previousRootCursor;
      body.style.cursor = isEnabled ? "none" : previousBodyCursor;

      if (!isEnabled) {
        cursor.dataset.visible = "false";
        setMode("dot");
      }
    }

    function updatePosition(event: PointerEvent) {
      if (!mediaQuery.matches) {
        return;
      }

      cursor.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;
      cursor.dataset.visible = "true";

      const target = event.target instanceof Element ? event.target : null;
      const hoverTarget = target?.closest<HTMLElement>("[data-cursor-label]");
      const nextLabel = hoverTarget?.dataset.cursorLabel?.trim();

      if (nextLabel) {
        setMode("tooltip", nextLabel);
        return;
      }

      setMode("dot");
    }

    function hideCursor() {
      cursor.dataset.visible = "false";
      setMode("dot");
    }

    applyPointerMode(mediaQuery.matches);

    window.addEventListener("pointermove", updatePosition, { passive: true });
    window.addEventListener("pointerdown", updatePosition, { passive: true });
    window.addEventListener("blur", hideCursor);
    document.addEventListener("mouseleave", hideCursor);

    const handleChange = (event: MediaQueryListEvent) => {
      applyPointerMode(event.matches);
    };

    mediaQuery.addEventListener("change", handleChange);

    return () => {
      root.removeAttribute("data-custom-cursor");
      root.style.cursor = previousRootCursor;
      body.style.cursor = previousBodyCursor;
      window.removeEventListener("pointermove", updatePosition);
      window.removeEventListener("pointerdown", updatePosition);
      window.removeEventListener("blur", hideCursor);
      document.removeEventListener("mouseleave", hideCursor);
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  return (
    <span
      aria-hidden="true"
      ref={cursorRef}
      className="portfolio-cursor"
      data-visible="false"
      data-mode="dot"
    >
      <span className="portfolio-cursor__inner">
        <span ref={labelRef} className="portfolio-cursor__label" />
      </span>
    </span>
  );
}
