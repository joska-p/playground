# @repo/randomart

> A React window into expression-tree art — type a seed phrase, watch a mathematical landscape grow, and inspect the grammar that shaped it.
> Current Status: 🟢 Stable

This README acts as the local concept spec — focusing on the "why", the mathematical inspirations, and the design decisions. API inventory is automatically handled by TypeDoc.

---

## 🎯 Intention & Concept

Randomart is the visible half of a two-package system. The engine (`@repo/randomart-engine`) handles all the math — grammar-driven AST generation, CPU evaluation, GLSL compilation, PNG export. This package handles everything the human sees and touches: a WebGL canvas that renders expression trees as fullscreen shaders, an inspector that peels back the AST to show the formula and RNG history, and controls that let you reshape the output in real time.

The interesting design tension is between the Zustand store and the WebGL pipeline. The store is the source of truth — seed, depth, grammar toggles, RGB mode — and every config change triggers a subscriber that calls `generateTrees()` from the engine. The canvas reads those trees and compiles them into a GLSL fragment shader via `compileToGLSL()`. Animation is a `requestAnimationFrame` loop that writes `u_time` and `u_animSpeed` uniforms each frame, with the local time throttled back to the store every 6 frames for UI display. The result is a rendering system where the math lives in the engine, the state lives in the store, and the GPU executes the bridge between them.

## 🥷 Brainstorming, Inspirations & Credits

- **Visual Inspo:** hash-visualization aesthetics, "open your terminal and type a password" identicon culture.
- **Math / Papers:** Andrej Bauer's Random Art (1999); expression-tree generative systems.
- **Borrowed Code & Algorithms:** grammar registry + weighted tree building from `@repo/randomart-engine`; vanilla Zustand store subscriber pattern (tree regeneration outside the React render cycle).

## ⚠️ Patterns & Gotchas

- **Store-driven regeneration.** A vanilla Zustand subscriber regenerates trees on config change — not a React effect — so tree generation runs outside the render cycle and re-renders stay fast.
- **The RAF loop runs even when paused.** The shader still evaluates per-pixel, but `u_time` stays frozen — pause is just a frozen uniform.
- **Dual view of the AST.** The inspector renders the same structure two ways via `nodeToTreeView()` (collapsible tree) and `nodeToMathString()` (formula).
- **Per-channel PRNGs.** R, G, and B each get their own `SeededRandom` by default; `correlatedRGB` mode shares one stream and produces visibly different art from the same seed.

## 📚 References

- [Andrej Bauer — Random Art](https://www.randomart.org/)

---

_Part of the [Creative Playground](https://joska-p.github.io/playground). Technical API reference generated at `/docs/api/randomart/`._
