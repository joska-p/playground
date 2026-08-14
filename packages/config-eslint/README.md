# @repo/config-eslint

> Shared ESLint configuration for the monorepo — strict TypeScript checking, import discipline, and React hooks, all wired up through a single factory function.

---

## Purpose

Every package in this repo needs the same ESLint posture: strict
type-checked rules, `import-x` enforcing no default exports and no
circuits, React hooks linting, and consistent type import/export syntax.
Rather than copy-pasting 50 lines of config into each package, this
package exports a `createConfig(dirname)` function that returns a
ready-to-use flat config array.

## Usage

In any package's `eslint.config.js`:

```javascript
import createConfig from '@repo/config-eslint';

export default createConfig(import.meta.dirname);
```

The `dirname` argument is forwarded to `parserOptions.tsconfigRootDir` so
that `typescript-eslint` can resolve each package's local `tsconfig.json`.

## What's included

| Plugin / Config                        | What it does                                                          |
| -------------------------------------- | --------------------------------------------------------------------- |
| `@eslint/js` recommended               | Baseline JS rules                                                     |
| `typescript-eslint` strict + stylistic | Full type-checked ruleset — no implicit any, strict null checks, etc. |
| `react-hooks` flat recommended         | Hook dependency and exhaustive-deps linting                           |
| `react-refresh` vite                   | Fast Refresh boundary checks for Vite                                 |
| `import-x`                             | `no-default-export`, `no-cycle` (max depth 2)                         |

### Custom rules

| Rule                          | Setting                  | Rationale                                |
| ----------------------------- | ------------------------ | ---------------------------------------- |
| `import/no-default-export`    | `error`                  | Named exports keep imports grep-friendly |
| `import/no-cycle`             | `error` (depth 2)        | Catches circular deps early              |
| `prefer-const`                | `error`                  | Immutable by default                     |
| `consistent-type-definitions` | `type`                   | Types over interfaces                    |
| `consistent-type-imports`     | `type-imports`, separate | `import type` for type-only imports      |
| `consistent-type-exports`     | `error`                  | `export type` for re-exported types      |

### Config file exception

Config files (`*.config.ts`, `*.config.js`, `*.d.ts`) relax the
`no-default-export` rule — Vite and Tailwind configs need default exports.

## Peer dependencies

- `eslint` (catalog version)
