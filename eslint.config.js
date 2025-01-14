import path from "node:path";
import { fileURLToPath } from "node:url";
import { includeIgnoreFile } from "@eslint/compat";
import eslint from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";
import eslintPluginAstro from "eslint-plugin-astro";
import importPlugin from "eslint-plugin-import";
import jsxA11y from "eslint-plugin-jsx-a11y";
import pluginReact from "eslint-plugin-react";
import eslintPluginReactHooks from "eslint-plugin-react-hooks";
import globals from "globals";
import typescriptESLint from "typescript-eslint";

// File path setup
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const gitignorePath = path.resolve(__dirname, ".gitignore");

const reactConfig = {
  files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
  ...pluginReact.configs.flat.recommended,
  languageOptions: {
    ...pluginReact.configs.flat.recommended.languageOptions,
    globals: {
      ...globals.serviceworker,
      ...globals.browser,
    },
  },
};

const reactHooksConfig = {
  plugins: {
    "react-hooks": eslintPluginReactHooks,
  },
  settings: { react: { version: "detect" } },
  rules: {
    ...eslintPluginReactHooks.configs.recommended.rules,
    "react/react-in-jsx-scope": "off",
    "react/prop-types": "off",
  },
};

const jsxa11yConfig = {
  files: ["**/*.{js,mjs,cjs,jsx,mjsx,ts,tsx,mtsx}"],
  ...jsxA11y.flatConfigs.recommended,
  languageOptions: {
    ...jsxA11y.flatConfigs.recommended.languageOptions,
    globals: {
      ...globals.serviceworker,
      ...globals.browser,
    },
  },
};

const importConfig = {
  extends: [importPlugin.flatConfigs.recommended, importPlugin.flatConfigs.typescript],
  settings: {
    "import/resolver": {
      typescript: {
        alwaysTryTypes: true,
        project: "./tsconfig.json",
      },
    },
  },
  rules: {
    "import/order": [
      "error",
      {
        groups: ["builtin", "external", "parent", "sibling", "index"],
        alphabetize: {
          order: "asc",
        },
      },
    ],
    "import/no-named-as-default-member": "off",
  },
};

export default typescriptESLint.config(
  includeIgnoreFile(gitignorePath),
  eslint.configs.recommended,
  eslintConfigPrettier,
  ...typescriptESLint.configs.recommended,
  ...eslintPluginAstro.configs.recommended,
  reactConfig,
  reactHooksConfig,
  jsxa11yConfig,
  importConfig
);
