"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&*";

interface TextScrambleProps {
  text: string;
  className?: string;
  textClassName?: string;
  idleCharacterClassName?: string;
  hoveredCharacterClassName?: string;
  scrambleCharacterClassName?: string;
  showUnderline?: boolean;
  underlineClassName?: string;
  underlineTrackClassName?: string;
  showGlow?: boolean;
  glowClassName?: string;
}

function joinClasses(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function TextScramble({
  text,
  className = "",
  textClassName = "",
  idleCharacterClassName = "text-foreground",
  hoveredCharacterClassName = idleCharacterClassName,
  scrambleCharacterClassName = "text-primary scale-110",
  showUnderline = true,
  underlineClassName = "bg-foreground",
  underlineTrackClassName = "bg-border",
  showGlow = true,
  glowClassName = "bg-primary/5",
}: TextScrambleProps) {
  const [displayText, setDisplayText] = useState(text);
  const [isHovering, setIsHovering] = useState(false);
  const [isScrambling, setIsScrambling] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const frameRef = useRef(0);

  const scramble = useCallback(() => {
    setIsScrambling(true);
    frameRef.current = 0;
    const duration = Math.max(text.length * 3, 1);

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(() => {
      frameRef.current += 1;

      const progress = frameRef.current / duration;
      const revealedLength = Math.floor(progress * text.length);

      const nextText = text
        .split("")
        .map((char, index) => {
          if (char === " ") {
            return "\u00A0";
          }

          if (index < revealedLength) {
            return text[index];
          }

          return CHARS[Math.floor(Math.random() * CHARS.length)];
        })
        .join("");

      setDisplayText(nextText);

      if (frameRef.current >= duration) {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }

        setDisplayText(text);
        setIsScrambling(false);
      }
    }, 30);
  }, [text]);

  useEffect(() => {
    setDisplayText(text);
  }, [text]);

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return (
    <span
      className={joinClasses(
        "group relative inline-flex select-none flex-col",
        className,
      )}
      onMouseEnter={() => {
        setIsHovering(true);
        scramble();
      }}
      onMouseLeave={() => {
        setIsHovering(false);
      }}
    >
      <span className={joinClasses("relative", textClassName)}>
        {displayText.split("").map((char, index) => {
          const isActiveScramble = isScrambling && char !== text[index];

          return (
            <span
              key={`${text}-${index}`}
              className={joinClasses(
                "inline-block transition-all duration-150",
                isHovering
                  ? hoveredCharacterClassName
                  : idleCharacterClassName,
                isActiveScramble && scrambleCharacterClassName,
              )}
              style={{
                transitionDelay: `${index * 10}ms`,
              }}
            >
              {char === " " ? "\u00A0" : char}
            </span>
          );
        })}
      </span>

      {showUnderline ? (
        <span className="relative mt-2 h-px w-full overflow-hidden">
          <span
            className={joinClasses(
              "absolute inset-0 origin-left transition-transform duration-500 ease-out",
              underlineClassName,
              isHovering ? "scale-x-100" : "scale-x-0",
            )}
          />
          <span
            className={joinClasses("absolute inset-0", underlineTrackClassName)}
          />
        </span>
      ) : null}

      {showGlow ? (
        <span
          className={joinClasses(
            "absolute -inset-4 -z-10 rounded-lg transition-opacity duration-300",
            glowClassName,
            isHovering ? "opacity-100" : "opacity-0",
          )}
        />
      ) : null}
    </span>
  );
}
