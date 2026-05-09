import { globalIgnores } from "eslint/config";
import { config } from "@repo/eslint-config/astro";

export default [globalIgnores(["./public/graphify"]), ...config];
