/* eslint-disable import/no-named-as-default-member */
/** @type {import('eslint').Linter.Config[]} */
import path from "node:path";
import { fileURLToPath } from "node:url";
import { includeIgnoreFile } from "@eslint/compat";
import pluginJs from "@eslint/js";
import eslintPluginAstro from "eslint-plugin-astro";
import importPlugin from "eslint-plugin-import";
import tseslint from "typescript-eslint";

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
    files: ["**/*.{js,mjs,cjs,jsx,mjsx,ts,tsx,mtsx,astro}"],
    settings: {
      "import/resolver": {
        typescript: true,
      },
    },
  },
];
