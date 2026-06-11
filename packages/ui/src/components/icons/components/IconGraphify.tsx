import { createIcon } from '../lib';

const nodes = [
  { id: 'a', cx: 56, cy: 8 },
  { id: 'b', cx: 56, cy: 30 },
  { id: 'c', cx: 56, cy: 52 },
  { id: 'd', cx: 24, cy: 18 },
  { id: 'e', cx: 8, cy: 38 },
  { id: 'f', cx: 40, cy: 40 },
];

const edges = [
  ['a', 'b'], ['a', 'd'],
  ['b', 'c'], ['b', 'f'],
  ['d', 'e'], ['d', 'f'],
  ['e', 'f'],
];

const pos = Object.fromEntries(nodes.map((n) => [n.id, n]));

export const IconGraphify = createIcon({
  name: 'graphify',
  viewBox: '0 0 80 60',
  children: (
    <>
      {edges.map(([a, b]) => (
        <line
          key={`${a}-${b}`}
          x1={pos[a].cx}
          y1={pos[a].cy}
          x2={pos[b].cx}
          y2={pos[b].cy}
          stroke="currentColor"
          strokeWidth="1"
          opacity={0.3}
        />
      ))}
      {nodes.map(({ cx, cy }, i) => (
        <circle
          key={i}
          cx={cx}
          cy={cy}
          r="4"
          fill="currentColor"
          opacity={i === 0 ? 0.9 : 0.5 + (i % 3) * 0.15}
        />
      ))}
      {nodes.map(({ cx, cy }, i) => (
        <circle
          key={`o-${i}`}
          cx={cx}
          cy={cy}
          r="6"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          opacity={0.2}
        />
      ))}
    </>
  ),
});
