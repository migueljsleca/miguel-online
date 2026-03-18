import type { Metadata } from "next";
import Link from "next/link";
import ImageReveal from "@/components/ui/image-tiles";
import { TextScramble } from "@/components/ui/text-scramble";
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
      </div>
    </main>
  );
}
