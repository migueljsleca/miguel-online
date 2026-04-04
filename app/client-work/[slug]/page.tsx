import type { Metadata } from "next";
import { notFound } from "next/navigation";

import ContentDetailView from "@/components/projects/content-detail-view";
import { getClientWorkBySlug, getClientWorkItems } from "@/lib/client-work";

type ClientWorkPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const items = await getClientWorkItems();

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

export default async function ClientWorkPage({
  params,
}: ClientWorkPageProps) {
  const { slug } = await params;
  const item = await getClientWorkBySlug(slug);

  if (!item) {
    notFound();
  }

  return (
    <ContentDetailView
      item={item}
      backHref="/#work-play"
      showLabels={false}
      showMetaRow={false}
    />
  );
}
