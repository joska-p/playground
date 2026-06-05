# @repo/graph-viz

> Interactive D3-based graph visualization with force-directed layout, detail panel, and legend.  
> Renders the output of [`graphify`](https://opencode.ai) — a workspace dependency graph.

## Quick Start

```bash
pnpm add @repo/graph-viz
```

```tsx
import { GraphViz } from '@repo/graph-viz';

export default function Graph() {
  return <GraphViz />;
}
```

The graph renders automatically from `src/data/graph.json`, which is a copy of `graphify-out/graph.json` synced by the `graphify` script:

```bash
pnpm graphify   # runs graphify update + copies into the package
```
