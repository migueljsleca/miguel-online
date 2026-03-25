"use client";
/* eslint-disable @next/next/no-img-element */

import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";
import { MDXRemote } from "next-mdx-remote";
import { createPortal } from "react-dom";
import { useEffect, useMemo, useState, type MouseEvent } from "react";

import { createProjectMdxComponents } from "@/components/projects/project-mdx-components";
import ImageReveal from "@/components/ui/image-tiles";
import type { ProjectItem } from "@/lib/projects";

type SelectedWorkShowcaseProps = {
  items: ProjectItem[];
};

function WorkMeta({
  label,
  value,
}: {
  label: string;
  value: string | string[];
}) {
  return (
    <div className="space-y-1.5">
      <dt className="font-data text-[0.7rem] uppercase tracking-[0.06em] text-opacity">
        {label}
      </dt>
      <dd className="text-[0.875rem] leading-[1.55] text-foreground">
        {Array.isArray(value)
          ? value.map((item) => <div key={item}>{item}</div>)
          : value}
      </dd>
    </div>
  );
}

function getWorkLabels(item: ProjectItem) {
  const labels = [item.category, item.deliverables[0]].filter(
    (value): value is string => Boolean(value),
  );

  return Array.from(new Set(labels)).slice(0, 2);
}

export default function SelectedWorkShowcase({
  items,
}: SelectedWorkShowcaseProps) {
  const [activeTitle, setActiveTitle] = useState<string | null>(null);
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

  const activeItem = useMemo(
    () => items.find((item) => item.title === activeTitle) ?? null,
    [activeTitle, items],
  );

  const openProject = (title: string) => {
    setActiveTitle(title);
  };

  const closeProject = () => {
    setActiveTitle(null);
  };

  const updateHoverPreview = (
    event: MouseEvent<HTMLButtonElement>,
    item: ProjectItem,
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

  useEffect(() => {
    if (!activeItem) {
      document.body.style.removeProperty("overflow");
      delete document.body.dataset.projectPreviewOpen;
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeProject();
      }
    };

    document.body.style.overflow = "hidden";
    document.body.dataset.projectPreviewOpen = "true";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.removeProperty("overflow");
      delete document.body.dataset.projectPreviewOpen;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [activeItem]);

  return (
    <>
      <section id="selected-work" className="flex flex-col gap-8">
        <div className="flex items-center gap-6">
          <p className="font-data text-[0.875rem] uppercase text-opacity">
            Selected Work
          </p>
        </div>

        <div className="portfolio-work-list flex flex-col">
          {items.map((item) => (
            <button
              key={item.title}
              type="button"
              className="portfolio-work-card portfolio-work-row text-left"
              onClick={() => openProject(item.title)}
              onMouseEnter={(event) => updateHoverPreview(event, item)}
              onMouseMove={(event) => updateHoverPreview(event, item)}
              onMouseLeave={clearHoverPreview}
              onBlur={clearHoverPreview}
              aria-label={`Open ${item.title}`}
              aria-expanded={activeTitle === item.title}
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
                <span className="portfolio-work-row__dot" />
                <span className="portfolio-work-row__rule" />
                <span className="portfolio-work-row__dot" />
              </div>

              <div className="portfolio-work-row__labels">
                {getWorkLabels(item).map((label) => (
                  <span key={label} className="portfolio-chip">
                    {label}
                  </span>
                ))}
              </div>
            </button>
          ))}
        </div>
      </section>

      {canUseDOM
        ? createPortal(
            <AnimatePresence>
              {hoveredPreview && !activeItem ? (
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

              {activeItem ? (
                <motion.section
                  key={activeItem.title}
                  role="dialog"
                  aria-modal="true"
                  aria-label={`${activeItem.title} preview`}
                  className="portfolio-project-view fixed inset-0 z-50 overflow-y-auto bg-background"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="portfolio-project-view__bar">
                    <div className="portfolio-project-view__bar-inner">
                      <button
                        type="button"
                        className="portfolio-project-view__back"
                        onClick={closeProject}
                      >
                        <svg
                          aria-hidden="true"
                          className="portfolio-project-view__back-icon"
                          viewBox="0 0 256 256"
                          width="16"
                          height="16"
                        >
                          <rect width="256" height="256" fill="none" />
                          <line
                            x1="216"
                            y1="128"
                            x2="40"
                            y2="128"
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="16"
                          />
                          <polyline
                            points="112 56 40 128 112 200"
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="16"
                          />
                        </svg>
                        <span>Back</span>
                      </button>
                    </div>
                  </div>

                  <motion.article
                    className="portfolio-project-view__content"
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 16 }}
                    transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <div className="space-y-8 md:space-y-10">
                      <header className="space-y-6">
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-[0.82rem] leading-[1.4] text-opacity">
                          <span>{activeItem.year}</span>
                          <span aria-hidden="true">·</span>
                          <span>{activeItem.category}</span>
                          <span aria-hidden="true">·</span>
                          <span>{activeItem.location}</span>
                        </div>

                        <div className="space-y-3">
                          <h2 className="font-editorial text-[2.5rem] leading-[0.98] tracking-[-0.04em] text-foreground sm:text-[3.4rem]">
                            {activeItem.title}
                          </h2>
                          <p className="max-w-[40rem] text-[1.05rem] leading-[1.7] text-opacity">
                            {activeItem.summary}
                          </p>
                        </div>

                        <div className="flex flex-wrap gap-x-2 gap-y-1.5">
                          {getWorkLabels(activeItem).map((label) => (
                            <span key={label} className="portfolio-chip">
                              {label}
                            </span>
                          ))}
                        </div>
                      </header>

                      {activeItem.previewImage ? (
                        <div className="portfolio-project-view__cover">
                          <img
                            alt={`${activeItem.title} cover`}
                            className="portfolio-project-view__cover-image"
                            src={activeItem.previewImage}
                          />
                        </div>
                      ) : null}

                      <dl className="portfolio-project-view__meta-row">
                        <WorkMeta label="Year" value={activeItem.year} />
                        <WorkMeta label="Category" value={activeItem.category} />
                        <WorkMeta label="Location" value={activeItem.location} />
                        <WorkMeta
                          label="Deliverables"
                          value={activeItem.deliverables}
                        />
                      </dl>

                      <div className="portfolio-project-view__body">
                        <MDXRemote
                          {...activeItem.source}
                          components={createProjectMdxComponents(
                            activeItem.slug,
                          )}
                        />
                      </div>
                    </div>
                  </motion.article>
                </motion.section>
              ) : null}
            </AnimatePresence>,
            document.body,
          )
        : null}
    </>
  );
}
