# @repo/fracture

> A high-precision GLSL fractal renderer — exploring Mandelbrot and Julia sets through deep perturbation and double-single emulation.
> Current Status: 🟢 Stable

This README acts as the local concept spec — focusing on the "why", the mathematical inspirations, and the design decisions. API inventory is automatically handled by TypeDoc.

---

## 🎯 Intention & Concept

`@repo/fracture` is a WebGL2 fractal explorer that renders complex orbit dynamics directly on the GPU. It provides multiple GLSL shader pipelines — from standard single-precision float orbits to double-single (DS) emulation for deep zooming without precision loss artifacts.

State management is cleanly split between parameter stores (holding zoom, pan coordinates, max iterations, and Julia constants) and view stores (active renderer mode and UI overlay states), orchestrated with React 19 architecture.

## 🥷 Brainstorming, Inspirations & Credits

- **Visual Inspo:** Mandelbrot and Julia fractal sets, deep-zoom visualizations, GPU-accelerated orbit dynamics.
- **Math / Papers:** Complex number arithmetic, IEEE-754 float precision limits, double-single floating-point emulation, perturbation theory.
- **Borrowed Code & Algorithms:** WebGL2 shader render pipelines, React 19 `<Activity>` boundaries, Zustand parameter/view stores.

## ⚠️ Patterns & Gotchas

- **Floating-Point Precision:** Standard IEEE-754 single-precision `float` limits in WebGL shaders pixelate at ~$10^{-7}$ zoom scales, addressed via double-single arithmetic and perturbation pipelines.
- **Pipeline Switching:** Uses React 19 `<Activity>` boundaries to keep alternate GLSL scene pipelines mounted and pre-warmed during live renderer switching.

## 📚 References

- [Tsoding FracTcl](https://github.com/tsoding/FracTcl)

---

_Part of the [Creative Playground](https://joska-p.github.io/playground). Technical API reference generated at `/docs/api/fracture/`._
