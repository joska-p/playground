# @repo/sequence-renderer

> Visualize mathematical sequences—Recamán, Fibonacci, and more.

## Quick Start

```bash
pnpm add @repo/sequence-renderer
```

```tsx
import { SequenceRenderer } from "@repo/sequence-renderer";

export default function MyViz() {
  return <SequenceRenderer />;
}
```

## Core Philosophy

Decouple **generation** from **visualization**:

1. **Rules** — Define sequences via `getNext()` in `src/core/sequence-rules.ts`.
2. **Visualizations** — Pluggable drawing functions in `src/core/visualizations/`.
3. **Zustand Store** — State management (`sequenceStore`).

## Available Sequences

Recamán, Fibonacci, Primes, Triangular, Collatz

---

Full reference: [Sequence Renderer](/docs/reference/packages/sequence-renderer/)

_Part of [Creative Playground](https://playground-beryl-omega.vercel.app)_
