"use client";

import { useEffect, useRef, useState, type MouseEvent } from "react";
import { usePathname, useRouter } from "next/navigation";
import ThemeToggle from "@/app/theme-toggle";
import { Tabs } from "@/components/ui/vercel-tabs";

const navigation = [
  { id: "/", label: "Home" },
  { id: "/about", label: "About" },
];

const CLOSE_DELAY_MS = 120;

export default function BottomNav() {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isPinnedOpen, setIsPinnedOpen] = useState(false);
  const closeTimeoutRef = useRef<number | null>(null);
  const navRef = useRef<HTMLElement | null>(null);
  const activeTab = pathname.startsWith("/about") ? "/about" : "/";

  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current !== null) {
        window.clearTimeout(closeTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isPinnedOpen) {
      return;
    }

    function handlePointerMove(event: PointerEvent) {
      const navElement = navRef.current;

      if (!navElement) {
        return;
      }

      const navBounds = navElement.getBoundingClientRect();
      const pointerIsInsideNav =
        event.clientX >= navBounds.left &&
        event.clientX <= navBounds.right &&
        event.clientY >= navBounds.top &&
        event.clientY <= navBounds.bottom;

      if (pointerIsInsideNav) {
        return;
      }

      setIsPinnedOpen(false);
      setIsOpen(false);

      const focusedElement = document.activeElement;

      if (
        focusedElement instanceof HTMLElement &&
        navElement.contains(focusedElement)
      ) {
        focusedElement.blur();
      }
    }

    window.addEventListener("pointermove", handlePointerMove);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
    };
  }, [isPinnedOpen]);

  function keepOpen() {
    if (closeTimeoutRef.current !== null) {
      window.clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }

    setIsOpen(true);
  }

  function pinOpen() {
    keepOpen();
    setIsPinnedOpen(true);
  }

  function handleMouseLeave(event: MouseEvent<HTMLElement>) {
    if (isPinnedOpen) {
      return;
    }

    const navElement = event.currentTarget;

    if (closeTimeoutRef.current !== null) {
      window.clearTimeout(closeTimeoutRef.current);
    }

    closeTimeoutRef.current = window.setTimeout(() => {
      closeTimeoutRef.current = null;

      setIsOpen(false);

      const focusedElement = document.activeElement;

      if (
        focusedElement instanceof HTMLElement &&
        navElement.contains(focusedElement)
      ) {
        focusedElement.blur();
      }
    }, CLOSE_DELAY_MS);
  }

  return (
    <aside
      ref={navRef}
      className="bottom-nav"
      aria-label="Primary"
      data-open={isOpen || isPinnedOpen}
      onFocusCapture={keepOpen}
      onMouseEnter={keepOpen}
      onMouseLeave={handleMouseLeave}
    >
      <div className="bottom-nav__handle" aria-hidden="true" />
      <nav className="bottom-nav__dock" onPointerDownCapture={pinOpen}>
        <div className="bottom-nav__controls">
          <Tabs
            className="bottom-nav__tabs"
            tabs={navigation}
            activeTab={activeTab}
            onTabChange={(tabId) => {
              pinOpen();
              router.push(tabId);
            }}
          />
          <ThemeToggle variant="dock" />
        </div>
      </nav>
    </aside>
  );
}
