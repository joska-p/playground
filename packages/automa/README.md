# @repo/automa

> An interactive cellular automaton — paint life onto a GPU-driven grid, watch it evolve under pluggable rules.

Automa wraps the pure simulation engine ([`@repo/automa-engine`](/docs/reference/packages/automa-engine)) in an interactive WebGL2 canvas with GPGPU stepping, brush painting, creature patterns, and a rule selector.

State lives on the GPU. The grid is uploaded once, then transformed in-place by GLSL compute shaders — zero-copy to display.

## Usage

```tsx
import { App } from '@repo/automa/automa';

function Page() {
    return (
        <App
            rows={300}
            cols={400}
        />
    );
}
```

## Architecture

See [`ARCHITECTURE.md`](./ARCHITECTURE.md) for the full data flow and responsibility boundaries.

```
pnpm dev --filter @repo/automa
```
