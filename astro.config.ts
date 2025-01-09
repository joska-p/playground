import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  integrations: [
    react({
      babel: {
        plugins: [["module:@preact/signals-react-transform"]],
      },
    }),
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
