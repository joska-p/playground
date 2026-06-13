# @repo/graph-viz

> Interactive 3D graph visualization using React Three Fiber (R3F), drei, and Zustand. Renders the output of `graphify` — a workspace-level dependency and concept graph — with a build-time enrichment pipeline that adds semantic labels, entity types, and package metadata.

## Purpose

`@repo/graph-viz` transforms a `graph.json` file (produced by `graphify`) into an interactive 3D scene. The graph encodes nodes (files, types, functions, config keys, packages) and edges (imports, calls, contains, references) grouped into **communities** — closely related nodes that map to packages, modules, or conceptual clusters.

The visualization supports two modes:

- **Overview** — community-level spheres sized by membership, inter-community edges, hover labels. Understand architecture at a glance.
- **Detail** — click a community sphere to drill into its individual nodes and internal edges. Node size and brightness encode degree (connection count). Cross-community links show which other modules this community depends on.

A **build-time enrichment pipeline** classifies every node by entity type (`function`, `type`, `file`, `config-key`, ...), extracts package names from source paths, and generates semantic community labels (e.g. `@repo/image-pipeline — defineManip(), clamp()` instead of `C42`). These enrichments power the panel filters and the color legend.

The graph answers questions about codebase health: package coupling, internal complexity hotspots, dead code traces, and documentation coverage.

## Quick Start

```bash
# Serve the viz locally (hot-reloads on code changes)
pnpm --filter @repo/graph-viz dev
```

### Data

The graph data pipeline is **build-time only** — no Web Worker at runtime.

| Step | Input | Command | Output |
|------|-------|---------|--------|
| Extract | source code | `graphify update .` | `graph.json` |
| Enrich + layout | `graph.json` | `pnpm --filter @repo/graph-viz prepare-data` | `graph-prepared.json` |
| Serve | `graph-prepared.json` | `pnpm dev` | loaded at startup |

To regenerate from a fresh `graphify` run:

```bash
graphify update .
cp graphify-out/graph.json packages/graph-viz/src/data/graph.json
pnpm --filter @repo/graph-viz prepare-data
```

The `prepare-data` script (`src/data/prepare.ts`) runs enrichment, layout, and community computation in a single Node.js process — no worker needed.

## Architecture

### Component tree

```
App
 └─ GraphCanvas                ← thin orchestrator: loads prepared data, creates Canvas
     ├─ LoadingFallback         ← shown while data loads
     ├─ Scene                   ← all R3F content, mode switching, camera fly-to
     │   ├─ CameraController    ← OrbitControls + fly-to animation
     │   ├─ SceneLighting
     │   ├─ [Overview]
     │   │   ├─ GraphCommunitySpheres
     │   │   ├─ CommunityEdges
     │   │   ├─ HyperedgeLayer
     │   │   └─ CommunityLabel
     │   └─ [Detail]
     │       ├─ GraphCommunitySpheres (ghost)
     │       ├─ GraphNodes              ← InstancedMesh, size/color by degree
     │       ├─ NodeTypeIndicators      ← small icons per entity type
     │       ├─ GraphEdges
     │       ├─ CommunityLinks
     │       ├─ NodeLabel               ← selected, hovered, or all
     │       └─ HighlightedEdges        ← relation-colored lines from selected node
     └─ GraphPanel            ← DOM overlay: filters, settings, community list, node info
```

### Data flow

```
graphify ──► graph.json ──► prepare.ts
                                │
                      ┌─────────┴──────────┐
                      │  enrichNodes()     │
                      │  (entity type,     │
                      │   package name,    │
                      │   semantic label)  │
                      └─────────┬──────────┘
                                │
                      ┌─────────┴──────────┐
                      │  force-directed    │
                      │  layout (ngtx)     │
                      └─────────┬──────────┘
                                │
                      ┌─────────┴──────────┐
                      │  computeCommunities│
                      │  enrichCommunities │
                      │  (semantic labels, │
                      │   dominant pkg)    │
                      └─────────┬──────────┘
                                │
                      graph-prepared.json
                                │
                     dataStore.setPreparedData()
                                │
                      ┌─────────┴──────────────┐
                      │  Overview mode         │
                      │  render spheres        │
                      │  at centroids          │
                      └─────────┬──────────────┘
                                │ click sphere → setCommunityFilter(id)
                                ▼
                      ┌──────────────────────────┐
                      │  Detail mode             │
                      │  filterByCommunity       │
                      │  normalize positions     │
                      │  render nodes/edges      │
                      └──────────────────────────┘
```

### Layout algorithm

The layout (`src/data/layout.ts`) uses `ngtx/layout` — a fast force-directed 3D layout:

- **Initialization** — Fibonacci sphere distribution (good 3D coverage)
- **Repulsion** — sampled random pairs with inverse-square force
- **Attraction** — spring force along graph edges toward ideal length
- **Center gravity** — pulls all nodes toward origin
- **Adaptive cooling** — alpha decay with early stopping when total energy drops below threshold

### Enrichment pipeline

The `prepare-data` script (`src/data/prepare.ts`) runs three stages:

1. **Enrich nodes** (`src/data/enrich.ts`) — classifies each node by entity type using label heuristics:
   - `function` / `method` — uppercase + parens, `function` keyword
   - `type` — interface, type, PascalCase
   - `file` — path containing a file extension
   - `config-key` — UPPER_CASE or dot-separated keys
   - `package` — `@scope/name` patterns
   - `variable` — lowercase identifiers
   - Extracts `package_name` from `source_file` paths (e.g. `packages/foo/src/bar.ts` → `@repo/foo`)

2. **Layout** — force-directed 3D positions

3. **Enrich communities** — builds semantic labels from child node names (dominant package + top non-generic terms)

## Exports

| Export | Path | Description |
| ------ | ---- | ----------- |
| `App` | `./src/App.tsx` | Full-screen wrapper rendering `GraphCanvas` |
| — | `./src/styles` | Global CSS (full-screen layout, dark background) |

### Internal components (not part of public API)

| File | Export | Role |
| ---- | ------ | ---- |
| `src/components/GraphCanvas` | `GraphCanvas` | Loads prepared data, creates R3F Canvas + panel |
| `src/features/scene/components/Scene` | `Scene` | Mode switching, camera, all 3D objects |
| `src/features/graph/components/GraphNodes` | `GraphNodes` | InstancedMesh spheres — per-instance size + color by degree |
| `src/features/graph/components/GraphNodesGroup` | `GraphNodesGroup` | Single InstancedMesh group (split by health) |
| `src/features/graph/components/GraphEdges` | `GraphEdges` | LineSegments for intra-community edges, relation-type filtered |
| `src/features/graph/components/GraphCommunitySpheres` | `GraphCommunitySpheres` | InstancedMesh spheres at community centroids |
| `src/features/graph/components/CommunityEdges` | `CommunityEdges` | LineSegments for inter-community edges, relation-type filtered |
| `src/features/graph/components/CommunityLinks` | `CommunityLinks` | Ghosted lines to linked communities in detail mode |
| `src/features/graph/components/HyperedgeLayer` | `HyperedgeLayer` | Transparent hulls for hyperedge clusters |
| `src/features/graph/components/HighlightedEdges` | `HighlightedEdges` | Relation-colored lines from selected node |
| `src/features/graph/services/edgeGeometry` | — | Edge BufferGeometry builder |
| `src/features/graph/services/communityGeometry` | — | Community edge geometries, clustering logic |
| `src/features/graph/hooks/useInstanceMesh` | — | InstancedMesh matrix/color updater |
| `src/features/annotation/components/NodeLabel` | `NodeLabel` | drei `Text` label for a single node |
| `src/features/annotation/components/NodeTypeIndicators` | `NodeTypeIndicators` | Small icons for entity types |
| `src/features/annotation/components/CommunityLabel` | `CommunityLabel` | drei `Text` label for a community |
| `src/features/panel/components/GraphPanel` | `GraphPanel` | DOM overlay — community list, filters, node info |
| `src/features/panel/components/ColorLegend` | `ColorLegend` | Searchable community swatch list |
| `src/features/scene/hooks/useFlyAnimation` | — | Camera fly-to between overview/detail with ease-out cubic |
| `src/features/scene/hooks/useCameraDistance` | — | Tracks camera distance for LOD |
| `src/features/scene/services/cameraUtils` | — | Fly animation creation + tick, LOD segment selection |
| `src/stores/dataStore` | `useDataStore` | Zustand store: raw + derived graph data |
| `src/stores/uiStore` | `useUiStore` | Zustand store: selection, filters, view settings |
| `src/data/prepare` | — | Node.js build script: enrichment + layout + community computation |
| `src/data/enrich` | — | Entity type classification, package extraction, semantic labels |
| `src/data/layout` | — | Force-directed 3D layout via `ngtx/layout` |
| `src/utils/colors` | — | 24-color community palette, `hexToRgb` |
| `src/utils/communities` | — | Centroid computation, position normalization, community filtering |
| `src/utils/nodes` | — | Degree computation, size/brightness mapping |
| `src/types` | `GraphNode`, `GraphLink`, `GraphData`, `CommunityData`, ... | Shared type definitions |

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

### Customizing visuals

All visual constants live in `src/config.ts` — lighting, node appearance, label offsets, edge opacities, and more. Import and override at the config level:

```tsx
// src/config.ts — grouped visual constants
import {
  fog,
  keyLight,
  nodes as nodeConfig,
  nodeLabel
} from '@repo/graph-viz/config';

// Override before mounting: spread then patch
const myConfig = {
  ...keyLight,
  position: [30, 40, 20] as [number, number, number],
  intensity: 2.0
};

// Or import individual groups to read at runtime
console.log(nodeConfig.roughness); // 0.85
console.log(nodeLabel.offsetY); // 2
```

To override defaults for a whole project, re-export patched config:

```tsx
// my-app/graph-viz-config.ts
export { fog, controls, camera } from '@repo/graph-viz/config';

export const keyLight = {
  position: [30, 40, 20] as const,
  intensity: 2.0
  // ...spread remaining defaults from the source config.ts
};
```

## State Management

Two Zustand stores separate concerns:

### `dataStore` — graph data (set once on load)

| State | Type | Description |
| ----- | ---- | ----------- |
| `graphData` | `GraphData \| null` | Raw graph.json nodes and links |
| `positions` | `Float32Array \| null` | 3D positions from force layout |
| `degrees` | `Float32Array \| null` | Per-node connection count |
| `nodeIndex` | `Map<string, number>` | Node ID → array index lookup |
| `communities` | `Map<number, CommunityData>` | Community metadata (centroid, size, color, semantic labels) |
| `interCommunityEdges` | `Map<string, InterCommunityEdge>` | Edges between communities |
| `isLoaded` | `boolean` | True after prepared data is loaded |

### `uiStore` — interactive state (frequently read/written)

| State | Type | Description |
| ----- | ---- | ----------- |
| `selectedNode` | `GraphNode \| null` | Currently clicked node |
| `communityFilter` | `string` | Single ID → detail mode; empty / multi → overview |
| `searchQuery` | `string` | Node label filter |
| `minCommunitySize` | `number` | Minimum community size for overview visibility |
| `hiddenRelationTypes` | `Set<RelationType>` | Edge relation types to hide (default: none) |
| `entityTypeFilter` | `string` | Entity type to isolate (empty = all) |
| `autoRotate` | `boolean` | OrbitControls auto-rotation toggle |
| `showEdges` | `boolean` | Edge visibility toggle |
| `showHyperedges` | `boolean` | Hyperedge hull toggle |
| `showNodeLabels` | `boolean` | Toggle all node labels in detail mode |
| `isPanelOpen` | `boolean` | DOM overlay visibility |

View mode is **derived** from `communityFilter`: a single numeric ID enters detail mode; anything else shows overview.

Selectors ensure components only re-render when their slice of state changes:

```tsx
// Only re-renders when positions change
const positions = useDataStore((s) => s.positions);

// Only re-renders when the filter changes
const communityFilter = useUiStore((s) => s.communityFilter);
```

## Filtering

The panel exposes several filter controls:

- **Community IDs** — enter a number or range to filter which communities appear
- **Min community size** — slider to hide small communities in overview
- **Edge Types** — toggle individual relation types (e.g. hide `contains` to see cross-file relationships)
- **Entity Types** — select a single entity kind (`function`, `type`, `config-key`, etc.) to isolate it in detail mode
- **Search** — filter communities or nodes by label text

## Patterns & Gotchas

- **File naming** — filename matches the primary export. No barrel files. Named exports only. `verbatimModuleSyntax` and `noUnusedLocals` are enforced.
- **React compiler** — enabled via `@vitejs/plugin-react`'s `reactCompilerPreset`. Do not wrap expensive computations in `useMemo` unless profiling proves a bottleneck; the compiler handles it.
- **R3F component patterns** — use JSX for Three.js objects, `attach` for non-standard properties, `ref` for direct mutation in `useFrame`. Never call `setState` in `useFrame`.
- **Community position normalization** — detail mode positions are centered at origin and optionally scaled down (if original spread exceeds 15 units). Every community fills a consistent view volume. Camera fly-to distance is capped to match this normalization so communities don't appear as a distant blob.
- **Build-time enrichment** — entity types and package names are computed once in `prepare-data`. To update after a code change, re-run `graphify` then `prepare-data`.
- **Node overlap** — node size encodes degree. Layout treats nodes as zero-size points. If nodes overlap, adjust size mapping in `src/utils/nodes.ts`.
- **Graph data lifecycle** — `graph-prepared.json` is loaded at startup. All derived data (positions, communities, enrichments) is precomputed at build time — zero computation on load.

## Performance

| Area | Strategy |
| ---- | -------- |
| **Layout** | Node.js build step (not a Web Worker). Sampled repulsion instead of all-pairs. Early stopping when energy converges. |
| **Rendering** | `InstancedMesh` for nodes and community spheres (single draw call). `LineSegments` for edges. |
| **Event handling** | `onPointerMove` for hover, click via instance ID mapped to data index. |
| **Re-renders** | Zustand selectors isolate subscribers. React compiler memoizes inline computations. |

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
