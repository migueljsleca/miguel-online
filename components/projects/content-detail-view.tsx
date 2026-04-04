/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";

import { createProjectMdxComponents } from "@/components/projects/project-mdx-components";
import NavLabel from "@/components/site/nav-label";
import ProjectScrollIndicator from "@/components/projects/project-scroll-indicator";
import ProjectSmoothScroll from "@/components/projects/project-smooth-scroll";
import { getProjectLabels } from "@/lib/project-labels";
import type { ProjectDetail } from "@/lib/projects";

type DetailViewItem = Pick<
  ProjectDetail,
  | "slug"
  | "title"
  | "summary"
  | "year"
  | "category"
  | "deliverables"
  | "previewImage"
  | "content"
>;

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

export default function ContentDetailView({
  item,
  backHref = "/#work-play",
  showMetaRow = true,
  showLabels = true,
}: {
  item: DetailViewItem;
  backHref?: string;
  showMetaRow?: boolean;
  showLabels?: boolean;
}) {
  return (
    <main className="portfolio-project-view min-h-screen bg-background text-foreground">
      <ProjectSmoothScroll />

      <aside className="portfolio-project-rail-wrap">
        <div className="portfolio-project-rail">
          <ProjectScrollIndicator />
        </div>
      </aside>

      <article className="portfolio-project-view__content">
        <div className="space-y-8 md:space-y-10">
          <header className="space-y-6">
            <nav aria-label="Project" className="portfolio-project-view__back-nav">
              <Link
                href={backHref}
                className="portfolio-rail__link portfolio-project-view__back-link"
              >
                <svg
                  aria-hidden="true"
                  className="portfolio-project-view__back-icon"
                  viewBox="0 0 256 256"
                >
                  <path d="M228,56A100.11,100.11,0,0,1,128,156H41.66l41.17,41.17a4,4,0,0,1-5.66,5.66l-48-48a4,4,0,0,1,0-5.66l48-48a4,4,0,0,1,5.66,5.66L41.66,148H128a92.1,92.1,0,0,0,92-92,4,4,0,0,1,8,0Z" />
                </svg>
                <NavLabel text="Back" />
              </Link>
            </nav>

            <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-[0.82rem] leading-[1.4] text-opacity">
              <span>{item.year}</span>
              <span aria-hidden="true">·</span>
              <span>{item.category}</span>
            </div>

            <div className="space-y-3">
              <h1 className="font-editorial text-[2.5rem] leading-[0.98] tracking-[-0.04em] text-foreground sm:text-[3.4rem]">
                {item.title}
              </h1>
              <p className="max-w-[40rem] text-[1.05rem] leading-[1.7] text-opacity">
                {item.summary}
              </p>
            </div>

            {showLabels ? (
              <div className="flex flex-wrap gap-x-2 gap-y-1.5">
                {getProjectLabels(item).map((label) => (
                  <span key={label} className="portfolio-chip">
                    {label}
                  </span>
                ))}
              </div>
            ) : null}
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

          {showMetaRow ? (
            <dl className="portfolio-project-view__meta-row">
              <WorkMeta label="Year" value={item.year} />
              <WorkMeta label="Category" value={item.category} />
              <WorkMeta label="Deliverables" value={item.deliverables} />
            </dl>
          ) : null}

          <div className="portfolio-project-view__body">
            <MDXRemote
              source={item.content}
              components={createProjectMdxComponents(item.slug)}
            />
          </div>
        </div>
      </article>
    </main>
  );
}
