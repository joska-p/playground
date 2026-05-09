// eslint.config.js
import { globalIgnores } from "eslint/config";
import { config } from "@repo/eslint-config/storybook";

export default [
  globalIgnores(["./dist-storybook"]), // only if project-specific path
  ...config,
];
