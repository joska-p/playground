// @ts-check
import { defineConfig, fontProviders } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import react from "@astrojs/react";
import process from "node:process";
import { remarkBaseUrl } from "./src/lib/remarkBaseUrl.ts";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

import mdx from "@astrojs/mdx";

// Check for existence of the variables rather than exact string matches
const isVercel = Boolean(process.env.VERCEL);
const gitlabUrl = "https://jpotin.gitlab.io";
const vercelUrl = "https://playground-ten-sand.vercel.app";

const siteUrl = isVercel ? vercelUrl : gitlabUrl;

const basePath = isVercel ? "/" : "/playground";

// https://astro.build/config
export default defineConfig({
  site: siteUrl,
  base: basePath,
  trailingSlash: "always",
  markdown: {
    rehypePlugins: [rehypeKatex],
    remarkPlugins: [remarkMath, [remarkBaseUrl, { base: basePath }]],
  },
  fonts: [
    {
      provider: fontProviders.fontsource(),
      name: "JetBrains Mono",
      cssVariable: "--font-jetbrains-mono",
    },
  ],
  vite: {
    // @ts-expect-error — Vite 7 types vs Vite 8 tailwindcss plugin mismatch
    plugins: [tailwindcss()],
    resolve: {
      // @ts-expect-error — Vite 7 types lack tsconfigPaths, but Vite 8/Rolldown requires it
      tsconfigPaths: true,
    },
  },

  integrations: [react(), mdx()],
});
