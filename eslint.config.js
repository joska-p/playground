import pluginJs from "@eslint/js";
import eslintPluginAstro from "eslint-plugin-astro";
import jsxA11y from "eslint-plugin-jsx-a11y";
import pluginReact from "eslint-plugin-react";
import reactCompiler from "eslint-plugin-react-compiler";
import globals from "globals";
import tseslint from "typescript-eslint";

/** @type {import('eslint').Linter.Config[]} */
export default [
  { languageOptions: { globals: globals.browser } },
  ...tseslint.configs.recommended.map((config) => ({
    ...config,
    files: ["src/**/*.{ts,tsx,astro}"],
  })),
  {
    ...pluginJs.configs.recommended,
    ...pluginReact.configs.flat.recommended,
    ...jsxA11y.flatConfigs.recommended,
    files: ["src/**/*.{js,mjs,cjs,jsx,mjsx,ts,tsx,mtsx}"],
    plugins: {
      "react-compiler": reactCompiler,
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      "react-compiler/react-compiler": "error",
      "react/jsx-uses-react": "off",
      "react/jsx-uses-vars": "off",
    },
  },
  ...eslintPluginAstro.configs.recommended,
];
