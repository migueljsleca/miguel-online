"use client";

import type { CSSProperties } from "react";
import { useMemo, useState } from "react";

const COLS = 4;
const ROWS = 4;

type Point = {
  x: number;
  y: number;
};

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export default function AboutProximityMark() {
  const [pointer, setPointer] = useState<Point | null>(null);

  const cells = useMemo(
    () =>
      Array.from({ length: COLS * ROWS }, (_, index) => {
        const col = index % COLS;
        const row = Math.floor(index / COLS);
        return { col, row, index };
      }),
    [],
  );

  return (
    <div
      aria-hidden="true"
      className="about-proximity-mark"
      onPointerLeave={() => setPointer(null)}
      onPointerMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        setPointer({
          x: (event.clientX - rect.left) / rect.width,
          y: (event.clientY - rect.top) / rect.height,
        });
      }}
    >
      {cells.map((cell) => {
        const centerX = (cell.col + 0.5) / COLS;
        const centerY = (cell.row + 0.5) / ROWS;

        let shiftX = 0;
        let shiftY = 0;
        let scale = 0.64;
        let opacity = 0.34;
        let radius = 999;

        if (pointer) {
          const deltaX = pointer.x - centerX;
          const deltaY = pointer.y - centerY;
          const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
          const influence = clamp(1 - distance / 0.76, 0, 1);

          shiftX = deltaX * 1.5 * influence;
          shiftY = deltaY * 1.5 * influence;
          scale = 0.64 + influence * 0.62;
          opacity = 0.34 + influence * 0.34;
          radius = 999 - influence * 620;
        }

        return (
          <span
            key={cell.index}
            className="about-proximity-mark__cell"
            style={
              {
                transform: `translate(${shiftX}px, ${shiftY}px) scale(${scale})`,
                opacity,
                borderRadius: `${radius}px`,
              } as CSSProperties
            }
          />
        );
      })}
    </div>
  );
}
