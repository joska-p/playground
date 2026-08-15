# @repo/l-system-engine

> A grammar-agnostic L-system rewriting engine — pure symbol rewriting with zero knowledge of angles, turtles, or rendering.
> Current Status: 🟢 Stable

This README acts as the local concept spec — focusing on the "why", the mathematical inspirations, and the design decisions. API inventory is automatically handled by TypeDoc.

---

## 🎯 Intention & Concept

`@repo/l-system-engine` is the pure simulation core for parallel string rewriting. It decouples the mathematical rules of L-systems from any rendering or turtle-graphics implementation. Given an axiom and a set of rules, it iteratively expands symbols into a flat sequence (`Word`), leaving spatial interpretation entirely to downstream consumers like `@repo/l-system`.

The design balances generality and determinism. Rules are modular data structures supporting deterministic expansions, stochastic weighted choices (reproducible via seed), context-sensitive neighborhood matching (skipping bracket markers per Prusinkiewicz standards), and parametric guards/productions. The core iterator primitive `steps()` enables step-by-step animation, while `expand()` provides a direct N-iteration result.

## 🥷 Brainstorming, Inspirations & Credits

- **Visual Inspo:** Lindenmayer systems, cellular automata, formal grammar rewriting, signal propagation.
- **Math / Papers:** Aristid Lindenmayer (1968), formal language theory, parallel string rewriting systems.
- **Borrowed Code & Algorithms:** Prusinkiewicz standard bracketed L-system context lookup with bracket skipping.

## ⚠️ Patterns & Gotchas

- **Rule Resolution Order:** Rules are evaluated strictly in declaration order. The first rule whose `match()` returns `true` is applied; broad deterministic rules placed above specific context-sensitive rules will shadow them.
- **Stochastic Weight Validation:** Stochastic rule weights are validated with a `±0.001` floating-point tolerance when summing to `1.0`.

## 📚 References

- [L-system - Wikipedia](https://en.wikipedia.org/wiki/L-system)
- [Tsoding Minetest](https://github.com/tsoding/minetest)

---

_Part of the [Creative Playground](https://joska-p.github.io/playground). Technical API reference generated at `/docs/api/l-system-engine/`._
