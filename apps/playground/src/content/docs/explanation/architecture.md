---
title: Architecture
description: The mental model behind every package in this repo — layers, the definition/registry pattern, and how state flows from data to pixels.
featured: true
tags:
  - explanation
---

# Architecture

This is a recreational, always-evolving codebase — the point of this
document is to give you a map of the patterns already in use and why they
exist, not to lock anything down. If a package doesn't fit this shape, that's
not automatically a bug in the package; it might be that the shape needs to
flex, or it might be a WIP spot worth revisiting. Either way, this doc is
here to make that a conscious choice rather than an accident.

Every package in this repo — whether it's a UI library, an app, or a creative
engine — currently follows a similar shape. This document describes that
shape once, at the concept level, so it doesn't need to change when a
package is added, removed, or rewritten.

For what a _specific_ package does with this shape, see its README.
This document never lists package names as a source of truth — treat any package name below as an example, not an inventory.

---

## The three jobs

Say someone drags a slider on screen. Here's everything that happens:

1. The **Screen** fires an event — "the value is now 7."
2. The **Bridge** catches it and updates a value it's holding onto.
3. The **Logic** takes that value and recomputes a result from it — pure
   math, no side effects.
4. The **Screen** re-renders with the new result.

That's the whole model. Three jobs, always in this order, never backwards:

- **Logic** — pure functions, data, rules. Could run in Node, a Web
  Worker, or a browser tab with no changes. Never imports React or reaches
  into the Bridge.
- **Bridge** — Zustand. Holds the value between renders and connects
  Logic to Screen. Doesn't compute anything itself, doesn't fetch data.
- **Screen** — React components. Reads values from the Bridge, sends
  events back to it. Never computes a result itself — that's Logic's job,
  even if the calculation looks trivial.

Some packages are simple enough that Logic is a single function and the
Bridge doesn't even exist (a stateless transform has nothing to hold
between renders). Others need all three, sometimes with Logic split
further — see below.

---

## Logic, expanded: Definitions & Registry

Some packages — anything with pluggable, swappable behavior (a rule, a
tile shape, a transform) — split Logic into three steps instead of one
flat module:

```
Definitions (data or factory functions)
        │
        ▼
Registry (something the UI can look definitions up in)
        │
        ▼
Engine Core (processor / generator / runner)
```

- A **Definition** is a plain data object or factory function encoding one
  behavior — a rule, a manipulation, a tile shape. It's just data; it does
  nothing on its own.
- The **Registry** is whatever lets the UI discover definitions without
  being told about each one by hand. In practice this varies — a
  `Map<id, Definition>`, a flat array, or definitions simply exported from
  a folder and picked up by a facade function. What matters isn't the data
  structure, it's the effect: adding a new definition means write it,
  register it, done — no other file changes.
- The **Engine Core** is the pure function or process (generator,
  simulator, pipeline) that takes a definition and produces output.

**Example** (illustrative only — see the package's own README for its real
registry):

```ts
// a definition is just data + an id
const myRule: Rule = { id: 'my-rule', getNext: (n) => n + 1 };

// registered once, however that package's registry is shaped
registry.set(myRule.id, myRule);

// the engine core consumes whatever's in the registry — it doesn't know
// or care how many definitions exist, or how they're stored
engineCore.run(registry.get(selectedId));
```

Not every package needs this split, and not every package needs a Bridge
at all — a stateless transform can be Definitions → Engine Core with
nothing to hold between renders, called directly by the Screen. Use the
full split when you find yourself asking "how do I add a new _kind_ of
X" — that's the signal a definition/registry pattern is worth it. For the
range of concrete shapes this takes across the repo (Map-based, array-based,
stateful, stateless), see
[Engine Patterns](/docs/explanation/engine-patterns/).

---

## Bridge, expanded: the Zustand pattern

Every store in the repo — regardless of package — follows the same
internal shape:

- The `create()` call is **never exported**. Components never import the
  store directly.
- **Getter hooks** select a single slice of state:
  ```ts
  export function useSteps(): number {
    return store((s) => s.steps);
  }
  ```
- **Setters** are plain functions (no `use` prefix) that read and write via
  `getState()` / `setState()`:
  ```ts
  export function setSteps({ steps }: { steps: number }): void {
    const state = store.getState();
    // clamp, derive, setState
  }
  ```
- Fine-grained selectors prevent cascade re-renders — a component
  subscribes to exactly the slice it uses, nothing more.

For the file-level rules (when a store earns its own directory, how
`actions.ts`/`selectors/` split works, naming conventions) see
[`reference/conventions`](/docs/reference/conventions/) — that's the
prescriptive, lookup-table version of this same pattern.

---

## Screen, expanded: the standard component tree

Most interactive packages assemble their UI the same way:

```
ErrorBoundary
  └─ components
       ├─ Main                       (the actual display — canvas, R3F, CSS Grid, SVG;
       │                              technology varies per package, role doesn't)
       └─ controlPanel               (controls)
            ├─ ControlPanel.tsx      (handy ui component imorted from @repo/ui/control-panel)
            ├─ DebugSection          (ControlPanel can be divided into ControlSection, ControlGrid, etc..)
            ├─ RuleSection
            └─ ShaderSection
```

- **Main** reads state via getter hooks and renders with whatever
  technology fits the package (Canvas 2D, R3F, CSS Grid, SVG). The
  rendering technology is a package decision — the _role_ of "read state,
  draw it" is the repo-wide rule.
- **Panel** dispatches changes via setters only. No business logic — if a
  control needs to decide something more complex than "call this setter,"
  that logic belongs in Logic or the Bridge, not here.
- The top-level exported component is usually named `App` or after the
  package's domain — again, a per-package naming choice.

---

## Using this as a map, not a checklist

Logic, Bridge, Screen, and the definition/registry pattern are really one
idea at different zoom levels:

1. **Zoomed out**: an event flows Screen → Bridge → Logic, and a result
   flows back Logic → Bridge → Screen.
2. **Zoomed into Logic**: if behavior is pluggable, Logic itself becomes
   definitions → registry → engine core.
3. **Zoomed into the Bridge**: when there is one, it's an unexported store
   with getter/setter pairs.

When you're starting a new package or reworking an old one, this is a
useful shape to compare against — not because deviating is wrong, but
because knowing _why_ the existing packages settled here (see
[Engine Patterns](/docs/explanation/engine-patterns/) for the tradeoffs)
makes it a real decision instead of a guess. If you deviate, a one-line
note in the package's README on _why_ is more valuable long-term than
matching this doc for its own sake.
