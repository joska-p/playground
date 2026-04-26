import { config } from "@repo/eslint-config/react-internal.js";
import eslintPluginAstro from "eslint-plugin-astro";

export default [...config, ...eslintPluginAstro.configs.recommended];
