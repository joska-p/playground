import js from "@eslint/js";
import importPluginX from "eslint-plugin-import-x"; // 👈 Native flat-config fork
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import { defineConfig, globalIgnores } from "eslint/config";
import globals from "globals";
import tseslint from "typescript-eslint";

export default function createConfig(dirname) {
  return defineConfig([
    globalIgnores(["dist"]),
    {
      files: ["**/*.{ts,tsx}"],
      extends: [
        js.configs.recommended,
        ...tseslint.configs.recommended,
        reactHooks.configs.flat.recommended,
        reactRefresh.configs.vite,
      ],
      plugins: {
        // We alias it as 'import' so you don't have to change your rule strings!
        import: importPluginX,
      },
      languageOptions: {
        globals: globals.browser,
        parser: tseslint.parser,
        parserOptions: {
          tsconfigRootDir: dirname,
        },
      },
      rules: {
        // These will now run flawlessly on ESLint v10
        "import/no-default-export": "error",
        "import/no-cycle": ["error", { maxDepth: 2 }],

        // type over interface
        "@typescript-eslint/consistent-type-definitions": ["error", "type"],

        // enforce import type for type-only imports
        "@typescript-eslint/consistent-type-imports": [
          "error",
          { prefer: "type-imports", fixStyle: "inline-type-imports" },
        ],
      },
    },
    {
      files: ["*.config.ts", "*.config.js", "vite.config.ts", "tailwind.config.ts"],
      rules: {
        "import/no-default-export": "off",
      },
    },
  ]);
}
