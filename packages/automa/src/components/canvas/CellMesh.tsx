import { createSimulationEngine } from '../../engine/gpu/createSimulationEngine';
import simStepShader from '../../engine/gpu/shaders/sim-step.frag?raw';
import type { GpuSurface } from '@repo/glaze/gpu/GpuSurface';
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
    const [surface, setSurface] = useState<GpuSurface | null>(null);
    const interactions = useCellPainting();

    useEffect(() => {
        if (!surface) return;

        const engine = createSimulationEngine(
            surface.gl,
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
    }, [surface, cols, rows]);

    return (
        <GpuCanvas
            className="h-full w-full"
            canvasInteractions={{ pan: { button: 1 }, ...interactions }}
            initialCamera={{ minZoom: 1, maxZoom: 64 }}
            onSurface={setSurface}
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
        />
    );
}

export { CellMesh };
