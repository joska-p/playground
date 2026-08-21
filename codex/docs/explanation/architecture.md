---
title: Architecture
description: The mental model behind every package in this repo layers, the definition/registry pattern, and how state flows from data to pixels.
featured: true
tags:
    - explanation
---

# Architecture

This is a recreational, always-evolving codebase. This document maps the patterns already in use and the reasons behind them. A package departing from the shape signals either a shape ready to flex or a WIP spot worth revisiting; either reading is a conscious choice.

Every package in this repo, whether UI library, app, or creative engine, follows a similar shape. This document describes that shape once, at the concept level, so it stays stable while packages are added, removed, or rewritten.

A package's own README describes what that specific package does with the shape. Package names below stand as examples rather than inventory.

---

## The three jobs

A slider drag on screen sets the whole model in motion:

1. The **Screen** fires an event: "the value is now 7."
2. The **Bridge** catches it and updates a value it is holding.
3. The **Logic** takes that value and recomputes a result from it: pure math, free of side effects.
4. The **Screen** re-renders with the new result.

Three jobs, always in this order:

- **Logic**: pure functions, data, rules. It runs in Node, a Web Worker, or a browser tab unchanged; its world is inputs and outputs.
- **Bridge**: Zustand. It holds values between renders and connects Logic to Screen. Holding is its whole job.
- **Screen**: React components. It reads values from the Bridge and sends events back. Results come from Logic, however small the calculation.

Simple packages collapse gracefully: Logic shrinks to a single function, and a stateless transform holds nothing between renders, so the Bridge steps aside. Others need all three, sometimes with Logic split further (see below).

---

## Logic, expanded: definitions & registry

Packages with pluggable behavior (a rule, a tile shape, a transform) split Logic into three steps instead of one flat module:

```
Definitions (data or factory functions)
        │
        ▼
Registry (something the UI can look definitions up in)
        │
        ▼
Engine Core (processor / generator / runner)
```

- A **Definition** is a plain data object or factory function encoding one behavior: a rule, a manipulation, a tile shape. It is data; it does nothing on its own.
- The **Registry** lets the UI discover definitions on its own. In practice it varies: a `Map<id, Definition>`, a flat array, or definitions exported from a folder and picked up by a facade function. The data structure varies; the effect stays constant. Adding a definition means write it, register it, done.
- The **Engine Core** is the pure function or process (generator, simulator, pipeline) that takes a definition and produces output.

An illustrative example (a package's own README holds its real registry):

```ts
// a definition is just data + an id
const myRule: Rule = { id: 'my-rule', getNext: (n) => n + 1 };

// registered once, however that package's registry is shaped
registry.set(myRule.id, myRule);

// the engine core consumes whatever's in the registry,
// blind to how many definitions exist or how they are stored
engineCore.run(registry.get(selectedId));
```

The full split earns its place when a question repeats: "how do I add a new _kind_ of X?" That question signals a definition/registry pattern worth having. Simpler packages run Definitions → Engine Core directly from the Screen. The range of concrete shapes across the repo (Map-based, array-based, stateful, stateless) lives in [Engine Patterns](/docs/explanation/engine-patterns/).

---

## Bridge, expanded: the Zustand pattern

Every store in the repo, regardless of package, shares one internal shape:

- The `create()` call stays private to its module. Components reach state through hooks and setters.
- **Getter hooks** select a single slice of state:
    ```ts
    export function useSteps(): number {
        return store((s) => s.steps);
    }
    ```
- **Setters** are plain functions (no `use` prefix) reading and writing via `getState()` / `setState()`:
    ```ts
    export function setSteps({ steps }: { steps: number }): void {
        const state = store.getState();
        // clamp, derive, setState
    }
    ```
- Fine-grained selectors keep rendering precise: a component subscribes to exactly the slice it uses.

The file-level rules (when a store earns its own directory, how the `actions.ts`/`selectors/` split works, naming) live in [Conventions: State](/docs/conventions/state/), the lookup-table version of this same pattern.

---

## Screen, expanded: the standard component tree

Most interactive packages assemble their UI the same way:

```
ErrorBoundary
  └─ components
       ├─ Main                       (the display itself: canvas, R3F, CSS Grid, SVG;
       │                              technology varies per package, the role does not)
       └─ controlPanel               (controls)
            ├─ ControlPanel.tsx      (handy ui component imported from @repo/ui/control-panel)
            ├─ DebugSection          (ControlPanel divides into ControlSection, ControlGrid, ...)
            ├─ RuleSection
            └─ ShaderSection
```

- **Main** reads state through getter hooks and renders with whatever technology fits the package (Canvas 2D, R3F, CSS Grid, SVG). The technology is a package decision; the role of "read state, draw it" is repo-wide.
- **Panels** dispatch changes through setters. Decisions beyond a setter call live in Logic or the Bridge.
- The top-level exported component takes the name `App` or the package's domain, a per-package choice.

---

## One idea at three zoom levels

Logic, Bridge, Screen, and the definition/registry pattern form one idea at different zoom levels:

1. **Zoomed out**: an event flows Screen → Bridge → Logic, and a result flows back Logic → Bridge → Screen.
2. **Zoomed into Logic**: pluggable behavior turns Logic into definitions → registry → engine core.
3. **Zoomed into the Bridge**: a Bridge is an unexported store with getter/setter pairs.

A new package or a rework starts from this shape. Matching it inherits tradeoffs already settled ([Engine Patterns](/docs/explanation/engine-patterns/) records them); departing from it writes a one-line why in the package README. Either way the choice is real.
