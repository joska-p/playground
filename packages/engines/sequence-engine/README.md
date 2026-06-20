> Core engine for mathematical sequence generation and visualization, independent of UI.

# @repo/sequence-engine

## Core Architecture

Generation and visualization are decoupled into independent pipelines:

1. **Rules** — Pure functions that define a sequence term-by-term (`src/rules/`)
2. **Engine** — Generates the full sequence array from a rule + step count (`src/engine.ts`)
3. **Visual Layers** — Composable drawing units that render onto a `<canvas>` (`src/visualizations/layers/`)

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

2. Register in `src/rules/registry.ts`:

```typescript
import { myRule } from './myRule';
rules.set(myRule.id, myRule);
```
