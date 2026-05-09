// @ts-check
import js from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";
import turboPlugin from "eslint-plugin-turbo";
import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";

export const config = defineConfig([
  // ─── Core JS recommended ────────────────────────────────────────────────────
  js.configs.recommended,

  // ─── TypeScript (type-aware) ─────────────────────────────────────────────────
  // recommendedTypeChecked requires parserOptions.projectService so the parser
  // can find each package's tsconfig.json automatically.
  tseslint.configs.recommendedTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        projectService: {
          allowDefaultProject: ["*.js", "*.mjs", "*.ts"],
        },
      },
    },
  },

  // ─── Prettier compatibility (must come after all style rules) ───────────────
  eslintConfigPrettier,

  // ─── Turbo monorepo ─────────────────────────────────────────────────────────
  {
    plugins: { turbo: turboPlugin },
    rules: {
      "turbo/no-undeclared-env-vars": "warn",
    },
  },

  // ─── Code quality & style ───────────────────────────────────────────────────
  {
    rules: {
      // Functions
      "prefer-arrow-callback": "warn",
      "func-style": ["warn", "declaration", { allowArrowFunctions: true }],

      // Variables
      "no-var": "error",
      "prefer-const": "error",

      // Async / error handling
      "no-floating-decimal": "error",
      "no-await-in-loop": "warn",
      "no-promise-executor-return": "error",
      "require-atomic-updates": "error",

      // Clarity
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "no-nested-ternary": "warn",
      "no-unneeded-ternary": "warn",
      eqeqeq: ["error", "always", { null: "ignore" }],
    },
  },

  // ─── TypeScript-specific rules ──────────────────────────────────────────────
  {
    rules: {
      "@typescript-eslint/consistent-type-imports": [
        "error",
        { prefer: "type-imports", fixStyle: "inline-type-imports" },
      ],
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/prefer-nullish-coalescing": "warn",
      "@typescript-eslint/prefer-optional-chain": "warn",
      "@typescript-eslint/no-unnecessary-condition": "warn",
      "@typescript-eslint/consistent-type-definitions": ["warn", "type"],
      "@typescript-eslint/no-import-type-side-effects": "error",
    },
  },

  // ─── Ignored paths ──────────────────────────────────────────────────────────
  {
    ignores: ["dist/**", ".turbo/**", "node_modules/**", "*.min.js"],
  },
]);
