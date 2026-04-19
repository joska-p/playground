# Sequence Renderer Architecture Guide

This document explains the architecture of the `@repo/sequence-renderer` package, which provides a flexible system for generating and visualizing mathematical sequences using both Canvas and SVG.

---

## 🏗️ Core Philosophy

The Sequence Renderer is built on the principle of decoupling **sequence generation** from **visualization**.

-   **Generators**: Pure functions that take parameters (like `iterations`) and return an array of numbers.
-   **Renderers**: Components that take a sequence and draw it. Currently, we support:
    -   **`CanvasRenderer`**: Optimized for performance and complex drawings.
    -   **`SVGRenderer`**: Provides sharp, scalable vectors with CSS styling support.
-   **Engine (`SequenceMaker.tsx`)**: Orchestrates the state, generators, and renderers.

---

## 🛠️ Sequence Generators

Sequences are defined in the `SEQUENCE_GENERATORS` registry located at `src/components/generators/index.ts`.

### Example: Adding a New Sequence
```typescript
export const SEQUENCE_GENERATORS = {
  racaman: {
    name: "Racaman's Sequence",
    generate: createRacamanSequence,
    defaultIterations: 30,
    maxIterations: 2000,
  },
  // Add your new sequence here!
} as const;
```

A generator function should follow this signature:
`(n: number) => number[]`

---

## 🎨 Rendering Logic

The drawing logic is centralized in the `lib` directory to ensure consistency between Canvas and SVG:

-   **`draw-canvas.ts`**: Handles drawing to the HTML5 Canvas 2D context.
-   **`draw-svg.ts`**: Handles generating path strings and viewBox calculations for SVG.
-   **`math.ts`**: Contains shared mathematical utilities like `findBiggestInterval`.

### ViewBox & Scaling
Both renderers automatically scale the sequence to fit the container. They use a 5% padding to ensure the drawing is never clipped at the edges.

---

## 🔄 Data Flow

1.  **Context**: `SequenceProvider` manages the global state:
    -   `sequenceType`: Which generator to use.
    -   `iterations`: Number of steps in the sequence.
    -   `drawMode`: Switch between `canvas-mode` and `vector-mode`.
    -   `containerSize`: Automatically tracked via `ResizeObserver`.
2.  **Generation**: The sequence is automatically re-generated via `useMemo` whenever `sequenceType` or `iterations` change.
3.  **Display**: `SequenceDisplay` tracks the container size and chooses the active renderer.
4.  **Render**: The active renderer (Canvas or SVG) calls the corresponding drawing library with the current sequence and container size.

---

## 🚀 How to Add a New Sequence

1.  **Create the Generator**: Add a new file in `src/components/generators/` (e.g., `fibonacci.ts`).
2.  **Register it**: Add the generator to `SEQUENCE_GENERATORS` in `src/components/generators/index.ts`.
3.  **Update UI**: The `SequenceSelector` will automatically pick up the new sequence and add it to the dropdown menu.

---

*This modular approach allows the Sequence Renderer to grow with new mathematical patterns and visualization styles without cluttering the core components.*
