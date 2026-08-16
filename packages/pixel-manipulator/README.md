# @repo/pixel-manipulator

> A ready-made React workbench for browser image manipulation — upload an image, chain manipulation steps into a workflow, and inspect every stage of the result.
> Current Status: 🟢 Stable

This README acts as the local concept spec — focusing on the "why", the mathematical inspirations, and the design decisions. API inventory is automatically handled by TypeDoc.

---

## 🎯 Intention & Concept

Pixel Manipulator is the interactive shell of the pixel-manipulation stack. It ships a self-contained React component that turns the manipulation engine into a visual workbench: upload an image, assemble a chain of manipulation steps, tune their arguments, run the pipeline, and compare each step's output side by side.

The pixel math lives elsewhere — `@repo/pixel` (and the engine underneath it) executes the pipeline in a Web Worker pool and returns one `ImageData` snapshot per step. This package owns everything around that: the upload flow, the workflow builder, the preset library, the output grid, and the store that wires them together. It is the UI half; the engine is the compute half.

## 🥷 Brainstorming, Inspirations & Credits

- **Visual Inspo:** photo-editing UIs (before/after comparisons, side-by-side step previews).
- **Borrowed Code & Algorithms:** the upload → build → run → inspect loop shared by every image-tool; the engine's step/preset manifests.

## ⚠️ Patterns & Gotchas

- **Workflow state lives in a Zustand store**, not React props — components subscribe through selectors, and the store is the single source of truth.
- **Snapshots always show the full progression.** The engine fuses consecutive per-pixel steps into one pass, yet every step still yields its own snapshot; neighborhood and global steps act as fences in that fusion.
- **Self-contained component.** `App` (exported as `PixelManipulator`) needs nothing but a container — upload, build, execute, and inspect are all inside.

## 📚 References

- [MDN — ImageData](https://developer.mozilla.org/en-US/docs/Web/API/ImageData)

---

_Part of the [Creative Playground](https://joska-p.github.io/playground). Technical API reference generated at `/docs/api/pixel-manipulator/`._
