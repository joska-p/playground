// @ts-check
import react from "@astrojs/react"
import tailwind from "@astrojs/tailwind"
import { defineConfig } from "astro/config"

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), react()],
  site: "https://joska-p.github.io",
  base: "astrotiles",
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
    },
  },
})
