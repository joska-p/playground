import { createIcon } from '../lib';

const cells = [
  { x: 2, y: 2, w: 24, h: 24, op: 0.9 },
  { x: 28, y: 2, w: 22, h: 24, op: 0.4 },
  { x: 52, y: 2, w: 26, h: 14, op: 0.7 },
  { x: 52, y: 18, w: 26, h: 8, op: 0.3 },
  { x: 2, y: 28, w: 14, h: 30, op: 0.6 },
  { x: 18, y: 28, w: 32, h: 14, op: 0.85 },
  { x: 18, y: 44, w: 16, h: 14, op: 0.35 },
  { x: 36, y: 28, w: 14, h: 30, op: 0.2 },
  { x: 52, y: 28, w: 26, h: 30, op: 0.55 }
];

export const IconMosaic = createIcon({
  name: 'mosaic',
  viewBox: '0 0 80 60',
  children: (
    <>
      {cells.map((cell, i) => (
        <rect
          key={i}
          x={cell.x}
          y={cell.y}
          width={cell.w}
          height={cell.h}
          fill="currentColor"
          opacity={cell.op}
        />
      ))}
    </>
  )
});
