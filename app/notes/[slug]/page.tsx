import type { Metadata } from "next";
import { notFound } from "next/navigation";

import ContentDetailView from "@/components/projects/content-detail-view";
import { getNoteBySlug, getNotes } from "@/lib/notes";

type NotePageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const items = await getNotes();

  return items.map((item) => ({
    slug: item.slug,
  }));
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Miguel Leça",
    description: "Designer",
  };
}

export default async function NotePage({ params }: NotePageProps) {
  const { slug } = await params;
  const item = await getNoteBySlug(slug);

  if (!item) {
    notFound();
  }

  return (
    <ContentDetailView
      item={item}
      backHref="/#notes"
      showLabels={false}
      showMetaRow={false}
    />
  );
}
