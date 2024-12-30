/* eslint-disable import/no-named-as-default-member */
/** @type {import('eslint').Linter.Config[]} */
import path from "node:path";
import { fileURLToPath } from "node:url";

import { fixupPluginRules, includeIgnoreFile } from "@eslint/compat";
import pluginJs from "@eslint/js";
import tsParser from "@typescript-eslint/parser";
import eslintConfigPrettier from "eslint-config-prettier";
import eslintPluginAstro from "eslint-plugin-astro";
import importPlugin from "eslint-plugin-import";
import jsxA11y from "eslint-plugin-jsx-a11y";
import pluginReact from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import globals from "globals";
import tseslint from "typescript-eslint";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const gitignorePath = path.resolve(__dirname, ".gitignore");

export default [
  includeIgnoreFile(gitignorePath),
  { files: ["**/*.{js,mjs,cjs,jsx,mjsx,ts,tsx,mtsx,astro}"] },
  {
    languageOptions: {
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
    },
  },
  pluginJs.configs.recommended,
  {
    plugins: {
      "react-hooks": fixupPluginRules(reactHooksPlugin),
    },
  },
  {
    files: ["**/*.{js,mjs,cjs,jsx,mjsx,ts,tsx,mtsx}"],
    ...pluginReact.configs.flat.recommended, // This is not a plugin object, but a shareable config object
    ...pluginReact.configs.flat["jsx-runtime"], // Add this if you are using React 17+
    settings: {
      react: {
        version: "detect",
      },
    },
  },
  {
    files: ["**/*.{js,mjs,cjs,jsx,mjsx,ts,tsx,mtsx}"],
    ...jsxA11y.flatConfigs.recommended,
    languageOptions: {
      ...jsxA11y.flatConfigs.recommended.languageOptions,
    },
  },
  importPlugin.flatConfigs.recommended,
  importPlugin.flatConfigs["typescript"],
  ...tseslint.configs.recommended,
  ...eslintPluginAstro.configs.recommended,
  eslintConfigPrettier,
  {
    settings: {
      "import/resolver": {
        typescript: true,
      },
    },
  },
  {
    rules: {
      ...reactHooksPlugin.configs.recommended.rules,
      "no-unused-vars": "off",
      "no-undef": "off",
      "import/no-named-as-default": "off",
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
