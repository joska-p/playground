// @ts-check
import react from "@astrojs/react"
import tailwind from "@astrojs/tailwind"
import { defineConfig } from "astro/config"

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), react()],
  experimental: {
    svg: true,
  },
  site: "https://joska-p.github.io",
  base: "astrotiles",
})
