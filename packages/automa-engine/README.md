> Core engine for cellular automaton simulation — generic evolve, rule parsing, and Web Worker stepping.

# @repo/automa-engine

## Rules

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

**B/S notation** is parsed into lookup arrays. `parseRule(id, name, 'B3/S23')` produces `birth[3] = true`, `survive[2] = survive[3] = true`.

**Multi-state rules** (`stateCount > 2`) add an aging/refractory layer:

- State `0` — Dead
- State `1` — Alive (counts toward neighbor totals)
- State `2` to `N-1` — Dying (age by +1 each tick, ignore neighbors, don't breed)

### Built-in examples

| Rule                  | ID             | Notation  | States | Behavior                                                      |
| --------------------- | -------------- | --------- | ------ | ------------------------------------------------------------- |
| Conway's Game of Life | `conway`       | `B3/S23`  | 2      | Classic                                                       |
| HighLife              | `highlife`     | `B36/S23` | 2      | Conway + B6                                                   |
| Brian's Brain         | `brians-brain` | `B2/S`    | 3      | Birth on 2, no survival, cells decay through refractory state |

### Adding a new rule

```ts
import { parseRule } from './rules/parse.ts';
import { registerRule } from './rules/registry.ts';

const myRule = parseRule('my-rule', 'My Rule', 'B1/S', 2);
registerRule(myRule);
```

For multi-state rules, pass the `stateCount` as the fourth argument:

```ts
const briansBrain = parseRule('brians-brain', "Brian's Brain", 'B2/S', 3);
```

The rule will automatically appear in the UI selector.

### File layout

```
src/
  engine.ts          Generic evolve (lookup tables + multi-state aging)
  worker.ts          Off-main-thread step, transferrable ArrayBuffers
  grid.ts            Grid allocation / seeding
  rules/
    types.ts         Rule type definition
    parse.ts         B/S notation → Rule
    registry.ts      Rule registry (register / get / getAll)
    conway.ts        Conway's Game of Life
    highlife.ts      HighLife
    brians-brain.ts  Brian's Brain
```

## Engine

Simulation runs in a **Web Worker** (via `@repo/worker-pool`) to avoid blocking the UI thread. The pool is configured with `maxPoolSize: 1` and uses `Transferable` buffers for zero-copy grid transfer. The `evolve` function in `engine.ts` is fully generic — it reads `birth[]`/`survive[]` lookups from the rule object and handles multi-state aging via the `stateCount` field.
