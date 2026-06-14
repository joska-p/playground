# @repo/graph-viz

> 3D force-directed graph visualisation using Three.js and React Three Fiber.

## Purpose

Renders a codebase dependency graph as an interactive 3D scene. Nodes represent files (code → spheres, documents → boxes), edges represent relationships. Supports community-based filtering, node selection, and orbit controls.

## Quick Start

```bash
pnpm --filter @repo/graph-viz dev
```

### Data preparation

The graph visualisation requires pre-processed JSON input. Run the pipeline to produce `processed-graph.json` from a `graphify-out/graph.json` at the repo root:

```bash
pnpm --filter @repo/graph-viz prepare-data
```

This executes a four-stage pipeline: parse → simulate → normalise → build output. The result is written to `src/data/processed-graph.json`.

```bash
pnpm --filter @repo/graph-viz build
```

## Exports

| Export | Path | Description |
| ------ | ---- | ----------- |
| `App` | `.` | Root component — embeds the 3D canvas, sidebar with details panel and filter controls |
| `global.css` | `./styles` | Tailwind v4 stylesheet with project theme tokens |

## Architecture

```
src/
├── config.ts                     # PALETTE (24 colours, single source of truth)
├── data/
│   ├── graphData.types.ts        # Public types (GraphData, GraphNode, GraphLink)
│   ├── pipeline.ts               # Pipeline orchestrator
│   ├── prepare.ts                # CLI entrypoint for data preparation
│   └── stages/
│       ├── parse-graph.ts        # Stage 1: raw JSON → SimNode/SimLink
│       ├── run-simulation.ts     # Stage 2: d3-force-3d layout
│       ├── normalize-coords.ts   # Stage 3: scale coords to [-500, 500]
│       ├── build-output.ts       # Stage 4: bake colours, build GraphData
│       └── sim-types.ts          # Internal simulation types
├── stores/graph/
│   ├── store.ts                  # Zustand store creation
│   ├── types.ts                  # Store-specific types
│   ├── actions.ts                # Mutators (selectNode, toggleCommunity, …)
│   └── selectors.ts              # Read hooks (useSelectedNodeIdx, …)
├── components/
│   ├── scene/
│   │   ├── GraphCanvas.tsx       # R3F Canvas setup with lighting & controls
│   │   ├── Nodes.tsx             # Dual InstancedMesh (spheres for code, boxes for docs)
│   │   └── Edges.tsx             # LineSegments for graph edges
│   ├── controls/
│   │   └── FilterControls.tsx     # Community toggle + edge visibility switch
│   └── details-panel/
│       ├── DetailsPanel.tsx      # Routes between overview and node details
│       ├── utils.ts              # Stats & connections helpers
│       ├── graph-overview/       # Summary stats (node/edge/group counts)
│       └── node-details/         # Selected node info & connection list
└── styles/
    └── global.css                # Tailwind v4 imports
```

### Data flow

```
graphify-out/graph.json
        │
  [parse-graph]    raw JSON → SimNode[] + SimLink[]
        │
  [run-simulation] d3-force-3d layout (300 ticks)
        │
  [normalize-coords] scale → [-500, 500] range
        │
  [build-output]   assign colours, build GraphData
        │
        ▼
  processed-graph.json ──► App.tsx (static import)
```

Colours are baked into `GraphNode.color` and `GraphCommunity.color` at build time. Communities are sorted by size descending and assigned `PALETTE[rank % 24]` from `config.ts`.

### Rendering

- **Code nodes** (`file_type: "code"`) render as spheres via one `InstancedMesh` (~2501 instances).
- **Document nodes** (`file_type: "document"`) render as boxes via a second `InstancedMesh` (~465 instances).
- Dual meshes share a single `useEffect` that iterates all nodes once and dispatches transforms to the correct mesh.
- Hidden community nodes are scaled to `0.001` to prevent raycasting.
- Selected node is highlighted by lerping toward white.
- Edges are rendered as `lineSegments` — only edges connecting two visible communities are drawn.

## Usage Examples

### Standalone embed

```tsx
import { App } from '@repo/graph-viz';

export default function Page() {
  return <App />;
}
```

### As a docs site widget

See `apps/playground/src/pages/graph-viz.astro` for the production integration — wraps `App` in an Astro client directive with the page layout.

## Patterns & Gotchas

- **Instance index ≠ global node index.** Because code and document nodes are split across two meshes, click handlers receive a per-mesh `instanceId`. The dual-mesh `useEffect` handles mapping by iterating all nodes and tracking local indices per mesh; selection currently uses the global `nodes[]` index (not instance IDs), so both meshes share a single `handleClick` that maps `event.instanceId` to the global nodes array.
- **No keyboard handling.** Only `onPointerMissed` on the Canvas deselects (click on empty space). No Escape key support.
- **Community visibility takes precedence.** Clicking a node whose community is hidden is a no-op.
- **No hover effects.** There is no pointer-over state for nodes.

## State Management

A single Zustand store in `stores/graph/`:

| State | Type | Default | Description |
|-------|------|---------|-------------|
| `selectedNodeIdx` | `number \| null` | `null` | Index of selected node in `GraphData.nodes` |
| `edgesVisible` | `boolean` | `true` | Show/hide all edges |
| `visibleCommunities` | `Set<number>` | `[]` | Community IDs currently visible |
| `totalCommunities` | `number` | `0` | Total community count |

Key actions: `selectNode`, `toggleEdges`, `toggleCommunity`, `showAllCommunities`, `hideAllCommunities`, `initCommunities`.

## Performance

- Two `InstancedMesh` draw calls render all ~2966 nodes. Individual `<mesh>` components would cost thousands of draw calls.
- `lineSegments` renders all edges in a single draw call.
- No `useMemo` — the React Compiler (Babel plugin) handles memoisation automatically.
- `toneMapped={false}` on mesh materials preserves exact colour values from the palette.
- `frustumCulled={false}` on meshes prevents the camera frustum from culling instances that fall outside a single bounding sphere.

## Testing

```bash
pnpm --filter @repo/graph-viz check-types
pnpm --filter @repo/graph-viz lint
```

## Contributing

PRs welcome! See [CONTRIBUTING.md](../../CONTRIBUTING.md).

## Changelog

Follows SemVer. See [CHANGELOG.md](../../CHANGELOG.md).

---

_Part of [Creative Playground](https://jpotin.gitlab.io/playground/)_
