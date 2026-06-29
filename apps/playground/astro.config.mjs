// @ts-check
import { satteri } from '@astrojs/markdown-satteri';
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig, fontProviders } from 'astro/config';
import process from 'node:process';
import { visualizer } from 'rollup-plugin-visualizer';

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
      tailwindcss(),
      visualizer({
        template: 'treemap',
        filename: './public/stats.html'
      })
    ],
    resolve: {
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
  integrations: [react(), mdx(), sitemap()],
  markdown: {
    processor: satteri({
      features: {
        directive: true,
        math: true,
        headingAttributes: true
      }
    })
  }
});
