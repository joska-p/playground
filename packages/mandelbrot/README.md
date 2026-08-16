# @repo/mandelbrot

> Deep-zoom Mandelbrot explorer built on perturbation theory with arbitrary-precision (BigInt) reference orbits — zooms to millions of × and stays crisp and real-time in the browser.
> Current Status: 🧪 WIP

This README acts as the local concept spec — focusing on the "why", the mathematical inspirations, and the design decisions. API inventory is automatically handled by TypeDoc.

---

## 🎯 Intention & Concept

An interactive Mandelbrot-set viewer that zooms to millions of × and stays crisp and real-time in the browser. The trick is **perturbation theory**: one slow high-precision point (the _reference orbit_, computed with BigInt-backed fixed-point on the CPU) plus a fast per-pixel delta loop in the GPU shader, with double-single arithmetic, Zhuoran rebasing, a distance estimate, and in-shader OKLCH colour.

The package is planned to grow into a **bespoke framework hosting several independent visualizers** (migrated from `packages/fracture`) built on `@repo/glaze` — the driving roadmap is `PLAN.md`, and `REVIEW.md` explains the pipeline and its design decisions in depth.

## 🥷 Brainstorming, Inspirations & Credits

- **Visual Inspo:** deep-zoom fractal explorers; in-shader color grading.
- **Math / Papers:** Mandelbrot perturbation theory; double-single (double-double) arithmetic; Zhuoran rebasing; distance estimation.
- **Borrowed Code & Algorithms:** reference-orbit + perturbation rendering, BigInt fixed-point, chunked async reference computation, `@repo/worker-pool` for the compute worker.

## ⚠️ Patterns & Gotchas

- **One reference, many pixels.** A single BigInt reference orbit drives a fast per-pixel delta loop — precision cost is paid once, not per pixel.
- **BigFloat for the view, floats for the uniforms.** glaze's float32 camera can't hold arbitrary-depth zoom, so all view math lives in `view.ts` on BigFloat; only spacing and reference offset cross into float uniforms.
- **Drift is policy-driven.** `reference-policy.ts` owns drift thresholds + token superseding: stale reference computations are discarded when the view moves on.
- **Textures die with the context.** The orbit texture is app-created, so on `webglcontextrestored` glaze recompiles programs but the last orbit must be re-uploaded.

## 📚 References

- [Mandelbrot set — Wikipedia](https://en.wikipedia.org/wiki/Mandelbrot_set)
- [Perturbation theory in fractal rendering](https://en.wikipedia.org/wiki/Perturbation_theory)
- [REVIEW.md](./REVIEW.md) — pipeline walkthrough + code review findings
- [PLAN.md](./PLAN.md) — the driving roadmap
- [NEXT-SESSION.md](./NEXT-SESSION.md) — fresh-context hand-off prompt for the next phase
- [REPORT-perturbation-ultimate.md](./REPORT-perturbation-ultimate.md) — mandelbrot ↔ `fracture` implementation comparison and the merged blueprint

---

_Part of the [Creative Playground](https://joska-p.github.io/playground). Technical API reference generated at `/docs/api/mandelbrot/`._
