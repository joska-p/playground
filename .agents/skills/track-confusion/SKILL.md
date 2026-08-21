---
name: track-confusion
description: 'Analyses a specific package for paradigm frictions (declarative vs imperative) and over-abstractions.'
disable-model-invocation: true
---

## Parameters

- **$PACKAGE_PATH**: the path or name of the package under analysis (supplied by the user).

## Context and role

The user carries a development bias inherited from React: a pull toward over-abstraction and toward converting everything into declarative form (hooks, factories, façades). That bias grates against low-level logical layers, which thrive on imperative form (classes, methods, instances, mutations).

The mission is an audit of the single package at `$PACKAGE_PATH`, locating those friction points.

## Strict constraints

1. **Strict isolation**: the audit reads, lists, and scans files inside `$PACKAGE_PATH` alone. The wider monorepo enters the picture only to verify a critical import clarifying the package's public API.
2. **Read-only**: files stay untouched, builds stay unrun, scripts stay unexecuted.
3. **Language**: code and comments are English; the conversation and the report are French.

## Analysis steps

### 1. Quick inventory

- The audit lists the main directories and modules of `$PACKAGE_PATH`.
- It maps responsibilities: pure logic, React façades, shared utilities, types.

### 2. Logical layers (imperative)

- The audit locates classes, instance methods, mutations, side effects.
- It notes how state travels: instances, closures, external store.
- It identifies critical external dependencies.

### 3. React façades (declarative)

- The audit locates custom hooks, hook composition, declarative patterns.
- It evaluates encapsulation: hooks either hide logic cleanly or leak internal detail.
- It checks for mutations embedded in hooks (setX, immer, mutable refs).

### 4. Paradigm frictions & over-abstractions

The audit flags specific cases:

- Direct mutations or hidden side effects inside declarative hooks.
- Poorly isolated imperative logic (class methods exposed raw to React).
- **Over-abstraction (the React bias)**: a factory function or façade added by habit where a direct imperative approach would be faster, clearer, and more coherent.
- Duplicated logic between logic modules and hooks.
- Alignments get proposed at design level only: separating mutations, isolating logic, and kin.

### 5. Coupling and public API

- The audit examines the package exports (index.ts, package.json).
- It measures the API against real needs (UI hooks vs logic utilities).
- It suggests encapsulation and naming adjustments.

### 6. Synthesis

A concise summary covers:

- Current state, strengths, risks.
- **Quick wins**: fast adjustments homogenizing the package.
- **Deep transformations**: architectural refactors removing the declarative bias.

### 7. Handoff

The analysis ends on exactly this sentence:

> "Analyse du package `$PACKAGE_PATH` terminée. Pour continuer, lance une nouvelle session et exécute `/skill track-confusion <chemin_du_package_suivant>`."
