import {
    SimulationEngine,
    getSimulationEngine,
    setSimulationEngine
} from '../../engine/gpu/SimulationEngine';
import simStepShader from '../../engine/gpu/shaders/sim-step.frag?raw';
import type { GpuSurface } from '@repo/glaze/gpu/GpuSurface';
import { GpuCanvas } from '@repo/glaze/react/GpuCanvas';
import { useCellPainting } from '../../hooks/useCellPainting';
import { buildStateColorArray } from '../../lib/colors';
import fragmentShader from '../../shaders/cell-mesh.frag?raw';
import gpuPaintShader from '../../shaders/gpu-paint.frag?raw';
import { automaStore } from '../../stores/automa';

const GRID_ROWS = 300;
const GRID_COLS = 400;

function CellMesh() {
    const interactions = useCellPainting();

    const handleOnSurface = (surface: GpuSurface) => {
        // Détruit l'instance existante s'il y en a une
        const currentEngine = getSimulationEngine();
        currentEngine.destroy();

        const buffer = surface.createStateBuffer(GRID_ROWS, GRID_COLS);
        const simulationEngine = new SimulationEngine(buffer, simStepShader, gpuPaintShader, {
            rows: GRID_ROWS,
            cols: GRID_COLS
        });

        setSimulationEngine(simulationEngine);
    };

    return (
        <GpuCanvas
            className="h-full w-full"
            canvasInteractions={{ pan: { button: 1 }, ...interactions }}
            initialCamera={{ minZoom: 1, maxZoom: 64 }}
            onSurface={handleOnSurface}
            fragmentShader={fragmentShader}
            uniforms={() => {
                const simulationEngine = getSimulationEngine();
                const { stateColors } = automaStore.getState();
                return {
                    gridTexture: simulationEngine.getDisplayTexture(),
                    stateColors: buildStateColorArray(stateColors),
                    texelSize: [1 / simulationEngine.width, 1 / simulationEngine.height]
                };
            }}
        />
    );
}

export { CellMesh };
