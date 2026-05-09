# @repo/eslint-config

Shared ESLint configuration for the monorepo. Built on ESLint v9 flat config.

---

## Configs

| Export | Use for |
|---|---|
| `@repo/eslint-config/base` | Any TypeScript package |
| `@repo/eslint-config/react-internal` | React apps & component libraries |
| `@repo/eslint-config/astro` | Astro projects |
| `@repo/eslint-config/storybook` | Storybook story files |

---

## Installation

```bash
pnpm add -D @repo/eslint-config
```

---

## Usage

Every package must extend the shared config and add `tsconfigRootDir` so the
TypeScript parser can locate the nearest `tsconfig.json` and type-check root-level
config files (e.g. `eslint.config.js`, `vite.config.ts`).

### TypeScript / Node package

```js
// eslint.config.js
import { config } from "@repo/eslint-config/base";

export default [
  ...config,
  {
    languageOptions: {
      parserOptions: {
        tsconfigRootDir: new URL(".", import.meta.url).pathname,
      },
    },
  },
];
```

### React library

```js
// eslint.config.js
import { config } from "@repo/eslint-config/react-internal";

export default [
  ...config,
  {
    languageOptions: {
      parserOptions: {
        tsconfigRootDir: new URL(".", import.meta.url).pathname,
      },
    },
  },
];
```

### Astro project

```js
// eslint.config.js
import { globalIgnores } from "eslint/config";
import { config } from "@repo/eslint-config/astro";

export default [
  globalIgnores(["./public/your-project-specific-folder"]),
  ...config,
  {
    languageOptions: {
      parserOptions: {
        tsconfigRootDir: new URL(".", import.meta.url).pathname,
      },
    },
  },
];
```

### Storybook

```js
// eslint.config.js
import { config } from "@repo/eslint-config/storybook";

export default [
  ...config,
  {
    languageOptions: {
      parserOptions: {
        tsconfigRootDir: new URL(".", import.meta.url).pathname,
      },
    },
  },
];
```

### React + Storybook

```js
// eslint.config.js
import { config as reactConfig } from "@repo/eslint-config/react-internal";
import { config as storybookConfig } from "@repo/eslint-config/storybook";

export default [
  ...reactConfig,
  ...storybookConfig,
  {
    languageOptions: {
      parserOptions: {
        tsconfigRootDir: new URL(".", import.meta.url).pathname,
      },
    },
  },
];
```

---

## What's included

### `base`
- ESLint recommended
- TypeScript ESLint `recommendedTypeChecked` (type-aware linting)
- `projectService` with `allowDefaultProject: ["*.js", "*.ts"]` — root-level config
  files are type-checked without needing to be in `tsconfig.json` include
- Stricter rules: `no-var`, `prefer-const`, `eqeqeq`, `no-console` (warn),
  `no-await-in-loop`, `no-promise-executor-return`
- TypeScript: consistent type imports, unused vars, nullish coalescing,
  optional chain, no unnecessary conditions
- Turbo monorepo env var safety
- Prettier compatibility
- Ignores: `dist/**`, `.turbo/**`, `node_modules/**`, `*.min.js`

### `react-internal` (extends `base`)
- React flat config recommended
- React Hooks rules
- Stricter JSX: key checking, self-closing, no useless fragments,
  curly brace consistency
- `react/prop-types` off (TypeScript handles it)

### `astro` (extends `base`)
- Astro recommended + a11y strict
- Handles `.astro` file parsing with TypeScript
- Ignores `.astro/**` build output

### `storybook` (extends `base`)
- Storybook flat config recommended
- Scoped to `*.stories.*` and `*.story.*` files
- Relaxed rules appropriate for story authoring
- Ignores `storybook-static/**` build output
