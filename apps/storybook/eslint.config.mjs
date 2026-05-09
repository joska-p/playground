// @ts-check
import { globalIgnores } from "eslint/config";
import { config } from "@repo/eslint-config/storybook";

export default [
  globalIgnores(["./storybook-static", ".storybook"]), // only if project-specific path
  ...config,
];
