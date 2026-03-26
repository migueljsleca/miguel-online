"use client";
/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import { MDXRemote } from "next-mdx-remote";

import { createProjectMdxComponents } from "@/components/projects/project-mdx-components";
import NavLabel from "@/components/site/nav-label";
import ProjectScrollIndicator from "@/components/projects/project-scroll-indicator";
import ProjectSmoothScroll from "@/components/projects/project-smooth-scroll";
import { getProjectLabels } from "@/lib/project-labels";
import type { ProjectItem } from "@/lib/projects";

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

export default function ProjectDetailView({ item }: { item: ProjectItem }) {
  return (
    <main className="portfolio-project-view min-h-screen bg-background text-foreground">
      <ProjectSmoothScroll />

      <aside className="portfolio-rail-wrap portfolio-project-rail-wrap">
        <div className="portfolio-project-rail">
          <nav aria-label="Project" className="portfolio-rail">
            <Link href="/#selected-work" className="portfolio-rail__link">
              <NavLabel text="Back" />
            </Link>
          </nav>

          <ProjectScrollIndicator />
        </div>
      </aside>

      <article className="portfolio-project-view__content">
        <div className="space-y-8 md:space-y-10">
          <header className="space-y-6">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-[0.82rem] leading-[1.4] text-opacity">
              <span>{item.year}</span>
              <span aria-hidden="true">·</span>
              <span>{item.category}</span>
              <span aria-hidden="true">·</span>
              <span>{item.location}</span>
            </div>

            <div className="space-y-3">
              <h1 className="font-editorial text-[2.5rem] leading-[0.98] tracking-[-0.04em] text-foreground sm:text-[3.4rem]">
                {item.title}
              </h1>
              <p className="max-w-[40rem] text-[1.05rem] leading-[1.7] text-opacity">
                {item.summary}
              </p>
            </div>

            <div className="flex flex-wrap gap-x-2 gap-y-1.5">
              {getProjectLabels(item).map((label) => (
                <span key={label} className="portfolio-chip">
                  {label}
                </span>
              ))}
            </div>
          </header>

          {item.previewImage ? (
            <div className="portfolio-project-view__cover">
              <img
                alt={`${item.title} cover`}
                className="portfolio-project-view__cover-image"
                src={item.previewImage}
              />
            </div>
          ) : null}

          <dl className="portfolio-project-view__meta-row">
            <WorkMeta label="Year" value={item.year} />
            <WorkMeta label="Category" value={item.category} />
            <WorkMeta label="Location" value={item.location} />
            <WorkMeta label="Deliverables" value={item.deliverables} />
          </dl>

          <div className="portfolio-project-view__body">
            <MDXRemote
              {...item.source}
              components={createProjectMdxComponents(item.slug)}
            />
          </div>
        </div>
      </article>
    </main>
  );
}
