// @ts-check
import process from "node:process";
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";

// Check for existence of the variables rather than exact string matches
const isVercel = Boolean(process.env.VERCEL);

const siteUrl = isVercel
  ? "https://playground-ten-sand.vercel.app"
  : "https://joska-p.github.io";

const basePath = isVercel
  ? "/"
  : "/playground";

export default defineConfig({
  site: siteUrl,
  base: basePath,
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
