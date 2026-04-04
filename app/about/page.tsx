/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import AboutProximityMark from "@/components/about/about-proximity-mark";
import FadeInHeadline, { type HeadlineToken } from "../fade-in-headline";
import RevealSection from "../reveal-section";

export const metadata: Metadata = {
  title: "Miguel Leça",
  description: "Designer",
};

const toolStack = [
  "Codex",
  "Figma",
  "Next.js",
  "Vercel",
  "Webflow",
  "Shadcn",
];

const aboutHeadline: HeadlineToken[] = [
  { text: "Usually" },
  { text: "a" },
  { text: "designer," },
  { text: "sometimes" },
  { text: "a" },
  { text: "builder," },
  { text: "always" },
  { text: "exploring." },
];

const experience = [
  {
    studio: "Superside",
    role: "UX/UI Designer",
    years: "2024 - Now",
    mark: "image",
    image: "/about/experience-superside.png",
  },
  {
    studio: "Independent Practice",
    role: "Designer",
    years: "2020 - Now",
    mark: "runner",
  },
  {
    studio: "chumbo",
    role: "Designer",
    years: "2021 - 2024",
    mark: "image",
    image: "/about/experience-chumbo.png",
  },
];

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-data text-[0.875rem] uppercase text-opacity">
      {children}
    </p>
  );
}

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="portfolio-shell portfolio-shell--page mx-auto w-full max-w-[700px] pb-6 pt-6 md:pb-10 md:pt-10 xl:pb-12 xl:pt-10">
        <RevealSection
          as="section"
          className="flex justify-start pt-0"
        >
          <div className="relative h-24 w-24 overflow-hidden rounded-[8px] bg-[color-mix(in_srgb,var(--foreground)_4%,transparent)] isolate">
            <img
              alt="Portrait of Miguel"
              className="block h-full w-full object-cover"
              src="/about/image2.png"
            />
          </div>
        </RevealSection>

        <RevealSection
          as="section"
          className="mt-8 flex max-w-[42rem] flex-col gap-5"
          delay={60}
        >
          <FadeInHeadline
            className="font-editorial max-w-[44rem] text-[1.22rem] leading-[1.2] text-foreground sm:text-[1.5rem]"
            tokens={aboutHeadline}
          />
          <div className="max-w-[44rem] space-y-4 text-[0.95rem] leading-[1.7] text-opacity">
            <p>
              I started in graphic design, but naturally found my way into the
              digital side of things.
            </p>
            <p>
              These days I&apos;m most excited by
              designing and building for the web, exploring AI, and following
              &ldquo;what if?&rdquo; ideas until they become something real.
              I&apos;m curious about people, products, and what technology
              makes possible.
            </p>
            <p>
              When I&apos;m not online, I&apos;m probably out running in the
              mountains.
            </p>
          </div>
        </RevealSection>

        <RevealSection
          as="section"
          className="mt-8 flex flex-col gap-3"
          delay={90}
        >
          <SectionLabel>Experience</SectionLabel>
          <div className="space-y-2.5 pt-[0.65rem]">
            {experience.map((item) => (
              <article
                key={`${item.studio}-${item.years}`}
                className="flex items-center gap-4"
              >
                <div
                  className="portfolio-chip-surface h-[56px] w-[56px] shrink-0 overflow-hidden rounded-[8px]"
                >
                  {item.mark === "runner" ? (
                    <AboutProximityMark />
                  ) : item.image ? (
                    <img
                      alt={`${item.studio} mark`}
                      className="about-experience-mark h-full w-full object-contain p-1.5"
                      src={item.image}
                    />
                  ) : null}
                </div>

                <div className="flex min-w-0 flex-1 items-center justify-between gap-4">
                  <div className="flex min-w-0 flex-wrap items-center gap-x-3 gap-y-0.5 text-[0.875rem] leading-[1.5]">
                    <p className="text-foreground">
                      {item.studio}
                    </p>
                    <p className="text-opacity">
                      {item.role}
                    </p>
                  </div>
                  <p className="shrink-0 text-[0.875rem] leading-[1.5] text-foreground">
                    {item.years}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </RevealSection>

        <RevealSection
          as="section"
          className="mt-8 flex max-w-[42rem] flex-col gap-3"
          delay={120}
        >
          <SectionLabel>Current Tool Stack</SectionLabel>

          <div className="flex flex-wrap gap-x-2 gap-y-1.5 pt-[0.65rem]">
            {toolStack.map((tool) => (
              <span
                key={tool}
                className="portfolio-chip"
              >
                {tool}
              </span>
            ))}
          </div>
        </RevealSection>

        <RevealSection
          as="section"
          className="mt-12"
          delay={150}
        >
          <p className="text-[0.95rem] leading-[1.7] text-opacity">
            Miguel Leça. 2026.
          </p>
        </RevealSection>
      </div>
    </main>
  );
}
