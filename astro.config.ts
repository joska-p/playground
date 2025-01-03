// @ts-check
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import { defineConfig } from "astro/config";

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind({
    applyBaseStyles: false,
  }), react(), sitemap()],
  site: "https://joska-p.github.io",
  base: "playground",
  trailingSlash: "always",
  compressHTML: false,
  devToolbar: {
    enabled: false,
  },
  build: {
    format: "preserve",
  },
  vite: {
    build: {
      sourcemap: true,
      minify: true,
    },
    esbuild: {
      minifyIdentifiers: false,
    },
  },
});