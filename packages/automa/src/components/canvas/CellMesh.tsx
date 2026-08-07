import { createSimulationEngine } from '@repo/automa-engine/gpu/createSimulationEngine';
import simStepShader from '@repo/automa-engine/gpu/shaders/sim-step.frag?raw';
import type { GpuRuntime } from '@repo/glaze/gpu/createGpuRuntime';
import type { UniformValue } from '@repo/glaze/gpu/shader/compileProgram';
import { GpuCanvas } from '@repo/glaze/react/GpuCanvas';
import { useEffect, useState } from 'react';
import { useCellPainting } from '../../hooks/useCellPainting';
import { buildStateColorArray } from '../../lib/colors';
import fragmentShader from '../../shaders/cell-mesh.frag?raw';
import gpuPaintShader from '../../shaders/gpu-paint.frag?raw';
import { automaStore, setEngine, useCols, useRows } from '../../stores/automa';

function CellMesh() {
    const rows = useRows();
    const cols = useCols();
    const [runtime, setRuntime] = useState<GpuRuntime | null>(null);
    const pointerHandlers = useCellPainting();

    useEffect(() => {
        if (!runtime) return;

        const engine = createSimulationEngine(
            runtime.gl,
            cols,
            rows,
            simStepShader,
            gpuPaintShader
        );
        const { grid } = automaStore.getState();
        if (grid) engine.init(grid);
        setEngine(engine);

        return () => {
            engine.destroy();
            setEngine(null);
        };
    }, [runtime, cols, rows]);

    return (
        <GpuCanvas
            className="h-full w-full"
            panButton={1}
            initialCamera={{ minZoom: 1, maxZoom: 64 }}
            onRuntime={setRuntime}
            fragmentShader={fragmentShader}
            uniforms={(): Record<string, UniformValue> => {
                const { engine, stateColors } = automaStore.getState();
                if (!engine) return {};
                return {
                    gridTexture: engine.getDisplayTexture(),
                    stateColors: buildStateColorArray(stateColors),
                    texelSize: [1 / engine.width, 1 / engine.height]
                };
            }}
            pointerHandlers={pointerHandlers}
        />
    );
}

export { CellMesh };
