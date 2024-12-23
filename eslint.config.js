/** @type {import('eslint').Linter.Config[]} */
import path from "node:path";
import { fileURLToPath } from "node:url";

import { fixupPluginRules, includeIgnoreFile } from "@eslint/compat";
import pluginJs from "@eslint/js";
import tsParser from "@typescript-eslint/parser";
import eslintPluginAstro from "eslint-plugin-astro";
import importPlugin from "eslint-plugin-import";
import jsxA11y from "eslint-plugin-jsx-a11y";
import prettierPlugin from "eslint-plugin-prettier";
import pluginReact from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import globals from "globals";
import tseslint from "typescript-eslint";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const gitignorePath = path.resolve(__dirname, ".gitignore");

const languageOptions = {
  globals: {
    ...globals.browser,
  },
  ecmaVersion: "latest",
  sourceType: "module",
  parser: tsParser,
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },
};

const pluginsOptions = {
  import: importPlugin,
  "import/parsers": tsParser,
  "react-hooks": fixupPluginRules(reactHooksPlugin),
  prettier: prettierPlugin,
};

export default [
  includeIgnoreFile(gitignorePath),
  { files: ["**/*.{js,mjs,cjs,jsx,mjsx,ts,tsx,mtsx,astro}"] },
  { languageOptions: { ...languageOptions } },
  {
    plugins: {
      ...pluginsOptions,
    },
  },
  {
    languageOptions: {
      ...languageOptions,
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    ...pluginReact.configs.flat.recommended,
    ...jsxA11y.flatConfigs.recommended,
    files: ["**/*.{js,mjs,cjs,jsx,mjsx,ts,tsx,mtsx}"],
    settings: {
      react: {
        version: "detect",
      },
    },
  },
  ...eslintPluginAstro.configs.recommended,
  {
    rules: {
      ...reactHooksPlugin.configs.recommended.rules,
      "no-unused-vars": "warn",
      "no-undef": "off",
      "import/order": [
        "error",
        {
          groups: ["builtin", "external", "internal", ["parent", "sibling", "index"]],
          "newlines-between": "always",
        },
      ],
    },
  },
];
