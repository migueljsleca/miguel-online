import HalftoneExport from "../experiments/halftone/halftone-export (4).jsx";
import { TextScramble } from "@/components/ui/text-scramble";
import { getProjects } from "@/lib/projects";
import FadeInHeadline from "./fade-in-headline";
import HeroSocials from "./hero-socials";
import RevealSection from "./reveal-section";
import SelectedWorkShowcase from "./selected-work-showcase";
import ThemeToggle from "./theme-toggle";

const navigation = [
  { label: "Home", href: "#home" },
  { label: "Selected Work", href: "#selected-work" },
  { label: "About", href: "#about" },
];

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
  { value: "12,309.6", label: "km covered" },
];

const experience = [
  { studio: "Superside", role: "UX/UI Designer", years: "2024 - Now" },
  { studio: "Independent Practice", role: "Designer", years: "2020 - Now" },
  { studio: "chumbo", role: "Designer", years: "2021 - 2024" },
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
    previewClassName: "left-1/2 -translate-x-[38%]",
  },
  { text: "and" },
  {
    text: "runner",
    className: "text-opacity",
    previewClassName: "left-1/2 -translate-x-1/2",
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
    previewClassName: "left-1/2 -translate-x-[46%]",
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

function NavLabel({ text }: { text: string }) {
  return (
    <TextScramble
      text={text}
      className="whitespace-nowrap"
      textClassName="font-data text-[14px] leading-none tracking-[-0.01em] uppercase"
      idleCharacterClassName="text-current"
      hoveredCharacterClassName="text-foreground"
      scrambleCharacterClassName="text-primary scale-110"
      showUnderline={false}
      showGlow={false}
    />
  );
}

export default async function Home() {
  const selectedWork = await getProjects();

  return (
    <main
      id="home"
      className="min-h-screen bg-background text-foreground"
    >
      <aside className="portfolio-rail-wrap">
        <nav aria-label="Primary" className="portfolio-rail">
          {navigation.map((item) => (
            <a
              key={item.label}
              className="portfolio-rail__link"
              href={item.href}
            >
              <NavLabel text={item.label} />
            </a>
          ))}
          <ThemeToggle />
        </nav>
      </aside>

      <div className="portfolio-shell mx-auto w-full max-w-[900px] px-6 py-6 sm:px-8 md:py-10 xl:px-0 xl:py-12">
        <div className="flex flex-col gap-16 md:gap-20 xl:gap-12">
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

          <RevealSection
            id="about"
            className="grid gap-10 md:grid-cols-[minmax(0,311px)_minmax(0,444px)] md:justify-between"
          >
            <div className="space-y-3">
              <SectionLabel>At a Glance</SectionLabel>
              <div className="space-y-4">
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
            </div>

            <div className="space-y-3">
              <SectionLabel>Experience</SectionLabel>
              <div className="space-y-4">
                {experience.map((item) => (
                  <div
                    key={`${item.studio}-${item.years}`}
                    className="grid grid-cols-[minmax(0,1fr)_auto] gap-x-6 gap-y-0.5"
                  >
                    <div className="space-y-0.5">
                      <p className="text-[0.875rem] leading-[1.5] text-foreground">
                        {item.studio}
                      </p>
                      <p className="text-[0.875rem] leading-[1.5] text-opacity">
                        {item.role}
                      </p>
                    </div>
                    <p className="pt-0.5 text-right text-[0.875rem] leading-[1.5] text-foreground">
                      {item.years}
                    </p>
                  </div>
                ))}
              </div>
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
