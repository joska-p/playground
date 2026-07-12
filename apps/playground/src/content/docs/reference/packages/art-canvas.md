---
title: 'Art Canvas'
description: 'An interactive WebGL canvas that composes procedural shader art from a mood-biased, seed-deterministic pipeline — pick a seed, pick a mood, and watch the generator assemble space transforms, shapes, and colour palettes into a fragment shader that never repeats the same way twice.'
category: 'reference'
tags:
  - reference
  - art-canvas
order: 20
---

# @repo/art-canvas

---

## Essence

Art Canvas exists to answer a deceptively simple question: what happens when you
treat a fragment shader as a _composed sentence_ rather than a monolithic
program? Each module is a word, each template is a grammar, and the generator
is the storyteller — picking a structural skeleton, filling its slots from
registries of space transforms, shapes, and effects, then handing everything
to a palette for colour.

The interesting tension is between _determinism_ and _surprise_. A seed
produces a deterministic PRNG, which produces a deterministic sequence of
module picks — yet the mood system acts as a probability lens, biasing the
same seed toward organic softness or geometric sharpness. The user can also
override mood and palette independently, asking questions like "what does this
seed look like under every mood?" or "can I run the same organic seed through
a neon palette?" The pipeline stays honest: every combination is valid, even
when the result is beautifully strange.

The assembly pipeline decomposes into eight small functions, each with one
job. The complexity hasn't gone anywhere — it's properly distributed behind
named seams. Adding a new step means adding a new file and one more call in
the orchestrator. No existing step needs to change.

## Quick Launch

```bash
pnpm dev --filter @repo/art-canvas
```

Or install it into your own project:

```bash
pnpm add @repo/art-canvas
```

```tsx
import App from '@repo/art-canvas';

export default function Artwork() {
  return <App />;
}
```

## Field Notes

- **The Catalyst:** The realization that most procedural shader generators
  produce valid-but-predictable output — two shapes, six space transforms, one
  template. The pieces exist; what's missing is a system that composes them in
  fundamentally different ways. The fix wasn't a new module, it was a new
  _grammar_: structural templates that define named slots, filled at generation
  time from registries of modules. The modules are the words. The templates
  are the sentences.

- **Quirks & Anomalies:** When `noiseField` and `flowField` were first
  combined, the generated shader defined `noise2d` twice — once inlined from
  each module. GLSL doesn't forgive duplicate definitions. The collision
  revealed that the assembly had no concept of shared dependencies, only string
  deduplication. The fix was an explicit `deps` array per module and a
  `PREAMBLE_REGISTRY` that injects each shared utility exactly once. The two
  collision domains — module code and preamble utilities — are now separate.
  Also, the `mouseAttractor` module embeds its GLSL inline in TypeScript rather
  than importing a `.glsl` file, a pragmatic exception to the pattern that
  proves the architecture tolerates variation in module authoring.

- **Future Horizons:** More templates (multi-field blending, compositing
  strategies), more shapes (circle SDF, lines, truchet — already landing),
  more effects (bloom, chromatic aberration, colour masks). A mood-tagged
  palette system where the generator selects palettes that _fit_ the template
  and modules already chosen — a delicate noise field with muted pastels, a
  sharp voronoi with high-contrast neons. Eventually, the generator should
  reason about which combinations work rather than randomly picking and praying.

---

## Shader Assembly Pipeline

The pipeline is a linear orchestrator: `pickMood → pickTemplate → pickModules
→ pickEffects → resolveDeps → pickPalette → generate`. Each step is a
function in `src/assembly/`, each in its own file.

```
generateShaderFromSeed(seed, complexity, selectedMood?, selectedPalette?)
  ├─ createSeededRandom(seed)        ← FNV-1a + xorshift32 deterministic PRNG
  ├─ pickMood(rng, selectedMood?)    ← weighted random from MOOD_REGISTRY
  ├─ pickTemplate(rng, mood)         ← weighted random from TEMPLATE_REGISTRY
  ├─ pickModules(rng, mood, complexity) ← N space modules + 1 shape module
  ├─ pickEffects(rng, mood)          ← 40% chance of 1 effect module
  ├─ resolveDeps(template, modules)  ← collects + deduplicates preamble code
  ├─ pickPalette(rng, mood, selectedPalette?) ← weighted random from PALETTE_REGISTRY
  └─ template.generate({...})        ← stitches everything into GLSL
```

### Templates (structural skeletons)

Templates define a `main()` body with named slots. The generator picks a
template first, then fills its slots from the registries — module selection
and structural variation become independent axes.

| Template       | Weight | Structure                                                                                              |
| -------------- | ------ | ------------------------------------------------------------------------------------------------------ |
| `classic`      | 1.0    | 3-iteration loop: reset uv → space transforms → shape SDF → wave → effects → cosine palette            |
| `direct-noise` | 0.6    | Single-pass: space transforms → noise → direct colour. No shape SDF. Fluid, cloud-like.                |
| `single-pass`  | 0.8    | Single-pass: space transforms → shape SDF → interest mask → wave → effects → palette. One brushstroke. |

Each template also declares its own `deps` — the `direct-noise` template
depends on `noise2d` because it samples noise directly instead of through a
shape module.

### Shader Modules (the dictionary)

Modules wrap GLSL functions with metadata: a category, a `deps` array for
shared preamble requirements, a `getCall()` function that produces a GLSL
invocation string, and `params` for parameterized ranges resolved at
generation time.

**Space transforms** (8 modules) — chain-coordinate transformations applied
to `uv` before shape evaluation. Complexity controls how many layers stack:

| Module           | Weight | Deps      | Notable params                            |
| ---------------- | ------ | --------- | ----------------------------------------- |
| `domainWarp`     | 2.0    | —         | `intensity` (0.1–0.5), `time` (u_time)    |
| `flowField`      | 1.5    | `noise2d` | `strength` (0.05–0.2)                     |
| `rotate2d`       | 1.2    | —         | `angle` (u_time × 0.15)                   |
| `repeatSpace`    | 0.1    | —         | `count` (1.5–4.5)                         |
| `polarCoords`    | 0.4    | —         | —                                         |
| `mouseAttractor` | 3.0    | —         | `strength` (0.02–0.12), `mouse` (u_mouse) |
| `twirl`          | 1.0    | —         | `strength` (0.5–4.0)                      |
| `kaleidoscope`   | 0.8    | —         | `segments` (3–12)                         |

**Shape modules** (6 modules) — each produces a `float dist` distance field:

| Module       | Weight | Deps             | Notable params               |
| ------------ | ------ | ---------------- | ---------------------------- |
| `voronoi`    | 2.0    | —                | `scale` (2–7), `animSpeed`   |
| `noiseField` | 2.5    | `noise2d`, `fbm` | `scale` (1–5), `speed`       |
| `sdBox`      | 0.8    | —                | `width`, `height` (0.15–0.4) |
| `circleSdf`  | 1.5    | —                | `radius` (0.3–1.5)           |
| `truchet`    | 1.2    | —                | `scale` (1–6)                |
| `lineSdf`    | 0.8    | —                | `x1`, `y1`, `x2`, `y2`       |

**Effect modules** (1 registered) — post-process the wave/color signal:

| Module      | Weight | Notable params              |
| ----------- | ------ | --------------------------- |
| `posterize` | 1.0    | `steps` (3–12), `val: wave` |

### Preamble Dependencies

Shared GLSL utility functions (`noise2d`, `fbm`) live in `shaders/preamble/`
and are injected by name when modules declare them as dependencies. The
`resolveDeps()` step collects all unique `deps` from active modules and the
template, deduplicates them, looks each up in `PREAMBLE_REGISTRY`, and
concatenates the preamble code once — regardless of how many modules depend
on it. Module code is deduplicated separately. The two collision domains are
independent.

```
flowField → deps: ['noise2d']
noiseField → deps: ['noise2d', 'fbm']

resolveDeps collects: { noise2d, fbm }
→ each preamble injected exactly once
→ no duplicates, no GLSL link errors
```

## Mood System

The mood is a probability lens — it doesn't change what modules exist, only
how likely they are to be picked. Each mood provides weight overrides for
templates, modules, and palettes, plus a `complexityBias` that shifts the
number of space transform layers.

| Mood        | Bias | Favours                                                        |
| ----------- | ---- | -------------------------------------------------------------- |
| `organic`   | −1   | `noiseField`, `flowField`, biomorphic palettes, direct-noise   |
| `geometric` | 0    | `sdBox`, `voronoi`, `kaleidoscope`, neon palettes, classic     |
| `calm`      | −1   | `noiseField`, `repeatSpace`, deep-ocean palettes, direct-noise |
| `energetic` | +1   | `domainWarp`, `twirl`, `voronoi`, volcanic palettes, classic   |

The user can override mood and palette independently — two orthogonal axes
of expression. Without overrides, the generator falls back to weighted
random selection.

## Palette System

Five cosine palette presets, each defined by the Inigo Quilez formula
`a + b * cos(6.28318 * (c * t + d))`:

| Palette            | Weight | Character            |
| ------------------ | ------ | -------------------- |
| `iridescent_opal`  | 1.5    | Soft rainbow shimmer |
| `neon_cyber`       | 1.0    | High-contrast neon   |
| `biomorphic_flesh` | 1.2    | Warm organic tones   |
| `volcanic_magma`   | 1.0    | Hot reds and oranges |
| `deep_ocean`       | 1.3    | Cool blues and teals |

Palette selection is mood-biased when no override is provided. The user
can pick any palette regardless of mood.

## React Layer

The package ships a React Three Fiber canvas with three input modes:

- **Seed mode** — the procedural generator. Inputs: seed string, complexity
  slider, mood selector, palette selector. A `SeedCanvas` component renders
  a full-screen mesh with a `ShaderMaterial` driven by
  `generateShaderFromSeed()`.
- **Folded Space** — a hardcoded shader demonstrating module composition
  (repeatSpace + cosinePalette). Useful for testing template output without
  the generator.
- **Atlas** — a completely separate Fibonacci-Syllabics shader with its own
  store, controls, and `THREE.ShaderMaterial` subclass. Renders modular
  arithmetic symbols (arrows, boxes, arcs, chevrons) with glitch controls.

State management splits into two Zustand stores: a global `uiStore` for mode
selection and seed controls, and a dedicated `atlasStore` for Atlas-mode
parameters.

---

_Part of the [Creative Playground](https://joska-p.github.io/playground)_
