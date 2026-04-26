import { config } from "@repo/eslint-config/react-internal";
import eslintPluginAstro from "eslint-plugin-astro";

export default [...config, ...eslintPluginAstro.configs.recommended];
