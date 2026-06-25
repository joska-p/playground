> A grammar-agnostic L-system engine written in TypeScript, designed for clean extensibility and a clear separation between **rewriting** (the engine) and **rendering** (the UI).

# @repo/l-system-engine

# L-System Engine

## What is an L-system?

An L-system is a formal grammar that rewrites a string of symbols in parallel, step by step. After several iterations, the resulting string is interpreted as drawing instructions — producing plants, trees, fractals, and other organic-looking structures.

**Example — Koch curve, 2 iterations:**

```
Axiom:  F
Rule:   F → F+F−F−F+F
Step 0: F
Step 1: F+F−F−F+F
Step 2: F+F−F−F+F + F+F−F−F+F − F+F−F−F+F − F+F−F−F+F + F+F−F−F+F
```

---

## Project goals

- **Engine first, UI second.** The engine is a pure TypeScript library with no rendering dependencies.
- **Grammar-agnostic.** The engine does not know whether a rule is deterministic, stochastic, context-sensitive, or parametric — it only applies rules through a common interface.
- **Clean API.** Grammars are defined as plain data. Rule types are composable factory functions. The expand function is pure.
- **Interactive playground.** The eventual UI lets users define grammars, tune parameters, watch growth animate step by step, and export results as SVG or PNG.

## Non-goals (for now)

- 3D rendering
- Saving/loading grammars to a server
- A grammar editor with syntax highlighting (future)

---

## Package structure

```
packages/
  l-system-engine/   ← this package — pure rewriting logic
apps/
  playground/        ← future interactive UI
```

---

## Grammar types supported

| Type                | Description                                                         |
| ------------------- | ------------------------------------------------------------------- |
| Deterministic (D0L) | One production per symbol, always the same                          |
| Stochastic          | Multiple productions per symbol, chosen by weight                   |
| Context-sensitive   | Productions that depend on neighboring symbols                      |
| Parametric          | Symbols carry numeric parameters; rules can test and transform them |

All types share the same engine. They differ only in how their rules implement the match/apply contract (see `docs/engine-spec.md`).

---

## Quick mental model

```
Grammar = { axiom, rules[] }
       ↓
Engine.expand(grammar, n)   — pure string rewriting, n iterations
       ↓
Word (sequence of Symbols)
       ↓
Interpreter                 — maps symbols to turtle drawing commands
       ↓
Path (list of line segments)
       ↓
Renderer (SVG / Canvas)
```

The engine only owns the first two steps. Everything else is the UI's concern.
