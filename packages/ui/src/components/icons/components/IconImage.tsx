import { createIcon } from '../lib';

const cols = 6;
const rows = 5;
const size = 10;
const gap = 2;
const totalW = cols * size + (cols - 1) * gap;
const totalH = rows * size + (rows - 1) * gap;
const startX = (80 - totalW) / 2;
const startY = (60 - totalH) / 2;

const opacities = [
  [0.9, 0.3, 0.7, 0.2, 0.8, 0.4],
  [0.2, 0.8, 0.1, 0.9, 0.3, 0.7],
  [0.6, 0.2, 0.95, 0.4, 0.6, 0.2],
  [0.1, 0.7, 0.3, 0.7, 0.1, 0.9],
  [0.8, 0.4, 0.6, 0.2, 0.5, 0.3],
];

export const IconImage = createIcon({
  name: 'image',
  viewBox: '0 0 80 60',
  children: (
    <>
      {opacities.map((row, r) =>
        row.map((op, c) => (
          <rect
            key={`${r}-${c}`}
            x={startX + c * (size + gap)}
            y={startY + r * (size + gap)}
            width={size}
            height={size}
            fill="currentColor"
            opacity={op}
          />
        ))
      )}
    </>
  ),
});
