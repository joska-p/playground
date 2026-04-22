import storybook from "eslint-plugin-storybook";

import globals from "globals";
import { defineConfig, globalIgnores } from "eslint/config";

import { config as baseConfig } from "@repo/eslint-config/base";

export default defineConfig([
  globalIgnores(["dist", "storybook-static"]),
  ...baseConfig,
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
  },
  ...storybook.configs["flat/recommended"],
]);
