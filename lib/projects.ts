import { cache } from "react";
import path from "path";

import {
  getContentEntryBySlug,
  getContentItems,
  type ContentDetail,
  type ContentItem,
} from "@/lib/content-collection";

const PROJECTS_DIR = path.join(process.cwd(), "content", "projects");

export type ProjectItem = ContentItem;
export type ProjectDetail = ContentDetail;

export const getProjects = cache(async (): Promise<ProjectItem[]> => {
  return getContentItems(PROJECTS_DIR);
});

export const getProjectBySlug = cache(
  async (slug: string): Promise<ProjectDetail | null> => {
    return getContentEntryBySlug(PROJECTS_DIR, slug);
  },
);
