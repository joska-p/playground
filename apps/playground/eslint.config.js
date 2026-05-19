import { defineConfig, globalIgnores } from "eslint/config";
import globals from "globals";
import js from "@eslint/js";
import tseslint from "typescript-eslint";
import astro from "eslint-plugin-astro";
import astroParser from "astro-eslint-parser";
import prettier from "eslint-plugin-prettier";
import reactHooks from "eslint-plugin-react-hooks";
import reactCompiler from "eslint-plugin-react-compiler";

// parsers
const tsParser = tseslint.parser;

export default defineConfig([
  // Global configuration
  globalIgnores(["./public/graphify"]),
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },

  // Base configs
  js.configs.recommended,
  ...tseslint.configs.recommended,

  // Prettier config
  {
    plugins: {
      prettier: prettier,
    },
    rules: {
      // disable warnings, since prettier should format on save
      "prettier/prettier": "off",
    },
  },

  // React setup (Compiler + Hooks)
  {
    files: ["**/*.{js,jsx,ts,tsx,astro}"],
    plugins: {
      "react-hooks": reactHooks,
      "react-compiler": reactCompiler,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-compiler/react-compiler": "error",
    },
  },

  // astro setup with a11y
  ...astro.configs.recommended,
  ...astro.configs["jsx-a11y-recommended"],
  {
    files: ["**/*.astro"],
    languageOptions: {
      parser: astroParser,
      parserOptions: {
        parser: tsParser,
        extraFileExtensions: [".astro"],
        sourceType: "module",
        ecmaVersion: "latest",
        project: "./tsconfig.json",
      },
    },
    rules: {
      "no-undef": "off", // Disable "not defined" errors for specific Astro types that are globally available (ImageMetadata)
      "@typescript-eslint/no-explicit-any": "off", // you may want this as it can get annoying
    },
  },

  // Ignore patterns
  {
    ignores: ["dist/**", "**/*.d.ts", ".github/"],
  },
]);
