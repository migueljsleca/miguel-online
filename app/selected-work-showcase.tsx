"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { MDXRemote } from "next-mdx-remote";
import { createPortal } from "react-dom";
import { useEffect, useMemo, useState } from "react";

import { createProjectMdxComponents } from "@/components/projects/project-mdx-components";
import type { ProjectItem } from "@/lib/projects";
import placeholderImage from "../image-placeholder.png";

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

export default function SelectedWorkShowcase({
  items,
}: SelectedWorkShowcaseProps) {
  const [activeTitle, setActiveTitle] = useState<string | null>(null);
  const canUseDOM = typeof document !== "undefined";

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
        <div className="flex items-center justify-between gap-6">
          <p className="font-data text-[0.875rem] uppercase text-opacity">
            Selected Work
          </p>
          <a
            className="portfolio-inline-link font-data text-[0.875rem] uppercase"
            href="#selected-work"
          >
            View All
          </a>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {items.map((item) => (
            <button
              key={item.title}
              type="button"
              className="portfolio-work-card group flex flex-col gap-3 text-left"
              onClick={() => openProject(item.title)}
              aria-label={`Open ${item.title}`}
              aria-expanded={activeTitle === item.title}
              data-cursor-label="Open Project"
            >
              <div className="portfolio-card__art" data-art={item.art}>
                <Image
                  src={placeholderImage}
                  alt=""
                  fill
                  sizes="(min-width: 768px) 438px, 100vw"
                  className="portfolio-card__image"
                />
              </div>
              <div className="space-y-0.5">
                <p className="font-editorial text-[1rem] leading-[1.5] text-foreground">
                  {item.title}
                </p>
                <p className="text-[0.875rem] leading-[1.5] text-opacity">
                  {item.meta}
                </p>
              </div>
            </button>
          ))}
        </div>
      </section>

      {canUseDOM
        ? createPortal(
            <AnimatePresence>
              {activeItem ? (
                <>
                  <motion.button
                    key="backdrop"
                    type="button"
                    aria-label="Close project preview"
                    className="portfolio-work-backdrop"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                    onClick={closeProject}
                  />

                  <div
                    className="portfolio-work-stage fixed inset-0 z-50 overflow-y-auto px-4 pb-8 pt-8 md:px-6 md:pb-8 md:pt-8"
                    onClick={closeProject}
                  >
                    <motion.article
                      role="dialog"
                      aria-modal="true"
                      aria-label={`${activeItem.title} preview`}
                      className="portfolio-work-sheet mx-auto"
                      initial={{ opacity: 0, y: "110vh" }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: "110vh" }}
                      transition={{ duration: 0.52, ease: [0.22, 1, 0.36, 1] }}
                      onClick={(event) => event.stopPropagation()}
                    >
                      <div className="flex items-center justify-between gap-6 border-b border-[color:var(--tile-stroke)] pb-3">
                        <button
                          type="button"
                          className="font-data text-[0.78rem] uppercase tracking-[0.04em] text-foreground transition-colors duration-200 hover:text-primary"
                          onClick={closeProject}
                        >
                          Close
                        </button>
                        <p className="font-data text-[0.7rem] uppercase tracking-[0.06em] text-opacity">
                          Project Preview
                        </p>
                      </div>

                      <div className="pt-5">
                        <div className="space-y-5">
                          <div className="space-y-1">
                            <p className="text-[0.875rem] leading-[1.5] text-opacity">
                              {activeItem.meta}
                            </p>
                            <h2 className="font-editorial text-[2.1rem] leading-[1.04] text-foreground sm:text-[2.4rem]">
                              {activeItem.title}
                            </h2>
                          </div>

                          <dl className="portfolio-work-sheet__meta-row">
                            <WorkMeta label="Year" value={activeItem.year} />
                            <WorkMeta
                              label="Category"
                              value={activeItem.category}
                            />
                            <WorkMeta
                              label="Location"
                              value={activeItem.location}
                            />
                            <WorkMeta
                              label="Deliverables"
                              value={activeItem.deliverables}
                            />
                          </dl>

                          <div className="max-w-[42rem] space-y-4">
                            <p className="font-editorial text-[1.7rem] leading-[1.15] text-foreground sm:text-[2rem]">
                              {activeItem.summary}
                            </p>
                          </div>

                          <motion.div
                            className="project-mdx"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 16 }}
                            transition={{
                              duration: 0.36,
                              ease: [0.22, 1, 0.36, 1],
                              delay: 0.08,
                            }}
                          >
                            <MDXRemote
                              {...activeItem.source}
                              components={createProjectMdxComponents(
                                activeItem.slug,
                              )}
                            />
                          </motion.div>
                        </div>
                      </div>
                    </motion.article>
                  </div>
                </>
              ) : null}
            </AnimatePresence>,
            document.body,
          )
        : null}
    </>
  );
}
