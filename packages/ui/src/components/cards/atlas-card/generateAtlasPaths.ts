// Deterministic Atlas-detection style artwork generator.
// Every AtlasCard renders a unique "scan" made of open curves, closed
// silhouettes, and sample points, seeded so the same `seed` always
// produces the same artwork.

export interface AtlasDot {
  cx: string;
  cy: string;
  r: string;
  /** CSS time value (e.g. "1.2s"), used to stagger the optional pulse animation */
  delay: string;
}

export interface AtlasCardPaths {
  openPaths: string;
  /** Total length (SVG user units) of `openPaths`, for stroke-dashoffset draw-on animation. */
  openPathLength: number;
  closedPaths: string;
  /** Total length (SVG user units) of `closedPaths`, for stroke-dashoffset draw-on animation. */
  closedPathLength: number;
  dots: AtlasDot[];
}

interface PathResult {
  d: string;
  length: number;
}

function distance(x0: number, y0: number, x1: number, y1: number): number {
  return Math.hypot(x1 - x0, y1 - y0);
}

/**
 * Rough (deliberately over-)estimate of a quadratic bezier's length, using the
 * control-polygon length (start→control + control→end) instead of sampling
 * the curve. This is always >= the true curve length, which matters for the
 * stroke-dashoffset draw-on effect: overestimating just means the line
 * finishes drawing a touch before the animation ends and then holds — safe.
 * Underestimating would leave a stretch of the curve permanently undrawn.
 */
function quadLength(
  x0: number,
  y0: number,
  cx: number,
  cy: number,
  x1: number,
  y1: number
): number {
  return distance(x0, y0, cx, cy) + distance(cx, cy, x1, y1);
}

/** Mulberry32 — small, fast, deterministic PRNG. */
export function mulberry32(seed: number) {
  return function random() {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const SIZE = 300;

/** Open, flowing curves — reads like fabric folds or topographic contours. */
function buildOpenPaths(rand: () => number): PathResult {
  const numCurves = 4 + Math.floor(rand() * 4);
  let d = '';
  let length = 0;

  for (let c = 0; c < numCurves; c++) {
    let x = 20 + rand() * (SIZE - 40);
    let y = 20 + rand() * (SIZE - 40);
    const segments = 8 + Math.floor(rand() * 10);

    d += `M${x.toFixed(1)},${y.toFixed(1)}`;

    for (let i = 0; i < segments; i++) {
      const x2 = Math.max(10, Math.min(SIZE - 10, x + (rand() - 0.5) * 90));
      const y2 = Math.max(10, Math.min(SIZE - 10, y + (rand() - 0.5) * 90));
      const cx = (x + x2) / 2 + (rand() - 0.5) * 40;
      const cy = (y + y2) / 2 + (rand() - 0.5) * 40;
      d += ` Q${cx.toFixed(1)},${cy.toFixed(1)} ${x2.toFixed(1)},${y2.toFixed(1)}`;
      length += quadLength(x, y, cx, cy, x2, y2);
      x = x2;
      y = y2;
    }
  }

  return { d, length };
}

/** Closed, jagged polygons — reads like detected object silhouettes. */
function buildClosedPaths(rand: () => number): PathResult {
  const numShapes = 1 + Math.floor(rand() * 2);
  let d = '';
  let length = 0;

  for (let s = 0; s < numShapes; s++) {
    const cx = 60 + rand() * (SIZE - 120);
    const cy = 60 + rand() * (SIZE - 120);
    const r = 30 + rand() * 60;
    const points = 6 + Math.floor(rand() * 6);

    let startX = 0;
    let startY = 0;
    let prevX = 0;
    let prevY = 0;

    for (let i = 0; i <= points; i++) {
      const angle = (i / points) * Math.PI * 2;
      const rr = r * (0.7 + rand() * 0.6);
      const px = cx + Math.cos(angle) * rr;
      const py = cy + Math.sin(angle) * rr;

      if (i === 0) {
        d += `M${px.toFixed(1)},${py.toFixed(1)}`;
        startX = px;
        startY = py;
      } else {
        d += ` L${px.toFixed(1)},${py.toFixed(1)}`;
        length += distance(prevX, prevY, px, py);
      }
      prevX = px;
      prevY = py;
    }
    d += ' Z';
    length += distance(prevX, prevY, startX, startY);
  }

  return { d, length };
}

/** Sample points scattered across the card, like detection markers. */
function buildDots(rand: () => number): AtlasDot[] {
  return Array.from({ length: 12 }, () => ({
    cx: (rand() * SIZE).toFixed(1),
    cy: (rand() * SIZE).toFixed(1),
    r: (0.8 + rand() * 0.8).toFixed(1),
    delay: `${(rand() * 2).toFixed(1)}s`
  }));
}

/** Generates a deterministic set of SVG path strings + sample dots for a given seed. */
export function generateAtlasPaths(seed: number): AtlasCardPaths {
  const rand = mulberry32(seed);
  const open = buildOpenPaths(rand);
  const closed = buildClosedPaths(rand);
  return {
    openPaths: open.d,
    openPathLength: open.length,
    closedPaths: closed.d,
    closedPathLength: closed.length,
    dots: buildDots(rand)
  };
}
