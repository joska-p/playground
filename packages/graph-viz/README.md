# @repo/graph-viz

> Interactive D3-based graph visualization with force-directed layout, detail panel, and legend.  
> Renders the output of [`graphify`](https://opencode.ai) — a workspace dependency graph.

## Quick Start

```bash
pnpm add @repo/graph-viz
```

```tsx
import { GraphViz } from "@repo/graph-viz";

export default function Graph() {
  return <GraphViz />;
}
```

The graph renders automatically from `src/data/graph.json`, which is a copy of `graphify-out/graph.json` synced by the `graphify` script:

```bash
pnpm graphify   # runs graphify update + copies into the package
```

## Architecture

```
GraphViz
  ├─ TopBar              ← search, filters, toggles, stats
  ├─ GraphCanvas         ← SVG + D3 force simulation
  │   ├─ LoadingOverlay  ← "SIMULATING FORCES…" while simulation runs
  │   └─ <svg>
  │       ├─ link lines
  │       ├─ hyperedge hulls (convex hull polygons)
  │       ├─ node circles
  │       └─ labels
  ├─ DetailPanel         ← selected-node info sidebar
  └─ Legend              ← color legend
```

## Data Model

The graph renders a `GraphData` structure (currently ~4250 nodes, ~6100 edges) sourced from `graphify`'s workspace analysis. Data flows through a two-layer validation pipeline:

```
graphify CLI → graphify-out/graph.json
                   │ (cp in root graphify script)
   src/data/graph.json
       │ (validate against graphify-format Zod schema)
   src/data/load-graph.ts
       │ (map fields + validate against internal Zod schema)
   RAW_GRAPH
```

Internal node schema:

```typescript
// src/data/graph-data.schema.ts
const rawNodeSchema = z.object({
  id: z.string(), label: z.string(),
  ft: z.string(),   // file type: code, document, concept, image, rationale
  c: z.number(),    // Louvain community cluster id
  sf: z.string(),   // source file path
});
```

### Adapter boundary

Graphify's raw format is validated by `src/data/graphify-schema.ts`. If graphify's output changes, only that schema and the mapper in `load-graph.ts` need updating — no component code is affected.

### Sync workflow

```bash
pnpm graphify   # regenerates graphify-out/graph.json
                # automatically copies it into this package
```

The copy lives at `src/data/graph.json` and is tracked in git so the visualization stays reproducible between graphify runs.

## D3 Simulation

Managed by `useGraphSimulation` hook:

| Config | Default | Description |
|---|---|---|
| `linkDistance` | 30 | Target link length |
| `chargeStrength` | -60 | Node repulsion |
| `alphaDecay` | 0.02 | Simulation cool-down rate |

The simulation runs inside a `useEffect` and manipulates the SVG DOM directly (D3 owns the SVG, React owns the shell UI). On each tick: positions link lines, node circles, labels, and hyperedge hulls. On simulation end: sets `isReady = true`.

Filters (`filterFT`, `filterRel`, `showHyper`) trigger a full simulation restart. Color mode and search changes apply without restarting the simulation.

## Exports

| Export | Path | Description |
|---|---|---|
| `GraphViz` | `@repo/graph-viz` | Main graph visualization component |
| `./styles` | `@repo/graph-viz/styles` | Graph CSS |

## Internal Structure

```
src/
  stores/graph/store.ts      ← Zustand store (create + selectors + actions)
  data/
    graph.json                ← synced copy of graphify-out/graph.json
    graph-data.schema.ts      ← internal Zod schemas + inferred types
    graph-data.ts             ← exports RAW_GRAPH (loads from graph.json)
    graphify-schema.ts        ← graphify-format Zod schemas (adapter boundary)
    load-graph.ts             ← validates + maps graphify data to internal format
    example-graph.ts          ← minimal sample graph
  hooks/
    useGraphSimulation.ts     ← D3 force simulation lifecycle
    use-graph-simulation.types.ts  ← SimNode/SimLink types
    useResetZoom.ts           ← zoom reset callback
  components/
    GraphViz.tsx              ← root layout
    GraphCanvas.tsx           ← SVG mount + simulation binder
    DetailPanel.tsx           ← selected-node sidebar
    Legend.tsx                ← color/relation legend
    LoadingOverlay.tsx        ← simulation-in-progress indicator
    TopBar.tsx                ← search, filters, toggles
  utils/
    colors.ts                 ← node color/radius helpers
  constants.ts                ← palettes, config, labels
  styles/
    graph-viz.css             ← package styles
```

## State Management

Zustand store at `src/stores/graph/store.ts` with individual selectors (domain prefix dropped per convention):

```typescript
const colorMode = useColorMode();        // "community" | "filetype"
const selectedNode = useSelectedNode();
const search = useSearch();
setColorMode("filetype");
resetFilters();
toggleHyper();
```

## Coloring Modes

| Mode | Method |
|---|---|
| **Community** | Cycles through 20-color `COMMUNITY_PALETTE` by node community id |
| **Filetype** | Maps `FT_COLOR` by node file type |

## Interaction

- **Zoom/Pan** — scroll to zoom, drag to pan
- **Node click** — selects node, opens `DetailPanel`
- **Search** — highlights matching node labels
- **Filter** — file type dropdown, relation dropdown, hyperedge toggle
- **Reset** — animates zoom to center via `d3.zoomIdentity`

---

_Part of [Creative Playground](https://playground-beryl-omega.vercel.app)_
