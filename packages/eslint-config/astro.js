import { config as baseConfig } from "./base.js";
import eslintPluginAstro from "eslint-plugin-astro";

/**
 * A custom ESLint configuration for libraries that use React.
 *
 * @type {import("eslint").Linter.Config} */
export const config = [...baseConfig, ...eslintPluginAstro.configs.recommended];
