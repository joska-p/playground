import { createIcon } from '../lib';

const swatches = [
  { w: 64, op: 0.9 },
  { w: 48, op: 0.6 },
  { w: 56, op: 0.75 },
  { w: 36, op: 0.4 },
  { w: 52, op: 0.8 },
];

const yStart = 6;
const barH = 9;
const gap = 3;

export const IconPalettes = createIcon({
  name: 'palettes',
  viewBox: '0 0 80 60',
  children: (
    <>
      {swatches.map(({ w, op }, i) => (
        <rect
          key={i}
          x={8}
          y={yStart + i * (barH + gap)}
          width={w}
          height={barH}
          rx={3}
          fill="currentColor"
          opacity={op}
        />
      ))}
    </>
  ),
});
