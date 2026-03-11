import type { CSSProperties } from "react";

type HeadlineToken = {
  text: string;
  className?: string;
  breakAfter?: boolean;
};

type FadeInHeadlineProps = {
  className?: string;
  tokens: HeadlineToken[];
};

export default function FadeInHeadline({
  className,
  tokens,
}: FadeInHeadlineProps) {
  return (
    <h1 className={className}>
      {tokens.map((token, index) => (
        <span key={`${token.text}-${index}`}>
          <span
            className={`hero-fade-in__word${token.className ? ` ${token.className}` : ""}`}
            style={{ "--word-index": index } as CSSProperties}
          >
            {token.text}
          </span>
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
