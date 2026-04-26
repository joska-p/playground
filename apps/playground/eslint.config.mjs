import { globalIgnores } from "eslint/config";
import { config } from "@repo/eslint-config/base";
import eslintPluginAstro from "eslint-plugin-astro";

export default [
  globalIgnores([".astro", "./public/graphify"]),
  ...config,
  ...eslintPluginAstro.configs.recommended,
  // Override func-style rule for Astro files AFTER plugin config
  {
    rules: {
      "func-style": ["off", "declaration"],
    },
  },
];
