import { cache } from "react";
import path from "path";

import {
  getContentEntryBySlug,
  getContentItems,
  type ContentDetail,
  type ContentItem,
} from "@/lib/content-collection";

const NOTES_DIR = path.join(process.cwd(), "content", "notes");

export type NoteItem = ContentItem;
export type NoteDetail = ContentDetail;

export const getNotes = cache(async (): Promise<NoteItem[]> => {
  return getContentItems(NOTES_DIR);
});

export const getNoteBySlug = cache(
  async (slug: string): Promise<NoteDetail | null> => {
    return getContentEntryBySlug(NOTES_DIR, slug);
  },
);
