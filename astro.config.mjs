// @ts-check
import tailwind from "@astrojs/tailwind"
import { defineConfig } from "astro/config"

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind()],
  experimental: {
    svg: true,
  },
  site: "https://joska-p.github.io",
  base: "astrotiles",
})
