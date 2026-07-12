# @repo/config-typescript

> Shared TypeScript configurations for the monorepo — strictest base, browser app, and Node tooling, all extending `@tsconfig/strictest`.

---

## Purpose

This package provides three tsconfig presets so every package in the repo
starts from the same strict baseline. Extend the one that matches your
package type and override only what you need.

## Configs

### `base.json` — the foundation

```json
{
  "extends": "@tsconfig/strictest/tsconfig.json",
  "files": []
}
```

All configs extend this. It pulls in `@tsconfig/strictest` — no unchecked
indexed access, strict bind/call/apply, and all the other strictness flags
turned on. The `files: []` ensures consumers must explicitly declare what
to include.

### `app.json` — browser / React packages

```json
{
  "extends": "./base.json",
  "compilerOptions": {
    "target": "es2023",
    "lib": ["ES2023", "DOM"],
    "module": "esnext",
    "jsx": "react-jsx",
    "moduleResolution": "bundler",
    "verbatimModuleSyntax": true,
    "noEmit": true,
    "incremental": true
  },
  "include": ["src"]
}
```

For Vite + React packages. Key choices:

- **`verbatimModuleSyntax`** — enforces `import type` for type-only imports
- **`erasableSyntaxOnly`** — no enums or namespaces (use `const` objects + `satisfies` instead)
- **`exactOptionalPropertyTypes: false`** — relaxed because it fights with common patterns

### `node.json` — tooling / config packages

```json
{
  "extends": "./base.json",
  "compilerOptions": {
    "target": "es2023",
    "lib": ["ES2023"],
    "types": ["node"],
    "moduleResolution": "bundler",
    "verbatimModuleSyntax": true,
    "noEmit": true
  },
  "include": ["vite.config.ts"]
}
```

For packages that only contain build config (like `vite.config.ts`).
No DOM types, no JSX — just strict TypeScript for Node-adjacent tooling.

## Usage

In any package's `tsconfig.json`:

```json
{
  "extends": "@repo/config-typescript/app.json",
  "include": ["src"]
}
```
