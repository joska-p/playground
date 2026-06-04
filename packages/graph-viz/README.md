# @repo/graph-viz

> Interactive D3-based graph visualization with force-directed layout, detail panel, and legend.

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

The graph renders a `GraphData` structure of ~2000 nodes representing the workspace's configuration, scripts, dependencies, and pages, validated through Zod schemas:

```typescript
// schemas live in src/data/graph-data.schema.ts — source of truth
const rawNodeSchema = z.object({ id: z.string(), label: z.string(), ft: z.string(), c: z.number(), sf: z.string() });
type RawNode = z.infer<typeof rawNodeSchema>;
```

- **ft** — file type: code, document, concept, image, rationale
- **c** — community cluster id
- **r** — relation type: contains, references, imports, runs, defines

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
    graph-data.schema.ts      ← Zod schemas + inferred types (source of truth)
    graph-data.ts             ← RAW_GRAPH constant
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
