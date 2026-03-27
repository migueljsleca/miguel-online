import { cache } from "react";
import { promises as fs } from "fs";
import path from "path";

import matter from "gray-matter";

const PROJECTS_DIR = path.join(process.cwd(), "content", "projects");

type ProjectFrontmatter = {
  title: string;
  meta: string;
  art: string;
  summary: string;
  year: string;
  category: string;
  location: string;
  deliverables: string[];
  order?: number;
};

export type ProjectItem = ProjectFrontmatter & {
  slug: string;
  previewImage: string;
};

export type ProjectDetail = ProjectItem & {
  content: string;
};

function normalizeDeliverables(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value.filter((item): item is string => typeof item === "string");
  }

  return [];
}

function resolveProjectAssetPath(projectSlug: string, src: string) {
  if (!src) return "";
  if (src.startsWith("http://") || src.startsWith("https://") || src.startsWith("/")) {
    return src;
  }

  return `/project-assets/${projectSlug}/${src.replace(/^\.?\//, "")}`;
}

function extractPreviewImage(projectSlug: string, content: string) {
  const match = content.match(/src="([^"]+)"/);
  return match ? resolveProjectAssetPath(projectSlug, match[1]) : "";
}

async function readProject(slug: string): Promise<ProjectDetail> {
  const raw = await fs.readFile(
    path.join(PROJECTS_DIR, slug, `${slug}.mdx`),
    "utf8",
  );
  const { content, data } = matter(raw);
  const frontmatter = data as Partial<ProjectFrontmatter>;

  return {
    slug,
    title: frontmatter.title ?? slug,
    meta: frontmatter.meta ?? "",
    art: frontmatter.art ?? slug,
    summary: frontmatter.summary ?? "",
    year: frontmatter.year ?? "",
    category: frontmatter.category ?? "",
    location: frontmatter.location ?? "",
    deliverables: normalizeDeliverables(frontmatter.deliverables),
    previewImage: extractPreviewImage(slug, content),
    order: typeof frontmatter.order === "number" ? frontmatter.order : 999,
    content,
  };
}

export const getProjects = cache(async (): Promise<ProjectItem[]> => {
  const entries = await fs.readdir(PROJECTS_DIR, { withFileTypes: true });
  const projectDirs = entries.filter((entry) => entry.isDirectory());

  const projects = await Promise.all(
    projectDirs.map(async (directory) => readProject(directory.name)),
  );

  return projects
    .sort((a, b) => (a.order ?? 999) - (b.order ?? 999))
    .map((project) => ({
      slug: project.slug,
      title: project.title,
      meta: project.meta,
      art: project.art,
      summary: project.summary,
      year: project.year,
      category: project.category,
      location: project.location,
      deliverables: project.deliverables,
      order: project.order,
      previewImage: project.previewImage,
    }));
});

export const getProjectBySlug = cache(
  async (slug: string): Promise<ProjectDetail | null> => {
    const entries = await fs.readdir(PROJECTS_DIR, { withFileTypes: true });
    const exists = entries.some(
      (entry) => entry.isDirectory() && entry.name === slug,
    );

    if (!exists) {
      return null;
    }

    return readProject(slug);
  },
);
