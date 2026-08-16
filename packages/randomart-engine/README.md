# @repo/randomart-engine

> A grammar-driven expression tree that compiles to both CPU pixel buffers and GLSL fragment shaders — the mathematical heart of generative art, built to be consumed by any renderer.
> Current Status: 🟢 Stable

This README acts as the local concept spec — focusing on the "why", the mathematical inspirations, and the design decisions. API inventory is automatically handled by TypeDoc.

---

## 🎯 Intention & Concept

Randomart Engine exists because generative art needs a shared vocabulary between math and pixels. It defines a grammar of mathematical operations — sine, cosine, modulo, nested oscillation, radial symmetry — and assembles them into expression trees via weighted stochastic generation. Each tree is a compact representation of a visual function: given an `(x, y)` coordinate and a time value, it produces a color.

The engine offers two evaluation paths from the same AST. The CPU path walks the tree node-by-node — useful for export, debugging, and non-WebGL contexts. The GLSL path compiles the same tree into a fragment shader string, pushing the entire evaluation to the GPU where each pixel runs in parallel. The grammar rules are the bridge: every rule implements both `evaluate` and `toGLSL`, so the AST is agnostic to where it runs.

This separation of _what_ from _where_ is the engine's central idea. The expression tree doesn't know if it's being evaluated on a CPU core or a GPU shader unit. It just describes math.

## 🥷 Brainstorming, Inspirations & Credits

- **Visual Inspo:** hash-visualization and identicon aesthetics (drunken-bishop, OpenSSH-style randomart).
- **Math / Papers:** Andrej Bauer's Random Art (1999); expression-tree generative systems; per-pixel hash functions.
- **Borrowed Code & Algorithms:** weighted stochastic grammar generation, seeded PRNG streams (FNV-1a seed → mulberry32), GLSL compilation.

## ⚠️ Patterns & Gotchas

- **What vs where.** Every grammar rule implements both `evaluate` (CPU) and `toGLSL` (GPU), so the same AST produces the same image on both runtimes, within float precision.
- **Grammar is open.** Any object satisfying `GrammarRule` can join the registry; its id becomes selectable via `enabledRuleIds` and appears in `getAllRules()`.
- **Per-channel PRNGs by default.** R, G, and B each get their own `SeededRandom`; correlated mode (one shared PRNG) produces visibly different art from split mode with the same seed.
- **`random` is a per-pixel hash, not a stream draw.** It's deterministic across frames but position-dependent — a deliberate choice for texture richness.
- **GLSL wraps `sin`/`cos` inputs in π scaling**, creating characteristic wave patterns at low tree depths.

## 📚 References

- [Andrej Bauer — Random Art](https://www.randomart.org/)

---

_Part of the [Creative Playground](https://joska-p.github.io/playground). Technical API reference generated at `/docs/api/randomart-engine/`._
