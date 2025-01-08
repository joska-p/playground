import { fixupPluginRules, includeIgnoreFile } from "@eslint/compat";
import eslint from "@eslint/js";
import eslintPluginAstro from "eslint-plugin-astro";
import eslintPluginReactHooks from "eslint-plugin-react-hooks";
import globals from "globals";
import path from "node:path";
import { fileURLToPath } from "node:url";
import typescriptESLint from "typescript-eslint";

// File path setup
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const gitignorePath = path.resolve(__dirname, ".gitignore");

export default typescriptESLint.config(
  includeIgnoreFile(gitignorePath),
  eslint.configs.recommended,
  ...typescriptESLint.configs.recommended,
  ...eslintPluginAstro.configs.recommended,
  {
    files: ["./src/**/*.{astro,js,mjs,cjs,ts,jsx,tsx}"],
  },
  {
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
      },
    },
  },
  {
    plugins: {
      "react-hooks": fixupPluginRules(eslintPluginReactHooks),
    },
  },
  {
    rules: {
      ...eslintPluginReactHooks.configs.recommended.rules,
    },
  }
);
