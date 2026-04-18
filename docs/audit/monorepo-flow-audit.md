# Monorepo Flow & Consistency Audit

This audit evaluates the current Turborepo orchestration, package consistency, and development workflows of the Playground workspace.

## 1. Architecture Overview
The project is structured as a modern monorepo using:
- **Orchestration**: Turborepo
- **Package Manager**: pnpm (Workspaces)
- **Environment**: Nix + direnv
- **Primary Stack**: Astro, React 19, Tailwind CSS v4

---

## 2. Detected Issues & "Smells"

### A. Pipeline Broken by Naming Mismatches
**Observation**: `turbo.json` refers to packages as `playground` and `mosaic-maker`. However, their `package.json` defines them as `@repo/playground` and `@repo/mosaic-maker`.
**Impact**: Turbo's package-specific overrides are ignored. The specific dependency rule `"playground#build": { "dependsOn": ["@repo/mosaic-maker#build:components"] }` is likely invalid because the left side doesn't match the actual package name.

### B. The "Missing Build" Entry Point
**Observation**: The root `turbo.json` defines a `build` task that `dependsOn: ["^build"]`. 
**Issue**: Shared packages like `@repo/ui` and `@repo/mosaic-maker` have `build:components` and `build:styles`, but **no `build` script**.
**Impact**: Running `pnpm build` at the root may fail to build the dependencies of the apps because Turbo looks for a script literally named `build` in the dependency tree.

### C. ESM Inconsistency
**Observation**: 
- Root, `apps/playground`, and `@repo/mosaic-maker` are `"type": "module"`.
- `@repo/ui` is missing `"type": "module"`.
**Impact**: This can lead to subtle resolution errors in NodeNext/Bundler environments, especially since you are using `module: "NodeNext"` in TypeScript.

### D. Rigid Build-to-Consume Flow
**Observation**: Packages export direct paths to `./dist/...`.
**Issue**: This requires a manual or watch-mode build step for every package during development.
**Improvement**: Modern monorepos often use "Internal Packages" patterns where the consumer (Vite/Astro) consumes the source directly during dev, or uses `exports` conditions (like `development` vs `import`) to skip the build step in local dev.

### E. Redundant Tailwind Compilation
**Observation**: Every package calls the `tailwindcss` CLI independently in `build:styles`.
**Issue**: With Tailwind 4, you can often simplify this by having the main app (Astro/Vite) process the CSS of the workspace packages via the `@theme` and `@import` rules, reducing the number of moving parts.

---

## 3. Recommended Improvements

### Phase 1: Orchestration Fix (Immediate)
1.  **Standardize Turbo Names**: Update `turbo.json` to use full scoped names (e.g., `@repo/playground#build`).
2.  **Unify Build Scripts**: Add a "hub" build script to packages:
    ```json
    "build": "pnpm run /^build:/"
    ```
3.  **Align Module Types**: Add `"type": "module"` to `@repo/ui`.

### Phase 2: Pipeline Optimization
1.  **Refine Task Inputs/Outputs**:
    - Add `$TURBO_DEFAULT$` and specific config files (like `tailwind.config.js` or `postcss.config.js`) to inputs.
    - Ensure `outputs` accurately reflect where files land to maximize cache hits.
2.  **Dev Mode Orchestration**:
    Update `turbo.json` to allow `dev` to depend on the build of its dependencies to ensure a fresh start:
    ```json
    "dev": {
      "dependsOn": ["^build"],
      "cache": false,
      "persistent": true
    }
    ```

### Phase 3: Developer Experience (DX)
1.  **Source-First Development**: Explore using `tsconfig` paths or Vite aliases to allow `apps/playground` to see `packages/*/src` during development, eliminating the need to run `tsc --watch` in three different terminals.
2.  **Global Linting/Formatting**: Ensure the root has a `lint` script that calls `turbo lint`, and consider a global `format` check.

---

## 4. Proposed `turbo.json` Refactor

```json
{
  "$schema": "https://turborepo.dev/schema.json",
  "ui": "tui",
  "tasks": {
    "build": {
      "dependsOn": ["^build"],
      "inputs": ["$TURBO_DEFAULT$", ".env*", "tsconfig.json"],
      "outputs": ["dist/**", ".astro/**", "storybook-static/**"]
    },
    "lint": {
      "dependsOn": ["^lint"],
      "inputs": ["$TURBO_DEFAULT$", ".eslintrc*", "eslint.config.*"]
    },
    "check-types": {
      "dependsOn": ["^check-types"],
      "inputs": ["$TURBO_DEFAULT$", "tsconfig.json"]
    },
    "dev": {
      "cache": false,
      "persistent": true
    }
  }
}
```

---
*Audit generated on April 18, 2026*
