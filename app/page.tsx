import HalftoneExport from "../experiments/halftone/halftone-export (4).jsx";
import type { WorkListSectionItem } from "@/components/site/work-list-section";
import { getProjectLabels } from "@/lib/project-labels";
import { getProjects } from "@/lib/projects";
import FadeInHeadline from "./fade-in-headline";
import HeroSocials from "./hero-socials";
import NotesShowcase from "./notes-showcase";
import RevealSection from "./reveal-section";
import WorkPlayShowcase from "./work-play-showcase";

const stats: { value: React.ReactNode; label: string }[] = [
  { value: "5+", label: "Years of experience" },
  { value: "12,309.6", label: "km on foot" },
  { value: "336,573", label: "meters climbed" },
];

const heroNumber2Settings = {
  pageBackground: "var(--background)",
  paperColor: "var(--background)",
  inkColor: "var(--foreground)",
};

const heroHeadline = [
  { text: "I'm" },
  { text: "Miguel," },
  { text: "a" },
  {
    text: "designer",
    className: "text-opacity",
    previewOffsetX: 24,
    previewImage:
      "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1400&q=80",
  },
  { text: "and" },
  {
    text: "runner",
    className: "text-opacity",
    previewOffsetX: 0,
    previewImage:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1400&q=80",
    breakAfter: true,
  },
  { text: "on" },
  { text: "most" },
  { text: "days," },
  { text: "based" },
  { text: "in" },
  {
    text: "Madeira Island.",
    className: "text-opacity",
    previewOffsetX: 8,
    previewImage:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1400&q=80",
  },
];

const heroSocials = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/miguel-le%C3%A7a-804abb111/",
  },
  { label: "GitHub", href: "https://github.com/migueljsleca" },
  { label: "X", href: "https://x.com/migueljsleca" },
  {
    label: "Instagram",
    href: "https://www.instagram.com/migueljsleca94/",
  },
  {
    label: "Email",
    copyValue: "migueljsleca@gmail.com",
  },
];

function SectionLabel({
  children,
  action,
}: {
  children: React.ReactNode;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-6">
      <p className="font-data text-[0.875rem] uppercase text-opacity">
        {children}
      </p>
      {action}
    </div>
  );
}

export default async function Home() {
  const selectedWork = await getProjects();
  const workPlayItems: WorkListSectionItem[] = [
    ...selectedWork.map((item) => ({
      href: `/projects/${item.slug}`,
      title: item.title,
      meta: item.meta,
      labels: getProjectLabels(item),
      previewImage: item.previewImage,
    })),
  ];

  return (
    <main
      id="home"
      className="min-h-screen bg-background text-foreground"
    >
      <div className="portfolio-shell portfolio-shell--page mx-auto w-full max-w-[700px] py-6 md:py-10">
        <div className="flex flex-col gap-12">
          <section className="flex flex-col gap-6">
            <RevealSection
              as="div"
              className="hero-halftone"
              delay={120}
              aria-hidden="true"
            >
              <HalftoneExport
                settings={heroNumber2Settings}
                enableInteraction={false}
              />
            </RevealSection>

            <div className="space-y-5">
              <FadeInHeadline
                className="font-editorial max-w-[48rem] text-[2rem] leading-[1.45] text-foreground"
                tokens={heroHeadline}
              />
              <HeroSocials items={heroSocials} />
            </div>
          </section>

          <RevealSection id="about" className="space-y-3">
            <SectionLabel>At a Glance</SectionLabel>
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3 lg:gap-0.5">
              {stats.map((item) => (
                <div key={item.label} className="space-y-0.5">
                  <p className="text-[0.875rem] leading-[1.5] text-foreground">
                    {item.value}
                  </p>
                  <p className="text-[0.875rem] leading-[1.5] text-opacity">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </RevealSection>

          <RevealSection>
            <WorkPlayShowcase items={workPlayItems} />
          </RevealSection>

          <RevealSection>
            <NotesShowcase />
          </RevealSection>

        </div>
      </div>
    </main>
  );
}
