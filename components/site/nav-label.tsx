"use client";

import { TextScramble } from "@/components/ui/text-scramble";

export default function NavLabel({ text }: { text: string }) {
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
