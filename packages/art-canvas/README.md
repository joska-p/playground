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

## Captain's log, aftermath — stardate 2026.07.01

A quiet watch. The shader compiles. I've been cycling through seeds and the generator keeps producing valid programs — not always beautiful, but always valid. The collision bug is behind us. Time to reflect on what we learned.

**The collision seemed like a small bug** — two modules defining the same GLSL function. But it revealed a fundamental tension in the architecture. Modules were pretending to be self-contained (each inlines everything it needs), yet they relied on shared utilities. The `Set`-based dedup worked fine when nothing shared anything. The moment `noiseField` joined `flowField`, both pulling `noise2d`, the assumption broke.

The real problem wasn't the duplicate. **The assembly had no concept of shared dependencies.** It only understood "give me every module's code string, keep unique strings." That's not an abstraction — it's string deduplication masquerading as one.

**Was the fix right?** Yes. The `deps` approach makes the dependency graph explicit. A module says "I need noise2d", the generator resolves it by name, and each preamble appears exactly once. No string tricks, no hope-based dedup. The extra complexity is minimal — one array per module, one flat map in the generator. And it scales: adding a shared utility to `preamble/` will never cause a collision, even if a dozen modules reference it.

But more importantly, **the architecture is now honest about its composition model:**

- Modules are function snippets with explicit needs (`deps`) and outputs (`getCall`)
- Preambles are shared utilities resolved once by name
- Templates are structural skeletons that also declare their dependencies
- The generator is the orchestrator — it knows the dependency graph, not just the strings

This means the next module, the next template, the next shared utility — none of them will require rethinking the assembly layer. The groundwork is solid.

The output quality isn't there yet — two templates and a handful of modules won't produce a lifetime of art. But the system is ready to compound. Every new module is a drop-in addition. Every new template is a new way to use what exists. The limiting factor is now the **dictionary's size**, not the architecture's correctness.

We fixed a bug that would have become a wall. Now we can grow.

---

## Captain's log, the craft — stardate 2026.07.01

The hierarchy is clear now. From smallest to largest:

**GLSL functions** — raw function definitions in `.glsl` files. Each is a single bit or bob: `flowField`, `voronoi`, `noise2d`, `fbm`, `rotate2d`. Some are shared preambles (available to any module), others belong to a single module.

**ShaderModules** — wrappers around GLSL functions with metadata: category (space/shape/effect), `deps` for shared preamble requirements, `getCall` for invocation, `params` for parameterized ranges. This is what lives in the registries. The module is the unit of selection.

**ShaderTemplates** — structural skeletons that define a `main()` body with named slots (space, shape, effect, color). The generator picks a template first, then fills its slots by picking modules. The template is the unit of composition.

The generator sits above all three: pick a template, pick modules, resolve deps, hand off to the template's `generate()`.

Two templates and nine modules is enough to prove the architecture but not enough to produce a meaningful range of output. The dictionary needs to grow. More space transforms (twirl, kaleidoscope, spherical), more shapes (circle, lines, truchet), more effects (bloom, chromatic aberration, color masks).

But composition matters just as much as the dictionary. A well-structured module with poor composition still looks bad. The generator should eventually reason about which combinations work — not just randomly pick and pray.

Colour is its own frontier. Right now every shader gets a palette from `PALETTE_REGISTRY` — four `vec3` constants feeding a cosine palette function. But there's no notion of **mood**: vibrant, muted, monochrome, warm, cold, pastel. The palette registry could carry mood tags, and the generator could select a palette that fits the template and modules it has already chosen. A delicate field like `noiseField` with muted pastels. A sharp `voronoi` with high-contrast neons.

The pieces are all in place. The work ahead is building — more modules, more templates, and a colour system with intent.

---

## Captain's log, the controls — stardate 2026.07.01

The mood system was designed as an internal bias — pick a mood at random, let it nudge template/module/palette selection. But a mood the user can't choose is not a mood, it's a hidden parameter. And a palette locked behind a mood's weight table is a colour you can't reach when you want it.

So mood and palette surfaced as independent controls — two dropdowns, passed directly to the generator alongside seed and complexity. The user picks the mood, the mood biases the template and module selection. The user picks the palette, that palette is used regardless of mood. Two axes of expression, orthogonal.

The generator still works without either override — if nothing is selected, it falls back to random selection. But with the controls live, the user can now ask questions like "what does this seed look like under every mood?" or "can I run the same organic seed through a neon palette?" That's the kind of exploration the system was built for.

---

## Captain's log, the decomposition — stardate 2026.07.01

The generator was one 130-line function that did everything — pick a mood, pick a template, pick modules, resolve dependencies, pick a palette, assemble the shader. It worked, but it was hard to read and harder to change. Every new feature meant wading through a linear wall of logic.

Today it's eight small functions, each in its own file, each with exactly one job:

- **pickMood** — selects a mood (or uses the user's choice)
- **pickTemplate** — biased by mood, picks a structural skeleton
- **pickModules** — picks space transforms and a shape, resolves their GLSL args
- **resolveDeps** — collects preamble dependencies, deduplicates, assembles the code block
- **pickPalette** — selects a palette (or uses the user's choice)

The orchestrator (`from-seed.ts`) is now 28 lines that read like a recipe — import, call, pass results to the next step. The import graph tells the story: follow the arrows from `from-seed.ts` outward, and you see the entire pipeline without reading a single function body.

This is what the codebase-design people call **depth**: each module has a small interface and a clear responsibility. The complexity hasn't gone anywhere — it's just properly distributed behind named seams. Adding a new step (say, an effects pass or a compositing strategy) means adding a new file to `assembly/` and one more call in the orchestrator. No existing step needs to change.

---

_Part of the [Creative Playground](https://joska-p.github.io/playground)_
