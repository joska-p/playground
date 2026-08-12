---
title: 'Art Canvas'
coordinates: '/visuals/generative'
status: 'Active'
date_discovered: 2025-06-01
---

# @repo/art-canvas

> An interactive WebGL canvas that composes procedural shader art from a
> mood-biased, seed-deterministic pipeline — pick a seed, pick a mood, and
> watch the generator assemble space transforms, shapes, and colour palettes
> into a fragment shader that never repeats the same way twice.

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

## Quick Start

Run the explorer on its own:

```bash
pnpm dev --filter @repo/art-canvas
```

Or embed it in your own project:

```bash
pnpm add @repo/art-canvas
```

```tsx
import { App } from '@repo/art-canvas/art-canvas';
import '@repo/art-canvas/styles';

export default function Artwork() {
    return <App />;
}
```

`App` fills its container — render it somewhere full-screen so the canvas has
room. The `styles` import brings in the Tailwind theme the explorer is styled
with.

## Usage

`App` renders a controls panel plus the active canvas, switchable between four
input modes:

- **Seed** — the procedural generator. A seed string drives a deterministic
  PRNG; a complexity slider controls how many space transforms stack, and mood
  and palette can be overridden independently or left to weighted random
  selection. Every seed/mood/palette combination compiles to a fragment shader.
- **Folded Space** — a hardcoded study of `repeatSpace` + cosine palette
  composition, handy for eyeballing generated output without the generator.
- **Atlas** — a modular-arithmetic shader that renders Fibonacci-syllabic
  symbols (arrows, boxes, arcs, chevrons) with its own seed, grid size, symbol
  type, palette, and glitch controls.
- **Manual** — a hand-authored shader with divisions, lightness, and chroma
  sliders.

## Patterns & Gotchas

- **Determinism vs surprise.** The same seed always produces the same shader —
  the FNV-1a hash plus Mulberry32 PRNG leaves nothing to chance. Surprise comes
  from the mood lens and from the user's own overrides.
- **A mood is a probability lens, not a filter.** It doesn't change which
  modules exist; it re-weights how likely each template, module, and palette
  is to be picked. The same seed reads differently under every mood.
- **Mood and palette are orthogonal overrides.** Run the same organic seed
  through a neon palette — every combination is valid, even when the result is
  beautifully strange.
- **GLSL has two collision domains.** Module code and shared preamble utilities
  (`noise2d`, `fbm`) are injected separately: `resolveDeps` deduplicates the
  preamble so each utility lands exactly once, and module code is deduplicated
  on its own. When a new module needs a shared utility, register it in the
  preamble registry and declare it in the module's `deps`.

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
  preamble registry that injects each shared utility exactly once. Also, the
  `mouseAttractor` module embeds its GLSL inline in TypeScript rather than
  importing a `.glsl` file — a pragmatic exception that proves the architecture
  tolerates variation in module authoring.

- **Future Horizons:** More templates (multi-field blending, compositing
  strategies), more shapes, more effects (bloom, chromatic aberration, colour
  masks). A mood-tagged palette system where the generator selects palettes
  that _fit_ the template and modules already chosen — a delicate noise field
  with muted pastels, a sharp voronoi with high-contrast neons. Eventually,
  the generator should reason about which combinations work rather than
  randomly picking and praying.

---

_Part of the [Creative Playground](https://joska-p.github.io/playground)_
