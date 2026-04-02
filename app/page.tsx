import HalftoneExport from "../experiments/halftone/halftone-export (4).jsx";
import { getProjects } from "@/lib/projects";
import FadeInHeadline from "./fade-in-headline";
import HeroSocials from "./hero-socials";
import RevealSection from "./reveal-section";
import SelectedWorkShowcase from "./selected-work-showcase";

const stats: { value: React.ReactNode; label: string }[] = [
  { value: "5+", label: "Years of experience" },
  {
    value: (
      <svg
        aria-hidden="true"
        className="portfolio-inline-icon"
        viewBox="0 0 256 256"
      >
        <path d="M248,128a56,56,0,0,1-95.6,39.6l-.33-.35L92.12,99.55a40,40,0,1,0,0,56.9l8.52-9.62a8,8,0,1,1,12,10.61l-8.69,9.81-.33.35a56,56,0,1,1,0-79.2l.33.35,59.95,67.7a40,40,0,1,0,0-56.9l-8.52,9.62a8,8,0,1,1-12-10.61l8.69-9.81.33-.35A56,56,0,0,1,248,128Z" />
      </svg>
    ),
    label: "Tools tested",
  },
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
                hoverInkColor="var(--accent)"
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
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
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
            <SelectedWorkShowcase items={selectedWork} />
          </RevealSection>

        </div>
      </div>
    </main>
  );
}
