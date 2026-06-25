# Concrete Examples

These are known L-systems with hand-computed outputs. They serve as the ground truth for validating the engine — if your implementation produces these exact words, the core rewriting logic is correct.

Each example targets a specific grammar type and a specific engine feature.

---

## EX-01 — Koch Curve (deterministic, no params)

Validates: basic deterministic rewriting, symbols with no params, passthrough of non-rewritten symbols.

```
Axiom:  [F]
Rule:   F → F+F-F-F+F
```

| Iteration | Word                                                        |
| --------- | ----------------------------------------------------------- |
| 0         | `F`                                                         |
| 1         | `F+F-F-F+F`                                                 |
| 2         | `F+F-F-F+F + F+F-F-F+F - F+F-F-F+F - F+F-F-F+F + F+F-F-F+F` |

At iteration 2, every `F` in the iteration-1 word is replaced. The `+` and `-` symbols have no rule so they pass through unchanged (`unmatchedSymbol: 'keep'`).

**Word length check:** iteration 0 → 1 symbol, iteration 1 → 9 symbols, iteration 2 → 41 symbols.
Formula: `length(n) = 4 * length(n-1) + 5` (each F expands to 5 symbols, non-F pass through). ✓

---

## EX-02 — Binary Tree (deterministic, branching)

Validates: bracket symbols `[` `]` pass through unchanged, branching structure is preserved.

```
Axiom: 0
Rules:
  1 → 1 1
  0 → 1 [ 0 ] 0
```

| Iteration | Word                                 |
| --------- | ------------------------------------ |
| 0         | `0`                                  |
| 1         | `1[0]0`                              |
| 2         | `11[1[0]0]1[0]0`                     |
| 3         | `1111[11[1[0]0]1[0]0]11[1[0]0]1[0]0` |

Trace for iteration 2 — replace each symbol in `1[0]0`:

- `1` → `11`
- `[` → `[` (no rule, keep)
- `0` → `1[0]0`
- `]` → `]` (no rule, keep)
- `0` → `1[0]0`

Result: `11 [ 1[0]0 ] 1[0]0` ✓

---

## EX-03 — Signal propagation (context-sensitive)

Validates: left-context matching, rules fire only when neighbor condition is met, fallback keep for unmatched.

```
Axiom: b a a a a a
Rules:
  b < a → b    (an 'a' with a 'b' to its left becomes 'b')
  b → b        (b always stays b — explicit identity rule)
```

Context matching reads the word **before** the current iteration starts (not the partially-rewritten word).

| Iteration | Word          |
| --------- | ------------- |
| 0         | `b a a a a a` |
| 1         | `b b a a a a` |
| 2         | `b b b a a a` |
| 3         | `b b b b a a` |
| 4         | `b b b b b a` |
| 5         | `b b b b b b` |

At iteration 1: only the first `a` (at index 1) has a `b` to its left, so only it becomes `b`. The rest stay `a`. The signal propagates exactly one step per iteration. ✓

---

## EX-04 — Shrinking branch (parametric)

Validates: parameter passing, guard condition, parameter transformation in production.

```
Axiom: F(1.0)
Rules:
  F(l) [guard: l > 0.01] → F(l * 0.5) + F(l * 0.5)
  F(l) [guard: l <= 0.01] → F(l)       (base case — stop expanding)
```

| Iteration | Word                                                                                    |
| --------- | --------------------------------------------------------------------------------------- |
| 0         | `F(1.0)`                                                                                |
| 1         | `F(0.5) + F(0.5)`                                                                       |
| 2         | `F(0.25) + F(0.25) + F(0.25) + F(0.25)`                                                 |
| 3         | `F(0.125) + F(0.125) + F(0.125) + F(0.125) + F(0.125) + F(0.125) + F(0.125) + F(0.125)` |

At each step: every `F(l)` expands to two smaller `F`s separated by `+`. The `+` symbol passes through. Word length (symbols only, excluding `+`): 1 → 2 → 4 → 8. ✓

At iteration ~7, `l` reaches ≈ 0.0078 and the guard `l > 0.01` fails — the base-case rule fires and `F` stops expanding.

---

## EX-05 — Stochastic branching (stochastic)

Validates: weights are respected, seeded random produces deterministic output, two runs with different seeds produce different outputs.

```
Axiom: F
Rules:
  F → F F      (weight: 0.7)
  F → F        (weight: 0.3)
```

Unlike the previous examples, the exact output is seed-dependent. The validation strategy is:

1. **Determinism check:** `expand(grammar, 5, { seed: 42 })` called twice must return the identical word.
2. **Distribution check:** run `expand(grammar, 1, { seed: N })` for N = 0..999. Count how many produce `FF` vs `F`. Expect ~70% `FF`, ~30% `F` (within ±5% tolerance).
3. **Variance check:** `expand(grammar, 5, { seed: 42 })` and `expand(grammar, 5, { seed: 99 })` should produce different words (with overwhelming probability).

---

## EX-06 — Metadata passthrough

Validates: metadata set in a rule survives expansion iterations unchanged, engine never strips or mutates it.

```
Axiom: F({ shader: 'trunk' })
Rules:
  F → F({ shader: 'trunk' }) + F({ shader: 'twig' })
```

| Iteration | Word                                                                  |
| --------- | --------------------------------------------------------------------- |
| 0         | `F[shader=trunk]`                                                     |
| 1         | `F[shader=trunk] + F[shader=twig]`                                    |
| 2         | `F[shader=trunk] + F[shader=twig] + F[shader=trunk] + F[shader=twig]` |

At iteration 2: every `F` in the iteration-1 word is expanded by the same rule. The rule always assigns `shader: 'trunk'` to the left child and `shader: 'twig'` to the right child. No metadata from the parent `F` should bleed into its children — metadata is set explicitly by the rule, not inherited. ✓

**Extra check:** a symbol with no metadata set should have `metadata === undefined`, not `metadata === {}`.
