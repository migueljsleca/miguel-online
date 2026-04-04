"use client";

import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";
import Link from "next/link";
import { createPortal } from "react-dom";
import { useState, type MouseEvent } from "react";

import ImageReveal from "@/components/ui/image-tiles";

export type WorkListSectionItem = {
  href: string;
  title: string;
  meta: string;
  labels: string[];
  previewImage?: string;
};

type WorkListSectionProps = {
  id?: string;
  title: string;
  items: WorkListSectionItem[];
};

export default function WorkListSection({
  id,
  title,
  items,
}: WorkListSectionProps) {
  const [hoveredPreview, setHoveredPreview] = useState<{
    image: string;
    title: string;
  } | null>(null);
  const canUseDOM = typeof document !== "undefined";
  const previewX = useMotionValue(0);
  const previewY = useMotionValue(0);
  const previewSpringX = useSpring(previewX, {
    stiffness: 380,
    damping: 34,
    mass: 0.45,
  });
  const previewSpringY = useSpring(previewY, {
    stiffness: 380,
    damping: 34,
    mass: 0.45,
  });

  const updateHoverPreview = (
    event: MouseEvent<HTMLAnchorElement>,
    item: WorkListSectionItem,
  ) => {
    if (!item.previewImage) {
      return;
    }

    previewX.set(event.clientX - 28);
    previewY.set(event.clientY - 176);

    setHoveredPreview((current) => {
      if (
        current?.title === item.title &&
        current.image === item.previewImage
      ) {
        return current;
      }

      return {
        image: item.previewImage,
        title: item.title,
      };
    });
  };

  const clearHoverPreview = () => {
    setHoveredPreview(null);
  };

  return (
    <>
      <section id={id} className="flex flex-col gap-3">
        <p className="font-data text-[0.875rem] text-opacity">
          {title}
        </p>

        <div className="portfolio-work-list flex flex-col">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="portfolio-work-card portfolio-work-row text-left"
              onMouseEnter={(event) => updateHoverPreview(event, item)}
              onMouseMove={(event) => updateHoverPreview(event, item)}
              onMouseLeave={clearHoverPreview}
              onBlur={clearHoverPreview}
              aria-label={`Open ${item.title}`}
            >
              <div className="portfolio-work-row__title-block">
                <p className="font-editorial text-[1rem] leading-[1.4] text-foreground transition-colors duration-200">
                  {item.title}
                </p>
                <p className="text-[0.78rem] leading-[1.45] text-opacity md:hidden">
                  {item.meta}
                </p>
              </div>

              <div className="portfolio-work-row__line" aria-hidden="true">
                <span className="portfolio-work-row__rule" />
              </div>

              <div className="portfolio-work-row__labels">
                {item.labels.map((label) => (
                  <span key={label} className="portfolio-chip">
                    {label}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </section>

      {canUseDOM
        ? createPortal(
            <AnimatePresence>
              {hoveredPreview ? (
                <motion.span
                  key={hoveredPreview.title}
                  aria-hidden="true"
                  className="pointer-events-none fixed left-0 top-0 z-30 hidden md:block"
                  style={{
                    x: previewSpringX,
                    y: previewSpringY,
                  }}
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    transition: {
                      duration: 0.18,
                      ease: [0.22, 1, 0.36, 1],
                    },
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.94,
                    transition: {
                      duration: 0.12,
                      ease: [0.4, 0, 0.2, 1],
                    },
                  }}
                >
                  <ImageReveal
                    variant="single"
                    middleImage={hoveredPreview.image}
                    className="my-0"
                  />
                </motion.span>
              ) : null}
            </AnimatePresence>,
            document.body,
          )
        : null}
    </>
  );
}
