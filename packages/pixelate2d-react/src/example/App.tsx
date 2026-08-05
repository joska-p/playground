import { type RenderDriver } from '@repo/pixelate2d-core';
import { CpuCanvas, GpuCanvas, useCamera, useInput } from '../index';
import { useState } from 'react';
import { SCENE_IDS, SCENES, type SceneId } from './scenes';
import { LiveStatus } from './LiveStatus';

const headerButton = (active: boolean): string =>
        `rounded px-2 py-1 font-mono text-xs transition-colors ${
                active
                        ? 'bg-amber-400/20 text-amber-300'
                        : 'text-neutral-500 hover:bg-white/5 hover:text-neutral-300'
        }`;

function Toggle({
        label,
        checked,
        onChange
}: {
        label: string;
        checked: boolean;
        onChange: (next: boolean) => void;
}) {
        return (
                <button
                        type="button"
                        onClick={() => {
                                onChange(!checked);
                        }}
                        className={headerButton(checked)}
                >
                        {label} {checked ? 'on' : 'off'}
                </button>
        );
}

export function App() {
        const [mode, setMode] = useState<'cpu' | 'gpu'>('cpu');
        const [scene, setScene] = useState<SceneId>('primitives');
        const [pan, setPan] = useState(true);
        const [zoom, setZoom] = useState(true);
        const [driver, setDriver] = useState<RenderDriver | null>(null);
        const [camera, controls] = useCamera({ zoom: 0.9 });
        const input = useInput(driver);
        const draw = SCENES[scene];
        const Canvas = mode === 'cpu' ? CpuCanvas : GpuCanvas;

        return (
                <div className="flex h-dvh w-screen flex-col bg-[#101216] text-neutral-200">
                        <header className="flex items-center justify-between border-b border-white/10 px-4 py-2">
                                <div className="flex items-center gap-3">
                                        <h1 className="font-mono text-sm font-semibold tracking-wide text-amber-300">
                                                pixelate2d-react
                                        </h1>
                                        <span className="hidden font-mono text-xs text-neutral-500 md:inline">
                                                {mode === 'cpu' ? 'Canvas2D' : 'WebGL2'} driver
                                        </span>
                                </div>
                                <div className="flex gap-1">
                                        {(['cpu', 'gpu'] as const).map((m) => (
                                                <button
                                                        key={m}
                                                        type="button"
                                                        onClick={() => {
                                                                setMode(m);
                                                        }}
                                                        className={headerButton(mode === m)}
                                                >
                                                        {m}
                                                </button>
                                        ))}
                                </div>
                        </header>

                        <div className="flex min-h-0 flex-1">
                                <aside className="flex w-60 shrink-0 flex-col gap-4 overflow-y-auto border-r border-white/10 p-4">
                                        <section>
                                                <h2 className="mb-2 font-mono text-xs uppercase tracking-wider text-neutral-500">
                                                        Scene
                                                </h2>
                                                <div className="flex flex-col gap-1">
                                                        {SCENE_IDS.map((id) => (
                                                                <button
                                                                        key={id}
                                                                        type="button"
                                                                        onClick={() => {
                                                                                setScene(id);
                                                                        }}
                                                                        className={`rounded px-2 py-1 text-left font-mono text-xs transition-colors ${
                                                                                scene === id
                                                                                        ? 'bg-amber-400/20 text-amber-300'
                                                                                        : 'text-neutral-400 hover:bg-white/5'
                                                                        }`}
                                                                >
                                                                        {id}
                                                                </button>
                                                        ))}
                                                </div>
                                        </section>

                                        <section>
                                                <h2 className="mb-2 font-mono text-xs uppercase tracking-wider text-neutral-500">
                                                        Camera
                                                </h2>
                                                <div className="flex flex-col gap-2">
                                                        <Toggle
                                                                label="pan"
                                                                checked={pan}
                                                                onChange={setPan}
                                                        />
                                                        <Toggle
                                                                label="zoom"
                                                                checked={zoom}
                                                                onChange={setZoom}
                                                        />
                                                        <button
                                                                type="button"
                                                                onClick={() => {
                                                                        controls.reset();
                                                                }}
                                                                className="rounded bg-white/5 px-2 py-1 font-mono text-xs text-neutral-300 transition-colors hover:bg-white/10"
                                                        >
                                                                reset camera
                                                        </button>
                                                </div>
                                        </section>

                                        <section>
                                                <h2 className="mb-2 font-mono text-xs uppercase tracking-wider text-neutral-500">
                                                        Input (useInput)
                                                </h2>
                                                <LiveStatus input={input} />
                                        </section>

                                        <p className="mt-auto font-mono text-[11px] leading-relaxed text-neutral-600">
                                                Drag to pan · scroll to zoom. Draw calls are
                                                curried:
                                                drawCircle(color)(radius)(position)(driver). The
                                                render loop never re-renders React.
                                        </p>
                                </aside>

                                <main className="relative min-w-0 flex-1">
                                        <Canvas
                                                className="h-full w-full"
                                                camera={camera}
                                                cameraControls={controls}
                                                pan={pan}
                                                zoom={zoom}
                                                onDriver={setDriver}
                                                onFrame={draw}
                                        />
                                </main>
                        </div>
                </div>
        );
}
