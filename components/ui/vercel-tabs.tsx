"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

type Tab = {
  id: string;
  label: string;
};

type TabsProps = React.HTMLAttributes<HTMLDivElement> & {
  tabs: Tab[];
  activeTab: string;
  onTabChange?: (tabId: string) => void;
};

export const Tabs = React.forwardRef<HTMLDivElement, TabsProps>(
  ({ className, tabs, activeTab, onTabChange, ...props }, ref) => {
    const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null);
    const [indicatorStyle, setIndicatorStyle] = React.useState<React.CSSProperties>(
      {},
    );
    const tabRefs = React.useRef<(HTMLButtonElement | null)[]>([]);

    const activeIndex = Math.max(
      0,
      tabs.findIndex((tab) => tab.id === activeTab),
    );

    React.useLayoutEffect(() => {
      const element = tabRefs.current[activeIndex];
      if (!element) return;

      setIndicatorStyle({
        left: `${element.offsetLeft}px`,
        width: `${element.offsetWidth}px`,
      });
    }, [activeIndex, tabs]);

    return (
      <div
        ref={ref}
        className={cn("relative", className)}
        {...props}
      >
        <div className="relative flex items-center gap-1">
          <div
            aria-hidden="true"
            className="absolute inset-y-0 rounded-[4px] bg-[color-mix(in_srgb,var(--foreground)_6%,transparent)] transition-[left,width] duration-250 ease-out"
            style={indicatorStyle}
          />

          {tabs.map((tab, index) => {
            const isActive = index === activeIndex;

            return (
              <button
                key={tab.id}
                ref={(element) => {
                  tabRefs.current[index] = element;
                }}
                type="button"
                className={cn(
                  "font-data relative z-[1] inline-flex h-8 min-w-[4.25rem] items-center justify-center rounded-[4px] px-2.5 text-[14px] leading-none tracking-[-0.01em] uppercase text-[color:var(--opacity)] transition-colors duration-200",
                  isActive && "text-[color:var(--foreground)]",
                  !isActive &&
                    hoveredIndex === index &&
                    "text-[color:var(--foreground)]",
                )}
                onBlur={() => setHoveredIndex(null)}
                onClick={() => onTabChange?.(tab.id)}
                onFocus={() => setHoveredIndex(index)}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>
    );
  },
);

Tabs.displayName = "Tabs";
