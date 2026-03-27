/* eslint-disable @next/next/no-img-element */

import type { ComponentPropsWithoutRef, ReactNode } from "react";

type ProjectImageProps = {
  src: string;
  alt: string;
  caption?: string;
};

function resolveProjectAssetPath(projectSlug: string, src: string) {
  if (!src) return "";
  if (src.startsWith("http://") || src.startsWith("https://") || src.startsWith("/")) {
    return src;
  }

  return `/project-assets/${projectSlug}/${src.replace(/^\.?\//, "")}`;
}

function ProjectImage({
  projectSlug,
  src,
  alt,
  caption,
}: ProjectImageProps & { projectSlug: string }) {
  return (
    <figure className="project-mdx__figure">
      <div className="project-mdx__image-frame">
        <img
          alt={alt}
          className="project-mdx__image"
          src={resolveProjectAssetPath(projectSlug, src)}
        />
      </div>
      {caption ? (
        <figcaption className="project-mdx__caption">{caption}</figcaption>
      ) : null}
    </figure>
  );
}

function ProjectGrid({ children }: { children: ReactNode }) {
  return <div className="project-mdx__grid">{children}</div>;
}

function TextBlock({ children }: { children: ReactNode }) {
  return <div className="project-mdx__text-block">{children}</div>;
}

function Paragraph(props: ComponentPropsWithoutRef<"p">) {
  return <p className="project-mdx__paragraph" {...props} />;
}

function Heading(props: ComponentPropsWithoutRef<"h3">) {
  return <h3 className="project-mdx__heading" {...props} />;
}

function UnorderedList(props: ComponentPropsWithoutRef<"ul">) {
  return <ul className="project-mdx__list" {...props} />;
}

function ListItem(props: ComponentPropsWithoutRef<"li">) {
  return <li className="project-mdx__list-item" {...props} />;
}

export function createProjectMdxComponents(projectSlug: string) {
  return {
    img: (props: ComponentPropsWithoutRef<"img">) => (
      <ProjectImage
        projectSlug={projectSlug}
        alt={props.alt ?? ""}
        src={typeof props.src === "string" ? props.src : ""}
      />
    ),
    h3: Heading,
    p: Paragraph,
    ul: UnorderedList,
    li: ListItem,
    ProjectImage: (props: ProjectImageProps) => (
      <ProjectImage projectSlug={projectSlug} {...props} />
    ),
    ProjectGrid,
    TextBlock,
  };
}
