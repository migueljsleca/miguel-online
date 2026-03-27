/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import Link from "next/link";
import AboutRunnerMark from "@/components/about/about-runner-mark";
import NavLabel from "@/components/site/nav-label";
import ImageReveal from "@/components/ui/image-tiles";
import RevealSection from "../reveal-section";
import ThemeToggle from "../theme-toggle";

export const metadata: Metadata = {
  title: "About | Miguel",
  description:
    "About Miguel, a designer based in Madeira Island focused on product thinking, interface systems, and disciplined visual craft.",
};

const navigation = [
  { label: "Home", href: "/" },
  { label: "Selected Work", href: "/#selected-work" },
  { label: "About", href: "/about" },
];

const toolStack = [
  "Figma",
  "Framer Motion",
  "React",
  "Next.js",
  "Tailwind CSS",
  "TypeScript",
  "Node.js",
  "Vercel",
  "Shadcn UI",
  "Spline",
];

const experience = [
  {
    studio: "Superside",
    role: "UX/UI Designer",
    years: "2024 - Now",
    mark: "image",
    image:
      "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/5a3dc6ec-260b-4202-99b6-95bae20964b0",
    summary:
      "Leading web services work across product, landing pages, and experimentation, with a focus on design systems, execution quality, and digital clarity.",
  },
  {
    studio: "Independent Practice",
    role: "Designer",
    years: "2020 - Now",
    mark: "runner",
    summary:
      "Partnering with clients on digital products, brand systems, and web experiences that balance product thinking with disciplined visual craft.",
  },
  {
    studio: "chumbo",
    role: "Designer",
    years: "2021 - 2024",
    mark: "image",
    image:
      "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/e82272fe-1cfe-4c6a-a3ea-95a7ecf8bf0a",
    summary:
      "Worked across brand, interface, and communication projects, building a stronger sense of narrative structure, typography, and deliberate systems thinking.",
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
      <aside className="portfolio-rail-wrap">
        <nav aria-label="Primary" className="portfolio-rail">
          {navigation.map((item) => (
            <Link key={item.label} className="portfolio-rail__link" href={item.href}>
              <NavLabel text={item.label} />
            </Link>
          ))}
          <ThemeToggle />
        </nav>
      </aside>

      <div className="portfolio-shell mx-auto w-full max-w-[800px] px-6 pb-6 pt-0 sm:px-8 md:pb-10 md:pt-0 xl:px-0 xl:pb-12 xl:pt-0">
        <RevealSection
          as="section"
          className="flex justify-start pt-0"
        >
          <ImageReveal
            variant="fan"
            className="my-0 origin-top-left scale-85"
          />
        </RevealSection>

        <RevealSection
          as="section"
          className="mt-8 flex flex-col gap-3"
          delay={90}
        >
          <SectionLabel>Experience</SectionLabel>
          <div className="space-y-6 pt-[0.65rem]">
            {experience.map((item) => (
              <article
                key={`${item.studio}-${item.years}`}
                className="flex items-start gap-6"
              >
                <div
                  className="portfolio-chip-surface h-[79px] w-[79px] shrink-0 overflow-hidden rounded-[8px]"
                >
                  {item.mark === "runner" ? (
                    <AboutRunnerMark />
                  ) : item.image ? (
                    <img
                      alt={`${item.studio} mark`}
                      className="about-experience-mark h-full w-full object-contain p-2"
                      src={item.image}
                    />
                  ) : null}
                </div>

                <div className="flex min-w-0 flex-1 flex-col gap-4">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                    <div className="flex min-w-0 flex-wrap items-start gap-x-2 gap-y-0.5 text-[0.875rem] leading-[1.5]">
                      <p className="text-foreground">
                        {item.studio}
                      </p>
                      <p className="text-opacity">
                        {item.role}
                      </p>
                    </div>
                    <p className="shrink-0 text-[0.875rem] leading-[1.5] text-foreground sm:pl-6">
                      {item.years}
                    </p>
                  </div>
                  <p className="w-full text-[0.875rem] leading-[1.55] text-opacity">
                    {item.summary}
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
      </div>
    </main>
  );
}
