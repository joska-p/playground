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
  devToolbar: {
    enabled: false
  },
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
    server: {
      fs: {
        // Allow Vite to grab raw files from outside the Astro app directory
        allow: ['../../']
      }
    },
    optimizeDeps: {
      // EXCLUDE your local packages so they support fast Hot Module Replacement (HMR)
      exclude: [
        '@repo/art-canvas',
        '@repo/automa',
        '@repo/graph-viz',
        '@repo/pixel-manipulator',
        '@repo/pixel',
        '@repo/image-to-particles',
        '@repo/mosaic-maker',
        '@repo/palette-generator',
        '@repo/randomart',
        '@repo/sequence-renderer',
        '@repo/three-stage',
        '@repo/l-system',
        '@repo/real-life',
        '@repo/radu-machine-learning',
        '@repo/ui'
      ],

      // INCLUDE the heavy 3D and utility third-party libraries used inside those projects
      include: [
        // --- React Core ---
        'react',
        'react-dom',

        // --- The 3D Graphics Stack (Heavy Bottleneck) ---
        'three',
        '@react-three/fiber',
        '@react-three/drei',
        'three-mesh-bvh', // <-- Extracted from your stats! Safely bundle this heavy BVH math.

        // --- Math & Canvas Utilities ---
        'p5',
        'fast-png', // <-- Extracted from your stats! Keep pixel parsing fast.
        'zustand',
        'leva'
      ]
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
            return undefined;
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
