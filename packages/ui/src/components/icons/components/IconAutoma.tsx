import { createIcon } from '../lib';

const cols = 8;
const rows = 6;
const size = 8;
const gap = 1.5;
const totalW = cols * size + (cols - 1) * gap;
const totalH = rows * size + (rows - 1) * gap;
const startX = (80 - totalW) / 2;
const startY = (60 - totalH) / 2;

const grid = [
  [0, 0, 1, 0, 0, 0, 1, 0],
  [0, 0, 0, 1, 0, 1, 0, 0],
  [0, 0, 1, 1, 1, 0, 0, 0],
  [0, 0, 0, 1, 0, 0, 0, 0],
  [0, 1, 1, 0, 1, 1, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
];

export const IconAutoma = createIcon({
  name: 'automa',
  viewBox: '0 0 80 60',
  children: (
    <>
      {grid.map((row, r) =>
        row.map((cell, c) =>
          cell ? (
            <rect
              key={`${r}-${c}`}
              x={startX + c * (size + gap)}
              y={startY + r * (size + gap)}
              width={size}
              height={size}
              rx={1.5}
              fill="currentColor"
              opacity={0.5 + (r % 3) * 0.15}
            />
          ) : null
        )
      )}
    </>
  ),
});
