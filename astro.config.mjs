// @ts-check
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    react(),
  ],
  site: "https://joska-p.github.io",
  base: "playground-v1",
  compressHTML: false,
  devToolbar: {
    enabled: false,
  },
  build: {
    format: "preserve",
  },
  vite: {
    optimizeDeps: {
      include: ["react/jsx-runtime"],
    },
    build: {
      sourcemap: true,
    },
  },
});
