import path from "node:path";
import { fileURLToPath } from "node:url";
import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import { includeIgnoreFile } from "@eslint/compat";
import pluginReact from "eslint-plugin-react";
import eslintPluginAstro from "eslint-plugin-astro";
import jsxA11y from "eslint-plugin-jsx-a11y";
import importPlugin from "eslint-plugin-import";
import reactHooksPluggin from "eslint-plugin-react-hooks";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const gitignorePath = path.resolve(__dirname, ".gitignore");

/** @type {import('eslint').Linter.Config[]} */
export default [
  includeIgnoreFile(gitignorePath),
  pluginJs.configs.recommended,
  importPlugin.flatConfigs.recommended,
  ...tseslint.configs.recommended,
  ...eslintPluginAstro.configs.recommended,
  {
    files: ["**/*.{js,mjs,cjs,jsx,mjsx,ts,tsx,mtsx,astro}"],
    languageOptions: {
      globals: globals.browser,
    },
    settings: {
      "import/resolver": {
        typescript: true,
      },
    },
  },
  {
    ...jsxA11y.flatConfigs.recommended,
    files: ["**/*.{js,mjs,cjs,jsx,mjsx,ts,tsx,mtsx}"],
  },
  {
    ...pluginReact.configs.flat.recommended, // This is not a plugin object, but a shareable config object
    ...pluginReact.configs.flat["jsx-runtime"], // Add this if you are using React 17+
    files: ["**/*.{js,mjs,cjs,jsx,mjsx,ts,tsx,mtsx}"],
    settings: {
      react: {
        version: "detect",
      },
    },
    plugins: {
      react: pluginReact,
    },
    rules: {
      ...pluginReact.configs.recommended.rules,
      ...pluginReact.configs["jsx-runtime"].rules,
    },
  },

  {
    files: ["**/*.{js,mjs,cjs,jsx,mjsx,ts,tsx,mtsx}"],
    plugins: {
      "react-hooks": reactHooksPluggin,
    },
    rules: {
      ...reactHooksPluggin.configs.recommended.rules,
    },
  },
];
