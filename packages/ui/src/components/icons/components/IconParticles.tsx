import { createIcon } from '../lib';

const dots = [
  { cx: 14, cy: 12, r: 6 },
  { cx: 60, cy: 8, r: 4.5 },
  { cx: 40, cy: 26, r: 5 },
  { cx: 22, cy: 44, r: 3.5 },
  { cx: 66, cy: 36, r: 5.5 },
  { cx: 48, cy: 50, r: 3 },
  { cx: 8, cy: 52, r: 2.5 },
];

const connections = [
  [0, 1],
  [1, 2],
  [2, 0],
  [2, 3],
  [2, 4],
  [4, 1],
  [3, 5],
  [4, 5],
  [3, 6],
];

export const IconParticles = createIcon({
  name: 'particles',
  viewBox: '0 0 80 60',
  children: (
    <>
      {connections.map(([a, b]) => (
        <line
          key={`${a}-${b}`}
          x1={dots[a].cx}
          y1={dots[a].cy}
          x2={dots[b].cx}
          y2={dots[b].cy}
          stroke="currentColor"
          strokeWidth="1"
          opacity={0.2}
        />
      ))}
      {dots.map(({ cx, cy, r }, i) => (
        <circle
          key={i}
          cx={cx}
          cy={cy}
          r={r}
          fill="currentColor"
          opacity={0.4 + (i % 3) * 0.2}
        />
      ))}
    </>
  ),
});
