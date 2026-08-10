import type { ComponentType } from 'react';
import { Screensaver, screensaverSnippet } from './demos/cpu/Screensaver';
import { GraphPaper, graphPaperSnippet } from './demos/cpu/GraphPaper';
import { NodeEditor, nodeEditorSnippet } from './demos/cpu/NodeEditor';
import { DropIn, dropInSnippet } from './demos/gpu/DropIn';
import { FractalLand, fractalLandSnippet } from './demos/gpu/FractalLand';
import { CyberHud, cyberHudSnippet } from './demos/gpu/CyberHud';
import { ReactionDiffusion, reactionDiffusionSnippet } from './demos/gpu/ReactionDiffusion';

export interface UseCaseLevel {
    readonly level: number;
    readonly emoji: string;
    readonly name: string;
    readonly description: string;
}

export interface UseCase {
    readonly level: number;
    readonly id: string;
    readonly title: string;
    readonly description: string;
    readonly snippet: string;
    readonly Demo: ComponentType;
}

export const useCaseLevels = [
    {
        level: 1,
        emoji: '🟢',
        name: 'The Basics',
        description: 'Immediacy, flow, and the camera'
    },
    {
        level: 2,
        emoji: '🟡',
        name: 'Interaction & Input Routing',
        description: 'Intercepting the default camera gestures'
    },
    {
        level: 3,
        emoji: '🟠',
        name: 'GPU & Shader Art',
        description: 'Shapes and shaders speak the same language'
    },
    {
        level: 4,
        emoji: '🔴',
        name: 'The Hybrid Core',
        description: 'A shader pass and vector shapes in one frame'
    },
    {
        level: 5,
        emoji: '💀',
        name: 'GPGPU & Heavy Simulations',
        description: 'Ping-pong texture simulations'
    }
] as const satisfies UseCaseLevel[];

export const useCases = [
    {
        id: 'screensaver',
        level: 1,
        title: 'The Screensaver',
        description:
            'A CPU particle cascade with zero boilerplate. Per-frame state — time, deltaTime, frameCount, dpr — lives on the surface. The canvas is never cleared: a translucent full-viewport rect dims last frame\u2019s shapes into motion trails while each particle repaints itself.',
        snippet: screensaverSnippet,
        Demo: Screensaver
    },
    {
        id: 'graph-paper',
        level: 1,
        title: 'The Infinite Graph Paper',
        description:
            'Everything is drawn in world space by default. Major lines every 100 units, minor every 20, from the visible world bounds. Pan and zoom come for free, and text stays crisp while the camera moves.',
        snippet: graphPaperSnippet,
        Demo: GraphPaper
    },
    {
        id: 'node-editor',
        level: 2,
        title: 'The Node Editor',
        description:
            'Build a structural tool by overriding the default gestures. onStart/onMove return true to consume left-click drags for placing, moving, and connecting nodes; middle-drags fall through to PanGesture. surface.pointer stays in world space at any zoom.',
        snippet: nodeEditorSnippet,
        Demo: NodeEditor
    },
    {
        id: 'drop-in',
        level: 3,
        title: 'CPU to GPU Drop-in',
        description:
            'One scene function, two runtimes. The same shape calls drive CpuCanvas (Canvas2D) or GpuCanvas (WebGL2 batching); only the clear differs. Crank the slider — the GPU keeps thousands of batched circles smooth where the CPU starts to sweat.',
        snippet: dropInSnippet,
        Demo: DropIn
    },
    {
        id: 'fractal-land',
        level: 3,
        title: 'Infinite Procedural Fractal',
        description:
            'Declarative shader art: pass a fragmentShader to GpuCanvas and forget the loop. The standard u_camera uniform carries camera offset and zoom, so panning and zooming the canvas morphs the Mandelbrot set perfectly.',
        snippet: fractalLandSnippet,
        Demo: FractalLand
    },
    {
        id: 'cyber-hud',
        level: 4,
        title: 'The Cyber-HUD',
        description:
            'The hybrid core: a shape and a shader are the same mechanism. A custom fullscreen grid program renders as the background pass; batched vector shapes, text, and a pointer reticle draw directly on top — all in one frame.',
        snippet: cyberHudSnippet,
        Demo: CyberHud
    },
    {
        id: 'reaction-diffusion',
        level: 5,
        title: 'Reaction–Diffusion (Gray–Scott)',
        description:
            'A GPGPU pipeline: StateBuffer ping-pongs a 256×256 texture pair while a simulate program evolves a Gray–Scott reaction. The live texture is fed into a separate visualization shader that tiles it across infinite world space. Click and drag to inject chemical.',
        snippet: reactionDiffusionSnippet,
        Demo: ReactionDiffusion
    }
] as const satisfies UseCase[];
