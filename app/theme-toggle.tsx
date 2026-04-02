"use client";

import { type MouseEvent, useSyncExternalStore } from "react";
import { cn } from "@/lib/utils";
import type { ThemeMode } from "./theme";
import { THEME_COOKIE_KEY, THEME_STORAGE_KEY } from "./theme";

type ThemeToggleProps = {
  variant?: "compact" | "dock";
};

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

export default function ThemeToggle({
  variant = "compact",
}: ThemeToggleProps) {
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
    document.cookie = `${THEME_COOKIE_KEY}=${nextTheme}; path=/; max-age=31536000; samesite=lax`;
  }

  function handleToggle(event: MouseEvent<HTMLButtonElement>) {
    const button = event.currentTarget;
    const nextTheme: ThemeMode = theme === "dark" ? "light" : "dark";
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (
      prefersReducedMotion ||
      typeof document.startViewTransition !== "function"
    ) {
      applyTheme(nextTheme);
      button.focus();
      return;
    }

    const rect = button.getBoundingClientRect();
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
        button.focus();
        document.documentElement.style.removeProperty("--theme-transition-x");
        document.documentElement.style.removeProperty("--theme-transition-y");
        document.documentElement.style.removeProperty("--theme-transition-radius");
      });
  }

  const nextLabel = theme === "dark" ? "Light" : "Dark";

  return (
    <button
      type="button"
      className={cn(
        "portfolio-rail__theme",
        variant === "dock" &&
          "font-data relative z-[1] inline-flex h-8 min-w-[3rem] items-center justify-center rounded-[4px] px-2.5 text-[14px] leading-none tracking-[-0.01em] uppercase text-[color:var(--opacity)] transition-colors duration-200 hover:bg-[color-mix(in_srgb,var(--foreground)_10%,transparent)] hover:text-[color:var(--foreground)] focus-visible:bg-[color-mix(in_srgb,var(--foreground)_10%,transparent)] focus-visible:text-[color:var(--foreground)]",
      )}
      data-variant={variant}
      data-mode={theme}
      aria-label={`Switch to ${nextLabel.toLowerCase()} mode`}
      onClick={handleToggle}
    >
      <span aria-hidden="true" className="portfolio-rail__theme-icon">
        {theme === "dark" ? (
          <svg viewBox="0 0 256 256" fill="currentColor">
            <path d="M124,40V16a4,4,0,0,1,8,0V40a4,4,0,0,1-8,0Zm64,88a60,60,0,1,1-60-60A60.07,60.07,0,0,1,188,128Zm-8,0a52,52,0,1,0-52,52A52.06,52.06,0,0,0,180,128ZM61.17,66.83a4,4,0,0,0,5.66-5.66l-16-16a4,4,0,0,0-5.66,5.66Zm0,122.34-16,16a4,4,0,0,0,5.66,5.66l16-16a4,4,0,0,0-5.66-5.66ZM192,68a4,4,0,0,0,2.83-1.17l16-16a4,4,0,1,0-5.66-5.66l-16,16A4,4,0,0,0,192,68Zm2.83,121.17a4,4,0,0,0-5.66,5.66l16,16a4,4,0,0,0,5.66-5.66ZM40,124H16a4,4,0,0,0,0,8H40a4,4,0,0,0,0-8Zm88,88a4,4,0,0,0-4,4v24a4,4,0,0,0,8,0V216A4,4,0,0,0,128,212Zm112-88H216a4,4,0,0,0,0,8h24a4,4,0,0,0,0-8Z" />
          </svg>
        ) : (
          <svg viewBox="0 0 256 256" fill="currentColor">
            <path d="M230.72,145.06a4,4,0,0,0-4-1A92.08,92.08,0,0,1,111.94,29.27a4,4,0,0,0-5-5A100.78,100.78,0,0,0,56.08,59.88a100,100,0,0,0,140,140,100.78,100.78,0,0,0,35.59-50.87A4,4,0,0,0,230.72,145.06ZM191.3,193.53A92,92,0,0,1,62.47,64.7a93,93,0,0,1,39.88-30.35,100.09,100.09,0,0,0,119.3,119.3A93,93,0,0,1,191.3,193.53Z" />
          </svg>
        )}
      </span>
    </button>
  );
}
