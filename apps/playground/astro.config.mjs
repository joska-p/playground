// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  site: "https://joska-p.github.io",
  base: "/playground",
  trailingSlash: "always",
  integrations: [react()],
  vite: {
    plugins: [tailwindcss()],
    build: {
      sourcemap: true,
      minify: false,
    },
  },
  compressHTML: false,
});
