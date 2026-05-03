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
