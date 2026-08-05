import type { ReactNode } from 'react';
import { PassGpu } from './demos/PassGpu';
import { ProgramCpu } from './demos/ProgramCpu';
import { ProgramGpu } from './demos/ProgramGpu';
import { SurfaceCpu } from './demos/SurfaceCpu';
import { SurfaceGpu } from './demos/SurfaceGpu';
import { ProofStrip } from './ProofStrip';

function Panel({
        mode,
        backend,
        caption,
        children
}: {
        mode: string;
        backend: string;
        caption: string;
        children: ReactNode;
}) {
        return (
                <section className="flex flex-col gap-2 rounded-lg border border-white/10 bg-[#12151b] p-3">
                        <div className="flex items-center justify-between">
                                <span className="font-mono text-xs font-semibold tracking-wide text-amber-300">
                                        {mode}
                                </span>
                                <span className="rounded bg-white/10 px-1.5 py-0.5 font-mono text-[10px] text-neutral-300">
                                        {backend}
                                </span>
                        </div>
                        <div className="flex items-center justify-center">{children}</div>
                        <p className="font-mono text-[10px] leading-relaxed text-neutral-500">
                                {caption}
                        </p>
                </section>
        );
}

export function App() {
        return (
                <div className="min-h-dvh w-full bg-[#0b0d11] text-neutral-200">
                        <header className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 px-4 py-3">
                                <div className="flex items-center gap-3">
                                        <h1 className="font-mono text-sm font-semibold tracking-wide text-amber-300">
                                                @repo/glaze
                                        </h1>
                                        <span className="font-mono text-xs text-neutral-500">
                                                example app — react layer runtime proof
                                        </span>
                                </div>
                                <ProofStrip />
                        </header>
                        <main className="grid grid-cols-2 gap-4 p-4">
                                <Panel
                                        mode="Surface Painting"
                                        backend="CPU"
                                        caption="declarative · CpuCanvas onFrame · S4 scene"
                                >
                                        <SurfaceCpu />
                                </Panel>
                                <Panel
                                        mode="Surface Painting"
                                        backend="GPU"
                                        caption="declarative · GpuCanvas onFrame · S4 scene"
                                >
                                        <SurfaceGpu />
                                </Panel>
                                <Panel
                                        mode="Programmatic"
                                        backend="CPU"
                                        caption="imperative · onDoor + useFrame + useCamera · orbiting sketch"
                                >
                                        <ProgramCpu />
                                </Panel>
                                <Panel
                                        mode="Programmatic"
                                        backend="GPU"
                                        caption="imperative · onDoor + createProgram/renderProgram · plasma shader"
                                >
                                        <ProgramGpu />
                                </Panel>
                                <Panel
                                        mode="GpuPass Compute"
                                        backend="GPU"
                                        caption="ping-pong FBO · createGpuPass stepping Life · pan/zoom camera"
                                >
                                        <PassGpu />
                                </Panel>
                        </main>
                </div>
        );
}
