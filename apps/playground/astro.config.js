// @ts-check
import process from "node:process";
import { defineConfig, fontProviders } from "astro/config";
import react from "@astrojs/react";
import { remarkBaseUrl } from "./src/lib/remark-base-url.mjs";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";

// Check for existence of the variables rather than exact string matches
const isVercel = Boolean(process.env.VERCEL);
const gitlabUrl = "https://jpotin.gitlab.io";
const vercelUrl = "https://playground-ten-sand.vercel.app";

const siteUrl = isVercel ? vercelUrl : gitlabUrl;

const basePath = isVercel ? "/" : "/playground";

export default defineConfig({
  site: siteUrl,
  base: basePath,
  trailingSlash: "always",

  integrations: [
    react({
      babel: {
        plugins: [["babel-plugin-react-compiler", { target: "19" }]],
      },
    }),
  ],

  markdown: {
    remarkPlugins: [[remarkBaseUrl, { base: basePath }]],
  },

  fonts: [
    {
      provider: fontProviders.fontsource(),
      name: "JetBrains Mono",
      cssVariable: "--font-jetbrains-mono",
    },
  ],

  vite: {
    plugins: [tailwindcss(), tsconfigPaths()],
  },
});
