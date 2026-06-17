# @repo/graph-viz

> 3D force-directed graph visualization using Three.js, React Three Fiber, and Zustand.

## Purpose

Renders a codebase dependency graph as an interactive 3D scene. Nodes represent files (code -> spheres, documents -> boxes), edges represent relationships. Supports community-based filtering, node selection, orbit controls, and floating community labels.

The package is a **consumer** of the `graphify` tool — it takes `graphify-out/graph.json`, runs a data pipeline to produce a 3D-ready payload, and renders it inside an R3F Canvas with two InstancedMesh draw calls.

## Quick Start

```bash
pnpm --filter @repo/graph-viz prepare-data   # pipeline: graph.json -> processed-graph.json
pnpm --filter @repo/graph-viz dev             # Vite dev server
```

### Data preparation

The pipeline reads `graphify-out/graph.json` from the repo root and writes `src/data/processed-graph.json`:

```bash
pnpm --filter @repo/graph-viz prepare-data
```

```bash
pnpm --filter @repo/graph-viz build
```

## Exports

| Export       | Path       | Description                                                                           |
| ------------ | ---------- | ------------------------------------------------------------------------------------- |
| `App`        | `.`        | Root component — embeds the 3D canvas, sidebar with details panel and filter controls |
| `global.css` | `./styles` | Tailwind v4 stylesheet with gruvbox theme tokens                                      |

## Architecture

```
src/
├── App.tsx                          # Root: Zod validation + store init + layout
├── main.tsx                         # Standalone Vite entry (StrictMode + ErrorBoundary)
├── config.ts                        # PALETTE (24 colors)
├── data/
│   ├── graphData.schema.ts          # Zod schemas (GraphData, GraphNode, GraphLink, Community)
│   ├── pipeline.ts                  # Stage orchestrator: parse -> simulate -> normalise -> build
│   ├── prepare.ts                   # CLI entrypoint (reads graph.json, writes processed-graph.json)
│   ├── types.d.ts                   # d3-force-3d TypeScript declarations
│   └── stages/
│       ├── sim-types.ts             # SimNode / SimLink (internal simulation types)
│       ├── parse-graph.ts           # Stage 1: raw JSON -> SimNode[] + SimLink[]
│       ├── run-simulation.ts        # Stage 2: d3-force-3d layout
│       ├── normalize-coords.ts      # Stage 3: scale coords to [-500, 500]
│       └── build-output.ts          # Stage 4: assign colours, build GraphData
├── core/
│   ├── config.ts                    # CONFIG — all tunable parameters (scene, nodes, edges, labels, UI)
│   ├── build-instances.ts           # Builder: writes matrix + colour to InstancedMesh refs
│   ├── compute-edges.ts             # CQRS: returns connected/disconnected Float32Arrays
│   └── node-visual.strategy.ts      # Strategy: file_type -> geometry/size dispatch
├── stores/
│   ├── content/                     # Repository: holds static graph data (nodes, links, communities)
│   │   ├── store.ts                 # create()
│   │   ├── types.ts                 # ContentState
│   │   ├── actions.ts               # initGraphData()
│   │   └── selectors.ts             # useNodes(), useLinks(), useCommunities()
│   └── view/                        # UI interaction state
│       ├── store.ts                 # create()
│       ├── types.ts                 # ViewState
│       ├── actions.ts               # selectNode, toggleCommunity, toggleEdges, toggleLabels...
│       └── selectors.ts             # useSelectedNodeIdx, useVisibleCommunities, ...
├── components/
│   ├── scene/
│   │   ├── GraphCanvas.tsx          # R3F Canvas + lighting + OrbitControls
│   │   ├── Nodes.tsx                # Dual InstancedMesh (spheres + boxes)
│   │   ├── Edges.tsx                # LineSegments for graph edges
│   │   └── CommunityLabels.tsx      # Floating Text labels (drei)
│   ├── controls/
│   │   └── FilterControls.tsx       # Community toggle + edge/label toggles
│   └── details-panel/
│       ├── DetailsPanel.tsx         # Routes between overview and node details
│       ├── utils.ts                 # getStats() + getConnections()
│       ├── graph-overview/
│       │   ├── GraphOverview.tsx    # Summary stats (node/edge/group counts)
│       │   └── Stat.tsx             # Single stat display
│       └── node-details/
│           ├── NodeDetails.tsx      # Selected node info + connections
│           └── ConnectionRow.tsx    # Single connection list item
└── styles/
    └── global.css                   # Tailwind v4 + gruvbox theme
```

## Walkthrough: From graphify Output to Rendered Scene

This section traces every step from the raw graphify output to the interactive 3D render. Each phase starts with a plain English explanation followed by the technical details.

### Phase 1: Data Pipeline (build-time, CLI)

**Plain English:** Think of this phase like preparing film negatives before developing photos. Graphify produces a raw list of files and their relationships — essentially a phonebook of who-knows-who in the codebase. We can't render that directly; it needs to be cooked. The pipeline takes that raw list and runs it through four processing steps: first it organises the data into a clean format, then it simulates physics (like giving each file a magnetic charge so they spread apart neatly), then it scales everything to fit inside our 3D box, and finally it colour-codes files by their community groups and writes the finished result to a file. All of this happens once, before you even open the page — it's a build-time preparation step.

The pipeline is a pure, side-effect-free function composition in `src/data/pipeline.ts`:

```
runPipeline(raw, config?) = buildOutput(normalizeCoords(runSimulation(parseGraph(raw))))
```

It is invoked by `src/data/prepare.ts` which handles I/O: reads `graphify-out/graph.json`, calls `runPipeline()`, writes the result to `src/data/processed-graph.json`.

#### Stage 1 — parseGraph (`src/data/stages/parse-graph.ts`)

**Input:** `RawGraph` from graphify — `{ nodes: RawNode[], links: RawLink[] }`.

Each raw node has: `id`, `label`, `norm_label`, `file_type`, `community`. Each raw link has: `source`, `target`, `relation`.

**Function:** `parseGraph(raw): ParseResult`

1. Maps raw nodes to `SimNode[]` with degree counters initialised to 0.
2. Builds a `Map<string, SimNode>` for O(1) lookup by ID.
3. Iterates links once: increments `inDegree`/`outDegree` on the referenced nodes, builds `SimLink[]` with object references (not string IDs) — links whose source or target ID is missing from the node map are dropped.
4. Returns `{ simNodes, simLinks, stats }` (stats include node count, link count, max in/out degree).

#### Stage 2 — runSimulation (`src/data/stages/run-simulation.ts`)

**Input:** `SimNode[]`, `SimLink[]`, optional `SimulationConfig` (default: 300 ticks, link distance 30, charge -120, collide radius 8).

**Function:** `runSimulation(simNodes, simLinks, config?): SimulationResult`

1. Creates a `d3-force-3d` simulation with four forces: `forceLink` (attraction along edges), `forceManyBody` (repulsion between all nodes), `forceCenter` (origin), `forceCollide` (prevents overlap).
2. Runs `config.ticks` manual ticks, then stops.
3. Mutates `SimNode.x/y/z` and `SimLink.source/target` in place (d3 force mutates objects directly).
4. Returns `{ simNodes, simLinks, stats }`.

#### Stage 3 — normalizeCoords (`src/data/stages/normalize-coords.ts`)

**Input:** `SimNode[]`, optional `NormalizeConfig` (default `targetMax: 500`).

**Function:** `normalizeCoords(simNodes, config?): NormalizeResult`

1. Finds the maximum absolute coordinate value across all nodes' x/y/z.
2. Computes a uniform scale factor: `targetMax / maxCoord`.
3. Scales every node's x/y/z by that factor.
4. Returns `{ simNodes, stats }`.

This guarantees the graph fits within a predictable volume `[-500, 500]^3`.

#### Stage 4 — buildOutput (`src/data/stages/build-output.ts`)

**Input:** `SimNode[]`, `SimLink[]`.

**Function:** `buildOutput(simNodes, simLinks): BuildOutputResult`

1. Converts `SimNode[]` to `GraphNode[]`: flattens positions, degree counts, sets default colour `#888888`.
2. Converts `SimLink[]` to `GraphLink[]`: replaces object references with numeric `sourceIdx`/`targetIdx` into the nodes array.
3. Groups nodes by `community`, computes the centroid (average position) for each group.
4. Assigns colours from `PALETTE`: communities are sorted by size descending, then assigned `PALETTE[rank % 24]`.
5. Derives human-readable community names via `deriveCommunityName()` — parses node IDs, splits on `_`, looks for common prefixes like `packages/` or `apps/`, picks the most frequent prefix at depth 2–4 with 3+ members.
6. Writes community colours back to each `GraphNode.color`.
7. Returns `{ result: GraphData, stats }`.

The output `GraphData` conforms to the Zod schema in `graphData.schema.ts`.

### Phase 2: Module Load & Validation (runtime, once)

**Plain English:** When you open the page, the first thing that happens is the app loads the prepared data file and checks it against a blueprint (our Zod schema) to make sure every piece of data is in the right shape — correct fields, right types, no missing parts. If something is wrong, the page shows an error message. If everything checks out, the data gets loaded into a central storage area (the "content store") so that every component on the page can read from the same source. This all happens in an instant when the page first loads, and the data never changes after that — it's read-only from here on.

When the bundle loads (`src/App.tsx` at module scope):

```
1. processed-graph.json is statically imported
2. Zod safeParse validates the JSON against graphDataSchema
3. If invalid -> renders error message with role="alert"
4. If valid -> contentStore.getState().initGraphData(parsedData)
```

**Zod schema** (`src/data/graphData.schema.ts`) is the single source of truth for `GraphData`, `GraphNode`, `GraphLink`, and `Community` types. The TypeScript types are derived via `z.infer<typeof schema>`. Validation happens at the entry point — not scattered in components.

**Content store** (`src/stores/content/`) holds the static graph data: `{ nodes, links, communities }`. It never changes after initialisation. Components read from it via selectors: `useNodes()`, `useLinks()`, `useCommunities()`.

### Phase 3: Component Mount & Store Initialisation (React render)

**Plain English:** With the data loaded, React starts building the actual page you see. Think of this as setting up the stage before a performance. The app creates a 3D canvas — an empty space where the graph will live — and positions the virtual camera so you're looking at it from a nice distance. It turns on the lights so shapes are visible. It also tells the system "these are all the community groups that exist" so that the filter panel in the sidebar knows what to show. At the end of this phase, the stage is set, the data is ready in memory, but nothing has been drawn yet — we've just positioned all the pieces.

```
<App>
  └─ <Sidebar>
       ├─ <Sidebar.Main>
       │    └─ <GraphCanvas>        🔵 Mounts R3F Canvas
       │         ├─ initCommunities()  🔵 Sets visibleCommunities + totalCommunities in view store
       │         ├─ <Nodes />          🔵 Subscribes to view store (selection, visibility)
       │         ├─ <CommunityLabels /> 🔵 Subscribes to view store (labels, visibility)
       │         ├─ <Edges />          🔵 Subscribes to view store (edges, selection, visibility)
       │         ├─ <ambientLight /> + <directionalLight /> ×2
       │         └─ <OrbitControls />
       └─ <Sidebar.Panel>
            ├─ <DetailsPanel>
            │    ├─ <GraphOverview>   # when selectedNodeIdx === null
            │    └─ <NodeDetails>     # when selectedNodeIdx !== null
            └─ <FilterControls>       # dispatches toggle actions to view store
```

**GraphCanvas** (`src/components/scene/GraphCanvas.tsx`):

1. Creates the R3F `<Canvas>` with camera `[0, 0, 800]`, antialias, alpha disabled.
2. On mount: reads communities from the content store, calls `initCommunities(communityIds)` on the view store — this populates `visibleCommunities` with all IDs and sets `totalCommunities`.
3. `onPointerMissed` on the Canvas calls `selectNode(null)` to deselect.
4. Renders child components inside the Canvas.

### Phase 4: Rendering (per frame / on state change)

**Plain English:** Now the actual drawing happens. Imagine you have 3,000 marbles and boxes that you need to arrange in mid-air, with some glowing and some dimmed, all connected by thin threads. That's what this phase does. Instead of creating one object for each file (which would be incredibly slow), the app uses a technique called "instancing" — like using a single stamp to print thousands of dots rather than drawing each dot by hand. Two stamps are used: one round stamp for code files (spheres) and one square stamp for documentation (boxes). The app tells each stamp where to place its marks, what colour to make them, and whether they should be big, small, or invisible. At the same time, it draws the threads (edges) between connected nodes — with brighter threads highlighting connections to the file you've clicked on. If community labels are turned on, it also places floating name tags above each group.

#### Nodes (`src/components/scene/Nodes.tsx`)

Two `<instancedMesh>` primitives:

- **Sphere** (`SphereGeometry`) for `file_type === 'code'` nodes
- **Box** (`BoxGeometry`) for everything else (documents)

On every render (triggered by `selectedNodeIdx` or `visibleCommunities` changes):

1. **`splitNodeIndices(nodes)`** (`src/core/build-instances.ts`): iterates all nodes once, separates indices into `codeToGlobal[]` and `docToGlobal[]` based on `file_type`. Returns lookup arrays for mapping instance IDs back to global node indices.

2. **`writeInstanceData(mesh, nodes, globalIndices, visibleCommunities, selectedNodeIdx)`**: iterates the subset of nodes assigned to this mesh, updates per-instance:
   - **Matrix** (position + scale): visible nodes get `scale = getNodeSize(node)` (where `size = Math.log(degree + 1) * 0.3 + 0.8`), hidden communities get `scale = 0.001`.
   - **Colour**: hidden nodes get `dimColor` (`#333`), selected node gets lerped toward `highlightColor` (`#fff`) by `highlightLerp` (0.4), others use baked `node.color`.
   - Calls `mesh.instanceMatrix.needsUpdate = true` and `mesh.instanceColor.needsUpdate = true`.

3. Click handling: `onClick` receives `event.instanceId`, maps it to the global node index via `codeToGlobal[instanceId]` or `docToGlobal[instanceId]`, then calls `selectNode(globalIdx)` (toggles on re-click — clicking the same node deselects it).

**Strategy pattern** (`src/core/node-visual.strategy.ts`): A `NodeVisualStrategy` registry maps `file_type` to geometry/size. The default strategy creates a `BoxGeometry`; a pre-registered `'code'` strategy creates a `SphereGeometry`. `getStrategy(fileType)` returns the matching strategy. Both use the same logarithmic size formula.

#### Edges (`src/components/scene/Edges.tsx`)

On every render (triggered by `edgesVisible`, `visibleCommunities`, or `selectedNodeIdx`):

1. **`computeEdgeBuffers(nodes, links, edgesVisible, visibleCommunities, selectedNodeIdx)`** (`src/core/compute-edges.ts`):
   - If `edgesVisible` is false, returns empty buffers (no edge rendering).
   - Skips any link where either endpoint's community is hidden.
   - If a node is selected: links touching it go to `connectedPositions` (bright), others to `disconnectedPositions` (dim).
   - If nothing is selected: all visible edges go to `connectedPositions`, `disconnectedPositions` is empty.
   - Returns `{ connectedPositions, disconnectedPositions }` as `Float32Array` (interleaved xyz pairs for line segments).

2. Two `<lineSegments>` render these buffers:
   - Connected group: `color = CONFIG.edges.connected.color` (`#888`), `opacity = 0.9`.
   - Disconnected group: `color = CONFIG.edges.disconnected.color` (`#444`), `opacity = 0.4`. Only rendered when a node is selected and disconnected edges exist.

#### Community Labels (`src/components/scene/CommunityLabels.tsx`)

On every render (triggered by `labelsVisible` or `visibleCommunities`):

1. Iterates `communities` from the content store.
2. Filters to communities that are both labelled (`labelsVisible`) and visible in the view store.
3. Renders `<Text>` (from `@react-three/drei`) at each community's `centroid` with the community name, offset upward by `CONFIG.labels.offsetY` (14 units).
4. Colour is lerped from the community colour toward white by `CONFIG.labels.colorLerp` (0.6).

### Phase 5: User Interaction (runtime)

**Plain English:** Once the graph is on screen, you can explore it. Click any node (sphere or box) to see its details — what file it represents, how many connections it has, and a list of what it connects to. The selected node glows brighter and its immediate connections become more visible while everything else fades back. Click empty space to deselect. Use the sidebar controls to turn edges on and off, toggle community labels, or hide/show entire community groups — useful when you want to focus on just one part of the codebase. You can also orbit, pan, and zoom around the graph using your mouse or touch, just like navigating a 3D model.

| Action               | Trigger                  | Effect                                          |
| -------------------- | ------------------------ | ----------------------------------------------- |
| Click node           | `Nodes.onClick`          | `viewStore.selectNode(idx)` — toggles selection |
| Click empty space    | `Canvas.onPointerMissed` | `viewStore.selectNode(null)` — deselects        |
| Toggle edges         | `FilterControls` switch  | `viewStore.toggleEdges()`                       |
| Toggle labels        | `FilterControls` switch  | `viewStore.toggleLabels()`                      |
| Toggle community     | `FilterControls` button  | `viewStore.toggleCommunity(id)`                 |
| Show all communities | "All" button             | `viewStore.showAllCommunities()`                |
| Hide all communities | "None" button            | `viewStore.hideAllCommunities()`                |
| Orbit / pan / zoom   | OrbitControls            | Three.js native, no React state change          |

Each action mutates the **view store**, which triggers re-renders in subscribed components via Zustand selectors.

## State Management

Two Zustand stores, each in its own domain directory. This split follows the project convention: **static data** (content store) and **UI state** (view store) are independent domains.

### Content store (`stores/content/`)

Static graph data — set once on module load, never mutated.

| State         | Type          | Description                                 |
| ------------- | ------------- | ------------------------------------------- |
| `nodes`       | `GraphNode[]` | All nodes in the graph                      |
| `links`       | `GraphLink[]` | All directed edges between nodes            |
| `communities` | `Community[]` | Community metadata (name, colour, centroid) |

Actions: `initGraphData(data)` — validates via Zod and sets all three arrays.
Selectors: `useNodes()`, `useLinks()`, `useCommunities()`.

### View store (`stores/view/`)

UI interaction state — changes frequently in response to user actions.

| State                | Type             | Default | Description                                  |
| -------------------- | ---------------- | ------- | -------------------------------------------- |
| `selectedNodeIdx`    | `number \| null` | `null`  | Global index into `nodes[]` of selected node |
| `edgesVisible`       | `boolean`        | `true`  | Show/hide all edges                          |
| `visibleCommunities` | `Set<number>`    | `[]`    | Community IDs currently visible              |
| `totalCommunities`   | `number`         | `0`     | Total community count                        |
| `labelsVisible`      | `boolean`        | `false` | Show/hide floating community labels          |

Actions: `initCommunities(ids)`, `selectNode(idx)`, `toggleEdges()`, `toggleLabels()`, `toggleCommunity(id)`, `showAllCommunities()`, `hideAllCommunities()`.
Selectors: `useSelectedNodeIdx()`, `useEdgesVisible()`, `useVisibleCommunities()`, `useLabelsVisible()`.

## Configuration

All tunable values live in `src/core/config.ts`:

```typescript
export const CONFIG = {
  scene: {
    camera: { position: [0, 0, 800], far: 5000 },
    ambientLight: { intensity: 0.6 },
    directionalLights: [
      { position: [1, 1, 1], intensity: 0.8 },
      { position: [-1, -1, -1], intensity: 0.3 }
    ],
    orbitControls: { dampingFactor: 0.1, minDistance: 10, maxDistance: 3000 }
  },
  nodes: {
    dimColor: '#333333', // hidden/dim nodes
    highlightColor: '#ffffff', // selected node lerp target
    highlightLerp: 0.4, // lerp factor toward highlight
    hiddenScale: 0.001, // scale for hidden community nodes (not removed, prevents raycasting)
    sizeScale: 0.3, // multiplier in size formula
    sizeBase: 0.8, // base in size formula: log(degree+1) * sizeScale + sizeBase
    sphereGeometry: { radius: 1, widthSegments: 10, heightSegments: 10 },
    boxGeometry: { width: 1, height: 1, depth: 1 }
  },
  edges: {
    connected: { color: '#888888', opacity: 0.9 },
    disconnected: { color: '#444444', opacity: 0.4 }
  },
  labels: {
    offsetY: 14, // distance above centroid
    fontSize: 3.5,
    colorLerp: 0.6, // lerp toward white
    outlineWidth: 0.3,
    outlineColor: '#000000'
  },
  ui: {
    maxConnectionsShown: 100 // max list items in NodeDetails
  }
} as const;
```

`PALETTE` (24 hex colours) is the single source of truth for all community colour assignment at build time.

## Patterns & Design Decisions

- **Instance index != global node index.** Nodes are split across two meshes by file type. Click handlers receive a per-mesh `instanceId`. The `splitNodeIndices()` / `writeInstanceData()` tandem handles mapping via lookup arrays. Selection uses the global `nodes[]` index, so both meshes share a single click handler.

- **Community visibility = scale culling, not removal.** Hidden community nodes are scaled to `CONFIG.nodes.hiddenScale` (0.001). This avoids mesh reconstruction and React re-renders — the InstancedMesh count stays the same. The scale is small enough to be invisible and prevent raycasting.

- **Two-tier edge rendering.** When a node is selected, edges touching it render brightly at full opacity; all other visible edges render dimly at reduced opacity. When nothing is selected, all visible edges render as a single group. This is handled by `computeEdgeBuffers()` returning separate Float32Arrays, rendered by two `<lineSegments>`.

- **Config is frozen with `as const`.** Every numeric value, colour, and toggle is typed as a literal — no magic strings or numbers in components.

- **Zod at the entry point.** Graph data is validated once (module load) via `safeParse` in `App.tsx`. Inline components assume data is well-typed. The Zod schema is the single source of truth; TypeScript types are derived via `z.infer`.

- **No keyboard handling.** Only `onPointerMissed` on the Canvas deselects (click on empty space). No Escape key support.

- **Community visibility takes precedence.** Clicking a node whose community is hidden is a no-op.

- **No hover effects.** There is no pointer-over state for nodes.

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

## Performance

- Two `InstancedMesh` draw calls render all ~2966 nodes. Individual `<mesh>` components would cost thousands of draw calls.
- `<lineSegments>` renders all edges in a single draw call.
- No `useMemo` — the React Compiler (Babel plugin) handles memoisation automatically.
- `toneMapped={false}` on mesh materials preserves exact colour values from the palette.
- `frustumCulled={false}` on meshes prevents the camera frustum from culling instances that fall outside a single bounding sphere.
- Re-renders are triggered by Zustand store changes — only components whose selectors return new values re-render.

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

_Part of [Creative Playground](https://joska-p.github.io/playground/)_
