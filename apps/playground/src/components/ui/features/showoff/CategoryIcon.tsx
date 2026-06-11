import type { Category } from './types';

type IconProps = {
  /** Whether the parent card is being hovered */
  hovered: boolean;
};

// ─── Individual icons ──────────────────────────────────────────────────────────

function GenerativeIcon({ hovered }: IconProps) {
  return (
    <svg
      viewBox="0 0 80 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      {/* Three sinusoidal waves stacked */}
      <path
        d="M0,20 C6,8 14,8 20,20 C26,32 34,32 40,20 C46,8 54,8 60,20 C66,32 74,32 80,20"
        stroke="currentColor"
        strokeWidth="2"
        opacity={hovered ? 1 : 0.9}
        className="transition-opacity duration-300"
      />
      <path
        d="M0,30 C6,18 14,18 20,30 C26,42 34,42 40,30 C46,18 54,18 60,30 C66,42 74,42 80,30"
        stroke="currentColor"
        strokeWidth="1.5"
        opacity={hovered ? 0.7 : 0.5}
        className="transition-opacity duration-300"
      />
      <path
        d="M0,40 C6,28 14,28 20,40 C26,52 34,52 40,40 C46,28 54,28 60,40 C66,52 74,52 80,40"
        stroke="currentColor"
        strokeWidth="1"
        opacity={hovered ? 0.4 : 0.25}
        className="transition-opacity duration-300"
      />
    </svg>
  );
}

function ColorIcon({ hovered }: IconProps) {
  return (
    <svg
      viewBox="0 0 80 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      {/* Three overlapping circles — Venn-diagram style */}
      <circle
        cx="40"
        cy="22"
        r="18"
        fill="currentColor"
        opacity={hovered ? 0.75 : 0.6}
        className="transition-opacity duration-300"
      />
      <circle
        cx="27"
        cy="42"
        r="18"
        fill="currentColor"
        opacity={hovered ? 0.55 : 0.4}
        className="transition-opacity duration-300"
      />
      <circle
        cx="53"
        cy="42"
        r="18"
        fill="currentColor"
        opacity={hovered ? 0.55 : 0.4}
        className="transition-opacity duration-300"
      />
    </svg>
  );
}

function ImageIcon({ hovered }: IconProps) {
  // 6 × 5 pixel grid
  const cols = 6;
  const rows = 5;
  const size = 10;
  const gap = 2;
  const totalW = cols * size + (cols - 1) * gap;
  const totalH = rows * size + (rows - 1) * gap;
  const startX = (80 - totalW) / 2;
  const startY = (60 - totalH) / 2;

  // Checkerboard-ish pattern with opacity variation
  const opacities = [
    [0.9, 0.3, 0.7, 0.2, 0.8, 0.4],
    [0.2, 0.8, 0.1, 0.9, 0.3, 0.7],
    [0.6, 0.2, 0.95, 0.4, 0.6, 0.2],
    [0.1, 0.7, 0.3, 0.7, 0.1, 0.9],
    [0.8, 0.4, 0.6, 0.2, 0.5, 0.3],
  ];

  return (
    <svg
      viewBox="0 0 80 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      {opacities.map((row, r) =>
        row.map((op, c) => (
          <rect
            key={`${r}-${c}`}
            x={startX + c * (size + gap)}
            y={startY + r * (size + gap)}
            width={size}
            height={size}
            fill="currentColor"
            opacity={hovered ? Math.min(op + 0.15, 1) : op}
            className="transition-opacity duration-300"
          />
        ))
      )}
    </svg>
  );
}

function DataVizIcon({ hovered }: IconProps) {
  const bars = [
    { x: 6, h: 22 },
    { x: 20, h: 42 },
    { x: 34, h: 30 },
    { x: 48, h: 52 },
    { x: 62, h: 18 },
  ];
  const baseline = 56;
  const barW = 12;

  return (
    <svg
      viewBox="0 0 80 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      {/* Baseline */}
      <line
        x1="2"
        y1={baseline}
        x2="78"
        y2={baseline}
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.3"
      />
      {bars.map(({ x, h }, i) => (
        <rect
          key={i}
          x={x}
          y={baseline - h}
          width={barW}
          height={h}
          fill="currentColor"
          opacity={hovered ? 0.9 : 0.75 - i * 0.04}
          className="transition-opacity duration-300"
        />
      ))}
    </svg>
  );
}

function RandomIcon({ hovered }: IconProps) {
  const dots = [
    { cx: 12, cy: 14, r: 4.5 },
    { cx: 35, cy: 8, r: 6 },
    { cx: 60, cy: 18, r: 3 },
    { cx: 72, cy: 10, r: 5 },
    { cx: 22, cy: 36, r: 7 },
    { cx: 50, cy: 42, r: 4 },
    { cx: 68, cy: 46, r: 5.5 },
    { cx: 8, cy: 52, r: 3 },
    { cx: 40, cy: 54, r: 4.5 },
    { cx: 76, cy: 34, r: 2.5 },
  ];

  return (
    <svg
      viewBox="0 0 80 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      {dots.map(({ cx, cy, r }, i) => (
        <circle
          key={i}
          cx={cx}
          cy={cy}
          r={r}
          fill="currentColor"
          opacity={hovered ? 0.85 : 0.5 + (i % 3) * 0.15}
          className="transition-opacity duration-300"
        />
      ))}
    </svg>
  );
}

function SimulationIcon({ hovered }: IconProps) {
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

  return (
    <svg
      viewBox="0 0 80 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      {/* Edges */}
      {edges.map(([a, b]) => (
        <line
          key={`${a}-${b}`}
          x1={pos[a].cx}
          y1={pos[a].cy}
          x2={pos[b].cx}
          y2={pos[b].cy}
          stroke="currentColor"
          strokeWidth="1"
          opacity={hovered ? 0.45 : 0.25}
          className="transition-opacity duration-300"
        />
      ))}
      {/* Nodes */}
      {nodes.map(({ id, cx, cy }) => (
        <circle
          key={id}
          cx={cx}
          cy={cy}
          r={4}
          fill="currentColor"
          opacity={hovered ? 1 : 0.8}
          className="transition-opacity duration-300"
        />
      ))}
    </svg>
  );
}

// ─── Public switcher ───────────────────────────────────────────────────────────

interface CategoryIconProps extends IconProps {
  category: Category;
}

export function CategoryIcon({ category, hovered }: CategoryIconProps) {
  switch (category) {
    case 'generative':
      return <GenerativeIcon hovered={hovered} />;
    case 'color':
      return <ColorIcon hovered={hovered} />;
    case 'image':
      return <ImageIcon hovered={hovered} />;
    case 'data-viz':
      return <DataVizIcon hovered={hovered} />;
    case 'random':
      return <RandomIcon hovered={hovered} />;
    case 'simulation':
      return <SimulationIcon hovered={hovered} />;
  }
}
