# @repo/art-canvas

An interactive WebGL canvas for exploring procedural shader art — from deterministic seed-based generation to manual composition of space, shapes, and effects.

---

## Captain's log, stardate 2026.07.01

The generator works. It picks modules, assembles them into a fragment shader, and the result renders on screen. But the output is predictable — two shapes, six space transforms, three effects, one template. Every shader follows the same skeleton:

```
loop: space → shape → wave → effects → color
```

It only varies *which* module fills each slot, never the structure itself. Two different seeds produce different modules, but the same pipeline. For truly organic variation, the assembly needs to vary along deeper dimensions.

**The problem is not the dictionary — it's the grammar.** The pieces exist. What's missing is a system that can compose them in fundamentally different ways.

### What we need

**Structural templates** — different `main()` skeletons the generator can choose from:

- **The classic** — space transforms, evaluate a distance field, color it. This is what we have now.
- **Direct noise** — skip the shape layer entirely. Map noise directly to color. Fluid, cloud-like, no geometry.
- **Multi-field** — blend two fields (voronoi + fbm, or noise + SDF) before coloring. Richer surfaces.
- **Single-pass** — no accumulation loop. Heavy domain warp, one-shot color evaluation. Cleaner, more abstract.

**Color paths** — not always `cosinePalette(dist + offset)`:

- Direct UV → color mapping
- Noise → color (no distance field at all)
- Two palettes blended through a noise mask
- HSV derived from angle or radius

**Compositing strategies** — how loop iterations combine:

- Additive (current) — layers of light
- Max — glow-like intensity stacking
- Alpha overlay — transparency depth
- Single — no accumulation, pure one-shot

### The next layer

The `getCall()` abstraction handles per-module invocation cleanly. What comes next is a **template layer** above it. Each template defines a `main()` body with named slots. The generator picks a template first, then fills its slots from the registries. Module selection and structural variation become independent axes.

A shader grammar, in other words. Not procedural code that assembles strings, but a declarative description of valid compositions. The modules are the words. The templates are the sentences. The generator is the storyteller.

---

## Captain's log, supplemental — stardate 2026.07.01

The template layer exists now. The generator picks a template first, then fills its slots from the registries. Two templates so far: the **classic** (loop: space → shape → color) and **direct-noise** (skip the shape, let noise drive color directly). Different skeletons, same dictionary.

We also added our first organic shape — `noiseField`, a distance field built from layered Fractal Brownian Motion noise instead of a geometric signed distance function. It gets picked alongside `voronoi` and `sdBox` at generation time, weighted toward organic output.

But the dictionary grew faster than the assembler could handle. When `noiseField` and `flowField` were selected together, the generated shader defined `noise2d` twice — once inlined from each module's code. GLSL doesn't forgive duplicate definitions. WebGL rejected the program.

The fix: **preamble dependencies.** Shared utility functions (`noise2d`, `fbm`) no longer get inlined per module. Each module declares what it needs via a `deps` array:

```
flowField → deps: ['noise2d']
noiseField → deps: ['noise2d', 'fbm']  
```

The generator collects all unique deps from active modules, resolves them through a `PREAMBLE_REGISTRY`, and includes each preamble exactly once — regardless of how many modules depend on it. Module code is still deduplicated by the Set, but preambles are resolved by name. The two collision domains are now separate.

This pattern scales. As the dictionary grows to dozens of modules, any shared utility (noise functions, hash functions, blending helpers) lives in `shaders/preamble/` and is pulled in by name. No duplicates, no collisions, no debugging GLSL link errors at 2 AM.

---

_Part of the [Creative Playground](https://joska-p.github.io/playground)_
