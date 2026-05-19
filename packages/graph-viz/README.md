# @repo/graph-viz

> Interactive knowledge graph viewer for graphify output. Renders entity-relationship graphs with community coloring, search, and node inspection.

---

## Quick Start

```bash
pnpm add @repo/graph-viz
```

```astro
---
import { readFileSync } from "node:fs";
import { GraphViewer } from "@repo/graph-viz";

const graphData = JSON.parse(
  readFileSync("public/graphify/graph.json", "utf-8"),
);
---

<GraphViewer data={graphData} client:only="react" />
```

---

## Core Philosophy

Graphs from `graphify` are **node-link data** — entities (nodes) connected by typed, confidence-tagged relationships (edges). This component renders that data without a server:

1. **Data in, graph out** — Pass `graph.json` as a prop at build time. No runtime API needed.
2. **vis-network** — Force-directed layout with pan, zoom, click, and drag.
3. **Community-aware** — Nodes colored by detected community. Legend shows all groups.
4. **Honest by default** — Edge confidence (EXTRACTED / INFERRED / AMBIGUOUS) is visible on selection.

---

## Props

```typescript
type GraphViewerProps = {
  /** Graph data as produced by graphify (graph.json) — pass at build time */
  data?: GraphData;

  /** Alternative: fetch graph JSON from this URL at runtime */
  url?: string;

  /** Container height (default: "100vh") */
  height?: string;

  /** Show the info/legend sidebar (default: true) */
  showSidebar?: boolean;

  /** Show the community legend in the sidebar (default: true) */
  showLegend?: boolean;

  /** Callback when a node is clicked */
  onNodeClick?: (node: GraphNode) => void;

  /** Callback when a node is double-clicked (drills into neighbors) */
  onNodeDoubleClick?: (node: GraphNode) => void;

  /** Force dark or light theme. Auto-detects from document if unset. */
  theme?: "dark" | "light";

  /** vis-network options overrides (merged with defaults) */
  networkOptions?: Record<string, unknown>;
}
```

### Data or URL — not both

```tsx
{/* Build-time: data is baked into the HTML, zero network requests */}
<GraphViewer data={graphData} />

{/* Runtime: component fetches JSON on mount */}
<GraphViewer url="/graphify/graph.json" />
```

---

## Graph Data Format

The data follows the [NetworkX node-link format](https://networkx.org/documentation/stable/reference/readwrite/json_graph.node_link.html) with graphify extensions:

```typescript
type GraphData = {
  nodes: GraphNode[];
  links: GraphEdge[];
  graph: { hyperedges: Hyperedge[] };
};

type GraphNode = {
  id: string;
  label: string;
  file_type: "code" | "document" | "paper" | "image" | "rationale";
  source_file: string;
  community?: number;
  source_location?: string | null;
  source_url?: string | null;
  author?: string | null;
  contributor?: string | null;
};

type GraphEdge = {
  source: string;
  target: string;
  relation: string;
  confidence: "EXTRACTED" | "INFERRED" | "AMBIGUOUS";
  confidence_score: number;
  source_file: string;
  weight: number;
};

type Hyperedge = {
  id: string;
  label: string;
  nodes: string[];
  relation: string;
  confidence: "EXTRACTED" | "INFERRED";
  confidence_score: number;
  source_file: string;
};
```

---

## Interaction

| Gesture | Action |
| :------ | :----- |
| **Click** a node | Select — sidebar shows label, type, source file, community, all edges |
| **Double-click** a node | Focus — centers view, highlights 1-hop neighbors, fades rest |
| **Drag** a node | Reposition (physics resumes on release) |
| **Scroll** | Zoom in/out |
| **Pan** (click-drag empty space) | Move viewport |
| **Click** an edge | Show relation type, confidence, confidence score |
| **Click legend item** | Fly to that community's centroid |
| **Search** (sidebar) | Type to filter nodes by label — click result to focus |

---

## Theming

The component auto-detects dark/light from the document. Force it with the `theme` prop:

```tsx
{/* Auto-detect */}
<GraphViewer data={graphData} />

{/* Force dark */}
<GraphViewer data={graphData} theme="dark" />

{/* Override vis-network physics or styling */}
<GraphViewer
  data={graphData}
  networkOptions={{
    physics: { stabilization: { iterations: 200 } },
    nodes: { font: { size: 14 } },
  }}
/>
```

Community colors are generated from a 24-color palette. Nodes with no community render as neutral gray.

---

## Data Flow

```
graphify build → graphify-out/graph.json
                       ↓
           apps/playground/public/graphify/graph.json   ← copy-graph script
                       ↓
           Astro frontmatter reads JSON at build time
                       ↓
            <GraphViewer data={graphData} client:only="react" />
                       ↓
            vis-network renders interactive graph
```

The copy step runs automatically before dev/build:

```json
{
  "scripts": {
    "copy-graph": "cp ../../graphify-out/graph.json public/graphify/",
    "predev": "pnpm copy-graph",
    "prebuild": "pnpm copy-graph"
  }
}
```

---

## Architecture

```
src/
├── index.tsx              ← exports { GraphViewer, GraphData, GraphNode, ... }
├── GraphViewer.tsx         ← "use client" — orchestrator (data/url, theme, sidebar)
├── types.ts                ← GraphData, GraphNode, GraphEdge, Hyperedge
├── colors.ts               ← 24-color community palette
├── components/
│   ├── GraphCanvas.tsx     ← vis-network wrapper (React 19 ref prop)
│   ├── Sidebar.tsx         ← search bar + node/edge info + neighbor list
│   └── Legend.tsx          ← community legend, clickable to focus
└── utils/
    └── graph.ts            ← findNodeById, neighborIds, edgesForNode, etc.
```

- **React 19** — `ref` is passed as a regular prop. No `forwardRef`.
- **vis-network 10** — imported from `vis-network/standalone` (includes `DataSet`).

---

## Customization

1. **Custom node click** — Pass `onNodeClick` to handle selections externally.
2. **Custom sidebar** — Set `showSidebar={false}` and render your own panel using `onNodeClick`.
3. **Custom physics** — Pass `networkOptions.physics` overrides.
4. **Build-time only** — Provide `data` for zero network requests. Data is serialized into the HTML.

---

## Related

- [graphify](https://opencode.ai) — knowledge graph extractor
- [vis-network](https://visjs.github.io/vis-network/) — graph visualization engine

---

_Part of @repo/playground_
