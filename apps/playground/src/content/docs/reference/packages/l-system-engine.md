---
title: "L System Engine"
description: "A grammar-agnostic L-system rewriting engine in TypeScript — pure, reproducible, and renderer-independent."
category: "reference"
tags:
  - reference
  - l-system-engine
order: 20
---

# @repo/l-system-engine

## Purpose

An L-system rewrites a sequence of symbols in parallel, step by step. After several iterations, the resulting sequence is interpreted as drawing instructions — producing plants, trees, fractals, and other organic structures.

This package is the **rewriting engine only**. It has no knowledge of angles, turtle graphics, or rendering. It takes a grammar in, and returns a sequence of symbols out. The interpreter and renderer live in the UI layer.

---

## Quick Start

```bash
pnpm add @repo/l-system-engine
```

```ts
import { deterministicRule, expand, symbol } from '@repo/l-system-engine';

const grammar = {
  axiom: [symbol('F')],
  rules: [
    deterministicRule('F', [symbol('F'), symbol('+'), symbol('F'), symbol('-'), symbol('F')]),
  ],
};

const word = expand(grammar, 3);
// → [{ name: 'F', params: [] }, { name: '+', params: [] }, ...]
```

---

## Exports

| Export | Description |
| --- | --- |
| `symbol(name, ...params)` | Creates an `LSymbol` with no metadata |
| `symbolWithMeta(name, metadata, ...params)` | Creates an `LSymbol` with attached metadata |
| `deterministicRule(name, production)` | Rule factory — always produces the same word |
| `stochasticRule(name, productions[])` | Rule factory — picks a production by weight |
| `contextSensitiveRule(options)` | Rule factory — matches based on left/right neighbors |
| `parametricRule(options)` | Rule factory — matches by name + guard on params |
| `expand(grammar, iterations, options?)` | Runs N iterations, returns final word |
| `steps(grammar, options?)` | Returns an iterator yielding one word per iteration |
| `validate(grammar)` | Returns `ValidationError[]`, empty if grammar is valid |
| `LSymbol` | Type — atomic unit of a word |
| `Word` | Type — `readonly LSymbol[]` |
| `Context` | Type — passed to each rule's `match` and `apply` |
| `Rule` | Interface — `match + apply` contract |
| `Grammar` | Type — `{ axiom, rules, unmatchedSymbol? }` |
| `ValidationError` | Type — `{ code, message }` |
| `ExpandOptions` | Type — `{ seed?: number }` |
| `StochasticProduction` | Type — `{ weight, produce }` |
| `ContextSensitiveOptions` | Type — options for `contextSensitiveRule` |
| `ParametricOptions` | Type — options for `parametricRule` |

---

## Architecture

```
Grammar (plain data)
  │  axiom: Word
  │  rules: Rule[]
  │
  ▼
steps(grammar)          ← core iterator, one Word per call
  │
  ▼  (consumed N+1 times)
expand(grammar, N)      ← thin wrapper, returns final Word
  │
  ▼
Word (readonly LSymbol[])
  │
  ▼
Interpreter (UI layer)  ← maps symbols → turtle commands → path → render
```

### Directory layout

```
src/
  types.ts                    ← all core types
  symbol.ts                   ← symbol() / symbolWithMeta() helpers
  random.ts                   ← Mulberry32 seeded PRNG
  rules/
    deterministic-rule.ts
    stochastic-rule.ts
    context-sensitive-rule.ts
    parametric-rule.ts
  steps.ts                    ← core rewriting iterator (the primitive)
  expand.ts                   ← thin wrapper over steps()
  validate.ts                 ← ValidationError[] — never throws
  engine.ts                   ← public re-export surface
```

### Design principles

1. **Grammar-agnostic** — the engine loops over symbols and calls `match` / `apply`. It never checks rule type.
2. **Rule types are separate** — each grammar type is an independent `Rule` implementation, not a switch branch inside the engine.
3. **Pure** — `expand` is a pure function. No global state. Same inputs → same outputs.
4. **`steps` is the primitive** — `expand` is derived from it (`consume N+1 steps`). Animation calls `steps().next()` per frame.
5. **Renderer-agnostic** — `metadata` on symbols is an opaque bag of plain values. The engine passes it through untouched.

---

## Usage Examples

### Deterministic — Koch curve

```ts
import { deterministicRule, expand, symbol } from '@repo/l-system-engine';

const grammar = {
  axiom: [symbol('F')],
  rules: [
    deterministicRule('F', [
      symbol('F'), symbol('+'), symbol('F'),
      symbol('-'), symbol('F'), symbol('-'), symbol('F'),
      symbol('+'), symbol('F'),
    ]),
  ],
};

expand(grammar, 0); // [F]          — 1 symbol
expand(grammar, 1); // [F+F-F-F+F] — 9 symbols
expand(grammar, 2); //               49 symbols
```

### Stochastic — random branching

```ts
import { expand, stochasticRule, symbol } from '@repo/l-system-engine';

const grammar = {
  axiom: [symbol('F')],
  rules: [
    stochasticRule('F', [
      { weight: 0.7, produce: [symbol('F'), symbol('F')] },
      { weight: 0.3, produce: [symbol('F')] },
    ]),
  ],
};

// Reproducible — same seed → same word every time
expand(grammar, 5, { seed: 42 });
```

### Context-sensitive — signal propagation

```ts
import { contextSensitiveRule, deterministicRule, expand, symbol } from '@repo/l-system-engine';

const grammar = {
  axiom: [symbol('b'), symbol('a'), symbol('a'), symbol('a')],
  rules: [
    // an 'a' immediately after a 'b' becomes 'b'
    contextSensitiveRule({ name: 'a', leftContext: 'b', produce: [symbol('b')] }),
    deterministicRule('b', [symbol('b')]),
  ],
};

// Iteration 0: b a a a
// Iteration 1: b b a a  ← signal advances one step
// Iteration 2: b b b a
// Iteration 3: b b b b
```

Bracket symbols `[` and `]` are skipped during context lookup by default (Prusinkiewicz standard). Pass `ignoreBrackets: false` to disable.

### Parametric — shrinking branches

```ts
import { expand, parametricRule, symbol } from '@repo/l-system-engine';

const grammar = {
  axiom: [symbol('F', 1.0)],
  rules: [
    parametricRule({
      name: 'F',
      guard: ([length]) => length > 0.01,
      produce: ([length = 0]) => [
        symbol('F', length * 0.5), symbol('+'), symbol('F', length * 0.5),
      ],
    }),
    parametricRule({
      name: 'F',
      guard: ([length]) => length <= 0.01,
      produce: ([length = 0]) => [symbol('F', length)], // base case — stop
    }),
  ],
};

// F(1.0) → F(0.5)+F(0.5) → F(0.25)+F(0.25)+F(0.25)+F(0.25) → …
```

### Metadata — tagging symbols for the renderer

```ts
import { deterministicRule, expand, symbolWithMeta } from '@repo/l-system-engine';

const grammar = {
  axiom: [symbolWithMeta('F', { shader: 'trunk' })],
  rules: [
    deterministicRule('F', [
      symbolWithMeta('F', { shader: 'trunk' }),
      symbolWithMeta('F', { shader: 'twig' }),
    ]),
  ],
};

// In the renderer (outside the engine):
const word = expand(grammar, 3);
for (const sym of word) {
  const shaderKey = sym.metadata?.['shader'] ?? 'default';
  // select shader program, draw…
}
```

Metadata values must be plain serializable data (strings, numbers, booleans). No WebGL objects or functions. Metadata is **never inherited** from parent to child — each rule sets it explicitly.

### Step-by-step animation

```ts
import { steps } from '@repo/l-system-engine';

const iter = steps(grammar, { seed: 42 });

// On each animation frame:
function onFrame() {
  const { value: word } = iter.next();
  render(word);
}
```

### Custom rule type

The engine is open for extension. Implement the `Rule` interface directly and pass it alongside built-in rules:

```ts
import type { Context, LSymbol, Rule, Word } from '@repo/l-system-engine';

const myRule: Rule = {
  match(sym: LSymbol, context: Context): boolean {
    return sym.name === 'F' && context.index % 2 === 0;
  },
  apply(sym: LSymbol, _context: Context): Word {
    return [sym, sym]; // duplicate every other F
  },
};

const grammar = { axiom, rules: [myRule, ...otherRules] };
```

---

## Patterns & Gotchas

### Rule resolution order

Rules are tested **in declaration order**. The first rule whose `match()` returns `true` is applied — no priority field needed.

```ts
// More specific rules first, general fallbacks last
const rules = [
  contextSensitiveRule({ name: 'F', leftContext: 'A', produce: [...] }), // specific
  deterministicRule('F', [...]),                                           // fallback
];
```

A deterministic rule declared before a context-sensitive rule will always shadow it. This is intentional.

### Unmatched symbols

By default, symbols with no matching rule are kept (`unmatchedSymbol: 'keep'`). Set `'remove'` to drop them:

```ts
const grammar = {
  axiom,
  rules,
  unmatchedSymbol: 'remove',
};
```

### Reproducible stochastic grammars

Always pass a `seed` for repeatable results. Without one, a random seed is chosen at call time.

```ts
expand(grammar, 5, { seed: 42 }); // deterministic
expand(grammar, 5);               // random each call
```

### Validation

Use `validate()` before running expansion in user-facing contexts:

```ts
import { validate } from '@repo/l-system-engine';

const errors = validate(grammar);
if (errors.length > 0) {
  console.error(errors); // [{ code: 'STOCHASTIC_WEIGHT_SUM', message: '...' }]
}
```

Checked: stochastic weights must sum to 1.0 (±0.001 tolerance).

---

## Testing

```bash
pnpm --filter @repo/l-system-engine test
pnpm --filter @repo/l-system-engine test-watch
```

The test suite covers all six canonical L-system examples (Koch curve, binary tree, signal propagation, shrinking branch, stochastic branching, metadata passthrough), plus rule priority, `unmatchedSymbol`, `validate()`, `steps()`, and bracket-skipping behaviour. 38 tests total.

---

## Contributing

PRs welcome! See [CONTRIBUTING.md].

## Changelog

Follows SemVer. See [CHANGELOG.md].

---

_Part of [Creative Playground](https://joska-p.github.io/playground/)_

