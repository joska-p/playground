---
title: 'Sequence Engine'
description: 'A pure engine that turns mathematical rules into numbered sequences — each rule a function, each sequence a `number[]`, no DOM, no rendering, no opinions about what comes next.'
category: 'reference'
tags:
  - reference
  - sequence-engine
order: 20
---

# @repo/sequence-engine

---

## Essence

Sequence Engine is the logic half of a two-package sequence generation
system. It defines two decoupled primitives — **rules** and an **engine**
— and a persistence abstraction via the **PresetStore** interface. All
canvas rendering, Fourier computation, and DOM interaction lives in
[`@repo/sequence-renderer`](/docs/reference/packages/sequence-renderer).

The interesting tension is between _generality_ and _legibility_. A rule
is just a function: given the current index, the previous value, the
sequence so far, and the set of seen values, it returns the next term.
That's the entire contract. The engine calls the rule in a loop, collects
the results into a `number[]`, and hands it back. There's no class
hierarchy, no strategy pattern, no configuration object — just a function
that returns a number.

The PresetStore abstracts persistence without prescribing it. The
`InMemoryPresetStore` works for servers and tests; consumers bring their
own adapters — `LocalStoragePresetStore` in the renderer, or whatever
fits the environment. This means the engine never touches `localStorage`,
never touches the DOM, never assumes where presets live.

## Quick Launch

```bash
pnpm add @repo/sequence-engine
```

```ts
import { generateSequence } from '@repo/sequence-engine';
import { recamanRule } from '@repo/sequence-engine/rules/recaman';

const sequence = generateSequence(recamanRule, 50);
// [0, 1, 3, 6, 2, 7, ...]
```

## Field Notes

- **The Catalyst:** The observation that most sequence visualizers
  couple generation to rendering — the code that computes the next term
  lives next to the code that draws it. This makes it impossible to
  test the sequence logic without a browser, or to swap rendering
  strategies without rewriting the math. Splitting the engine out as a
  pure package means the same `generateSequence` call works in a Web
  Worker, a Node script, a test suite, or a React component.

- **Quirks & Anomalies:** The `createRule` helper accepts a `maxSteps`
  field, which the renderer uses to clamp the slider — but the engine
  itself doesn't enforce it. A caller can ask for more steps than the
  rule declares as its maximum; the rule's `getNext` function will keep
  being called. The clamping is a UI concern, not an engine concern. This
  separation is intentional but surprising if you expect the engine to
  validate its own constraints.

- **Future Horizons:** A streaming API that yields terms lazily instead
  of collecting the full sequence upfront — useful for infinite sequences
  or large step counts where memory matters. Rule composition: chaining
  two rules so that the output of one feeds the input of another, creating
  hybrid sequences. A formal rule-validation layer that can detect
  cycles, divergence, or undefined behaviour before generation starts.

---

## Rule System

Two decoupled primitives, both pure logic:

1. **Rules** — Pure functions that define a sequence term-by-term
   (`src/rules/`)
2. **Engine** — Generates a `number[]` from a rule + step count
   (`src/engine.ts`)

### How to Add a New Sequence

1. Create a rule file in `src/rules/`:

```typescript
import { createRule } from './create-rule';

export const myRule = createRule({
  id: 'my-rule',
  name: 'My Rule',
  description: 'What it does',
  maxSteps: 500,
  getNext: ({ index, current, sequence, seen }) => {
    // return next value
  }
});
```

2. Register using `registerRule()` in `src/rules/registry.ts`:

```typescript
import { myRule } from './myRule';
registerRule(myRule);
```

## PresetStore

State management for optional persistence is abstracted via the
**PresetStore** interface (`src/store/PresetStore.ts`). An
`InMemoryPresetStore` is provided for server/test use; browser-specific
adapters live in consumers (e.g., `LocalStoragePresetStore` in
`@repo/sequence-renderer`).

## Exports

| Path              | Exports                                                                |
| :---------------- | :--------------------------------------------------------------------- |
| `.`               | `generateSequence`                                                     |
| `./rules`         | `getAllRules`, `registerRule`                                          |
| `./rules/types`   | `SequenceRule`, `NextStepOptions`                                      |
| `./rules/recaman` | `recamanRule`                                                          |
| `./types`         | `ParamDescriptor`, `LayerCategory`, `LayerConfigEntry`, `PresetRecord` |

---

_See [@repo/sequence-renderer](/docs/reference/packages/sequence-renderer) for the canvas rendering layer, Fourier DFT computation, and interactive controls._

_Part of the [Creative Playground](https://joska-p.github.io/playground)_
