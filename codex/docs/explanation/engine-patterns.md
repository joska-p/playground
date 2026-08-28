---
title: Engine Patterns
description: How the Logic/Bridge/Screen model plays out in practice, with the tradeoffs behind each choice in a learning-driven codebase.
---

# Engine Patterns

[Architecture](/docs/explanation/architecture/) describes the shape a package tends to follow: Logic, Bridge, Screen, and, for packages with pluggable behavior, Definitions and a Registry underneath Logic.

This page holds the tradeoffs behind each option. Picking a pattern is a moment to understand why it exists, and changing your mind later is a refactor like any other. Examples reference real packages to make tradeoffs concrete; they are illustrations rather than inventory. A package's [own docs](/docs/api/glaze/) (README overview plus generated API reference) hold its current truth.

---

## The problem a registry solves

A definition (a rule, a manipulation, a tile shape) often needs to serve more than one execution context: the main thread for the UI dropdown listing it, a Web Worker running it, maybe a WebGL/shader context reading its parameters. Separate copies drift apart the moment rule #4 arrives.

A registry keeps definitions in one place, keyed by id, so every context asks for the same one by the same name. Adding a definition becomes a single edit, even when one consumer runs somewhere the others reach with difficulty (inside a worker, say).

That same constraint shapes the definition format: plain data or serializable factories survive a worker boundary; classes closing over DOM references stop at it.

---

## Registry shapes

| Shape                                                                                                 | Good for                                                                                                                                   | Costs                                                                                                                         |
| ----------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------- |
| **`Map<id, Definition>`**                                                                             | Looking something up by id often (a dropdown selection, a worker requesting "run rule X"). Cheap `.has()`/`.get()`.                        | Slightly more ceremony than an array; an id scheme decided up front.                                                          |
| **Flat array**                                                                                        | Iterating everything: rendering a list of all tile shapes, no single-item lookup needed. Simple to reason about.                           | A specific item by id means a `.find()` scan instead of an O(1) get.                                                          |
| **Implicit facade** (definitions as named exports, a function pattern-matches on which was requested) | Very few definitions, or definitions that are really parameters to one shared algorithm rather than distinct behaviors. Least boilerplate. | Harder to list "everything available" generically; a UI dropdown gets written by hand instead of generated from the registry. |

Each shape answers its own question: does the package list everything, fetch one by id, or both? Listing alone favors an array, less code for the same result. Fetching by id across a worker boundary pays for a Map (or something serializable to one).

---

## Where the Bridge earns its place

The Bridge holds a value between renders: a selected rule, a running/paused flag, a slider position. It earns its place when something persists and reads from more than one spot. A package that transforms an input and hands back an output in one shot remembers nothing, so it runs without one.

Adding one anyway carries a known tradeoff:

- On the plus side: a consistent shape across packages. State always lives in the same kind of place, and a second consumer arrives without restructuring.
- On the cost side: a store holding one value behind one forwarding setter adds a file and a concept for little behavior change. For a small recreational package, calling Logic directly from the Screen is simpler and more honest about what happens.

The deciding question: will the package grow more interactive state? Growth repays the store now. A one-shot experiment adds the store if and when it earns it.

---

## Execution models

Once a definition is selected, the Engine Core runs it under a model chosen by the problem:

| Model                              | When it fits                                                                              | Tradeoff                                                                                                                                                   |
| ---------------------------------- | ----------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Pure synchronous function**      | Anything computing an answer once, fast enough to leave a render unblocked.               | Simplest to write, test, and reason about. Blocks the main thread when actually slow.                                                                      |
| **Ticked / interval-driven**       | Simulations where watching it evolve is the point (cellular automata, animation).         | The "running" experience comes free, along with start/stop/speed state to manage in the Bridge.                                                            |
| **Worker-pool dispatch**           | Expensive, parallelizable work (heavy pixel transforms) that would otherwise jank the UI. | Keeps the main thread free at the price of message passing, `Transferable` buffers, and definitions reachable from the worker (see registry shapes above). |
| **Constraint-driven regeneration** | Layouts driven by container size rather than a single input (resize-reactive tiling).     | Feels automatic and correct once built; resize handling (debouncing, avoiding thrashing) is its own small project.                                         |

New experiments start with the pure synchronous function: cheapest to build, easiest to replace. Moving to a worker or a tick loop happens later, informed by real friction instead of day-one guesses.

---

## Worked example: end to end

One illustrative trace through a rule-based sequence generator, showing how the pieces click together when a package wants all of them:

```
Definitions: SequenceRule objects, each with a getNext(n) function
        │
Registry: Map<id, SequenceRule>, chosen here because a dropdown needs
          to list all rules AND a worker (if added later) could request
          one by id without duplicating the definitions
        │
Engine Core: generateSequence(rule, steps), a pure function that
             calls rule.getNext() in a loop and returns number[]
        │
Bridge: a store holding { selectedRuleId, steps, sequence }, earning its
        place because the canvas, the dropdown, and a "steps" slider all
        need to read/write the same values independently
        │
Screen: a dropdown (reads the registry, calls setRule),
        a slider (calls setSteps),
        a canvas (reads useSequence(), draws it)
```

Tracing an interaction: dragging the slider calls `setSteps`, which reads the currently selected rule from the Bridge, calls the pure `generateSequence` function in Logic, and writes the new array back to the Bridge. The canvas re-renders because it subscribes to exactly that slice.

Simpler packages collapse most of this: one behavior leaves the registry idle, nothing to persist leaves the Bridge empty. What remains is the same pattern carrying only the pieces that earn their keep.
