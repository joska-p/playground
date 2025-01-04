/* eslint-disable import/no-named-as-default-member */
/** @type {import('eslint').Linter.Config[]} */
import path from "node:path";
import { fileURLToPath } from "node:url";
import { includeIgnoreFile, fixupPluginRules } from "@eslint/compat";
import pluginJs from "@eslint/js";
import eslintPluginAstro from "eslint-plugin-astro";
import importPlugin from "eslint-plugin-import";
import tseslint from "typescript-eslint";
import reactCompiler from "eslint-plugin-react-compiler";
import reactPlugin from "eslint-plugin-react";
import reactHooksPluggin from "eslint-plugin-react-hooks";
import globals from "globals";
import jsxA11y from "eslint-plugin-jsx-a11y";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const gitignorePath = path.resolve(__dirname, ".gitignore");

export default [
  pluginJs.configs.recommended,
  includeIgnoreFile(gitignorePath),
  importPlugin.flatConfigs.recommended,
  ...tseslint.configs.recommended,
  ...eslintPluginAstro.configs.recommended,
  {
    // This block use all above lint rules for files bellow
    files: ["**/*.{js,mjs,cjs,jsx,mjsx,ts,tsx,mtsx,astro}"],
    languageOptions: {
      globals: {
        ...globals.serviceworker,
        ...globals.browser,
      },
      ecmaVersion: "latest",
      sourceType: "module",
    },
    settings: {
      "import/resolver": {
        typescript: true,
      },
    },
    rules: {
      "import/no-dynamic-require": "warn",
      "import/no-named-as-default": "warn",
    },
  },
  {
    // This block use react lint rules only on the files bellow
    ...jsxA11y.flatConfigs.recommended,
    ...reactPlugin.configs.flat.recommended, // This is not a plugin object, but a shareable config object
    ...reactPlugin.configs.flat["jsx-runtime"], // Add this if you are using React 17+
    files: ["**/*.{js,jsx,mjsx,ts,tsx,mtsx}"],
    languageOptions: {
      ...jsxA11y.flatConfigs.recommended.languageOptions,
      ...reactPlugin.configs.flat.recommended.languageOptions,
      ...reactPlugin.configs.flat["jsx-runtime"].languageOptions,
      globals: {
        ...globals.serviceworker,
        ...globals.browser,
      },
      ecmaVersion: "latest",
      sourceType: "module",
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    plugins: {
      react: fixupPluginRules(reactPlugin),
      "jsx-a11y": fixupPluginRules(jsxA11y),
      "react-hooks": fixupPluginRules(reactHooksPluggin),
      "react-compiler": fixupPluginRules(reactCompiler),
    },
    rules: {
      ...reactPlugin.configs.recommended.rules,
      ...reactPlugin.configs["jsx-runtime"].rules,
      ...jsxA11y.flatConfigs.recommended.rules,
      ...reactHooksPluggin.configs.recommended.rules,
      "react-compiler/react-compiler": "error",
    },
  },
];
