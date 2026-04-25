// @ts-check
import process from "node:process";
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";

const isVercel = process.env.VERCEL === "true";
const isGitHubPages = process.env.GITHUB_ACTIONS === "true";

// THIS LOG WILL SHOW UP IN YOUR VERCEL BUILD LOGS
console.log("--- BUILD DEBUG ---", { isVercel, VERCEL_ENV: process.env.VERCEL });
console.log("--- BUILD DEBUG ---", { isGitHubPages, GITHUB_ACTIONS: process.env.GITHUB_ACTIONS });

export default defineConfig({
  site: "https://joska-p.github.io",
  base: "/playground",
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
