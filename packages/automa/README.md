---
title: 'Automa'
coordinates: '/visuals/generative'
status: 'Active'
date_discovered: 2025-06-01
---

# @repo/automa

> An interactive cellular automaton — paint life onto a GPU-driven grid, watch it evolve under pluggable rules.

---

## Essence

`@repo/automa` is the interactive WebGL2 workbench half of the cellular automaton ecosystem. It wraps the pure simulation engine ([`@repo/automa-engine`](/docs/reference/packages/automa-engine)) in an interactive R3F / Glaze canvas with GPGPU stepping, brush painting, creature stamp patterns, and a rule selector.

State lives on the GPU. The grid is uploaded once as a texture, then transformed in-place by GLSL compute shaders on a ping-pong state buffer — zero-copy to display.

## Quick Launch

```bash
pnpm dev --filter @repo/automa
```

Or embed the React component:

```tsx
import { App } from '@repo/automa/automa';

export default function Page() {
    return (
        <App
            rows={300}
            cols={400}
        />
    );
}
```

```tsx
import '@repo/automa/styles';
```

## Field Notes

- **The Catalyst:** Translating cellular automata from CPU loops into fragment shaders allows stepping millions of cells per second at 60 FPS while keeping the UI responsive.
- **Quirks & Anomalies:** The GPGPU state buffer ping-pongs two WebGL textures. Brushes and creature stamps write directly into the active state texture between frame steps.
- **Future Horizons:** Custom rule GLSL shader generator that compiles user B/S rules into fragment shaders on the fly.

---

## Architecture

```
@repo/automa-engine (B/S rules & presets)
  │
  ▼
@repo/automa (React / Glaze / WebGL2 UI layer)
  ├─ App.tsx (Controls, rule selector, speed slider)
  ├─ GpuCanvas (Glaze state buffer + fragment shader)
  └─ Creature stamps (Glider, Pulsar, Gosper Gun)
```

---

_Part of the [Creative Playground](https://joska-p.github.io/playground)_
