# @repo/sequence-engine

> A pure engine that turns mathematical rules into numbered sequences — each rule a function, each sequence a `number[]`, no DOM, no rendering, no opinions about what comes next.
> Current Status: 🟢 Stable

This README acts as the local concept spec — focusing on the "why", the mathematical inspirations, and the design decisions. API inventory is automatically handled by TypeDoc.

---

## 🎯 Intention & Concept

`@repo/sequence-engine` is the logic half of the sequence system: it defines a **rule** contract and an **engine** that evaluates it step-by-step. All canvas rendering, Fourier computation, and DOM interaction lives in `@repo/sequence-renderer`.

A rule is just a function. Given the current index, the previous term, the sequence so far, and the set of seen values, `getNext` returns the next term — that's the entire contract. The engine calls it in a loop, collects the results into a `number[]`, and hands it back. There's no class hierarchy, no strategy pattern, no configuration object.

Rules are plain data, not subclasses: `recamanRule`, `collatzRule`, `fibonacciRule`, … are exported as `as const satisfies SequenceRule` values, so the registry can derive a union of rule IDs (`RuleId`) directly from the list. New sequences can be added at runtime through `registerRule`.

## 🥷 Brainstorming, Inspirations & Credits

- **Visual Inspo:** Sequence visualizers that animate each term (see `@repo/sequence-renderer`).
- **Math / Papers:** Recamán's sequence, Collatz (3n+1), Fibonacci, prime gaps, triangular numbers, Padovan, Stern–Diatomic, look-and-say, square numbers.
- **Borrowed Code & Algorithms:** Classic integer-sequence definitions from OEIS; the design principle that generation should be testable without a browser.

## ⚠️ Patterns & Gotchas

- **Pure by design:** the engine never touches the DOM, `localStorage`, or the renderer. The same `generateSequence` call works in a Web Worker, a Node script, a test suite, or a React component.
- **`maxSteps` is clamped by the engine**, not the rule: `generateSequence` caps the requested step count at `sequenceRule.maxSteps` (`0` = uncapped). Rules never enforce their own limit.
- **The initial term is fixed at `0`.** The rule's `index` is 1-based for terms after that — the 0 term is never passed to `getNext`.
- **Plugin registry:** `allRules` is a mutable module-global; `registerRule` lets consumers add rules at runtime without editing this package.

## 📚 References

- [OEIS — On-Line Encyclopedia of Integer Sequences](https://oeis.org/)
- [Recamán's sequence](https://en.wikipedia.org/wiki/Recam%C3%A1n%27s_sequence)
- [Collatz conjecture](https://en.wikipedia.org/wiki/Collatz_conjecture)

---

_Part of the [Creative Playground](https://joska-p.github.io/playground). Technical API reference generated at `/docs/api/sequence-engine/`._
