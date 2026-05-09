import eslintPluginAstro from "eslint-plugin-astro";
import tseslint from "typescript-eslint";
import globals from "globals";
import { config as baseConfig } from "./base.js";

/**
 * ESLint configuration for Astro projects.
 * Extends base config with Astro-specific rules.
 *
 * @type {import("eslint").Linter.Config[]}
 */
export const config = [
  // ─── Base (TS + quality) ────────────────────────────────────────────────────
  ...baseConfig,

  // ─── Astro recommended ──────────────────────────────────────────────────────
  ...eslintPluginAstro.configs.recommended,

  // ─── Astro a11y ─────────────────────────────────────────────────────────────
  ...eslintPluginAstro.configs["jsx-a11y-strict"],

  // ─── Astro file globals ─────────────────────────────────────────────────────
  {
    files: ["**/*.astro"],
    ignores: [".astro/**"],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parserOptions: {
        parser: tseslint.parser,
        extraFileExtensions: [".astro"],
      },
    },
    rules: {
      // Astro components are always in scope
      "react/react-in-jsx-scope": "off",
      // TypeScript handles types in Astro frontmatter
      "@typescript-eslint/no-explicit-any": "warn",
    },
  },
];
