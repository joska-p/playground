import pluginReactHooks from "eslint-plugin-react-hooks";
import pluginReact from "eslint-plugin-react";
import globals from "globals";
import { config as baseConfig } from "./base.js";

/**
 * ESLint configuration for React libraries and apps.
 * Extends base config — no need to re-import TS or Prettier configs here.
 *
 * @type {import("eslint").Linter.Config[]}
 */
export const config = [
  // ─── Base (TS + quality) ────────────────────────────────────────────────────
  ...baseConfig,

  // ─── React (flat config) ────────────────────────────────────────────────────
  pluginReact.configs.flat.recommended,

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
    plugins: { "react-hooks": pluginReactHooks },
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
];
