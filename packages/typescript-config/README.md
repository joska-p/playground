# @repo/typescript-config

Shared TypeScript configurations for the monorepo.

---

## Installation

```bash
pnpm add -D @repo/typescript-config
```

---

## Configs

| Config               | Use for                              | `module`   |
| -------------------- | ------------------------------------ | ---------- |
| `base.json`          | Node.js packages, CLI tools, scripts | `NodeNext` |
| `react-library.json` | React component libraries            | `Bundler`  |
| `astro.json`         | Astro projects                       | `Bundler`  |
| `vite.json`          | Vite apps, Storybook                 | `Bundler`  |

---

## Usage

### Node.js package

```json
{
  "extends": "@repo/typescript-config/base.json"
}
```

### React library

```json
{
  "extends": "@repo/typescript-config/react-library.json"
}
```

### Astro project

```json
{
  "extends": "@repo/typescript-config/astro.json",
  "include": ["src", ".astro/types.d.ts"],
  "exclude": ["dist", ".astro"]
}
```

### Vite app or Storybook

```json
{
  "extends": "@repo/typescript-config/vite.json",
  "include": ["src"],
  "exclude": ["dist"]
}
```

---

## Design decisions

- **`base.json` has no DOM lib** — Node packages shouldn't have browser types leaking in. DOM is added only in browser-facing configs.
- **Bundler resolution for browser configs** — Vite, Astro, and Rollup don't follow NodeNext resolution rules. Using `NodeNext` there causes subtle import errors.
- **`verbatimModuleSyntax`** on Vite/Astro configs — ensures `import type` is used correctly and prevents runtime import issues with bundlers.
- **All configs inherit strict settings from base** — `exactOptionalPropertyTypes`, `noUncheckedIndexedAccess`, `noUnusedLocals`, etc. are always on.
