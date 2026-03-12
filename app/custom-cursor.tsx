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
    const cursorElement = cursor;
    const labelElement = label;

    const mediaQuery = window.matchMedia(DESKTOP_POINTER_QUERY);
    const root = document.documentElement;
    const body = document.body;
    const previousRootCursor = root.style.cursor;
    const previousBodyCursor = body.style.cursor;

    function setMode(mode: "dot" | "tooltip", nextLabel = "") {
      cursorElement.dataset.mode = mode;
      labelElement.textContent = nextLabel;
    }

    function applyPointerMode(isEnabled: boolean) {
      root.toggleAttribute("data-custom-cursor", isEnabled);
      root.style.cursor = isEnabled ? "none" : previousRootCursor;
      body.style.cursor = isEnabled ? "none" : previousBodyCursor;

      if (!isEnabled) {
        cursorElement.dataset.visible = "false";
        setMode("dot");
      }
    }

    function updatePosition(event: PointerEvent) {
      if (!mediaQuery.matches) {
        return;
      }

      cursorElement.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;
      cursorElement.dataset.visible = "true";

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
      cursorElement.dataset.visible = "false";
      setMode("dot");
    }

    function handleCursorLabel(event: Event) {
      if (!mediaQuery.matches) {
        return;
      }

      const customEvent = event as CustomEvent<{ label?: string | null }>;
      const nextLabel = customEvent.detail?.label?.trim();

      if (nextLabel) {
        setMode("tooltip", nextLabel);
        return;
      }

      setMode("dot");
    }

    applyPointerMode(mediaQuery.matches);

    window.addEventListener("pointermove", updatePosition, { passive: true });
    window.addEventListener("pointerdown", updatePosition, { passive: true });
    window.addEventListener("portfolio-cursor-label", handleCursorLabel as EventListener);
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
      window.removeEventListener(
        "portfolio-cursor-label",
        handleCursorLabel as EventListener,
      );
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
