---
title: "Graph Visualization"
description: "Interactive D3-based graph visualization with force-directed layout."
category: "reference"
tags:
  - reference
  - graph-viz
order: 20
---

# @repo/graph-viz

> Interactive D3-based graph visualization with force-directed layout, detail panel, and legend.

## Exports

| Export | Path | Description |
|--------|------|-------------|
| `GraphViz` | `@repo/graph-viz` | Main graph visualization component |
| `./styles` | `@repo/graph-viz/styles` | Graph CSS |

## Usage

```tsx
import { GraphViz } from "@repo/graph-viz";

export default function Graph() {
  return <GraphViz />;
}
```

## Architecture

`GraphViz` lays out a `TopBar`, a `GraphCanvas` (D3 force-directed graph), a `DetailPanel` (node/edge info), and a `Legend` — all inside a full-height dark-themed container. State is managed with Zustand.
