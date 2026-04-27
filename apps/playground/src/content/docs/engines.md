---
title: "Engines"
description: "How the creative engines work — rules, generators, and pluggable systems."
type: "explanation"
---

# Engines

The creative engines follow a simple pattern: **data-driven rules + pluggable visualizations**.

---

## Sequence Renderer

### The Pattern

```
Rule (math) → Generator → Sequence → Visualization → Canvas
```

### Rules (`src/core/rules.ts`)

Rules define _what_ the sequence produces:

```typescript
type SequenceRule = {
  name: string;
  id: string;
  description: string;
  maxSteps: number;
  getNext: (params) => number;
};
```

Example — Recamán's Rule:

```typescript
getNext: ({ index, current, seen }) => {
  const backward = current - index;
  return backward > 0 && !seen.has(backward) ? backward : current + index;
};
```

### Available Sequences

| Sequence       | Rule                       | Description           |
| -------------- | -------------------------- | --------------------- |
| **Recamán**    | Jump back by n if possible | Classic visualization |
| **Fibonacci**  | F(n) = F(n-1) + F(n-2)     | Golden ratio          |
| **Primes**     | Prime numbers only         | 2, 3, 5, 7, 11...     |
| **Triangular** | 1, 3, 6, 10, 15...         | Sum of integers       |
| **Collatz**    | Even: n/2, Odd: 3n+1       | The 3n+1 problem      |

### Adding a Sequence

1. Define a new `SequenceRule` in `rules.ts`
2. Add it to the `sequencesRule` array
3. Done — it appears in the UI automatically

### Visualizations

Visualizations are pluggable drawing functions:

```typescript
type Visualization = {
  id: string;
  name: string;
  draw: (ctx, sequence, bounds) => void;
};
```

Add new visualizations in `src/core/visualizations/`.

---

## Mosaic Maker

### The Pattern

```
Palette → Tile Registry → CSS Grid → Pattern
```

### Tile Registry (`src/core/tile-registry.ts`)

Tiles define _shapes_ that map to palette colors:

```typescript
const TILE_REGISTRY: Record<string, TileDefinition> = {
  Square: {
    shapes: [
      { type: "rect", x: 0, y: 0, width: 50, height: 50, colorIndex: 1 },
      // ...
    ],
  },
};
```

### Available Tiles

| Tile                | Description                   |
| ------------------- | ----------------------------- |
| **Square**          | 4 equal quadrants             |
| **CornerCircles**   | Background with corner arcs   |
| **OppositeCircles** | Two opposing arcs             |
| **MiddleCircle**    | Center circle pattern         |
| **Diamond**         | 4 triangles forming diamond   |
| **Triangles**       | 4 triangles meeting at center |
| **Cube**            | 3D cube illusion              |
| **Rainbow**         | Concentric arc pattern        |

### Adding a Tile

1. Define shapes in `tile-registry.ts`
2. Add to `TILE_REGISTRY`
3. It appears in the UI automatically

### Configuration (`src/core/config.ts`)

- `DEFAULT_TILE_SIZE`: 64px
- `DEFAULT_GAP_SIZE`: 0px
- `MAX_NUMBER_OF_PALETTES`: 33

---

## Palette Generator

### Generator Types

| Type              | Rule                         | Colors |
| ----------------- | ---------------------------- | ------ |
| **Analogous**     | Adjacent on wheel            | 5      |
| **Complementary** | Opposite on wheel            | 5      |
| **Monochromatic** | Same hue, varying saturation | 5      |
| **Triadic**       | 120° apart                   | 3      |
| **Xadic**         | 4-color pattern              | 4      |

### Color Space

Uses HSL internally for intuitive color manipulation.

---

## Shared Patterns

### State Management

Engines use **Zustand** for state:

```typescript
const { value, setValue } = useStore();
```

### Pluggable Architecture

Add new rules/visualizations/tiles by:

1. Defining the data structure
2. Adding to the registry array
3. UI updates automatically

This keeps the engine core stable while experiments evolve freely.
