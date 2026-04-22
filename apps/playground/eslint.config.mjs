import { config } from "@repo/eslint-config/react-internal";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([globalIgnores([".astro/", "dist/"]), ...config]);
