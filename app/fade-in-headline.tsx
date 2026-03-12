"use client";

import { AnimatePresence, motion } from "framer-motion";
import type { CSSProperties } from "react";
import { useState } from "react";

import ImageReveal from "@/components/ui/image-tiles";

export type HeadlineToken = {
  text: string;
  className?: string;
  breakAfter?: boolean;
  previewClassName?: string;
  previewImage?: string;
};

type FadeInHeadlineProps = {
  className?: string;
  tokens: HeadlineToken[];
};

function HoverPreviewToken({
  token,
  index,
}: {
  token: HeadlineToken;
  index: number;
}) {
  const [isActive, setIsActive] = useState(false);

  return (
    <span className="relative inline-block align-baseline">
      <button
        type="button"
        className="relative inline-block cursor-pointer appearance-none border-0 bg-transparent p-0 text-left font-inherit leading-[inherit] outline-none"
        onMouseEnter={() => setIsActive(true)}
        onMouseLeave={() => setIsActive(false)}
        onFocus={() => setIsActive(true)}
        onBlur={() => setIsActive(false)}
      >
        <span
          className={`hero-fade-in__word transition-colors duration-200${token.className ? ` ${token.className}` : ""}`}
          style={
            {
              "--word-index": index,
              color: isActive ? "var(--accent)" : undefined,
            } as CSSProperties
          }
        >
          {token.text}
        </span>

        <AnimatePresence>
          {isActive ? (
            <motion.span
              className={`pointer-events-none absolute bottom-full z-30 mb-1 hidden sm:block ${token.previewClassName ?? "left-1/2 -translate-x-1/2"}`}
              initial={{ opacity: 0, y: 22 }}
              animate={{
                opacity: 1,
                y: 0,
                transition: {
                  opacity: {
                    duration: 0.2,
                    ease: [0.22, 1, 0.36, 1],
                  },
                  y: {
                    type: "spring",
                    stiffness: 210,
                    damping: 28,
                    mass: 1,
                  },
                },
              }}
              exit={{
                opacity: 0,
                y: 20,
                transition: {
                  y: {
                    duration: 0.24,
                    ease: [0.22, 1, 0.36, 1],
                  },
                  opacity: {
                    duration: 0.12,
                    delay: 0.05,
                    ease: [0.4, 0, 0.2, 1],
                  },
                },
              }}
            >
              <ImageReveal
                variant="single"
                middleImage={token.previewImage}
                className="my-0"
              />
            </motion.span>
          ) : null}
        </AnimatePresence>
      </button>
    </span>
  );
}

export default function FadeInHeadline({
  className,
  tokens,
}: FadeInHeadlineProps) {
  return (
    <h1 className={className}>
      {tokens.map((token, index) => (
        <span key={`${token.text}-${index}`}>
          {token.previewClassName ? (
            <HoverPreviewToken token={token} index={index} />
          ) : (
            <span
              className={`hero-fade-in__word${token.className ? ` ${token.className}` : ""}`}
              style={{ "--word-index": index } as CSSProperties}
            >
              {token.text}
            </span>
          )}
          {token.breakAfter ? (
            <>
              <br className="hidden sm:block" />
              <span className="sm:hidden"> </span>
            </>
          ) : index < tokens.length - 1 ? (
            " "
          ) : null}
        </span>
      ))}
    </h1>
  );
}
