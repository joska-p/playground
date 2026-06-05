# @repo/graph-viz

> Interactive 3D graph visualization using React Three Fiber, drei, Zustand, and a Web Worker force-layout engine.  
> Renders the output of [`graphify`](https://opencode.ai) — a workspace dependency graph.

## Quick Start

```bash
pnpm add @repo/graph-viz
```

```tsx
import { GraphViz } from '@repo/graph-viz';

function Graph() {
  return (
    <GraphViz data={myGraphData}>
      <div className="relative h-[80vh] w-full">
        <GraphViz.Canvas />
        <GraphViz.StatsBar />
        <GraphViz.ProgressBar />
        <GraphViz.NodePanel />
        <GraphViz.Legend />
        <GraphViz.ControlsHint />
      </div>
    </GraphViz>
  );
}
```

### Minimal usage (no overlays)

```tsx
<GraphViz data={myGraphData}>
  <div className="relative h-[80vh] w-full">
    <GraphViz.Canvas />
    <GraphViz.NodePanel />
  </div>
</GraphViz>
```

### Default layout (no children)

When no children are provided, the component renders the full set of overlays (Canvas, StatsBar, ProgressBar, NodePanel, Legend, ControlsHint) inside a relative container.

## API

### Compound Components

| Component | Description |
|---|---|
| `GraphViz` (alias for `GraphViz.Provider`) | Initializes graph data, spawns the force-layout worker, holds Zustand store |
| `GraphViz.Canvas` | R3F `<Canvas>` with scene, nodes, edges, orbit controls, and gizmo |
| `GraphViz.StatsBar` | Node / edge / hyperedge count overlay |
| `GraphViz.ProgressBar` | Force layout simulation progress |
| `GraphViz.NodePanel` | Detail panel for selected node |
| `GraphViz.Legend` | Color legend for node types |
| `GraphViz.ControlsHint` | "Drag to rotate" instruction text |

### Provider Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `data` | `GraphData` (Zod-inferred) | — | Graph data with nodes, links, hyperedges |
| `maxNodes` | `number` | `4000` | Cap on rendered nodes |
| `children` | `ReactNode` | — | Content to render with overlays |

## Architecture

```
graph.json → Zod validation → Zustand initGraphData action
                                  │
                                  ├─► <GraphViz.Provider> (store + worker lifecycle)
                                  │
Worker (force-layout) ──postMessage──► Zustand setNodePositions
                                           │
                                           ├─► <GraphNodes> (useFrame, InstancedMesh)
                                           ├─► <GraphEdges> (useFrame, LineSegments)
                                           ├─► <GraphOrbitControls> (drei)
                                           ├─► <GraphGizmo> (drei)
                                           │
Overlay components subscribe to store slices:
  <StatsBar>     → useNodes, useLinks, useHyperedges
  <ProgressBar>  → useSimProgress, useSimDone
  <NodePanel>    → useSelectedNode, useLinks, useNodes
  <Legend>       → static (no subscription)
```

### Layers

- **Core** (`src/core/`): Zod schemas, palette, force-layout worker string builder. Pure — no React, no side effects.
- **State** (`src/stores/graph/`): Zustand store (4-file structure: types, store, actions, selectors). Actions mutate; selectors read.
- **Presentation** (`src/components/graph-viz/`): Compound component + R3F scene + Tailwind overlays. Thin orchestrators only.

### Dependencies

| Package | Role |
|---|---|
| `@react-three/fiber` | React renderer for Three.js |
| `@react-three/drei` | Useful R3F utilities (OrbitControls, Gizmo) |
| `three` | 3D engine |
| `zustand` | Client state management |
| `zod` | Runtime data validation |
| `@repo/ui` | Shared UI tokens and components |

## Data Source Contract

The graph data JSON follows this shape (validated by Zod at the store boundary):

```typescript
type GraphData = {
  nodes: { id: string; label: string; file_type?: string; source_file?: string; source_location?: string; community?: number }[];
  links?: { source: string; target: string; relation?: string; confidence_score?: number }[];
  edges?: GraphLink[];  // alias for links
  hyperedges?: { id: string; label: string; nodes: string[]; relation?: string }[];
  graph?: { hyperedges?: GraphHyperedge[] };
  directed?: boolean;
  multigraph?: boolean;
};
```

The data is typically produced by `graphify` and synced to `src/data/graph.json`.

## Development

```bash
# Start dev server (internal playground)
pnpm --filter @repo/graph-viz dev

# Type checking
pnpm --filter @repo/graph-viz check-types

# Lint
pnpm --filter @repo/graph-viz lint-fix

# Preview build
pnpm --filter @repo/graph-viz preview
```

The dev playground is at `index.html` → `src/main.tsx` → `src/App.tsx`. It uses `src/data/graph.json` as input and renders the full GraphViz compound component.

## Contributing

This package follows the three-layer architecture (Core → State → Presentation). Keep side effects at the Presentation layer. All external data must pass through Zod validation at the store boundary.
