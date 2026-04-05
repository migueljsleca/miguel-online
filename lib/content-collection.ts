import { promises as fs } from "fs";
import path from "path";

import matter from "gray-matter";

export type ContentFrontmatter = {
  title: string;
  meta: string;
  summary: string;
  year: string;
  date?: string;
  headerDate?: string;
  category: string;
  location: string;
  deliverables: string[];
  order?: number;
  art?: string;
};

export type ContentItem = ContentFrontmatter & {
  collection: string;
  slug: string;
  previewImage: string;
};

export type ContentDetail = ContentItem & {
  content: string;
};

function normalizeDeliverables(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value.filter((item): item is string => typeof item === "string");
  }

  return [];
}

function resolveAssetPath(collection: string, slug: string, src: string) {
  if (!src) return "";
  if (
    src.startsWith("http://") ||
    src.startsWith("https://") ||
    src.startsWith("/")
  ) {
    return src;
  }

  return `/content-assets/${collection}/${slug}/${src.replace(/^\.?\//, "")}`;
}

function extractPreviewImage(collection: string, slug: string, content: string) {
  const match = content.match(/src="([^"]+)"/);
  return match ? resolveAssetPath(collection, slug, match[1]) : "";
}

async function readContentFile(contentDir: string, slug: string) {
  return fs.readFile(path.join(contentDir, slug, `${slug}.mdx`), "utf8");
}

export async function readContentEntry(
  contentDir: string,
  slug: string,
): Promise<ContentDetail> {
  const collection = path.basename(contentDir);
  const raw = await readContentFile(contentDir, slug);
  const { content, data } = matter(raw);
  const frontmatter = data as Partial<ContentFrontmatter>;

  return {
    collection,
    slug,
    title: frontmatter.title ?? slug,
    meta: frontmatter.meta ?? "",
    summary: frontmatter.summary ?? "",
    year: frontmatter.year ?? "",
    date: frontmatter.date ?? "",
    headerDate: frontmatter.headerDate ?? "",
    category: frontmatter.category ?? "",
    location: frontmatter.location ?? "",
    deliverables: normalizeDeliverables(frontmatter.deliverables),
    previewImage: extractPreviewImage(collection, slug, content),
    order: typeof frontmatter.order === "number" ? frontmatter.order : 999,
    art: frontmatter.art,
    content,
  };
}

export async function getContentItems(contentDir: string): Promise<ContentItem[]> {
  const entries = await fs.readdir(contentDir, { withFileTypes: true });
  const contentDirs = entries.filter((entry) => entry.isDirectory());

  const items = await Promise.all(
    contentDirs.map(async (directory) => readContentEntry(contentDir, directory.name)),
  );

  return items
    .sort((a, b) => (a.order ?? 999) - (b.order ?? 999))
    .map((item) => ({
      collection: item.collection,
      slug: item.slug,
      title: item.title,
      meta: item.meta,
      summary: item.summary,
      year: item.year,
      date: item.date,
      headerDate: item.headerDate,
      category: item.category,
      location: item.location,
      deliverables: item.deliverables,
      previewImage: item.previewImage,
      order: item.order,
      art: item.art,
    }));
}

export async function getContentEntryBySlug(
  contentDir: string,
  slug: string,
): Promise<ContentDetail | null> {
  const entries = await fs.readdir(contentDir, { withFileTypes: true });
  const exists = entries.some(
    (entry) => entry.isDirectory() && entry.name === slug,
  );

  if (!exists) {
    return null;
  }

  return readContentEntry(contentDir, slug);
}
