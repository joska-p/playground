// @ts-check
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig, fontProviders } from 'astro/config';
import process from 'node:process';
import { visualizer } from 'rollup-plugin-visualizer';
import { remarkBaseUrl } from './src/lib/remarkBaseUrl.ts';

import mdx from '@astrojs/mdx';

import sitemap from '@astrojs/sitemap';

// Check for existence of the variables rather than exact string matches
const isVercel = Boolean(process.env.VERCEL);
const gitlabUrl = 'https://joska-p.github.io';
const vercelUrl = 'https://playground-ten-sand.vercel.app';

const siteUrl = isVercel ? vercelUrl : gitlabUrl;

const basePath = isVercel ? '/' : '/playground';

// https://astro.build/config
export default defineConfig({
  site: siteUrl,
  base: basePath,
  trailingSlash: 'always',

  fonts: [
    {
      provider: fontProviders.fontsource(),
      name: 'JetBrains Mono',
      cssVariable: '--font-jetbrains-mono'
    }
  ],
  vite: {
    plugins: [
      // @ts-expect-error — Vite 7 types vs Vite 8 tailwindcss plugin mismatch
      tailwindcss(),
      visualizer({
        template: 'treemap',
        filename: './public/stats.html',
        sourcemap: true
      })
    ],
    resolve: {
      // @ts-expect-error — Vite 7 types lack tsconfigPaths, but Vite 8/Rolldown requires it
      tsconfigPaths: true
    },
    build: {
      sourcemap: true,
      chunkSizeWarningLimit: 1200,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules/three')) return 'vendor-three';
            if (id.includes('node_modules/@react-three')) return 'vendor-r3f';
            if (id.includes('node_modules/colorjs.io')) return 'vendor-colorjs';
          }
        }
      }
    }
  },

  integrations: [
    react(),
    mdx({
      remarkPlugins: [[remarkBaseUrl, { base: basePath }]], // the order matter math before katex
      remarkRehype: { allowDangerousHtml: true }
    }),
    sitemap()
  ],

  preferences: {
    devToolbar: false
  }
});
