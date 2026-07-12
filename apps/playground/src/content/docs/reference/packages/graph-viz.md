---
title: 'Graph Visualization'
description: 'A codebase rendered as a galaxy — files become spheres and boxes floating in 3D space, their dependency edges drawn as luminous threads, community clusters glowing in twenty-four palette colours.'
category: 'reference'
tags:
  - reference
  - graph-viz
order: 20
---

# @repo/graph-viz

---

## Essence

Graph Viz is a standalone 3D force-directed graph visualizer that takes a
codebase's dependency structure and turns it into an interactive scene you
can orbit, explore, and filter. It is not a library — it is a full
application: a build-time data pipeline that cooks raw graph data into a
render-ready payload, and a runtime React layer that draws the result using
Three.js and React Three Fiber.

The interesting tension is between _computational density_ and _visual
legibility_. Thousands of nodes and edges must coexist in a single scene
without becoming noise. The solution is a two-pass approach: at build time,
a four-stage pipeline (parse → simulate → normalize → build) uses
d3-force-3d physics to spread nodes apart, then quantizes coordinates into
a predictable cube. At render time, two `InstancedMesh` draw calls replace
what would otherwise be thousands of individual `<mesh>` components — one
stamp for code spheres, one for document boxes — with per-instance colour
and scale driven by community membership and selection state.

Two Zustand stores divide the world cleanly: a content store holds the
graph data that never changes after initialization, and a view store
tracks everything the user does — which node is selected, which communities
are visible, whether edges and labels are shown. The boundary between
static and dynamic is the Zod schema at the entry point: if the data
passes validation, it is frozen; if it does not, the app renders an error
and stops.

## Quick Launch

```bash
pnpm dev --filter @repo/graph-viz
```

Or install it into your own project:

```bash
pnpm add @repo/graph-viz
```

```tsx
import { App } from '@repo/graph-viz';

export default function Page() {
  return <App />;
}
```

```tsx
import '@repo/graph-viz/styles';
```

## Field Notes

- **The Catalyst:** The question of what a codebase _looks like_ when its
  dependency graph is laid out in three dimensions. A large repository is
  not a tree — it is a web, with communities of tightly coupled files
  orbiting each other while sparser edges reach across to distant clusters.
  Force-directed layout makes this structure visible: files that share many
  dependencies are pulled together by simulated springs, while weakly
  connected files drift apart. The 3D view adds a dimension that flat
  layouts lose — depth, parallax, the sense of spatial separation that
  makes clusters legible. Clicking a node and watching its connections
  light up while everything else dims is the closest thing to seeing a
  codebase's nervous system.

- **Quirks & Anomalies:** The pipeline is a pure function composition
  (`buildOutput(normalizeCoords(runSimulation(parseGraph(raw))))`) that
  runs once at build time, not on every render. The CLI entry point
  (`prepare.ts`) reads `graphify-out/graph.json` from the repo root and
  writes `src/data/processed-graph.json` — a static import that gets
  validated by Zod at module scope. Community visibility uses scale culling
  (scaling hidden nodes to 0.001) rather than mesh reconstruction, which
  keeps the InstancedMesh count constant and avoids React re-renders. The
  `NodeVisualStrategy` pattern maps `file_type` to geometry — `'code'`
  becomes a `SphereGeometry`, everything else a `BoxGeometry` — but the
  size formula is shared: `Math.log(degree + 1) * 0.3 + 0.8`. There is no
  hover state, no keyboard handling, no `useMemo` — the React Compiler
  handles memoization, and the 24-color `PALETTE` is the single source of
  truth for all community colour assignment.

- **Future Horizons:** Animated simulation — watching the graph layout
  converge tick by tick instead of jumping to the final state. Edge
  bundling to reduce visual clutter when thousands of connections are
  visible at once. A minimap or bird's-eye view for orientation in large
  graphs. Hover tooltips on nodes showing file paths and degree counts.
  Export to a static SVG or PNG for embedding in documentation.

---

## Architecture

```
graphify-out/graph.json (build-time input)
  │
  ▼
Data Pipeline (CLI, build-time)
  parseGraph → runSimulation → normalizeCoords → buildOutput
  │
  ▼
src/data/processed-graph.json (static import)
  │
  ▼
Zod validation (App.tsx, module scope)
  │
  ├─ invalid → error message (role="alert")
  └─ valid → contentStore.initGraphData()
                │
                ▼
          React Render (runtime)
            ├─ Content Store — nodes, links, communities (immutable)
            ├─ View Store — selection, visibility, edges, labels (mutable)
            └─ Scene
                ├─ GraphCanvas (R3F Canvas + lighting + OrbitControls)
                │   ├─ Nodes — dual InstancedMesh (spheres + boxes)
                │   ├─ Edges — lineSegments (connected / disconnected)
                │   └─ CommunityLabels — floating Text (drei)
                └─ Sidebar
                    ├─ DetailsPanel (overview / node details)
                    └─ FilterControls (community toggles)
```

## State Management

Two Zustand stores, each in its own domain directory. Static data and
interaction state are independent domains — the content store is set once
on module load and never mutated; the view store changes in response to
every user action.

### Content store

| State         | Type          | Description                                 |
| :------------ | :------------ | :------------------------------------------ |
| `nodes`       | `GraphNode[]` | All nodes in the graph                      |
| `links`       | `GraphLink[]` | All directed edges between nodes            |
| `communities` | `Community[]` | Community metadata (name, colour, centroid) |

### View store

| State                | Type             | Default | Description                         |
| :------------------- | :--------------- | :------ | :---------------------------------- |
| `selectedNodeIdx`    | `number \| null` | `null`  | Global index of the selected node   |
| `edgesVisible`       | `boolean`        | `true`  | Show/hide all edges                 |
| `visibleCommunities` | `Set<number>`    | `[]`    | Community IDs currently visible     |
| `totalCommunities`   | `number`         | `0`     | Total community count               |
| `labelsVisible`      | `boolean`        | `false` | Show/hide floating community labels |

| Action               | Trigger                  | Effect                           |
| :------------------- | :----------------------- | :------------------------------- |
| Click node           | `Nodes.onClick`          | `selectNode(idx)` — toggles      |
| Click empty space    | `Canvas.onPointerMissed` | `selectNode(null)` — deselects   |
| Toggle edges         | `FilterControls` switch  | `toggleEdges()`                  |
| Toggle labels        | `FilterControls` switch  | `toggleLabels()`                 |
| Toggle community     | `FilterControls` button  | `toggleCommunity(id)`            |
| Show all communities | "All" button             | `showAllCommunities()`           |
| Hide all communities | "None" button            | `hideAllCommunities()`           |
| Orbit / pan / zoom   | OrbitControls            | Three.js native, no state change |

---

_See the [source](https://github.com/joska-p/playground/tree/main/packages/graph-viz) for the full pipeline, rendering logic, and configuration._

_Part of the [Creative Playground](https://joska-p.github.io/playground)_
