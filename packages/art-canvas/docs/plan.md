# art-canvas — development plan

Goal: make `from-seed` produce _interesting_ organic images/animation reliably, then
build the architecture to keep compounding that capability.

---

## Phase 1 — Enrich the dictionary

**Diagnosis:** too few modules → too little variation. 2 shapes, 6 space transforms,
3 effects. Every seed produces a variant of the same voronoi-or-sdBox thing.

**What we need for organic output:**

| Category             | What's missing                                                                     | Why organic                                                                                             |
| -------------------- | ---------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| Noise (new category) | fbm (fractal brownian motion), simplex noise, ridged noise, cellular noise         | Smooth organic fields. Current `noise2d` is only used by `flowField` — needs to be a first-class module |
| Shapes               | metaball-like distance, circle/ring, noise-as-shape (direct noise field as `dist`) | Replace geometric sdfs with fluid, blobby, cloud-like fields                                            |
| Space                | twirl, spherical, wave distortion, turbulence                                      | More organic ways to twist coordinate space                                                             |
| Color                | ink-bleed blending, edge glow, secondary palette mixing, hue-shift over time       | Current cosine palette is the only color path                                                           |

**Approach:** one module per PR. Add it to the registry, verify the generator picks it,
check that `tsc --noEmit` and the app still work. Each addition automatically
compounds combinatorial variety.

---

## Phase 2 — Structural variation in assembly

**Diagnosis:** every generated shader has the exact same skeleton:

```
space transforms → shape → vignette → sin-wave → effects → cosine palette → lighting
```

The generator picks _which_ modules to slot in, but never varies the structure itself.

**What to vary:**

- **Skip shape layer** — let noise drive color directly (space → noise-as-color, no `dist`)
- **Layer multiple shapes** — combine voronoi + fbm via `min()`/`max()`/`smoothstep()` before effects
- **Layer multiple palettes** — mix two cosine palettes with a noise mask
- **Different loop bodies** — iterate over time instead of space, or accumulate differently
- **Blind path** — no loop at all, single-pass shader with heavy domain warping

**Mechanism:** introduce **templates** — each template defines a different main() body
with slots for modules. The generator picks a template (weighted random), then fills
the slots from the registries. Keeps the `getCall()` abstraction; just adds another
level of selection.

---

## Phase 3 — Surface controls for exploration

**Diagnosis:** only seed and depth are exposed. Can't guide the generator toward
certain looks.

**What to add (iterate on UX):**

- **Lock a module** — re-randomize seed but keep e.g. `domainWarp` + `voronoi`
- **Category weights** — sliders for "more space transforms" vs "more effects"
- **Style presets** — "fluid", "crystalline", "neon", "topographic" that bias module weights
- **History / gallery** — save seeds you liked, compare side by side

---

## Phase 4 — Solve the namespace problem

**Diagnosis:** string-concat composition means colliding function names break
compilation. Fine at 8 modules, risky at 20+.

**Options to explore when it bites:**

- Name-mangle each module's functions with a unique prefix (e.g. `flowField_flowField`,
  `domainWarp_domainWarp`) — auto-generated, so modules never collide
- Hoist shared helpers (noise) into a preamble that modules reference rather than
  inlining — deduplication by symbol, not by string identity
- If collisions stay rare, keep the `Set`-based dedup and just add a test that
  builds all possible module combinations and verifies GLSL compiles

---

## Quick wins (next 2-3 sessions)

1. Extract `noise2d` from `flowField` into a shared preamble — every module can reference it
2. Add `fbm` module (noise category) — the single highest-impact addition for organic looks
3. Add `circle` / `ring` shape — simple but fills the geometric gap between voronoi and sdBox
4. Break the generator template into 2-3 variant skeletons (single-pass, multi-shape, noise-direct)
