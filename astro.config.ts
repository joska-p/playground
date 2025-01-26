import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

const ReactCompilerConfig = {
  target: "19",
};

// https://astro.build/config
export default defineConfig({
  integrations: [
    react({
      babel: {
        plugins: [["babel-plugin-react-compiler", ReactCompilerConfig]],
      },
    }),
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
    plugins: [tailwindcss()],
    build: {
      sourcemap: true,
      minify: false,
    },
    esbuild: {
      minifyIdentifiers: false,
    },
  },
});
