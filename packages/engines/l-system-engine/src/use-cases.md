# Use Cases

This document describes what a user (developer or playground user) can do with the L-system engine. Use cases are grouped by actor.

---

## Actor: Developer (using the engine as a library)

---

### UC-01 — Define a deterministic grammar

**Goal:** Create a simple, fully predictable L-system.

**Scenario:**

1. Developer defines an axiom (starting symbol sequence).
2. Developer adds one production rule per symbol.
3. Developer calls `expand(grammar, n)` to get the string after `n` iterations.

**Example:** Koch curve, Dragon curve, Sierpiński triangle.

---

### UC-02 — Define a stochastic grammar

**Goal:** Introduce randomness to produce varied, natural-looking results.

**Scenario:**

1. Developer defines multiple productions for the same symbol, each with a weight.
2. On each expansion, the engine picks a production randomly according to weights.
3. Running `expand` twice on the same grammar may produce different results.

**Example:** A tree where each branch randomly splits into 2 or 3 sub-branches.

**Constraint:** Weights for the same symbol must sum to 1.0. The engine validates this.

---

### UC-03 — Define a context-sensitive grammar

**Goal:** Make a symbol's production depend on its left and/or right neighbors.

**Scenario:**

1. Developer defines rules with an optional left context and/or right context.
2. During expansion, the engine checks neighbors before applying a rule.
3. A context-free fallback rule can be defined for unmatched symbols.

**Example:** Simulating signal propagation along a filament.

---

### UC-04 — Define a parametric grammar

**Goal:** Attach numeric parameters to symbols and transform them through rules.

**Scenario:**

1. Developer defines symbols with named parameters (e.g. `F(length, width)`).
2. Rules include a guard condition on parameters (e.g. `length > 0`).
3. Productions compute new parameter values from old ones.

**Example:** A tree where branch length shrinks by a ratio at each iteration.

---

### UC-05 — Expand a grammar step by step

**Goal:** Observe the grammar's state at each individual iteration.

**Scenario:**

1. Developer calls a step iterator instead of a full expand.
2. Each call returns the next generation's word.
3. Developer can stop early, inspect intermediate states, or feed each step to a renderer for animation.

---

### UC-06 — Combine rule types in a single grammar

**Goal:** Use the most appropriate rule type per symbol without being forced into a single grammar flavour.

**Scenario:**

1. Developer mixes deterministic rules (for structural symbols) and stochastic rules (for leaf symbols) in the same grammar.
2. The engine resolves rules per symbol regardless of type.

**Note:** Parametric + context-sensitive in the same grammar is the most complex combination; the engine supports it but documentation should warn about complexity.

---

### UC-07 — Define a custom rule type

**Goal:** Extend the engine without modifying its core.

**Scenario:**

1. Developer implements the `Rule` interface (match + apply).
2. Developer passes the custom rule alongside built-in rules.
3. The engine treats it identically.

**This is the main extensibility point of the engine.**

---

## Actor: Playground user (via the future UI)

---

### UC-08 — Load a preset grammar

**Goal:** Start from a known example without understanding the syntax.

**Examples:** Barnsley fern, Koch snowflake, Sierpiński triangle, Dragon curve, binary tree.

---

### UC-09 — Tweak a grammar and see the result live

**Goal:** Interactively change the axiom, rules, angle, or number of iterations and see the rendered output update.

---

### UC-10 — Animate growth step by step

**Goal:** Watch the L-system build itself from iteration 0 to iteration N.

---

### UC-11 — Export the result

**Goal:** Save the rendered image.

**Formats:** SVG (vector, lossless), PNG (raster, fixed resolution).

---

## Out of scope (for now)

- Sharing grammars via URL or saving to a server
- Editing grammar rules with a visual graph editor
- 3D turtle interpretation
