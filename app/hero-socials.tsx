"use client";

import { useEffect, useRef, useState } from "react";
import { TextScramble } from "@/components/ui/text-scramble";

const DEFAULT_EMAIL_TOOLTIP = "COPY EMAIL";
const SUCCESS_EMAIL_TOOLTIP = "EMAIL COPIED!";
const EMAIL_RESET_DELAY_MS = 1800;

type SocialItem = {
  label: string;
  href?: string;
  copyValue?: string;
};

type HeroSocialsProps = {
  items: SocialItem[];
};

function dispatchCursorLabel(label: string | null) {
  window.dispatchEvent(
    new CustomEvent("portfolio-cursor-label", {
      detail: { label },
    }),
  );
}

export default function HeroSocials({ items }: HeroSocialsProps) {
  const [emailTooltip, setEmailTooltip] = useState(DEFAULT_EMAIL_TOOLTIP);
  const [emailHovered, setEmailHovered] = useState(false);
  const resetTimeoutRef = useRef<number | null>(null);
  const emailHoveredRef = useRef(false);

  useEffect(() => {
    return () => {
      if (resetTimeoutRef.current !== null) {
        window.clearTimeout(resetTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    emailHoveredRef.current = emailHovered;
  }, [emailHovered]);

  useEffect(() => {
    if (emailHovered) {
      dispatchCursorLabel(emailTooltip);
    }
  }, [emailHovered, emailTooltip]);

  async function handleEmailCopy(copyValue: string) {
    if (resetTimeoutRef.current !== null) {
      window.clearTimeout(resetTimeoutRef.current);
    }

    try {
      await navigator.clipboard.writeText(copyValue);
      setEmailTooltip(SUCCESS_EMAIL_TOOLTIP);
      dispatchCursorLabel(SUCCESS_EMAIL_TOOLTIP);

      resetTimeoutRef.current = window.setTimeout(() => {
        setEmailTooltip(DEFAULT_EMAIL_TOOLTIP);
        if (emailHoveredRef.current) {
          dispatchCursorLabel(DEFAULT_EMAIL_TOOLTIP);
        }
      }, EMAIL_RESET_DELAY_MS);
    } catch {
      setEmailTooltip(DEFAULT_EMAIL_TOOLTIP);
      if (emailHoveredRef.current) {
        dispatchCursorLabel(DEFAULT_EMAIL_TOOLTIP);
      }
    }
  }

  return (
    <nav aria-label="Social links" className="flex flex-wrap gap-x-7 gap-y-2 pt-1">
      {items.map((item) => {
        const copyValue = item.copyValue;

        if (copyValue) {
          return (
            <button
              key={item.label}
              type="button"
              className="portfolio-inline-link portfolio-social-link portfolio-social-button"
              data-cursor-label={emailTooltip}
              onClick={() => handleEmailCopy(copyValue)}
              onPointerEnter={() => {
                setEmailHovered(true);
                dispatchCursorLabel(emailTooltip);
              }}
              onPointerLeave={() => {
                setEmailHovered(false);
                dispatchCursorLabel(null);
              }}
            >
              <TextScramble
                text={item.label}
                className="w-full"
                textClassName="font-data text-[14px] leading-none tracking-[-0.01em] uppercase"
                idleCharacterClassName="text-[var(--opacity)]"
                hoveredCharacterClassName="text-foreground"
                scrambleCharacterClassName="text-primary scale-110"
                showUnderline={false}
                showGlow={false}
              />
            </button>
          );
        }

        return (
          <a
            key={item.label}
            className="portfolio-inline-link portfolio-social-link"
            href={item.href}
            target="_blank"
            rel="noreferrer"
          >
            <TextScramble
              text={item.label}
              className="w-full"
              textClassName="font-data text-[14px] leading-none tracking-[-0.01em] uppercase"
              idleCharacterClassName="text-[var(--opacity)]"
              hoveredCharacterClassName="text-foreground"
              scrambleCharacterClassName="text-primary scale-110"
              showUnderline={false}
              showGlow={false}
            />
          </a>
        );
      })}
    </nav>
  );
}
