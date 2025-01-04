import tailwind from "@astrojs/tailwind";
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  integrations: [
    react(),
    tailwind(),
    sitemap({
      filter: (page) => page !== "/404",
    }),
  ],
  site: "https://joska-p.github.io",
  base: "playground",
  trailingSlash: "always",
  compressHTML: true,
  devToolbar: {
    enabled: true,
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
