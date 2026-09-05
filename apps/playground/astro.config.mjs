// @ts-check
import { satteri } from '@astrojs/markdown-satteri';
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig, fontProviders } from 'astro/config';
import process from 'node:process';
import { visualizer } from 'rollup-plugin-visualizer';
import { remarkBaseUrl } from './src/lib/satteriBaseUrl';

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
                emitFile: true,
                filename: 'stats.html',
                title: 'Playground client bundle',
                gzipSize: true,
                brotliSize: true
            })
        ],
        optimizeDeps: {
            // 1. On force le pré-bundling des très grosses libs tierces
            include: ['react', 'react-dom', 'three', '@react-three/fiber', '@react-three/drei'],
            // 2. On indique à Vite où chercher les dépendances pour qu'il ne s'éparpille pas
            entries: ['./src/pages/**/*.astro', '../../packages/*/src/App.tsx']
        },
        resolve: {
            tsconfigPaths: true
        },
        server: {
            fs: {
                // Allow Vite to grab raw files from outside the Astro app directory
                allow: ['../../']
            }
        },
        build: {
            sourcemap: true
        }
    },
    integrations: [
        react({
            babel: {
                compact: true,
                plugins: [['babel-plugin-react-compiler']]
            }
        }),
        mdx(),
        sitemap()
    ],
    markdown: {
        processor: satteri({
            features: {
                directive: true,
                math: true,
                headingAttributes: true
            },
            mdastPlugins: [remarkBaseUrl({ base: basePath })]
        })
    }
});
