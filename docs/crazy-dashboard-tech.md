# Crazy Dashboard — Technical Specification

## File Structure

```
packages/crazy-dashboard/
├── src/
│   ├── core/
│   │   ├── types.ts              # Zod schemas + inferred types
│   │   ├── generators/
│   │   │   ├── index.ts          # Registry: { cpu, memory, network, walker, cursor }
│   │   │   ├── cpu.ts           # () => number
│   │   │   ├── memory.ts        # () => number (performance.memory API + fallback)
│   │   │   ├── network.ts       # () => number (navigator.connection API + fallback)
│   │   │   ├── walker.ts        # () => { x: number, y: number }
│   │   │   └── cursor.ts        # () => { x: number, y: number } (real cursor)
│   │   └── visualizations/
│   │       ├── standard/
│   │       │   ├── index.ts      # Registry export
│   │       │   ├── cpu-line-chart.tsx
│   │       │   ├── memory-ring-gauge.tsx
│   │       │   ├── network-area-chart.tsx
│   │       │   ├── walker-scatter.tsx
│   │       │   └── cursor-trail.tsx
│   │       └── creative/        # (future)
│   │           └── index.ts
│   ├── store/
│   │   └── useDashboardStore.tsx  # Zustand store (mosaic-maker pattern)
│   ├── hooks/
│   │   └── useDashboardLoop.ts   # rAF loop hook
│   ├── components/
│   │   ├── dashboard/
│   │   │   └── Dashboard.tsx      # 2×2 grid layout
│   │   └── controls/
│   │       └── Controls.tsx       # Mode, theme, pause/resume
│   ├── themes.css                 # [data-theme] CSS vars
│   └── index.tsx                  # CrazyDashboard root component
├── package.json
├── tsconfig.json
└── vitest.config.ts               # Vitest setup
```

## Core Types (`src/core/types.ts`)

```typescript
import { z } from "zod";

// --- Generator ---

export const GeneratorSchema = z.function()
  .args()
  .returns(z.union([
    z.number(),
    z.object({ x: z.number(), y: z.number() }),
  ]));

export type Generator = z.infer<typeof GeneratorSchema>;
// () => number | { x: number; y: number }

// --- Metric State ---

export const MetricStateSchema = z.object({
  current: z.union([z.number(), z.object({ x: z.number(), y: z.number() })]),
  history: z.array(z.union([z.number(), z.object({ x: z.number(), y: z.number() })])),
});

export type MetricState = z.infer<typeof MetricStateSchema>;

// --- Visualization ---

export const VisualizationSchema = z.object({
  id: z.string(),
  name: z.string(),
  component: z.custom<React.ComponentType>((val) => typeof val === "function"),
});

export type Visualization = z.infer<typeof VisualizationSchema>;

// --- Theme ---

export const ThemeSchema = z.object({
  id: z.string(),
  name: z.string(),
});

export type Theme = z.infer<typeof ThemeSchema>;

// --- Dashboard Store ---

export const DashboardStoreSchema = z.object({
  metrics: z.record(z.string(), MetricStateSchema),
  mode: z.enum(["standard", "creative"]),
  theme: z.string(),
  paused: z.boolean(),
});

export type DashboardStore = z.infer<typeof DashboardStoreSchema>;
```

## Generator Specs

### CPU Generator (`generators/cpu.ts`)
- **Signature:** `(rule: CpuRule, context: CpuRuleContext) => number` (0-100)
- **Rule pattern:** Mirrors sequence-renderer: `rule.getNext(context)` defines logic
- **Rules:** `sineCpuRule`, `randomCpuRule`, `spikeCpuRule` in `rules/cpu-rules.ts`
- **Browser API:** None (pure simulation via rules)
- **Test:** Pass different rules, verify output range

### Memory Generator (`generators/memory.ts`)
- **Signature:** `(rule: MemoryRule, context: MemoryRuleContext) => number` (0-100)
- **Rules:** `gradualMemoryRule`, `stepMemoryRule` in `rules/memory-rules.ts`
- **Browser API (inside rule):** `performance.memory` (Chrome only)
  - `performance.memory.usedJSHeapSize / performance.memory.jsHeapSizeLimit * 100`
- **Fallback:** Rules handle fallback internally when `performanceMemory` not in context
- **Test:** Mock `performance.memory`, test rule fallback path

### Network Generator (`generators/network.ts`)
- **Signature:** `(rule: NetworkRule, context: NetworkRuleContext) => number` (throughput in kB/s)
- **Rules:** `steadyNetworkRule`, `burstyNetworkRule` in `rules/network-rules.ts`
- **Browser API (inside rule):** `navigator.connection`
  - Use `downlink` (Mbps) converted to kB/s
- **Fallback:** Rules handle fallback internally
- **Test:** Mock `navigator.connection`, test rule fallback

### Walker Generator (`generators/walker.ts`)
- **Signature:** `(rule: WalkerRule, context: WalkerRuleContext) => { x: number; y: number }`
- **Rules:** `defaultWalkerRule`, `bounceWalkerRule` in `rules/walker-rules.ts`
- **Behavior:** Random walk within bounded 2D space from context.bounds
- **Test:** Verify bounds, verify movement

### Cursor Generator (`generators/cursor.ts`)
- **Signature:** `(rule: CursorRule, context: CursorRuleContext) => { x: number; y: number }`
- **Rules:** `defaultCursorRule`, `smoothedCursorRule` in `rules/cursor-rules.ts`
- **Note:** Real cursor position captured via `mousemove` in the hook
- **Test:** Pass context with cursor position, verify return

## Store (`src/store/useDashboardStore.tsx`)

Following mosaic-maker pattern:

```typescript
import { create } from "zustand";
import type { DashboardStore } from "../core/types.js";
import { generators } from "../core/generators/index.js";

const HISTORY_LIMIT = 60;

const useDashboardStore = create<DashboardStore>()(() => ({
  metrics: Object.fromEntries(
    Object.keys(generators).map((key) => [key, { current: 0, history: [] }])
  ),
  mode: "standard",
  theme: "standard",
  paused: false,
}));

// Actions (separate exports, mosaic-maker pattern)
function setMode(mode: "standard" | "creative") {
  useDashboardStore.setState({ mode });
}

function setTheme(theme: string) {
  useDashboardStore.setState({ theme });
}

function togglePause() {
  useDashboardStore.setState((state) => ({ paused: !state.paused }));
}

function updateMetrics() {
  const state = useDashboardStore.getState();
  if (state.paused) return;

  const newMetrics = { ...state.metrics };
  for (const [key, generator] of Object.entries(generators)) {
    const value = generator();
    const metric = newMetrics[key];
    newMetrics[key] = {
      current: value,
      history: [...metric.history.slice(-(HISTORY_LIMIT - 1)), value],
    };
  }
  useDashboardStore.setState({ metrics: newMetrics });
}
```

## rAF Loop Hook (`src/hooks/useDashboardLoop.ts`)

```typescript
import { useEffect, useRef } from "react";
import { useDashboardStore } from "../store/useDashboardStore.js";
import { updateMetrics } from "../store/useDashboardStore.js";

function useDashboardLoop() {
  const rafRef = useRef<number | null>(null);
  const paused = useDashboardStore((s) => s.paused);

  useEffect(() => {
    function loop() {
      updateMetrics();
      rafRef.current = requestAnimationFrame(loop);
    }

    if (!paused) {
      rafRef.current = requestAnimationFrame(loop);
    }

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [paused]);
}
```

## Visualization Component Pattern

Each viz subscribes directly to store via selector:

```typescript
// standard/cpu-line-chart.tsx
import { useDashboardStore } from "../../store/useDashboardStore.js";

function CpuLineChart() {
  const history = useDashboardStore((s) => s.metrics.cpu.history);
  // Render SVG line chart from history array
  return <svg>{/* line chart */}</svg>;
}

export { CpuLineChart };
```

Registry (`standard/index.ts`):

```typescript
import { CpuLineChart } from "./cpu-line-chart.js";
import { MemoryRingGauge } from "./memory-ring-gauge.js";
// ...

export const standardVisualizations = [
  { id: "cpu-line", name: "CPU Line Chart", component: CpuLineChart },
  { id: "memory-ring", name: "Memory Ring Gauge", component: MemoryRingGauge },
  // ...
];
```

## Theme CSS (`src/themes.css`)

```css
/* Standard theme — clean/minimal */
[data-theme="standard"] {
  --viz-bg: hsl(0 0% 98%);
  --viz-border: hsl(0 0% 90%);
  --viz-line: hsl(220 70% 50%);
  --viz-gauge: hsl(140 60% 45%);
  --viz-text: hsl(0 0% 20%);
  --viz-grid: hsl(0 0% 85%);
}

/* Cyberpunk theme — neon glow, dark */
[data-theme="cyberpunk"] {
  --viz-bg: hsl(260 30% 8%);
  --viz-border: hsl(280 100% 40%);
  --viz-line: hsl(320 100% 60%);
  --viz-gauge: hsl(120 100% 60%);
  --viz-text: hsl(180 100% 80%);
  --viz-grid: hsl(280 50% 20%);
  --viz-glow: 0 0 10px hsl(320 100% 60%);
}
```

## Test Structure

```
packages/crazy-dashboard/
├── src/
│   └── core/
│       └── generators/
│           ├── __tests__/
│           │   ├── cpu.test.ts
│           │   ├── memory.test.ts
│           │   ├── network.test.ts
│           │   ├── walker.test.ts
│           │   └── cursor.test.ts
│           ├── cpu.ts
│           └── ...
├── vitest.config.ts
└── package.json (with vitest dependency)
```

### Test Example (`cpu.test.ts`)

```typescript
import { describe, it, expect, vi, beforeEach } from "vitest";
import { generateCpu } from "../cpu.js";

describe("CPU Generator", () => {
  it("returns a number between 0 and 100", () => {
    const value = generateCpu();
    expect(value).toBeGreaterThanOrEqual(0);
    expect(value).toBeLessThanOrEqual(100);
  });

  it("produces varied output over multiple calls", () => {
    const values = Array.from({ length: 10 }, () => generateCpu());
    const unique = new Set(values);
    expect(unique.size).toBeGreaterThan(1);
  });
});
```

## Data Flow

```
requestAnimationFrame
        │
        ▼
 useDashboardLoop (hook)
        │
        ▼
 updateMetrics() (store action)
        │
        ├─► generators.cpu()       ──► metrics.cpu.current
        ├─► generators.memory()    ──► metrics.memory.current
        ├─► generators.network()   ──► metrics.network.current
        ├─► generators.walker()    ──► metrics.walker.current {x,y}
        └─► generators.cursor()    ──► metrics.cursor.current {x,y}
        │
        ▼
 One setState({ metrics: newMetrics })  (history trimmed to 60)
        │
        ▼
 Viz components re-render (subscribed via useDashboardStore selector)
        │
        ▼
 SVG/Canvas renders with new data + theme CSS vars applied
```

## Mobile-First Notes

- Dashboard grid: `grid-cols-1` on mobile (stacked), `lg:grid-cols-2` on desktop
- CPU chart spans full width on all breakpoints
- Bottom 2×2 becomes 1-column on mobile
- Sidebar: `mobilePosition="bottom"` (already configured)
- Visualizations should render but may be simplified on small screens (hide history, show current value only)
