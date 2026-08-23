---
title: TypeScript
description: TypeScript style, performance rules, and coding principles.
tags:
    - conventions
    - reference
---

# TypeScript

Preferences, not doctrine. They lean on Clean Code principles. A package can deviate (ex: the UI lib uses `interface`) as long as it's consistent within that package.

## Type definitions

Default: `type`, composed with intersections (`&`).

```ts
type Props = BaseProps & { label: string };
```

Packages that prefer `interface` (ex: the UI lib) keep it consistent across that package rather than mixing both.

## Naming and signatures

Names should carry the concept, so you don't need to read the body to know what a function does. Group folders by domain (`cpu/`, `gpu/`), suffix files by variant (`*Declarative`, `*Hybrid`).

Accept the loosest type that works: an iterable instead of an array, a branded type (`ValidatedString`, `NormalizedVector`) instead of a raw string when the caller should have already checked it. Less to validate inside the function.

```ts
type NormalizedVector = { x: number; y: number } & { __brand: 'normalized' };

// dot() trusts the type — no need to re-check the vector is normalized
function dot(a: NormalizedVector, b: NormalizedVector): number {
    return a.x * b.x + a.y * b.y;
}
```

## Function design

One function, one job. If a chunk of a function needs you to zoom into a raw loop or some string fiddling, pull it into its own helper with a name.

Keep pure logic separate from side effects (network calls, DOM, `Date.now()`, global state). Pure functions are easier to test and reuse; push the messy I/O to the edges of the app.

Comments explain why, not what — the code already says what.

## Structure

Layer dependencies one way: data → shared helpers → components. Nothing reaches back up. Keep alternative implementations of the same thing next to each other so they're easy to compare.

## Performance

Throttle or debounce high-frequency events (resize, scroll, mouse) before they touch layout. Use stable, deterministic keys for lists so React doesn't re-render everything.

## Verification

Before calling something done: types check, imports aren't broken, and public APIs haven't silently changed.
