import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import eslintPluginAstro from "eslint-plugin-astro";
import jsxA11y from "eslint-plugin-jsx-a11y";
import importPlugin from "eslint-plugin-import";
import reactHooksPluggin from "eslint-plugin-react-hooks";

/** @type {import('eslint').Linter.Config[]} */
export default [
  pluginJs.configs.recommended,
  importPlugin.flatConfigs.recommended,
  ...tseslint.configs.recommended,
  ...eslintPluginAstro.configs.recommended,
  { files: ["**/*.{js,mjs,cjs,ts,jsx,tsx,astro}"] },
  { languageOptions: { globals: globals.browser } },
  {
    settings: {
      "import/resolver": {
        typescript: true,
      },
    },
  },
  {
    files: ["**/*.{js,mjs,cjs,jsx,mjsx,ts,tsx,mtsx}"],
    ...pluginReact.configs.flat.recommended,
    ...pluginReact.configs.flat["jsx-runtime"],
    ...reactHooksPluggin.configs.recommended,
    ...jsxA11y.flatConfigs.recommended,
    languageOptions: {
      ...jsxA11y.flatConfigs.recommended.languageOptions,
      globals: {
        ...globals.serviceworker,
        ...globals.browser,
      },
    },
  },
];
