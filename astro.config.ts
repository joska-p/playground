import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import { defineConfig } from "astro/config";

const ReactCompilerConfig = {
  /* ... */
};

// https://astro.build/config
export default defineConfig({
  integrations: [
    react({
      babel: {
        plugins: [["babel-plugin-react-compiler", ReactCompilerConfig]],
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
      minify: false,
    },
    esbuild: {
      minifyIdentifiers: false,
    },
  },
});
