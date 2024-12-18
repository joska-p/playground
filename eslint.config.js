import pluginJs from "@eslint/js";
import eslintPluginAstro from "eslint-plugin-astro";
import jsxA11y from "eslint-plugin-jsx-a11y";
import pluginReact from "eslint-plugin-react";
import globals from "globals";
import tseslint from "typescript-eslint";

/** @type {import('eslint').Linter.Config[]} */
export default [
  { languageOptions: { globals: globals.browser } },
  ...tseslint.configs.recommended.map((config) => ({ ...config, files: ["src/**/*.{ts,tsx}"] })),
  {
    ...pluginJs.configs.recommended,
    ...pluginReact.configs.flat.recommended,
    ...jsxA11y.flatConfigs.recommended,
    files: ["src/**/*.{js,mjs,cjs,jsx,mjsx,ts,tsx,mtsx}"],
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      "react/jsx-uses-react": "off",
      "react/jsx-uses-vars": "off",
    },
  },
  ...eslintPluginAstro.configs.recommended,
];
