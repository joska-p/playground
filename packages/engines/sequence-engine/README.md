> Pure engine for mathematical sequence generation — independent of UI, no browser APIs.

# @repo/sequence-engine

## Core Architecture

Two decoupled primitives, both pure logic:

1. **Rules** — Pure functions that define a sequence term-by-term (`src/rules/`)
2. **Engine** — Generates a `number[]` from a rule + step count (`src/engine.ts`)

State management for optional persistence is abstracted via the **PresetStore** interface (`src/store/PresetStore.ts`). An `InMemoryPresetStore` is provided for server/test use; browser-specific adapters live in consumers (e.g., `LocalStoragePresetStore` in `@repo/sequence-renderer`).

All canvas rendering, Fourier computation, and DOM interaction has been moved to `@repo/sequence-renderer`.

## How to Add a New Sequence

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

## Exports

| Path               | Exports                                                                |
| :----------------- | :--------------------------------------------------------------------- |
| `.`                | `generateSequence`                                                     |
| `./rules`          | `getAllRules`, `registerRule`                                          |
| `./rules/types`    | `SequenceRule`, `NextStepOptions`                                      |
| `./rules/recaman`  | `recamanRule`                                                          |
| `./store`          | `PresetStore`                                                          |
| `./types`          | `ParamDescriptor`, `LayerCategory`, `LayerConfigEntry`, `PresetRecord` |
