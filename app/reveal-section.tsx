"use client";

import type { CSSProperties, HTMLAttributes } from "react";
import { useEffect, useRef, useState } from "react";

type RevealSectionProps = {
  as?: "div" | "section";
  children: React.ReactNode;
  className?: string;
  delay?: number;
  id?: string;
} & HTMLAttributes<HTMLElement>;

export default function RevealSection({
  as: Component = "section",
  children,
  className,
  delay = 0,
  id,
  style,
  ...rest
}: RevealSectionProps) {
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) {
          return;
        }

        setIsVisible(true);
        observer.disconnect();
      },
      {
        threshold: 0.2,
        rootMargin: "0px 0px -10% 0px",
      },
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <Component
      id={id}
      ref={ref}
      className={`reveal-section${className ? ` ${className}` : ""}`}
      data-visible={isVisible}
      style={{
        "--reveal-delay": `${delay}ms`,
        ...style,
      } as CSSProperties}
      {...rest}
    >
      {children}
    </Component>
  );
}
