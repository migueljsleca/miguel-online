"use client";

import { type MouseEvent, useSyncExternalStore } from "react";
import type { ThemeMode } from "./theme";
import { THEME_STORAGE_KEY } from "./theme";

function getResolvedTheme(): ThemeMode {
  const rootTheme = document.documentElement.dataset.theme;
  if (rootTheme === "dark" || rootTheme === "light") {
    return rootTheme;
  }

  const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
  if (storedTheme === "dark" || storedTheme === "light") {
    return storedTheme;
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

export default function ThemeToggle() {
  const theme = useSyncExternalStore(
    (onStoreChange) => {
      const observer = new MutationObserver(onStoreChange);
      observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["data-theme"],
      });
      return () => {
        observer.disconnect();
      };
    },
    () => getResolvedTheme(),
    () => "light",
  );

  function applyTheme(nextTheme: ThemeMode) {
    document.documentElement.dataset.theme = nextTheme;
    window.localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
  }

  function handleToggle(event: MouseEvent<HTMLButtonElement>) {
    const nextTheme: ThemeMode = theme === "dark" ? "light" : "dark";
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (
      prefersReducedMotion ||
      typeof document.startViewTransition !== "function"
    ) {
      applyTheme(nextTheme);
      return;
    }

    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX || rect.left + rect.width / 2;
    const y = event.clientY || rect.top + rect.height / 2;
    const radius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y),
    );

    document.documentElement.style.setProperty("--theme-transition-x", `${x}px`);
    document.documentElement.style.setProperty("--theme-transition-y", `${y}px`);
    document.documentElement.style.setProperty(
      "--theme-transition-radius",
      `${radius}px`,
    );

    document
      .startViewTransition(() => {
        applyTheme(nextTheme);
      })
      .finished.finally(() => {
        document.documentElement.style.removeProperty("--theme-transition-x");
        document.documentElement.style.removeProperty("--theme-transition-y");
        document.documentElement.style.removeProperty("--theme-transition-radius");
      });
  }

  const nextLabel = theme === "dark" ? "Light" : "Dark";

  return (
    <button
      type="button"
      className="portfolio-rail__theme"
      data-mode={theme}
      role="switch"
      aria-label={`Switch to ${nextLabel.toLowerCase()} mode`}
      aria-checked={theme === "dark"}
      onClick={handleToggle}
    >
      <span aria-hidden="true" className="portfolio-rail__theme-knob" />
    </button>
  );
}
