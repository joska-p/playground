---
title: 'Radu Machine Learning'
description: "A quiet gallery of hand-drawn strokes — every scribble, car, and house from a student's handwriting sessions, frozen into SVGs and laid out in rows for machine learning exploration."
category: 'reference'
tags:
  - reference
  - radu-machine-learning
order: 20
---

# @repo/radu-machine-learning

---

## Essence

Radu Machine Learning is a stroke data viewer built for a
[machine learning course](https://www.youtube.com/playlist?list=PLB0Tybl0UNfYe9aJXfWw-Dw_4VnFrqRC4).
It takes raw pen-sample recordings — sequences of `[x, y]` coordinates
captured as someone draws simple objects — and turns them into a browsable
grid of labelled images. The data was collected across multiple sessions
between late 2022 and mid-2023, first for
[Phase 1](https://github.com/gniziemazity/ml-course) and later for
[Phase 2](https://github.com/gniziemazity/ml-course-phase-2) of the course.

The interesting thing about stroke data is how much it reveals about a
drawer's hand. Each path is a trail of intent — where the pen lifted,
where it hesitated, where a curve was committed in a single sweep.
This viewer doesn't interpret those traces; it just presents them, one
drawing beside the next, so a learner can see the raw material that
classification algorithms work with.

## Quick Launch

```bash
pnpm dev --filter @repo/radu-machine-learning
```

Or install it into your own project:

```bash
pnpm add @repo/radu-machine-learning
```

```tsx
import { RaduMachineLearning } from '@repo/radu-machine-learning';

export default function Page() {
  return <RaduMachineLearning />;
}
```

```tsx
import '@repo/radu-machine-learning/styles';
```

## Field Notes

- **The Catalyst:** Machine learning courses need labelled datasets.
  Adrian Perrig's
  [Random-Art paper](https://www.randomart.org/) showed that even
  simple deterministic algorithms produce surprisingly rich visual
  output from short seed strings — and the inverse question is
  equally interesting: what does a human hand produce when asked to
  draw the same object five times? This package collects those
  drawings as structured stroke data, ready for feature extraction
  and classifier training.

- **Quirks & Anomalies:** The build pipeline does the heavy lifting.
  A dataset generator script reads raw JSON samples from
  `data/raw-samples/`, iterates over each session's labelled
  drawings, and emits two artefacts: individual SVG files (one per
  drawing, placed in `public/img/`) and a single TypeScript module
  (`samples.ts`) that bundles all stroke data as a `const` array.
  At runtime the React components never touch stroke coordinates
  directly — they render `<img>` tags pointing at the pre-generated
  SVGs. The `generateSVG` utility builds `<polyline>` elements from
  the coordinate arrays, so the entire stroke is a single vector
  path with no intermediate point rendering. The SVGs live in
  `public/img/` as numbered files (`1.svg`, `2.svg`, ...) keyed by
  an auto-incremented ID, not by drawing label.

- **Future Horizons:** The Charts section was planned (occupying the
  upper third of the layout) but never implemented — the codebase
  contains placeholder references (`basis-1/3`) for a future
  visualization layer. Interactive stroke playback, where each path
  animates pen-down movement in real time, would make the data feel
  more like a living recording. Export to CSV or NumPy-friendly
  formats would lower the barrier to feeding this data into
  scikit-learn or TensorFlow.

---

## Architecture

```
RaduMachineLearning
  └─ DisplaySamples          — iterates over `samples[]`
       └─ DisplayStudent     — one row per student (name + drawings)
            └─ <img>         — pre-generated SVG from public/img/{id}.svg
```

### Build Pipeline

```
data/raw-samples/*.json     — raw session files (session, drawings)
       │
       ▼
dataset_generator.ts        — parses sessions, assigns IDs, groups by student
       │
       ├─▶ public/img/*.svg — one SVG per drawing (generateSVG → <polyline>)
       └─▶ samples.ts       — const array of all student/drawing/path data
```

The runtime components are stateless. They read the bundled `samples`
array, iterate over students and their drawings, and render each as
an `<img>` tag. No canvas, no animation, no interaction — a deliberate
choice to keep the viewer focused on the data itself.

## Data Model

```typescript
type Paths = number[][][]; // Array of strokes, each is an array of [x, y] points

type Drawing = {
  id: number; // Auto-incremented, matches SVG filename
  label: string; // e.g., "car", "house", "dog"
  paths: Paths;
};

type Sample = {
  student_id: string; // Timestamp-based ID
  student_name: string; // e.g., "Radu"
  drawings: Drawing[];
};
```

The `samples` array exported from `samples.ts` is the single source of
truth. Each sample groups drawings by student; each drawing carries an
integer `id` that maps to its SVG file in `public/img/`.

## Exports

| Export                | Path                                              | Description    |
| --------------------- | ------------------------------------------------- | -------------- |
| `RaduMachineLearning` | `@repo/radu-machine-learning/RaduMachineLearning` | Root component |
| `./styles`            | `@repo/radu-machine-learning/styles`              | Component CSS  |

## External Resources

| Resource                    | Link                                                                     |
| --------------------------- | ------------------------------------------------------------------------ |
| ML Course (YouTube)         | https://www.youtube.com/playlist?list=PLB0Tybl0UNfYe9aJXfWw-Dw_4VnFrqRC4 |
| ML Course (GitHub, Phase 1) | https://github.com/gniziemazity/ml-course                                |
| ML Course (GitHub, Phase 2) | https://github.com/gniziemazity/ml-course-phase-2                        |

---

_Part of the [Creative Playground](https://joska-p.github.io/playground)_
