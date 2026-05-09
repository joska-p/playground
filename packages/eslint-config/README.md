# @repo/eslint-config

Shared ESLint configuration for the monorepo. Built on ESLint v9 flat config.

---

## Configs

| Export | Use for |
|---|---|
| `@repo/eslint-config/base` | Any TypeScript package |
| `@repo/eslint-config/react-internal` | React apps & component libraries |
| `@repo/eslint-config/astro` | Astro projects |
| `@repo/eslint-config/storybook` | Story files (`*.stories.*`) |

---

## Installation

```bash
pnpm add -D @repo/eslint-config
```

---

## Usage

### TypeScript package

```js
// eslint.config.js
import { config } from "@repo/eslint-config/base";
export default config;
```

### React app

```js
// eslint.config.js
import { config } from "@repo/eslint-config/react-internal";
export default config;
```

### Astro project

```js
// eslint.config.js
import { config as baseConfig } from "@repo/eslint-config/astro";
export default baseConfig;
```

### Combining configs (e.g. React + Storybook)

```js
// eslint.config.js
import { config as reactConfig } from "@repo/eslint-config/react-internal";
import { config as storybookConfig } from "@repo/eslint-config/storybook";

export default [
  ...reactConfig,
  // Storybook rules only apply to story files (scoped internally)
  ...storybookConfig,
];
```

---

## What's included

### `base`
- ESLint recommended
- TypeScript ESLint (`recommendedTypeChecked`)
- Stricter rules: `no-var`, `prefer-const`, `eqeqeq`, `no-console` (warn)
- TypeScript: consistent type imports, unused vars, nullish coalescing, optional chain
- Turbo monorepo env var safety
- Prettier compatibility

### `react-internal` (extends `base`)
- React flat config recommended
- React Hooks rules
- Stricter JSX: key checking, self-closing, no useless fragments, curly brace consistency
- `react/prop-types` off (TypeScript handles it)

### `astro` (extends `base`)
- Astro recommended + a11y strict
- Handles `.astro` file parsing with TypeScript

### `storybook` (extends `base`)
- Storybook flat config recommended
- Scoped to `*.stories.*` and `*.story.*` files
- Relaxed rules appropriate for story authoring
