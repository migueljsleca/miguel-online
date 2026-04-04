import type { Metadata } from "next";
import { notFound } from "next/navigation";

import ContentDetailView from "@/components/projects/content-detail-view";
import { getProjectBySlug, getProjects } from "@/lib/projects";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const projects = await getProjects();

  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  return {
    title: "Miguel Leça",
    description: "Designer",
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return <ContentDetailView item={project} />;
}
