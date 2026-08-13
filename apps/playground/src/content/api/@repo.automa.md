---
title: "@repo/automa"
package: "@repo/automa"
kind: package
description: An interactive cellular automaton — paint life onto a GPU-driven
  grid, watch it evolve under pluggable rules.
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

## Modules

- [\<internal\>](@repo.automa.<internal>.md)

## Type Aliases

### AppProps

> **AppProps** = `object`

Defined in: [packages/automa/src/App.tsx:10](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/automa/src/App.tsx#L10)

Props for configuring the Automa interactive workbench component.

#### Properties

##### cols?

> `optional` **cols?**: `number`

Defined in: [packages/automa/src/App.tsx:14](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/automa/src/App.tsx#L14)

Number of grid columns (default 400).

##### initialDensity?

> `optional` **initialDensity?**: `number`

Defined in: [packages/automa/src/App.tsx:18](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/automa/src/App.tsx#L18)

Initial cell density ratio between 0 and 1.

##### rows?

> `optional` **rows?**: `number`

Defined in: [packages/automa/src/App.tsx:12](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/automa/src/App.tsx#L12)

Number of grid rows (default 300).

##### seed?

> `optional` **seed?**: `number`

Defined in: [packages/automa/src/App.tsx:16](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/automa/src/App.tsx#L16)

Random seed for grid generation.

## Functions

### App()

> **App**(`props`): [`Element`](@repo.automa.<internal>.md#element)

Defined in: [packages/automa/src/App.tsx:26](https://github.com/joska-p/playground/blob/f540aad548a4f8b54c8b2dc7de26bf81e2d8c83e/packages/automa/src/App.tsx#L26)

Main interactive WebGL2 cellular automaton workbench component.

#### Parameters

##### props

[`AppProps`](#appprops)

Grid dimensions and initial seeding parameters.

#### Returns

[`Element`](@repo.automa.<internal>.md#element)
