/* eslint-disable import/no-named-as-default-member */
import path from "node:path";
import { fileURLToPath } from "node:url";
import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import { includeIgnoreFile, fixupPluginRules } from "@eslint/compat";
import pluginReact from "eslint-plugin-react";
import eslintPluginAstro from "eslint-plugin-astro";
import jsxA11y from "eslint-plugin-jsx-a11y";
import importPlugin from "eslint-plugin-import";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import tsParser from "@typescript-eslint/parser";
import reactCompiler from "eslint-plugin-react-compiler";

// File path setup
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const gitignorePath = path.resolve(__dirname, ".gitignore");

// Common settings and patterns
const commonExtensions = ["js", "mjs", "cjs", "jsx", "mjsx", "ts", "tsx", "mtsx"];
const allFilePatterns = `**/*.{${commonExtensions.join(",")},astro}`;
const jsxFilePatterns = `**/*.{${commonExtensions.join(",")}}`;

// Base configuration
const baseConfig = {
  files: [allFilePatterns],
  languageOptions: {
    globals: globals.browser,
    parser: tsParser,
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
    },
  },
  settings: {
    "import/resolver": {
      typescript: true,
    },
  },
  rules: {
    "import/no-named-as-default": "off",
  },
};

// React specific configuration
const reactConfig = {
  files: [jsxFilePatterns],
  ...pluginReact.configs.flat.recommended,
  ...pluginReact.configs.flat["jsx-runtime"],
  settings: {
    react: {
      version: "detect",
    },
  },
  plugins: {
    react: pluginReact,
    "react-hooks": fixupPluginRules(reactHooksPlugin),
    "react-compiler": reactCompiler,
  },
  rules: {
    ...pluginReact.configs.recommended.rules,
    ...pluginReact.configs["jsx-runtime"].rules,
    ...reactHooksPlugin.configs.recommended.rules,
    // Add explicit rules for hooks
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
    "react-compiler/react-compiler": "error",
  },
};

// JSX a11y configuration
const a11yConfig = {
  ...jsxA11y.flatConfigs.recommended,
  files: [jsxFilePatterns],
};

/** @type {import('eslint').Linter.Config[]} */
export default [
  // Core configs
  includeIgnoreFile(gitignorePath),
  pluginJs.configs.recommended,

  // Import plugin configs
  importPlugin.flatConfigs.recommended,
  importPlugin.flatConfigs.typescript,

  // TypeScript configs
  ...tseslint.configs.recommended,

  // Base config
  baseConfig,

  // Framework specific configs
  a11yConfig,
  reactConfig,

  // Astro configs
  ...eslintPluginAstro.configs.recommended,
];
