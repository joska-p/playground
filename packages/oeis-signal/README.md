# @repo/oeis-signal

> A Zustand + Zod demo component, scaffolded from the new-package generator.

This README is the package's local spec — the source of truth for its contract
and conventions. When the code changes, keep it in sync.

---

# seq-signal

Personal composable signal + visualization package for integer sequences.

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

## First goal

Implement the absolute simplest module (`naturals` = n) end-to-end so the scaffolding is proven.

---

**Scaffolding + first code**

Here is a clean, minimal starting point focused only on the core + the simplest module.

### 1. `src/core/types.ts`

```ts
/** Budget / safety limit when creating a signal */
export type Budget = {
    maxTerms: number;
};

/** A lazy signal you can pull from */
export interface Signal {
    /** Pull the next term. Returns { value, done } */
    next(): IteratorResult<number>;

    /** Convenience: materialize up to `count` terms (or until done) */
    take(count: number): number[];

    /** Optional: how many terms have already been produced */
    readonly produced: number;
}

/** Black-box module */
export interface Module {
    readonly id: string;
    readonly name: string;
    readonly description: string;

    /** Create a fresh signal limited by the given budget */
    createSignal(budget: Budget): Signal;
}
```

### 2. `src/core/create-simple-signal.ts`

(helper for pure closed-form sequences)

```ts
import type { Budget, Signal } from './types';

/**
 * Creates a simple lazy signal from a pure function a(n).
 * Perfect for sequences like n, n², triangular numbers, etc.
 */
export function createSimpleSignal(fn: (n: number) => number, budget: Budget): Signal {
    let n = 0;
    let produced = 0;

    return {
        get produced() {
            return produced;
        },

        next(): IteratorResult<number> {
            if (produced >= budget.maxTerms) {
                return { value: undefined, done: true };
            }
            const value = fn(n);
            n += 1;
            produced += 1;
            return { value, done: false };
        },

        take(count: number): number[] {
            const result: number[] = [];
            const limit = Math.min(count, budget.maxTerms - produced);
            for (let i = 0; i < limit; i++) {
                const { value, done } = this.next();
                if (done) break;
                result.push(value!);
            }
            return result;
        }
    };
}
```

### 3. `src/modules/naturals.ts`

(the simplest possible sequence: a(n) = n)

```ts
import { createSimpleSignal } from '../core/create-simple-signal';
import type { Budget, Module } from '../core/types';

export const naturalsModule: Module = {
    id: 'naturals',
    name: 'Natural numbers',
    description: 'a(n) = n  (0, 1, 2, 3, …)',

    createSignal(budget: Budget) {
        return createSimpleSignal((n) => n, budget);
    }
};
```

### 4. `src/core/registry.ts`

```ts
import type { Module } from './types';
import { naturalsModule } from '../modules/naturals';

const modules: Module[] = [naturalsModule];

export function getModule(id: string): Module | undefined {
    return modules.find((m) => m.id === id);
}

export function getAllModules(): readonly Module[] {
    return modules;
}

export function registerModule(module: Module): void {
    if (modules.some((m) => m.id === module.id)) {
        throw new Error(`Module with id "${module.id}" already registered`);
    }
    modules.push(module);
}
```

### 5. `src/index.ts` (public API)

```ts
export type { Budget, Signal, Module } from './core/types';
export { createSimpleSignal } from './core/create-simple-signal';
export { getModule, getAllModules, registerModule } from './core/registry';
export { naturalsModule } from './modules/naturals';
```

---

### Quick usage example (for your own tests)

```ts
import { getModule } from './index';

const mod = getModule('naturals')!;
const signal = mod.createSignal({ maxTerms: 10 });

console.log(signal.take(5)); // [0, 1, 2, 3, 4]
console.log(signal.take(3)); // [5, 6, 7]
console.log(signal.next()); // { value: 8, done: false }
```
