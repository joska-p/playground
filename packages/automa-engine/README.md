# @repo/automa-engine

> A pure simulation engine that turns birth/survive lookup tables into evolving grids — a generic `evolve` function that knows nothing about rendering, only about neighbour counts and state transitions.
> Current Status: 🟢 Stable

This README acts as the local concept spec — focusing on the "why", the mathematical inspirations, and the design decisions. API inventory is automatically handled by TypeDoc.

---

## 🎯 Intention & Concept

`@repo/automa-engine` is the pure simulation engine of the cellular automaton ecosystem. It defines the core rule model, the generic `evolve` function, and the Web Worker boundary — remaining completely agnostic of rendering layers or UI concerns.

The core design centers on the tension between generality and familiarity. Rules are represented as plain data objects consisting of a `birth[]` lookup, a `survive[]` lookup, and a `stateCount`. Classic rules like Conway's Game of Life (`B3/S23`) or HighLife (`B36/S23`) are parsed once into lookup arrays at registration time. The generic `evolve` function evaluates neighbor counts against these arrays at runtime without requiring rule-specific conditional branches.

Multi-state rules (`stateCount > 2`) introduce an aging layer where state 0 represents dead cells, state 1 represents active cells (contributing to neighbor counts), and states 2 through N-1 represent decaying states that age by +1 each tick without breeding. This unified mechanism powers oscillations in automata like Brian's Brain without custom logic.

## 🥷 Brainstorming, Inspirations & Credits
* **Visual Inspo:** Conway's Game of Life, HighLife, Brian's Brain.
* **Math / Papers:** Totalistic cellular automata theory and lookup table optimizations.
* **Borrowed Code & Algorithms:** Web Worker thread boundary utilizing `Transferable` ArrayBuffers via `@repo/worker-pool` for zero-copy grid transfers.

## ⚠️ Patterns & Gotchas

- **Transferable Ownership:** The Web Worker boundary utilizes `Transferable` buffers for zero-copy grid transfer. The `Uint8Array` ownership transfers across threads, meaning the main thread cannot access the buffer while the worker is processing it.
- **Single Worker Pool:** The simulation worker pool is configured with `maxPoolSize: 1` (one worker, one simulation at a time), which is optimized for playground interactivity but requires scaling for concurrent simulations.

## 📚 References

- [Conway's Game of Life - Wikipedia](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life)
- [Tsoding Conway implementation](https://github.com/tsoding/conway)

---
_Part of the [Creative Playground](https://joska-p.github.io/playground). Technical API reference generated at `/docs/api/automa-engine/`._
