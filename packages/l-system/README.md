# @repo/l-system

> An interactive 3D fractal visualizer that turns L-system grammars into turtle-graphics geometry.
> Current Status: 🟢 Stable

This README acts as the local concept spec — focusing on the "why", the mathematical inspirations, and the design decisions. API inventory is automatically handled by TypeDoc.

---

## 🎯 Intention & Concept

`@repo/l-system` is the visual representation layer of the L-system ecosystem. It consumes pure symbolic rewriting output from `@repo/l-system-engine` and interprets it as 3D turtle-graphics commands (move forward, yaw, pitch, roll, branch push/pop). Line segments are dynamically colored by recursion stack depth using a Gruvbox palette and rendered inside a React Three Fiber scene with orbit controls and live Leva parameter adjustments.

The core tension explored here is the bridge between abstract rewriting rules and spatial geometry. The interpreter operates entirely on geometric vectors and quaternions without knowing about Three.js primitives, while the renderer focuses purely on line geometry. Five canonical grammars—spanning deterministic, parametric, and stochastic rules—provide instant visual exploration of botanical growth and fractal structures.

## 🥷 Brainstorming, Inspirations & Credits

- **Visual Inspo:** Lindenmayer system plant growth, fractal trees, space-filling curves, biological branching.
- **Math / Papers:** Aristid Lindenmayer (1968), _Mathematical Models for Cellular Interactions in Development_; Prusinkiewicz & Hanan, _The Algorithmic Beauty of Plants_.
- **Borrowed Code & Algorithms:** 3D turtle-graphics interpreter using quaternion multiplication for yaw/pitch/roll rotations and stack-based push/pop branch state management.

## ⚠️ Patterns & Gotchas

- **Quaternion Rotations:** Turtle orientation is tracked using quaternions rather than Euler angles to prevent gimbal lock during complex 3D branching.
- **Iteration Limits:** Built-in grammars enforce maximum iteration caps (typically 6–8) to prevent geometric segment counts from exceeding interactive rendering frame rates.

## 📚 References

- [L-system - Wikipedia](https://en.wikipedia.org/wiki/L-system)
- [Tsoding Minetest](https://github.com/tsoding/minetest)

---

_Part of the [Creative Playground](https://joska-p.github.io/playground). Technical API reference generated at `/docs/api/l-system/`._
