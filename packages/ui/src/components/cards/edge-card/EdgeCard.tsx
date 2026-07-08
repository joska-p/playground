// --- 1. Seeded PRNG (Mulberry32) ---
// Generates deterministic random numbers based on a seed.
function mulberry32(seed: number) {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// --- 2. The Path Generator ---
function generateEdgePaths(seed: number) {
  const rand = mulberry32(seed);
  const size = 300;
  let openPaths = '';
  let closedPaths = '';
  const dots = [];

  // Generate open, flowing edge curves (like fabric or topographic lines)
  const numCurves = 4 + Math.floor(rand() * 4);
  for (let c = 0; c < numCurves; c++) {
    let x = 20 + rand() * (size - 40);
    let y = 20 + rand() * (size - 40);
    const segs = 8 + Math.floor(rand() * 10);

    openPaths += `M${x.toFixed(1)},${y.toFixed(1)}`;

    for (let i = 0; i < segs; i++) {
      const x2 = Math.max(10, Math.min(size - 10, x + (rand() - 0.5) * 90));
      const y2 = Math.max(10, Math.min(size - 10, y + (rand() - 0.5) * 90));
      const cx = (x + x2) / 2 + (rand() - 0.5) * 40;
      const cy = (y + y2) / 2 + (rand() - 0.5) * 40;
      openPaths += ` Q${cx.toFixed(1)},${cy.toFixed(1)} ${x2.toFixed(1)},${y2.toFixed(1)}`;
      x = x2;
      y = y2;
    }
  }

  // Generate closed, jagged polygons (like detected object silhouettes)
  const numShapes = 1 + Math.floor(rand() * 2);
  for (let s = 0; s < numShapes; s++) {
    const cx = 60 + rand() * (size - 120);
    const cy = 60 + rand() * (size - 120);
    const r = 30 + rand() * 60;
    const points = 6 + Math.floor(rand() * 6);

    for (let i = 0; i <= points; i++) {
      const angle = (i / points) * Math.PI * 2;
      const rr = r * (0.7 + rand() * 0.6);
      const px = cx + Math.cos(angle) * rr;
      const py = cy + Math.sin(angle) * rr;

      if (i === 0) closedPaths += `M${px.toFixed(1)},${py.toFixed(1)}`;
      else closedPaths += ` L${px.toFixed(1)},${py.toFixed(1)}`;
    }
    closedPaths += ' Z';
  }

  // Generate sample dots
  for (let i = 0; i < 12; i++) {
    dots.push({
      cx: (rand() * size).toFixed(1),
      cy: (rand() * size).toFixed(1),
      r: 0.8 + rand() * 0.8
    });
  }

  return { openPaths, closedPaths, dots };
}

// --- 3. The React Component ---

export type EdgeCardProps = {
  seed: number;
  id: string;
  title: string;
  classification: string;
  density: string;
  resolution: string;
  color?: string; // e.g. 'var(--blue)', 'var(--orange)'
};

export function EdgeCard({
  seed,
  id,
  title,
  classification,
  density,
  resolution,
  color = 'var(--glow-color)'
}: EdgeCardProps) {
  const paths = generateEdgePaths(seed);

  return (
    <div
      className="group relative aspect-square overflow-hidden border p-5 transition-all duration-450 ease-in-out"
      style={
        {
          borderColor: `color-mix(in oklch, ${color} 22%, transparent)`,
          backgroundColor: 'color-mix(in oklch, var(--surface) 25%, transparent)',
          backdropFilter: 'blur(8px)',
          '--mx': '50%',
          '--my': '50%',
          '--glow': color
        } as React.CSSProperties
      }
    >
      {/* Radial mouse-tracking glow */}
      <div
        className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-400"
        style={{
          background: `radial-gradient(circle at var(--mx) var(--my), color-mix(in oklch, ${color} 18%, transparent), transparent 50%)`
        }}
      />

      {/* Hover border glow */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-450 group-hover:opacity-100"
        style={{
          boxShadow: `0 0 50px color-mix(in oklch, ${color} 25%, transparent), inset 0 0 60px color-mix(in oklch, ${color} 6%, transparent)`,
          border: '1px solid color-mix(in oklch, var(--glow) 75%, transparent)'
        }}
      />

      {/* The generated SVG lines */}
      <svg
        className="absolute inset-0 z-0 h-full w-full opacity-40 transition-all duration-500 group-hover:opacity-100"
        style={{ filter: `drop-shadow(0 0 6px ${color})` }}
        viewBox="0 0 300 300"
        preserveAspectRatio="none"
      >
        <path
          d={paths.openPaths}
          fill="none"
          stroke={color}
          strokeWidth="0.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.85"
        />
        <path
          d={paths.closedPaths}
          fill="none"
          stroke={color}
          strokeWidth="0.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.85"
        />
        {paths.dots.map((dot, i) => (
          <circle
            key={i}
            cx={dot.cx}
            cy={dot.cy}
            r={dot.r}
            fill={color}
            opacity="0.55"
          />
        ))}
      </svg>

      {/* Card Content */}
      <div className="relative z-20 flex h-full flex-col justify-between">
        <div className="flex items-start justify-between">
          <span
            className="text-[10px] font-medium tracking-widest"
            style={{ color }}
          >
            {id}
          </span>
          <span
            className="text-foreground-dim border px-2 py-1 text-[9px] tracking-wider uppercase"
            style={{ borderColor: 'var(--border)' }}
          >
            {classification}
          </span>
        </div>

        <div className="mt-auto">
          <h3 className="text-foreground mb-1.5 text-xl font-light tracking-tight transition-colors group-hover:text-[var(--glow)]">
            {title}
          </h3>
          <div
            className="text-foreground-dim mt-3 flex justify-between border-t pt-3 text-[10px] tracking-wider"
            style={{ borderColor: 'var(--border)' }}
          >
            <span>{resolution}</span>
            <span style={{ color }}>{density}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
