---
title: 'Engine Patterns'
description: 'A closer look at how the Logic/Bridge/Screen model plays out in practice — the tradeoffs behind each choice, since this is a learning/WIP codebase, not a rulebook.'
category: 'explanation'
featured: true
tags:
  - explanation
---

# Engine Patterns

[Architecture](/docs/explanation/architecture/) describes the shape a
package tends to follow: Logic, Bridge, Screen, and — for packages with
pluggable behavior — Definitions and a Registry underneath Logic.

This page is about the tradeoffs behind each option, not a single correct
answer. This is a recreational, learning-driven codebase — picking a
pattern here is a good moment to understand _why_ it exists, and it's
completely fine to pick differently, or to change your mind later and
refactor. The goal of this page is to make that an informed choice.

Examples below reference real packages to make the tradeoffs concrete, but
they're illustrations, not an inventory — for what a package does _today_,
its README under [`reference/packages`](/docs/reference/packages/) is the
source of truth.

---

## Why a registry at all?

The recurring problem a registry solves: a definition (a rule, a
manipulation, a tile shape) often needs to be usable from more than one
execution context — the main thread for the UI dropdown that lists it, a
Web Worker that actually runs it, maybe a WebGL/shader context that needs
its parameters. If each context has its own copy or its own way of finding
"rule #3," they drift out of sync the moment you add a rule #4.

A registry is just: keep definitions in one place, keyed by id, so any
context can ask for the same one by the same name. That's the actual
payoff — not tidiness, but **not having to update three places when you
add a definition**, one of which might be running somewhere the others
can't easily reach (inside a worker, say).

That constraint (needs to be reachable from a worker or a non-JS-object
context) also explains why definitions are usually plain data or
serializable factories rather than, say, classes with methods that close
over DOM references — those don't survive a worker boundary.

---

## A registry isn't always a `Map` — the options

| Shape                                                                                                 | Good for                                                                                                                                        | Costs                                                                                                                                                                          |
| ----------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **`Map<id, Definition>`**                                                                             | Looking something up by id often (a dropdown selection, a worker requesting "run rule X"). Cheap `.has()`/`.get()`.                             | Slightly more ceremony to set up than an array; you decide on an id scheme up front.                                                                                           |
| **Flat array**                                                                                        | Iterating everything — rendering a list of all tile shapes, no single-item lookup needed. Simple to reason about.                               | Looking up one specific item by id means a `.find()` scan instead of an O(1) get.                                                                                              |
| **Implicit facade** (definitions as named exports, a function pattern-matches on which was requested) | Very few definitions, or definitions that are really just parameters to one shared algorithm rather than distinct behaviors. Least boilerplate. | Harder to list "everything available" generically — there's no single object to introspect, so a UI dropdown has to be written by hand instead of generated from the registry. |

None of these is the "right" one — the question worth asking is whether
you need to (a) list everything, (b) fetch one by id, or (c) both. If you
only ever need (a), an array is less code than a Map for the same result.
If you need (b) across a worker boundary, a Map (or something serializable
to one) tends to pay for itself.

---

## When does the Bridge (Zustand) earn its place?

The Bridge holds a value _between_ renders — a selected rule, a
running/paused flag, a slider position. It's worth adding when something
needs to persist and be read from more than one place. It's arguably
unnecessary when a package just transforms an input and hands back an
output in one shot, with nothing "currently selected" to remember.

**Tradeoffs of adding one anyway, even when you're not sure you'll need it:**

- _Pro_: consistent shape across packages — you always know where to look
  for state. Easier to add a second consumer of that state later without
  restructuring.
- _Con_: a store with one value and one setter that just forwards to a
  function is an extra file and an extra concept for no real behavior
  change. For a small recreational package, calling Logic directly from
  the Screen can just be simpler and more honest about what's happening.

There's no wrong answer here — it depends whether you expect the package
to grow more interactive state later (worth the store now) or whether it's
a one-shot experiment (skip it, add the store if and when it's needed).

---

## Execution models — what each buys you

Once a definition is selected, how the Engine Core runs it is a per-package
choice driven by the problem:

| Model                              | When it fits                                                                              | Tradeoff                                                                                                                                                                              |
| ---------------------------------- | ----------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Pure synchronous function**      | Anything that computes an answer once, fast enough to not block a render.                 | Simplest to write, test, and reason about. Blocks the main thread if it's actually slow.                                                                                              |
| **Ticked / interval-driven**       | Simulations where watching it evolve _is_ the point (cellular automata, animation).       | Gives you the "running" experience for free, but now you have start/stop/speed state to manage in the Bridge.                                                                         |
| **Worker-pool dispatch**           | Expensive, parallelizable work (heavy pixel transforms) that would otherwise jank the UI. | Keeps the main thread free, but adds real complexity: message passing, `Transferable` buffers, and definitions need to be reachable from the worker (see the registry section above). |
| **Constraint-driven regeneration** | Layouts driven by container size rather than a single input (resize-reactive tiling).     | Feels automatic and correct once built, but resize handling (debouncing, avoiding thrashing) is its own small can of worms.                                                           |

If you're unsure which fits a new experiment: start with the pure
synchronous function. It's the cheapest to build and the easiest to rip
out and replace once you actually feel friction — moving to a worker or a
tick loop is a refactor you can do later with much better information than
you have on day one.

---

## Worked example: end to end

One illustrative trace through a rule-based sequence generator, showing
how the pieces click together when you do want all of them:

```
Definitions: SequenceRule objects, each with a getNext(n) function
        │
Registry: Map<id, SequenceRule> — chosen here because a dropdown needs
          to list all rules AND a worker (if added later) could request
          one by id without duplicating the definitions
        │
Engine Core: generateSequence(rule, steps) — pure function,
             calls rule.getNext() in a loop, returns number[]
        │
Bridge: a store holding { selectedRuleId, steps, sequence } — earns its
        place because the canvas, the dropdown, and a "steps" slider all
        need to read/write the same values independently
        │
Screen: a dropdown (reads the registry, calls setRule),
        a slider (calls setSteps),
        a canvas (reads useSequence(), draws it)
```

Trace an interaction: dragging the slider calls `setSteps`, which reads
the currently selected rule from the Bridge, calls the pure
`generateSequence` function in Logic, and writes the new array back to the
Bridge. The canvas re-renders because it's subscribed to exactly that
slice.

A simpler package might collapse most of this — no registry if there's
only one behavior, no Bridge if there's nothing to persist. That's not a
lesser version of the pattern; it's the same pattern with the pieces that
weren't earning their keep left out.
