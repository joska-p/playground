import { createIcon } from '../lib';

const nodes = [
  { id: 'a', cx: 14, cy: 30 },
  { id: 'b', cx: 36, cy: 10 },
  { id: 'c', cx: 66, cy: 18 },
  { id: 'd', cx: 72, cy: 46 },
  { id: 'e', cx: 42, cy: 52 },
  { id: 'f', cx: 20, cy: 52 },
];
const edges = [
  ['a', 'b'],
  ['a', 'f'],
  ['b', 'c'],
  ['b', 'e'],
  ['c', 'd'],
  ['d', 'e'],
  ['e', 'f'],
  ['b', 'f'],
] as const;

const pos = Object.fromEntries(nodes.map((n) => [n.id, n]));

export const IconSimulation = createIcon({
  name: 'simulation',
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
          opacity={0.25}
        />
      ))}
      {nodes.map(({ id, cx, cy }) => (
        <circle
          key={id}
          cx={cx}
          cy={cy}
          r={4}
          fill="currentColor"
          opacity={0.8}
        />
      ))}
    </>
  ),
});
