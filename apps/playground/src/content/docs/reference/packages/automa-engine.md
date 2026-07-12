---
title: "Automa Engine"
description: "A pure simulation engine that turns birth/survive lookup tables into evolving grids — a generic `evolve` function that knows nothing about rendering, only about neighbour counts and state transitions."
category: "reference"
tags:
  - reference
  - automa-engine
order: 20
---

---
title: 'Automa Engine'
coordinates: '/visuals/generative'
status: 'Active'
date_discovered: 2025-06-01
---

# @repo/automa-engine

---

## Essence

Automa Engine is the logic half of a two-package cellular automaton system.
It defines the rule model, the `evolve` function, and the Web Worker
boundary — everything the React layer ([`@repo/automa`](/docs/reference/packages/automa))
doesn't need to know about.

The interesting tension is between _generality_ and _familiarity_. Rules are
plain data objects: a `birth[]` lookup, a `survive[]` lookup, a `stateCount`.
Conway's Game of Life is just `birth[3] = true`, `survive[2] = survive[3] =
true` — no special-casing, no subclasses, no strategy pattern. B/S notation
like `B3/S23` is parsed once into these arrays at registration time. The
`evolve` function reads them at runtime and doesn't care which rule it's
running.

Multi-state rules (`stateCount > 2`) add an aging layer: state 0 is dead,
state 1 is alive (counts toward neighbour totals), and states 2 through N−1
are dying — they age by +1 each tick, ignore neighbours, and don't breed.
This single mechanism powers Brian's Brain and similar oscillating automata
without any rule-specific code.

## Quick Launch

```bash
pnpm add @repo/automa-engine
```

```ts
import { parseRule } from '@repo/automa-engine';
import { registerRule } from '@repo/automa-engine';

const myRule = parseRule('my-rule', 'My Rule', 'B1/S', 2);
registerRule(myRule);
```

The rule will automatically appear in the UI selector.

## Field Notes

- **The Catalyst:** The observation that every cellular automaton library
  hard-codes its most popular rules as special cases — `if (rule === 'life')`
  scattered through the evolve loop. Automa Engine takes the opposite
  approach: rules are data, the evolve function is generic, and new rules are
  registered at runtime. The B/S notation parser means you can write
  `B36/S23` and get HighLife without writing a single `if` statement.

- **Quirks & Anomalies:** The Web Worker boundary uses `Transferable` buffers
  for zero-copy grid transfer — the `Uint8Array` ownership is literally
  transferred across the thread boundary, so the main thread can't read it
  until the worker sends it back. This means the grid is _never_ accessible
  on both threads simultaneously, which is correct but feels precarious if
  you're not expecting it. Also, the pool is configured with `maxPoolSize: 1`
  — one worker, one simulation at a time — which is fine for a playground but
  would need rethinking for concurrent simulations.

- **Future Horizons:** Conditional rules where birth/survive depend on the
  current state of the cell itself, not just neighbour counts (totalistic
  variants). A streaming API for real-time rule composition — swap the rule
  mid-simulation without resetting the grid. WebAssembly evolve for
  performance-critical multi-state rules where the JS lookup table isn't
  fast enough.

---

## Rule System

Rules are plain data objects — no custom `if/else` per rule type.

```ts
type Rule = {
  id: string;
  name: string;
  stateCount: number; // 2 = Conway, 3 = Brian's Brain, etc.
  birth: readonly boolean[]; // length 9, index = neighbor count
  survive: readonly boolean[]; // length 9, index = neighbor count
};
```

**B/S notation** is parsed into lookup arrays. `parseRule(id, name, 'B3/S23')`
produces `birth[3] = true`, `survive[2] = survive[3] = true`.

### Built-in rules

| Rule                  | ID             | Notation  | States | Behaviour                                      |
| --------------------- | -------------- | --------- | ------ | ---------------------------------------------- |
| Conway's Game of Life | `conway`       | `B3/S23`  | 2      | Classic — birth on 3, survive on 2 or 3        |
| HighLife              | `highlife`     | `B36/S23` | 2      | Conway + B6 — self-replicating patterns emerge |
| Brian's Brain         | `brians-brain` | `B2/S`    | 3      | Birth on 2, no survival, refractory decay      |

### Multi-state mechanics

When `stateCount > 2`, the evolve function adds an aging layer:

- State **0** — Dead
- State **1** — Alive (counts toward neighbour totals)
- States **2** to **N−1** — Dying: age by +1 each tick, ignore neighbours, don't breed

This is the entire mechanism. Brian's Brain uses `stateCount = 3`: alive
cells decay to state 2, state 2 decays to state 0 (dead). No rule-specific
decay logic — the engine just reads `stateCount` and handles it.

### Registering a new rule

```ts
import { parseRule } from '@repo/automa-engine';
import { registerRule } from '@repo/automa-engine';

const myRule = parseRule('my-rule', 'My Rule', 'B1/S', 2);
registerRule(myRule);
```

For multi-state rules, pass the `stateCount` as the fourth argument:

```ts
const briansBrain = parseRule('brians-brain', "Brian's Brain", 'B2/S', 3);
```

## Evolve Function

The `evolve` function in `engine.ts` is fully generic. It reads `birth[]` and
`survive[]` from the rule object, counts alive neighbours for each cell, and
applies the lookup. For multi-state rules, it additionally increments the age
of dying cells. The function takes a flat `Uint8Array` grid and returns a new
one — no mutation of the input.

## Web Worker Boundary

Simulation runs in a Web Worker via `@repo/worker-pool` to avoid blocking
the UI thread. The pool is configured with `maxPoolSize: 1` and uses
`Transferable` buffers for zero-copy grid transfer — the `Uint8Array`
ownership crosses the thread boundary without copying.

```
Main thread
  └─ send grid (Transferable) → Worker
       └─ evolve(grid, rule) → new grid
  ← receive grid (Transferable) ← Worker
```

## File Layout

```
src/
  engine.ts          Generic evolve (lookup tables + multi-state aging)
  worker.ts          Off-main-thread step, Transferable ArrayBuffers
  grid.ts            Grid allocation / seeding
  rules/
    types.ts         Rule type definition
    parse.ts         B/S notation → Rule
    registry.ts      Rule registry (register / get / getAll)
    conway.ts        Conway's Game of Life
    highlife.ts      HighLife
    brians-brain.ts  Brian's Brain
```

---

_Part of the [Creative Playground](https://joska-p.github.io/playground)_

