# @repo/real-life

> A continuous cellular automaton that runs entirely on the GPU — Conway's Game of Life reimagined as smooth, flowing fields of growth and decay, rendered through GLSL shaders and React Three Fiber.
> Current Status: 🟢 Stable

This README acts as the local concept spec — focusing on the "why", the mathematical inspirations, and the design decisions. API inventory is automatically handled by TypeDoc.

---

## 🎯 Intention & Concept

Real Life takes the binary alive/dead logic of cellular automata and replaces it with continuous values between 0 and 1. Instead of snapping cells between states, the simulation breathes — neighbourhoods gently swell when they hit a sweet spot of density, and slowly fade when they're too sparse or too crowded. The result is an organic, almost biological texture that feels more like watching a petri dish than a computer simulation.

The entire simulation runs on the GPU. A fragment shader reads the current state from a texture, samples eight neighbours, applies the growth/decay rule, and writes the next state. Two WebGL render targets ping-pong back and forth each frame, and a display shader maps the final grayscale values onto a full-screen quad. The CPU barely lifts a finger beyond throttling the update rate.

## 🥷 Brainstorming, Inspirations & Credits

- **Visual Inspo:** petri dishes, growing cultures, fluid-ish cellular growth.
- **Math / Papers:** Conway's Game of Life; continuous (smooth) cellular automata.
- **Borrowed Code & Algorithms:** the Game-of-Life neighbour-sum rule lifted to a density threshold; GPU ping-pong buffers; the ASCII terminal prototype in `core/engine.ts` as the original sketch.

## ⚠️ Patterns & Gotchas

- **The rule thresholds are tuned by eye.** The growth band (0.15–0.45 density) was hand-tuned until the patterns felt alive; small changes produce radically different textures — some freeze into static, others explode into noise.
- **Ping-pong render targets.** Two `WebGLRenderTarget`s alternate as state/display each frame; the display shader maps the grayscale state onto a full-screen quad.
- **CPU stays out of the way.** The main thread only throttles the update rate (`useThrottledUpdate`); all simulation math happens in shaders.

## 📚 References

- [Conway's Game of Life — Wikipedia](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life)
- [React Three Fiber](https://docs.pmnd.rs/)

---

_Part of the [Creative Playground](https://joska-p.github.io/playground). Technical API reference generated at `/docs/api/real-life/`._
