// @ts-check
import process from "node:process";
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";

// 1. Detect the environment
const isVercel = process.env.VERCEL === "true";

// 2. Set dynamic values based on environment
// Default to GH Pages if we aren't on Vercel
const siteUrl = isVercel ? "https://playground-ten-sand.vercel.app" : "https://joska-p.github.io";

const basePath = isVercel ? "/" : "/playground";

// https://astro.build/config
export default defineConfig({
  site: siteUrl, // Used here!
  base: basePath, // Used here!
  trailingSlash: "ignore",
  integrations: [
    react({
      babel: {
        plugins: [["babel-plugin-react-compiler", { target: "19" }]],
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
    build: {
      sourcemap: true,
      minify: false,
    },
  },
  compressHTML: false,
});
