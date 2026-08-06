import type { ReactNode } from 'react';
import { SurfaceCpuDeclarative } from './demos/cpu/SurfaceCpuDeclarative';
import { SurfaceCpuHybrid } from './demos/cpu/SurfaceCpuHybrid';
import { SurfaceCpuImperative } from './demos/cpu/SurfaceCpuImperative';
import { SurfaceGpuDeclarative } from './demos/gpu/SurfaceGpuDeclarative';
import { SurfaceGpuHybrid } from './demos/gpu/SurfaceGpuHybrid';
import { SurfaceGpuImperative } from './demos/gpu/SurfaceGpuImperative';
import { ProgramGpuDeclarative } from './demos/gpu/ProgramGpuDeclarative';
import { ProgramGpuHybrid } from './demos/gpu/ProgramGpuHybrid';
import { ProgramGpuImperative } from './demos/gpu/ProgramGpuImperative';

function Cell({
        style,
        caption,
        children
}: {
        style: string;
        caption: string;
        children: ReactNode;
}) {
        return (
                <section className="flex flex-col gap-2 rounded-lg border border-white/10 bg-[#12151b] p-3">
                        <span className="font-mono text-xs font-semibold tracking-wide text-amber-300">
                                {style}
                        </span>
                        <div className="flex items-center justify-center">{children}</div>
                        <p className="font-mono text-[10px] leading-relaxed text-neutral-500">
                                {caption}
                        </p>
                </section>
        );
}

function Section({
        backend,
        mode,
        children
}: {
        backend: string;
        mode: string;
        children: ReactNode;
}) {
        return (
                <section className="flex flex-col gap-2">
                        <h2 className="flex items-center gap-2 font-mono text-xs font-semibold tracking-wide text-neutral-400">
                                <span className="rounded bg-white/10 px-1.5 py-0.5 font-mono text-[10px] text-neutral-300">
                                        {backend}
                                </span>
                                {mode}
                        </h2>
                        <div className="grid grid-cols-3 gap-4">{children}</div>
                </section>
        );
}

export function App() {
        return (
                <div className="min-h-dvh w-full bg-[#0b0d11] text-neutral-200">
                        <header className="border-b border-white/10 px-4 py-3">
                                <div className="flex items-center gap-3">
                                        <h1 className="font-mono text-sm font-semibold tracking-wide text-amber-300">
                                                @repo/glaze
                                        </h1>
                                        <span className="font-mono text-xs text-neutral-500">
                                                example app — one scene, nine authoring styles
                                        </span>
                                </div>
                        </header>
                        <main className="flex flex-col gap-8 p-4">
                                <Section backend="CPU" mode="surface">
                                        <Cell
                                                style="declarative"
                                                caption="CpuCanvas onFrame · SCENE via runtime.context"
                                        >
                                                <SurfaceCpuDeclarative />
                                        </Cell>
                                        <Cell
                                                style="hybrid"
                                                caption="useFrame + useCamera · orbiting sketch"
                                        >
                                                <SurfaceCpuHybrid />
                                        </Cell>
                                        <Cell
                                                style="imperative"
                                                caption="createCpuRuntime + setDraw in an effect"
                                        >
                                                <SurfaceCpuImperative />
                                        </Cell>
                                </Section>
                                <Section backend="GPU" mode="surface">
                                        <Cell
                                                style="declarative"
                                                caption="GpuCanvas onFrame · SCENE shapes"
                                        >
                                                <SurfaceGpuDeclarative />
                                        </Cell>
                                        <Cell
                                                style="hybrid"
                                                caption="useFrame + useCamera + pointerHandlers · pointer highlight"
                                        >
                                                <SurfaceGpuHybrid />
                                        </Cell>
                                        <Cell
                                                style="imperative"
                                                caption="createGpuRuntime + setDraw in an effect"
                                        >
                                                <SurfaceGpuImperative />
                                        </Cell>
                                </Section>
                                <Section backend="GPU" mode="program">
                                        <Cell
                                                style="declarative"
                                                caption="GpuCanvas fragmentShader · plasma"
                                        >
                                                <ProgramGpuDeclarative />
                                        </Cell>
                                        <Cell
                                                style="hybrid"
                                                caption="display shader + createStateBuffer stepped in uniforms · Game of Life"
                                        >
                                                <ProgramGpuHybrid />
                                        </Cell>
                                        <Cell
                                                style="imperative"
                                                caption="createProgram + renderProgram + subscribe · plasma"
                                        >
                                                <ProgramGpuImperative />
                                        </Cell>
                                </Section>
                        </main>
                </div>
        );
}
