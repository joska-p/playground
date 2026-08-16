# @repo/randomart-engine-next

> A grammar-driven expression-tree engine that turns a text seed into three channel trees (R, G, B), each compiling to both a CPU-evaluable function and a GLSL fragment shader — the next generation of randomart.
> Current Status: 🧪 WIP

This README acts as the local concept spec — focusing on the "why", the mathematical inspirations, and the design decisions. API inventory is automatically handled by TypeDoc.

---

## 🎯 Intention & Concept

Random Art (Andrej Bauer, 1999) replaces meaningless strings — SSH fingerprints, passwords, hashes — with structured images humans can compare at a glance. The engine's job is the math behind one such image: take a seed string, derive a deterministic random stream from it, and use that stream to grow three expression trees (one per RGB channel) over a grammar of mathematical operators. Every tree describes a function from a pixel coordinate `(x, y)` in `[-1, 1]` to a value, so evaluating it at every pixel of a grid rasterizes the image.

The central idea, shared with `@repo/randomart-engine`, is _what_ separated from _where_: the same tree can be walked node-by-node on the CPU (`evaluate`) or compiled into a single GLSL fragment shader (`compileToShader`). Same AST, two runtimes.

What "next" adds is a cleaner seam between the pieces. Grammar **operators**, **rules** (which operators a generator may use and how deep it may grow), and **behaviors** (per-shader spatial/color post-processing) each live behind their own subpath registry, and the shader compiler folds in color-space conversion (`srgb`, `oklch`, `oklab`, `hsl`) plus a dependency-resolved GLSL helper library for noise functions.

## 🥷 Brainstorming, Inspirations & Credits

- **Visual Inspo:** hash-visualization and identicon aesthetics (drunken-bishop, OpenSSH-style randomart).
- **Math / Papers:** Andrej Bauer's Random Art; FNV-1a hash + mulberry32 PRNG; expression-tree generative systems.
- **Borrowed Code & Algorithms:** mulberry32 stream generator, FNV-1a hashing, Fisher-Yates shuffle; the dual-stream PRNG split (structure vs channels) pioneered in `@repo/randomart-engine`.

## ⚠️ Patterns & Gotchas

- **Same seed, same art.** The PRNG is an FNV-1a hash of the seed string feeding a mulberry32 generator — fully deterministic, so a seed is a reproducible artwork. The `random` operator is the one deliberate exception: a per-pixel hash rather than a stream draw, so it is position-dependent but frame-stable.
- **Structural vs channel randomness.** Structure decisions (tree branching) and channel variation (how R/G/B differ) come from separate RNG streams — which is why `correlated` mode produces visibly different art from the default split mode with the same seed.
- **Subpath registries, not a root export.** Operators, rules, and behaviors are separate entry points (`/operators`, `/rules`, `/behaviors`) plus a types barrel (`/types`) — there is no root `@repo/randomart-engine-next` export.
- **GLSL dependency resolution.** Operators and behaviors declare shared helper functions (noise, hashing, `rotate2d`, …) that are emitted exactly once in topological order (`resolveGlslDeps`). Never inline a helper that may already be defined, or the shader will fail to compile.
- **Values stay in `[-1, 1]`.** Every operator maps `[-1, 1]` into `[-1, 1]` so trees can't blow up to infinity; combinators like `sum` halve their operands to stay in range.
- **`shuffle` never consumes the main stream.** `seededShuffle` runs on its own mini-LCG so shuffling operator lists doesn't shift the rest of the generation.

## 📚 References

- [Andrej Bauer — Random Art](https://www.randomart.org/)

---

_Part of the [Creative Playground](https://joska-p.github.io/playground). Technical API reference generated at `/docs/api/randomart-engine-next/`._
