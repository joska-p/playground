// @ts-check
import pluginReactHooks from "eslint-plugin-react-hooks";
import { defineConfig } from "eslint/config";
import pluginReact from "eslint-plugin-react";
import globals from "globals";
import { config as baseConfig } from "./base.mjs";

export const config = defineConfig([
  // ─── Base (TS + quality) ────────────────────────────────────────────────────
  baseConfig,

  // ─── React (flat config) ────────────────────────────────────────────────────
  pluginReact.configs.flat.recommended,
  pluginReactHooks.configs.flat.recommended,

  // ─── Browser globals ────────────────────────────────────────────────────────
  {
    languageOptions: {
      ...pluginReact.configs.flat.recommended.languageOptions,
      globals: {
        ...globals.browser,
      },
    },
  },

  // ─── React rules ────────────────────────────────────────────────────────────
  {
    settings: { react: { version: "detect" } },
    rules: {
      // Hooks
      ...pluginReactHooks.configs.recommended.rules,

      // Component definitions
      "react/react-in-jsx-scope": "off", // Not needed with modern JSX transform
      "react/function-component-definition": [
        "error",
        { namedComponents: "function-declaration", unnamedComponents: "arrow-function" },
      ],

      // Props
      "react/prop-types": "off", // TypeScript handles this
      "react/no-unknown-property": "error",
      "react/self-closing-comp": ["warn", { component: true, html: true }],
      "react/jsx-no-useless-fragment": ["warn", { allowExpressions: true }],
      "react/jsx-curly-brace-presence": ["warn", { props: "never", children: "never" }],

      // Safety
      "react/no-danger": "warn",
      "react/no-array-index-key": "warn",
      "react/jsx-key": ["error", { checkFragmentShorthand: true, checkKeyMustBeforeSpread: true }],
    },
  },
]);
