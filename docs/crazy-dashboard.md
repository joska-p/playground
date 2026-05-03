# Crazy Dashboard — Design Decisions

## Grill Session Notes

### Q1: What kind of data should the dashboard visualize in real-time?
**Decision:** Simulated metrics (CPU, memory, network traffic, random walkers) with browser API integration where possible.
**Browser APIs to leverage:**
- `performance.memory` (Chrome) — actual memory usage as baseline
- `navigator.connection` (Network Information API) — real network type/RTT
- `PerformanceObserver` — actual render/frame timing
- `navigator.hardwareConcurrency` — CPU core count for simulation seeding

### Q2: What does "crazy" mean — what should make this dashboard feel fun/unusual?
**Decision:** Themeable aesthetics — user can choose from multiple "crazy" visual themes that affect both look and behavior.

### Q3: What visualization types should we build first for the metrics?
**Decision:** A) Mixed standard + creative: line chart (CPU), ring gauge (memory), particle flow (network), canvas random walker trail. Visualization types are selectable following the sequence-renderer pattern: swappable metric generators → pluggable visualization renderers. Visualization type feeds context to the active theme.

### Q4: How should metric generators and visualization renderers compose?
**Decision:** Fixed metric set chosen by us (user cannot select metrics). User can globally switch:
- Visualization mode: "standard" or "creative"
- Theme (e.g. glitch/chaos, physics-based, cyberpunk, interactive chaos)
All fixed metrics render using the selected global visualization mode and theme.

### Q5: How many visualization modes should we build initially?
**Decision:** Two modes: "standard" and "creative". Start with standard mode first, iterate and refine all logic, then build creative mode.

### Q6: For standard mode, what visualization type should each fixed metric use?
**Decision:**
- CPU = line chart
- Memory = ring/donut gauge
- Network = area chart
- Random walker = scatter plot

### Q7: How should real-time data updates work? What drives the update loop?
**Decision:** `requestAnimationFrame` for frame-aligned updates, tied to render loop. Generator functions will be pure (no side effects) so they can be moved to a Web Worker later without rewriting.

### Q8: What is the fixed metric set?
**Decision:** Five fixed metrics:
1. CPU % (simulated)
2. Memory % (simulated, with `performance.memory` as baseline where available)
3. Network throughput (simulated, with `navigator.connection` as baseline where available)
4. Random walker position (simulated)
5. Cursor position (real browser cursor x/y, especially useful for particle visualizations in creative mode)

### Q9: Dashboard layout — how should the 5 visualizations be arranged?
**Decision:** 2×2 grid with one spanning full width. CPU line chart spans top full width, remaining 4 metrics (memory, network, walker, cursor) fill bottom 2×2 grid. Controls (type + theme selector, minimal) stay in the existing sidebar panel.

### Q10: What rendering tech should we use for visualizations?
**Decision:** SVG (hand-written + D3 where useful) and Canvas. Standard mode primarily uses SVG/D3, Canvas for specific visualizations, later Three.js for 3D viz. Use @repo/ui for building most interface components.

### Q11: Where should theme CSS vars/styles be defined to stay isolated to this package?
**Decision:** CSS file in `crazy-dashboard/src/` (e.g. `src/themes.css`) with `[data-theme="cyberpunk"]` selectors, imported only by the dashboard component. Themes are fully isolated from the rest of the app.

### Q12: Sidebar controls — what minimal controls should we have?
**Decision:** Three controls: mode selector (standard/creative), theme selector (dropdown), and pause/resume toggle button.

### Q13: How many historical data points should each metric keep in the store?
**Decision:** Fixed rolling window — last 60 points (≈30 seconds at rAF ~60fps, or configurable). Oldest point drops on push.

### Q14: Zustand store structure — how should the state be organized?
**Decision:** Flat + `record` per metric:
```
metrics: { cpu: { current, history }, memory: { ... }, network: { ... }, walker: { ... }, cursor: { x, y, history } }
top-level: mode, theme, paused
```

### Q15: When browser APIs are unavailable, what should generators do?
**Decision:** Pure simulation fallback — if API is unavailable (e.g. `performance.memory` outside Chrome), fall back to seeded random simulation that mimics the metric's shape.

### Q16: The rAF loop — single loop or separate concerns?
**Decision:** One single rAF loop that calls all generators and does one `setState` per frame.

### Q17: Cursor position visualization in standard mode?
**Decision:** Live (x, y) coordinates display + fading trail (SVG trail of last N cursor positions). Also: visualizations should be interactive.

### Q18: What kind of quirky/fun interactions should visualizations have?
**Decision:** Interaction behavior is specific to each visualization type — each viz component owns its own quirky interaction (e.g. line chart click does X, ring gauge click does Y). Not a global behavior.

### Q19: What themes should we build initially?
**Decision:** Two themes to start: "standard" (clean/minimal) + "cyberpunk" (neon glow, scanlines). More themes (glitch/chaos, physics-based, etc.) will be added after creative mode is done.

### Q20: How should generator functions be structured and registered?
**Decision:** `src/core/generators/index.ts` registry — each metric gets its own generator file (e.g. `cpu.ts`, `memory.ts`, `network.ts`, `walker.ts`, `cursor.ts`), all exported/registered in an index. Store loops through them. 1 component per file throughout. Interfaces/types must be carefully designed upfront. TDD approach to be used for this project.

### Q21: What testing framework should we use for TDD?
**Decision:** Vitest — fast, ESM-native, works seamlessly with TypeScript + React. Workspace has no test framework yet; needs to be set up with @testing-library/react for component tests.

### Q22: First TDD cycle — which piece to test-drive first?
**Decision:** Generator functions (cpu.ts, memory.ts, etc.) — pure functions, easy to unit test without React.

### Q23: Generator interface — what should the function signature be?
**Decision:** Generator takes a **rule** that dictates generation: `(rule: CpuRule) => number`. Mirrors sequence-renderer pattern where `rule.getNext(context)` defines the logic. Generator becomes a pure function consuming the rule. Store manages history array and trimming.

### Q24: Where should shared TypeScript interfaces live, and what tool should define them?
**Decision:** `src/core/types.ts` — single file using Zod schemas (`z.object(...)`) to define `MetricState`, `Generator`, `Visualization`, `Theme`, etc. Types inferred via `z.infer<typeof schema>`. Gives runtime validation for TDD.

### Q25: Where should the rAF loop live and how does it respect `paused`?
**Decision:** Custom hook `useDashboardLoop()` — encapsulates rAF start/stop, reads `paused` from store, starts on mount, cleans up on unmount.

### Q26: How should visualization components receive their data?
**Decision:** Direct store subscription — each viz component calls `useDashboardStore(selector)` internally with its own selector. Decoupled from parent.

### Q27: Visualization registry structure — one file per viz + index.ts?
**Decision:** Yes, mirror the generator pattern. `src/core/visualizations/standard/cpu-line-chart.tsx`, `memory-ring-gauge.tsx`, etc. + `index.ts` exporting a `visualizations` array. Store uses registry to render the active mode's viz set. Follow mosaic-maker store pattern: `create<State>()(() => initial)` with separate exported action functions.

### Q28: Mode switching — "standard" → "creative" swaps the entire viz set?
**Decision:** Yes, swap entire viz set. `visualizations/standard/` and `visualizations/creative/` folders, mode selector swaps which registry the store points to. Theme does NOT change the viz set — only look/feel.

### Q29: How should `data-theme` attribute be applied?
**Decision:** Root wrapper div — `CrazyDashboard` renders `<div data-theme={theme}>` wrapping everything. CSS vars cascade from there. Theme isolation maintained within the package.

### Q30: What's next?
**Decision:** Write down the full implementation plan. Remaining items to figure out later:
- **B) Error handling** — what happens if a generator throws? Loop should catch and continue.
- **C) Accessibility** — keyboard nav, screen reader support for the dashboard.
- **D) Mobile behavior** — how should the 2×2 grid adapt on small screens?

---

## Implementation Plan (Standard Mode First)

### Phase 1: Tooling + Types ✅
1. ✅ Set up Vitest + @testing-library/react in workspace and `crazy-dashboard`
2. ✅ Create `src/core/types.ts` with Zod schemas: `MetricState`, `Generator`, `Visualization`, `Theme`, `DashboardStore`
3. ✅ Infer TypeScript types via `z.infer<>`

### Phase 2: Rules (TDD) ✅
4. ✅ Create `src/core/rules/` — cpu-rules.ts, memory-rules.ts, network-rules.ts, walker-rules.ts, cursor-rules.ts
5. ✅ 24 tests pass — all rule tests green

### Phase 3: Generators (TDD) ✅
6. ✅ Create `src/core/generators/index.ts` registry
7. ✅ Create `src/core/generators/cpu.ts` — takes rule + context, TDD
8. ✅ Create `src/core/generators/memory.ts` — takes rule + context, TDD
9. ✅ Create `src/core/generators/network.ts` — takes rule + context, TDD
10. ✅ Create `src/core/generators/walker.ts` — takes rule + context, TDD
11. ✅ Create `src/core/generators/cursor.ts` — takes rule + context, TDD
12. ✅ 14 tests pass, types clean

### Phase 4: Store ✅
13. ✅ Create `src/store/useDashboardStore.tsx` following mosaic-maker pattern
14. ✅ State: `metrics` (record per metric), `mode`, `theme`, `paused`
15. ✅ Actions: `setMode()`, `setTheme()`, `togglePause()`, `updateMetrics()`
16. ✅ Rolling window: trim history to 60 points

### Phase 5: rAF Loop 🔄
17. Create `src/hooks/useDashboardLoop.ts` custom hook
18. Reads `paused` from store, starts rAF on mount, cleans up on unmount

### Phase 3: Store
10. Create `src/store/useDashboardStore.tsx` following mosaic-maker pattern
11. State: `metrics` (record per metric with `current` + `history[]`), `mode`, `theme`, `paused`
12. Actions: `setMode()`, `setTheme()`, `togglePause()`, `updateMetrics()` (called by rAF loop)
13. Rolling window: trim history to last 60 points on each update

### Phase 4: rAF Loop
14. Create `src/hooks/useDashboardLoop.ts` custom hook
15. Reads `paused` from store, starts rAF on mount, cleans up on unmount
16. Calls all generators, does one `setState` per frame

### Phase 5: Standard Visualizations (TDD + SVG/D3/Canvas)
17. Create `src/core/visualizations/standard/cpu-line-chart.tsx` — SVG line chart, subscribes to store
18. Create `src/core/visualizations/standard/memory-ring-gauge.tsx` — SVG ring gauge
19. Create `src/core/visualizations/standard/network-area-chart.tsx` — SVG area chart
20. Create `src/core/visualizations/standard/walker-scatter.tsx` — Canvas or SVG scatter
21. Create `src/core/visualizations/standard/cursor-trail.tsx` — SVG trail + live x/y coords
22. Create `src/core/visualizations/standard/index.ts` — registry export

### Phase 6: Themes
23. Create `src/themes.css` with `[data-theme="standard"]` and `[data-theme="cyberpunk"]` selectors
24. Define CSS vars per theme (colors, glow effects, scanlines, etc.)
25. Import `themes.css` in `src/index.tsx`

### Phase 7: Layout + Controls
26. Update `src/components/dashboard/Dashboard.tsx` — 2×2 grid, CPU spans top full width
27. Update `src/components/controls/Controls.tsx` — mode selector (standard/creative), theme selector (dropdown), pause/resume toggle
28. Use `@repo/ui` components (Select, Button, etc.) for controls

### Phase 8: Integration
29. Wire everything in `src/index.tsx` — `CrazyDashboard` wraps all in `<div data-theme={theme}>`
30. Test in `apps/playground/src/pages/projects/data-viz/crazy-dashboard/index.astro`

### Phase 9: Creative Mode (Future)
31. Build `src/core/visualizations/creative/` set
32. Add more themes (glitch/chaos, physics-based, interactive chaos)
33. Add quirky interactions per viz type

### Open Items (Resolved)
- **B) Error handling** — use React Error Boundaries to catch render errors from visualizations
- **C) Accessibility** — write semantic HTML throughout, that's sufficient
- **D) Mobile behavior** — mobile-first design. Focus on large screens for data viz, but must not break on mobile even if not everything displays
