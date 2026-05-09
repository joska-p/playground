import storybookPlugin from "eslint-plugin-storybook";
import { defineConfig } from "eslint/config";
import { config as baseConfig } from "./base.mjs";

export const config = defineConfig([
  // ─── Base (TS + quality) ────────────────────────────────────────────────────
  baseConfig,

  // ─── Storybook recommended ──────────────────────────────────────────────────
  storybookPlugin.configs["flat/recommended"],

  // ─── Story-specific overrides ───────────────────────────────────────────────
  {
    files: ["**/*.stories.@(ts|tsx|js|jsx|mjs|cjs)", "**/*.story.@(ts|tsx|js|jsx|mjs|cjs)"],
    ignores: ["storybook-static", "!.storybook"],
    rules: {
      // Stories often use default exports and named exports together — allow it
      "import/no-default-export": "off",

      // Stories intentionally use inline objects for args — relax these
      "react/no-array-index-key": "off",
      "@typescript-eslint/no-explicit-any": "off",

      // Story args don't need exhaustive deps
      "react-hooks/exhaustive-deps": "off",
    },
  },
]);
