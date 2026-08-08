# @repo/oeis-signal

> Personal composable signal + visualization package for integer sequences.

## Philosophy

- A **sequence** is treated as a **signal** (lazy, on-demand stream of numbers).
- Everything is a black-box **Module**.
- Modules live in a registry.
- Visualization layers and middle transforms can be plugged onto any signal.
- Generators and viz live in the **same package** (they are tightly related) but are kept in separate TypeScript projects/configs because viz needs DOM/canvas.

## Package structure

```
src/
  core/           # types, registry, signal helpers (no DOM)
  modules/        # individual sequence modules
  middle/         # transforms (window, clamp, partial sums…) – later
  viz/            # canvas / WebGL layers – separate tsconfig
```

- `core` + `modules` → clean, testable, no browser APIs
- `viz` → has its own `tsconfig.viz.json` that includes DOM/canvas lib

## Core concepts

- **Module**: black box that can create a `Signal` given a budget.
- **Signal**: lazy pull-based sequence (can be materialized to an array when needed).
- **Budget**: hard limit so stateful modules cannot explode.
- **Registry**: collection of all available modules.
