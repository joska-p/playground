# Architecture Decision Records

This document captures the non-obvious design choices made for the engine, and the reasoning behind each one. The goal is to avoid second-guessing these decisions later, and to make it easier to revisit them intentionally if requirements change.

---

## ADR-01 — `Rule` is an interface, not a discriminated union

**Decision:** The engine works with a `Rule` interface (`match` + `apply`). Grammar types are separate implementations of that interface, not variants of a `type Rule = Deterministic | Stochastic | ...` union.

**Why not a discriminated union?**
A union would require the engine to `switch` on rule type — meaning every new grammar type would require modifying the engine core. That's the spaghetti we want to avoid.

**Why an interface?**
The engine becomes a simple loop: _for each symbol, find the first rule where `match()` is true, call `apply()`_. It never needs to know what kind of rule it is. Adding a new grammar type means adding a new factory function — the engine is untouched.

**Trade-off:** slightly less visible at a glance what types of rules exist in a grammar. Mitigated by TypeScript types and the factory functions having descriptive names (`deterministicRule`, `stochasticRule`…).

---

## ADR-02 — Declaration order is the rule priority mechanism

**Decision:** When multiple rules could match the same symbol, the first one declared in `grammar.rules` wins. No explicit priority field.

**Alternatives considered:**

- A `priority: number` field on each rule — adds boilerplate, still requires the developer to think about ordering.
- Most-specific-wins heuristic (parametric > context-sensitive > deterministic) — implicit magic, surprising when it breaks.

**Why declaration order?**
It is the simplest possible mechanism that gives full control. The developer declares more specific rules first, general fallbacks last. It mirrors how most developers already think about `if / else if` chains. It requires zero extra API surface.

**Implication:** A deterministic rule for `F` declared before a context-sensitive rule for `F` will always shadow it. This is a feature, not a bug — it makes shadowing explicit and visible.

---

## ADR-03 — `Context` carries a seeded random function

**Decision:** The `Context` object passed to each rule's `match` and `apply` includes a `random: () => number` function derived from a seed passed to `expand`.

**Why not `Math.random()`?**
Stochastic grammars using `Math.random()` directly are non-reproducible — you cannot replay a specific run, write deterministic tests, or share a "snapshot" of a generated tree. This makes debugging and testing significantly harder.

**Why in `Context` and not a global?**
A global seeded RNG would be stateful — calling `expand` twice in the same process would yield different results depending on call order. Passing `random` through `Context` keeps `expand` pure: same inputs → same outputs, always.

**Practical use:** `expand(grammar, 5, { seed: 42 })` always returns the same word. The playground UI can expose a seed field so users can share and reproduce interesting generated trees.

---

## ADR-04 — `metadata` is an opaque bag, not a typed field

**Decision:** `LSymbol.metadata` is typed as `Record<string, unknown>`. The engine does not define or validate its contents.

**Why not typed metadata?**
The engine has no knowledge of rendering. Typing metadata would couple the engine to a specific renderer's vocabulary (shader names, material properties, colors). A different renderer might need completely different keys.

**Why not a separate parallel structure?**
A parallel `Map<Symbol, RenderHints>` maintained alongside the Word would drift out of sync during expansion — you'd need to update it in lockstep with every rule application. Embedding metadata directly on the symbol means it travels with the symbol automatically.

**Constraint:** metadata values must be plain serializable data (strings, numbers, booleans, plain objects). No WebGL objects, no functions. This keeps the Word serializable — useful for persistence, URL sharing, and debugging.

**Who sets metadata?** Rules set it at production time. The engine never reads, writes, or inherits it. If a rule produces a child symbol without setting metadata, `metadata` is `undefined` on that symbol — it is never inherited from the parent.

---

## ADR-05 — `steps()` is the primitive; `expand()` is derived from it

**Decision:** The core rewriting logic lives in `steps()`, which returns an iterator. `expand(grammar, n)` is implemented as "consume `n` steps from `steps()`".

**Why?**
Animation requires consuming one step at a time. If `expand` contained the loop and `steps` was bolted on afterwards, the logic would be duplicated or one would call the other awkwardly. Making `steps` the primitive keeps the logic in one place.

**Implication for implementation:** write `steps` first, then implement `expand` as a thin wrapper. Both are tested against the same examples.

---

## ADR-06 — The engine has no interpreter; the interpreter has no engine

**Decision:** The engine outputs a `Word` (array of symbols). It has no concept of turtle graphics, angles, coordinates, or drawing. The interpreter is a completely separate concern, living in the UI layer.

**Why?**
Keeping them separate means:

- The engine can be tested without any rendering setup.
- The interpreter can be swapped (turtle → shader-based → 3D) without touching the engine.
- Multiple interpreters can consume the same `Word` (e.g. SVG export + WebGL render at the same time).

**What the interpreter needs from the engine:** only the `Word` and the `LSymbol` type. It does not import anything else from the engine package.

---

## Decisions still open

These have not been settled yet and should be decided before or during implementation:

| Question                                                               | Options                                                     | Notes                                                          |
| ---------------------------------------------------------------------- | ----------------------------------------------------------- | -------------------------------------------------------------- |
| How are parametric rule guards expressed?                              | Functions `(params) => boolean` vs string expressions       | Functions are simpler; string expressions enable serialization |
| Should `validate()` throw or return errors?                            | Throw at grammar construction vs return `ValidationError[]` | Returning errors is more library-friendly                      |
| Should `Word` be immutable?                                            | `readonly LSymbol[]` vs plain array                         | `readonly` makes bugs more obvious, small API cost             |
| Context-sensitive: how are brackets `[` `]` handled in context lookup? | Ignore them (Prusinkiewicz standard) vs configurable        | Ignoring is standard but configurable is more flexible         |
