# @repo/pixel-engine

> The bare-metal core — a pure TypeScript image pipeline that translates raw pixel arrays through fused transforms, tiled convolutions, and geometry-bending global operations without touching a single line of framework code.
> Current Status: 🟢 Stable

This README acts as the local concept spec — focusing on the "why", the mathematical inspirations, and the design decisions. API inventory is automatically handled by TypeDoc.

---

## 🎯 Intention & Concept

Pixel Engine is the stripped-down heart of the pixel ecosystem. It exposes the entire manipulation pipeline — buffer management, fusion scheduling, step dispatch, and tiling — as pure functions and classes with zero dependencies on DOM, React, or Web Workers.

`@repo/pixel` wraps this engine with a React-friendly facade: hooks for declarative pipeline configuration, a Web Worker pool for off-thread execution, and the docs UI. If you need the machinery without the harness, this is the place to look.

## 🥷 Brainstorming, Inspirations & Credits

- **Math / Papers:** per-pixel color transforms, convolution kernels (neighborhood ops).
- **Borrowed Code & Algorithms:** double-buffering, batched/fused passes, tiled convolution with a halo.

## ⚠️ Patterns & Gotchas

- **Pure and framework-agnostic.** No DOM, React, or Web Workers — the core logic is testable and embeddable anywhere (Node, worker, browser).
- **FusionScheduler batches consecutive pixel ops.** Three pixel steps execute as one loop over the buffer; neighborhood and global ops act as fences, flushing the scheduler before they run.
- **Tiling bounds peak memory.** Large images split into 512×512 tiles with a halo matching the kernel radius — peak memory scales with tile size, not full image size.

## 📚 References

- [MDN — Uint8ClampedArray](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint8ClampedArray)
- [MDN — Convolution matrix (HTML canvas)](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/filter)

---

_Part of the [Creative Playground](https://joska-p.github.io/playground). Technical API reference generated at `/docs/api/pixel-engine/`._
