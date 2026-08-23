import { GraphPaper } from './demos/cpu/GraphPaper';
import { NodeEditor } from './demos/cpu/NodeEditor';
import { Screensaver } from './demos/cpu/Screensaver';
import { CyberHud } from './demos/gpu/CyberHud';
import { DropIn } from './demos/gpu/DropIn';
import { FractalLand } from './demos/gpu/FractalLand';
import { ReactionDiffusion } from './demos/gpu/ReactionDiffusion';

import type { ComponentType } from 'react';

export interface UseCaseLevel {
    readonly level: number;
    readonly emoji: string;
    readonly name: string;
    readonly description: string;
}

export interface UseCaseSection {
    readonly heading: string;
    readonly body: readonly string[];
    readonly code?: string;
}

export interface UseCase {
    readonly level: number;
    readonly id: string;
    readonly title: string;
    readonly summary: string;
    readonly sections: readonly UseCaseSection[];
    readonly Demo: ComponentType;
}

export const useCaseLevels: readonly UseCaseLevel[] = [
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
];

export const useCases = [
    {
        id: 'screensaver',
        level: 1,
        title: 'The Screensaver',
        summary:
            'A CPU particle cascade with zero boilerplate. Mount a <CpuCanvas>, hand it a draw function, and the runtime owns everything else.',
        sections: [
            {
                heading: 'A canvas that runs itself',
                body: [
                    'The whole mount story is one component. The hook builds the camera, the surface, and the input router for you; the first draw callback starts the requestAnimationFrame loop. Nothing else to wire, nothing to clean up — unmounting tears the chain down in reverse.'
                ],
                code: `<CpuCanvas onFrame={(surface) => { /* one frame of drawing */ }} />`
            },
            {
                heading: 'Per-frame state lives on the surface',
                body: [
                    'Before every draw, the surface stamps time, deltaTime, frameCount, width, height, and dpr. No refs, no subscriptions — the values you need are already there.'
                ],
                code: `particle.y += GRAVITY * surface.deltaTime;
surface.text(\`frame \${surface.frameCount} · time \${surface.time.toFixed(1)}s\`, 16, 24);`
            },
            {
                heading: 'The trail trick',
                body: [
                    'The canvas is never cleared. A translucent full-viewport rect dims the previous frame into motion trails while each particle repaints itself. Every draw call returns the surface, so frames chain naturally with zero per-call allocations.'
                ],
                code: `surface
    .rect(0, 0, surface.width, surface.height, 'rgba(5, 7, 11, 0.06)')
    .circle(x, y, radius, color);`
            },
            {
                heading: 'No camera, no gestures',
                body: [
                    'A full-screen animation has nothing to pan. Disabling the default gestures keeps the loop doing only the work this sketch needs.'
                ],
                code: `<CpuCanvas onFrame={onFrame} canvasInteractions={{ pan: false, zoom: false }} />`
            }
        ],
        Demo: Screensaver
    },
    {
        id: 'graph-paper',
        level: 1,
        title: 'The Infinite Graph Paper',
        summary:
            'Everything is drawn in world space by default. The camera is applied for you, so the grid is only "draw the lines inside the visible world bounds".',
        sections: [
            {
                heading: 'World space, always',
                body: [
                    'Coordinates you pass to draw calls are world units; the runtime applies the camera transform each frame. screenToWorld and worldToScreen are the only seams between the two spaces.'
                ]
            },
            {
                heading: 'Draw only what is visible',
                body: [
                    'The visible world bounds fall out of two screen-to-world conversions — the top-left and bottom-right corners of the canvas. Grid lines are just lines inside those bounds; as you pan and zoom, a fresh set enters view.'
                ],
                code: `const min = surface.screenToWorld({ x: 0, y: 0 });
const max = surface.screenToWorld({ x: surface.width, y: surface.height });

for (let x = min.x; x <= max.x; x += MINOR) {
    surface.line(x, min.y, x, max.y, '#131a24', 1);
}`
            },
            {
                heading: 'Pan and zoom for free',
                body: [
                    'The default gestures pan and zoom the camera; the draw callback never changes. Text is re-rendered every frame in world coordinates, so it tracks the grid and stays crisp.'
                ],
                code: `<CpuCanvas onFrame={onFrame} initialCamera={{ zoom: 0.8 }} className="h-full w-full" />`
            },
            {
                heading: 'Culling when zoomed out',
                body: [
                    'Zoomed far out, the minor grid would collapse into noise. The demo swaps the minor step for the major one below a zoom threshold — one line of bookkeeping, invisible to the viewer.'
                ],
                code: `const step = (MAJOR / MINOR) * surface.camera.zoom < 12 ? MAJOR : MINOR;`
            }
        ],
        Demo: GraphPaper
    },
    {
        id: 'node-editor',
        level: 2,
        title: 'The Node Editor',
        summary:
            'A structural tool built by overriding the default camera gestures: left-drag places, moves, and connects nodes while middle-drag still pans.',
        sections: [
            {
                heading: 'Your gestures replace the defaults',
                body: [
                    'Providing onStart and onMove to canvasInteractions suppresses the built-in pan — you own the drag cycle. The pipeline still delivers every event; your handlers decide what it means.'
                ],
                code: `<CpuCanvas
    onFrame={onFrame}
    canvasInteractions={{ onStart, onMove, onEnd, onContextMenu }}
/>`
            },
            {
                heading: 'surface.pointer is always world space',
                body: [
                    'The pointer is projected through the camera before it reaches you, so hit-testing works at any zoom — no manual conversion, ever.'
                ],
                code: `const hit = hitNode(nodes, surface.pointer);
if (hit) drag = { id: hit.id, offset: surface.pointer }`
            },
            {
                heading: 'Middle-drag still pans',
                body: [
                    'Pan was not deleted, it moved: on the middle button the handler drives the camera itself through the event cameraControls.'
                ],
                code: `if (nativeEvent.button === 1) {
    cameraControls.panBy(input.pointerDelta.x, input.pointerDelta.y);
}`
            },
            {
                heading: 'Teardown is handled',
                body: [
                    'onEnd runs alongside the built-in gestures, so captured state always releases — the same teardown discipline the lifecycle report walks through in section 07.'
                ]
            }
        ],
        Demo: NodeEditor
    },
    {
        id: 'drop-in',
        level: 3,
        title: 'CPU to GPU Drop-in',
        summary:
            'One scene function, two runtimes. The same shape calls drive CpuCanvas (Canvas2D) or GpuCanvas (WebGL2 batching); only the clear differs.',
        sections: [
            {
                heading: 'A scene is just a draw function',
                body: [
                    'CpuSurface and GpuSurface expose the same per-frame state and the same chainable shape calls. Type a minimal structural interface and one function drives either runtime.'
                ],
                code: `const drawScene = (surface: ShapeSurface, stars: Star[]) => {
    for (const star of stars) surface.circle(star.x, star.y, star.radius, star.color);
};`
            },
            {
                heading: 'The only difference is the clear',
                body: [
                    'The CPU surface clears with a CSS color, the GPU surface with RGBA. Everything else in the scene is identical — swap the component and the demo is still the same picture.'
                ],
                code: `// CpuCanvas
surface.clear('#05070b');
// GpuCanvas
surface.clear(0.02, 0.03, 0.045, 1);`
            },
            {
                heading: 'Why the GPU wins at 20,000 circles',
                body: [
                    'CPU shapes are individual Canvas2D operations; GPU shapes are appended to one dynamic vertex buffer and flushed in a single draw call per frame. Drag the slider — the CPU starts to sweat long before the GPU does.'
                ]
            }
        ],
        Demo: DropIn
    },
    {
        id: 'fractal-land',
        level: 3,
        title: 'Infinite Procedural Fractal',
        summary:
            'Declarative shader art: pass a fragmentShader to GpuCanvas and there is no loop to write. The camera arrives automatically, so panning and zooming morphs the Mandelbrot set.',
        sections: [
            {
                heading: 'The shader IS the draw function',
                body: [
                    'A fragment shader runs once per pixel, every frame. No onFrame, no program bookkeeping — the component compiles the shader on mount and renders it continuously.'
                ],
                code: `<GpuCanvas fragmentShader={FRAGMENT} className="h-full w-full" />`
            },
            {
                heading: 'The camera is a uniform',
                body: [
                    'Every pass receives the standard uniforms: u_resolution, u_aspect, u_mouse, u_camera (x, y, zoom), u_dpr, and u_time. Reconstructing world coordinates from screen pixels is two lines.'
                ],
                code: `vec2 css = vUv * (u_resolution / u_dpr);
vec2 world = (css - u_camera.xy) / u_camera.z;`
            },
            {
                heading: 'Pan and zoom through the fractal',
                body: [
                    'Because the shader maps every pixel through the live camera, the default gestures move you across an infinite complex plane. The set morphs and tracks perfectly — one uniform update per frame.'
                ]
            }
        ],
        Demo: FractalLand
    },
    {
        id: 'cyber-hud',
        level: 4,
        title: 'The Cyber-HUD',
        summary:
            'The hybrid core: a shape and a shader are the same mechanism. A fullscreen grid program renders as the background; batched shapes, text, and a pointer reticle draw on top — all in one frame.',
        sections: [
            {
                heading: 'Create a program once, render it every frame',
                body: [
                    'onMount fires once at mount — the place to build a custom program. renderProgram then paints it as a fullscreen pass from inside the draw callback.'
                ],
                code: `const onMount = (surface: GpuSurface) => {
    programRef.current = surface.createProgram(GRID);
};`
            },
            {
                heading: 'Shapes layer on top',
                body: [
                    'Batched vector shapes and text draw after the pass, in the same frame, in world space — health bars, labels, and a pointer reticle that tracks the cursor.'
                ],
                code: `surface.renderProgram(program);
surface
    .rect(24, 24, 220, 14, '#1e293b')
    .text('HULL', 26, 20, '#34d399', 10);`
            },
            {
                heading: 'One frame, two mechanisms',
                body: [
                    'Under the hood shapes are also a shader — a fullscreen pass and a batched buffer are the same mechanism at different granularities. This demo interleaves them every frame.'
                ]
            }
        ],
        Demo: CyberHud
    },
    {
        id: 'reaction-diffusion',
        level: 5,
        title: 'Reaction–Diffusion (Gray–Scott)',
        summary:
            'A GPGPU pipeline: a StateBuffer ping-pongs a 256×256 texture pair while a simulate program evolves a Gray–Scott reaction. The live texture feeds a separate visualization shader tiled across infinite world space.',
        sections: [
            {
                heading: 'The simulation is just another render',
                body: [
                    'A StateBuffer owns two textures. step() renders the simulate program into the write target while sampling the previous state, then swaps the pair — one generation per frame.'
                ],
                code: `const buffer = createStateBuffer(surface.gl, 256, 256);
buffer.addProgram('simulate', SIM_SHADER);

buffer.useProgram('simulate');
buffer.step();`
            },
            {
                heading: 'Simulate in one program, visualize in another',
                body: [
                    'The sim never draws to the screen. A separate visualization shader samples the live texture through a u_state uniform, maps it through the camera, and tiles it across world space.'
                ],
                code: `uniforms={(surface) => ({
    u_state: ensureBuffer(surface).getTexture(),
    u_simSize: 256
})}`
            },
            {
                heading: 'Drag to inject',
                body: [
                    'Pointer input is folded into the sim itself: onStart and onEnd arm an injection flag, and the simulate program adds chemical around u_mouse — the pointer mapped into buffer space.'
                ],
                code: `buffer.setUniforms({
    u_mouse: [mod(surface.pointer.x, 256) / 256, mod(surface.pointer.y, 256) / 256],
    u_inject: injecting ? [0, 0.9] : [0, 0]
});`
            }
        ],
        Demo: ReactionDiffusion
    }
] satisfies UseCase[];
