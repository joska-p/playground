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
                //sourcemap: true
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

                // --- Math & Canvas Utilities ---
                'fast-png', // <-- Extracted from your stats! Keep pixel parsing fast.
                'zustand',
                'leva'
            ]
        },
        build: {
            sourcemap: true,
            chunkSizeWarningLimit: 1200,
            rolldownOptions: {
                output: {
                    codeSplitting: {
                        groups: [
                            {
                                name: 'vendor-react',
                                test: /node_modules[\\/](react|react-dom|scheduler)[\\/]/,
                                priority: 100
                            },
                            {
                                name: 'vendor-three',
                                test: /node_modules[\\/]three[\\/]/,
                                priority: 100
                            },
                            {
                                name: 'vendor-r3f',
                                test: /node_modules[\\/]@react-three[\\/]/,
                                priority: 50
                            },
                            {
                                name: 'vendor-colorjs',
                                test: /node_modules[\\/]colorjs\.io[\\/]/,
                                priority: 50
                            }
                        ]
                    }
                }
            }
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
