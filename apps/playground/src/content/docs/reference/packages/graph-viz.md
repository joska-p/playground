---
title: 'Graph Visualization'
description: 'Interactive 3D graph visualization using React Three Fiber (R3F), drei, Zustand, and a Web Worker force-layout engine. Renders the output of `graphify` — a workspace-level dependency and concept graph.'
category: 'reference'
tags:
  - reference
  - graph-viz
order: 20
---

# @repo/graph-viz

## Purpose

`@repo/graph-viz` transforms a `graph.json` file (produced by `graphify`) into an interactive 3D scene. The graph encodes nodes (files, concepts, inline comments) and edges (imports, calls, contains, references) grouped into **communities** — closely related nodes that map to packages, modules, or conceptual clusters.

The visualization supports two modes:

- **Overview** — community-level spheres sized by membership, inter-community edges, hover labels. Understand architecture at a glance.
- **Detail** — click a community sphere to drill into its individual nodes and internal edges. Node size and brightness encode degree (connection count). Cross-community links show which other modules this community depends on.

The graph answers questions about codebase health: package coupling, internal complexity hotspots, dead code traces, and documentation coverage.

## Quick Start

```bash
# Serve the viz locally (hot-reloads on code changes)
pnpm --filter @repo/graph-viz dev
```

### Data

The graph data lives at `src/data/graph.json`. To regenerate from a fresh `graphify` run:

```bash
graphify update .
cp graphify-out/graph.json packages/graph-viz/src/data/graph.json
```

## Architecture

### Component tree

```
App
 └─ GraphCanvas          ← thin orchestrator: loads data, runs layout, creates Canvas
     ├─ LoadingFallback   ← shown while worker computes layout
     ├─ Scene             ← all R3F content, mode switching, camera fly-to
     │   ├─ OrbitControls
     │   ├─ [Overview]
     │   │   ├─ GraphCommunitySpheres
     │   │   ├─ CommunityEdges
     │   │   └─ CommunityLabel
     │   ├─ [Detail]
     │   │   ├─ GraphCommunitySpheres (ghost)
     │   │   ├─ GraphNodes              ← InstancedMesh, size/color by degree
     │   │   ├─ GraphEdges
     │   │   ├─ CommunityLinks
     │   │   ├─ NodeLabel               ← selected, hovered, or all
     │   │   └─ SelectedNodeGlow
     │   └─ SelectedNodeGlow
     └─ GraphPanel        ← DOM overlay: filters, settings, community list, node info
```

### Data flow

```
graph.json ──fetch──► GraphCanvas ──► WorkerPool
                                          │
                                   force-layout.worker
                                     (sampled repulsion,
                                      Fibonacci sphere init,
                                      120 max iterations)
                                          │
                                   Float32Array positions
                                          │
                                     dataStore.setPositions()
                                          │
                              computeCommunities() → centroids
                              computeDegrees() → per-node weights
                                          │
                                     Scene reads via selectors
                                          │
                              ┌─────────────────────┐
                              │   Overview mode     │
                              │   render spheres    │
                              │   at centroids      │
                              └────────┬────────────┘
                                       │ click sphere → setCommunityFilter(id)
                                       ▼
                              ┌──────────────────────┐
                              │   Detail mode        │
                              │   filterByCommunity  │
                              │   normalize positions│
                              │   render nodes/edges │
                              └──────────────────────┘
```

### Layout algorithm

The Web Worker (`src/workers/force-layout.worker.ts`) runs a force-directed layout:

- **Initialization** — Fibonacci sphere distribution (good 3D coverage)
- **Repulsion** — sampled random pairs (120 samples/node/iteration) with inverse-square force
- **Attraction** — spring force along graph edges toward ideal length (3 units)
- **Center gravity** — pulls all nodes toward origin (prevents drift)
- **Adaptive cooling** — alpha decay with early stopping when total energy drops below threshold

## Exports

| Export | Path            | Description                                      |
| ------ | --------------- | ------------------------------------------------ |
| `App`  | `./src/App.tsx` | Full-screen wrapper rendering `GraphCanvas`      |
| —      | `./styles`      | Global CSS (full-screen layout, dark background) |

### Internal components (not part of public API)

| File                                   | Export                                                                | Role                                                                           |
| -------------------------------------- | --------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| `src/components/GraphCanvas`           | `GraphCanvas`                                                         | Fetches data, runs worker, renders scene + panel                               |
| `src/components/Scene`                 | `Scene`                                                               | R3F content — mode switching, camera, all 3D objects                           |
| `src/components/GraphNodes`            | `GraphNodes`                                                          | InstancedMesh spheres — per-instance size + color by degree                    |
| `src/components/GraphEdges`            | `GraphEdges`                                                          | LineSegments for intra-community edges                                         |
| `src/components/GraphCommunitySpheres` | `GraphCommunitySpheres`                                               | InstancedMesh spheres at community centroids                                   |
| `src/components/CommunityEdges`        | `CommunityEdges`                                                      | LineSegments for inter-community edges                                         |
| `src/components/CommunityLabel`        | `CommunityLabel`                                                      | drei `Text` label for a community                                              |
| `src/components/CommunityLinks`        | `CommunityLinks`                                                      | Ghosted lines to linked communities in detail mode                             |
| `src/components/NodeLabel`             | `NodeLabel`                                                           | drei `Text` label for a single node                                            |
| `src/components/SelectedNodeGlow`      | `SelectedNodeGlow`                                                    | Radial gradient sprite at selected node                                        |
| `src/components/GraphPanel`            | `GraphPanel`                                                          | DOM overlay — community list, filters, node info                               |
| `src/components/LoadingFallback`       | `LoadingFallback`                                                     | Centered spinner while layout computes                                         |
| `src/stores/dataStore`                 | `useDataStore`                                                        | Zustand store: raw + derived graph data                                        |
| `src/stores/uiStore`                   | `useUiStore`                                                          | Zustand store: selection, filters, view settings                               |
| `src/utils/colors`                     | —                                                                     | 24-color community palette, `hexToRgb`                                         |
| `src/utils/communities`                | —                                                                     | Centroid computation, inter-community edge aggregation, position normalization |
| `src/utils/nodes`                      | —                                                                     | Degree computation, size/brightness mapping                                    |
| `src/workers/force-layout.worker`      | —                                                                     | Web Worker: force-directed 3D layout                                           |
| `src/types`                            | `GraphNode`, `GraphLink`, `GraphData`, `LayoutInput`, `CommunityData` | Shared type definitions                                                        |

## Usage Examples

### Standalone page

```tsx
import { App } from '@repo/graph-viz';

export default function GraphPage() {
  return (
    <div style={{ height: '100vh', width: '100vw' }}>
      <App />
    </div>
  );
}
```

### Embedded in a larger app

```tsx
import { GraphCanvas } from '@repo/graph-viz/GraphCanvas';

export default function Dashboard() {
  return (
    <div className="h-[600px] w-full overflow-hidden rounded-lg">
      <GraphCanvas />
    </div>
  );
}
```

### Programmatic community selection

```tsx
import { useUiStore } from '@repo/graph-viz/stores/uiStore';

function JumpToPackage() {
  const setCommunityFilter = useUiStore((s) => s.setCommunityFilter);

  return (
    <button onClick={() => setCommunityFilter('32')}>
      Show image-pipeline
    </button>
  );
}
```

## State Management

Two Zustand stores separate concerns:

### `dataStore` — graph data (rarely mutates after load)

| State                 | Type                              | Description                                |
| --------------------- | --------------------------------- | ------------------------------------------ |
| `graphData`           | `GraphData \| null`               | Raw graph.json nodes and links             |
| `positions`           | `Float32Array \| null`            | 3D positions from force layout             |
| `nodeIndex`           | `Map<string, number>`             | Node ID → array index lookup               |
| `communities`         | `Map<number, CommunityData>`      | Community metadata (centroid, size, color) |
| `interCommunityEdges` | `Map<string, InterCommunityEdge>` | Edges between communities                  |
| `degrees`             | `Float32Array`                    | Per-node connection count                  |
| `isLoaded`            | `boolean`                         | True after layout completes                |

### `uiStore` — interactive state (frequently read/written)

| State              | Type                | Description                                       |
| ------------------ | ------------------- | ------------------------------------------------- |
| `selectedNode`     | `GraphNode \| null` | Currently clicked node                            |
| `communityFilter`  | `string`            | Single ID → detail mode; empty / multi → overview |
| `searchQuery`      | `string`            | Node label filter                                 |
| `minCommunitySize` | `number`            | Minimum community size for overview visibility    |
| `autoRotate`       | `boolean`           | OrbitControls auto-rotation toggle                |
| `showEdges`        | `boolean`           | Edge visibility toggle                            |
| `showNodeLabels`   | `boolean`           | Toggle all node labels in detail mode             |
| `isPanelOpen`      | `boolean`           | DOM overlay visibility                            |

View mode is **derived** from `communityFilter`: a single numeric ID enters detail mode; anything else shows overview.

Selectors ensure components only re-render when their slice of state changes:

```tsx
// Only re-renders when positions change
const positions = useDataStore((s) => s.positions);

// Only re-renders when the filter changes
const communityFilter = useUiStore((s) => s.communityFilter);
```

## Patterns & Gotchas

- **File naming** — filename matches the primary export. No barrel files. Named exports only. `verbatimModuleSyntax` and `noUnusedLocals` are enforced.
- **React compiler** — enabled via `@vitejs/plugin-react`'s `reactCompilerPreset`. Do not wrap expensive computations in `useMemo` unless profiling proves a bottleneck; the compiler handles it.
- **R3F component patterns** — use JSX for Three.js objects, `attach` for non-standard properties, `ref` for direct mutation in `useFrame`. Never call `setState` in `useFrame`.
- **Community position normalization** — in detail mode, node positions are centered at origin and optionally scaled down (if the community's original spread exceeds 15 units). This makes every community fill a consistent view volume.
- **Node overlap** — node size encodes degree (connection count). The force layout treats nodes as zero-size points with ideal edge length of 3 units. If nodes overlap, reduce the `maxSize` argument to `degreeToSize` in `src/utils/nodes.ts`.
- **Graph data lifecycle** — `graph.json` is fetched at startup. The force layout runs once in a Web Worker. Community metadata is derived on the main thread after layout completes.

## Performance

| Area               | Strategy                                                                                                            |
| ------------------ | ------------------------------------------------------------------------------------------------------------------- |
| **Layout**         | Web Worker (non-blocking). Sampled repulsion (120/node) instead of all-pairs. Early stopping when energy converges. |
| **Rendering**      | `InstancedMesh` for nodes and community spheres (single draw call). `LineSegments` for edges.                       |
| **Event handling** | `onPointerMove` for hover, `onPointerDown`/`onPointerUp` for click. Instance ID maps directly to data index.        |
| **Re-renders**     | Zustand selectors isolate subscribers. React compiler memoizes inline computations.                                 |

## Testing

```bash
pnpm --filter @repo/graph-viz check-types
pnpm --filter @repo/graph-viz lint
pnpm --filter @repo/graph-viz build
```

## Contributing

PRs welcome! See [CONTRIBUTING.md](../../CONTRIBUTING.md).

## Changelog

Follows SemVer. See [CHANGELOG.md](./CHANGELOG.md).

---

_Part of [Creative Playground](https://jpotin.gitlab.io/playground/)_
