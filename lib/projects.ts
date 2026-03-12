import { cache } from "react";
import { promises as fs } from "fs";
import path from "path";

import matter from "gray-matter";
import type { MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import remarkGfm from "remark-gfm";

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
  source: MDXRemoteSerializeResult;
};

function normalizeDeliverables(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value.filter((item): item is string => typeof item === "string");
  }

  return [];
}

export const getProjects = cache(async (): Promise<ProjectItem[]> => {
  const entries = await fs.readdir(PROJECTS_DIR, { withFileTypes: true });
  const projectDirs = entries.filter((entry) => entry.isDirectory());

  const projects = await Promise.all(
    projectDirs.map(async (directory) => {
      const slug = directory.name;
      const raw = await fs.readFile(
        path.join(PROJECTS_DIR, slug, `${slug}.mdx`),
        "utf8",
      );
      const { content, data } = matter(raw);
      const frontmatter = data as Partial<ProjectFrontmatter>;

      const source = await serialize(content, {
        mdxOptions: {
          remarkPlugins: [remarkGfm],
        },
      });

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
        order: typeof frontmatter.order === "number" ? frontmatter.order : 999,
        source,
      };
    }),
  );

  return projects.sort((a, b) => a.order - b.order);
});
