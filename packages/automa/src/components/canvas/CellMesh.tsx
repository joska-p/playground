import { createSimulationEngine } from '@repo/automa-engine/gpu/createSimulationEngine';
import simStepShader from '@repo/automa-engine/gpu/shaders/sim-step.frag?raw';
import { createGpuRuntime } from '@repo/glaze/gpu/createGpuRuntime';
import { useCamera } from '@repo/glaze/react/useCamera';
import { useEffect, useRef } from 'react';
import { useCellPainting } from '../../hooks/useCellPainting';
import { buildStateColorArray } from '../../lib/colors';
import fragmentShader from '../../shaders/cell-mesh.frag?raw';
import gpuPaintShader from '../../shaders/gpu-paint.frag?raw';
import { automaStore, setEngine, useCols, useRows } from '../../stores/automa';

function CellMesh() {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [camera, controls] = useCamera({ minZoom: 1, maxZoom: 64 });
    const panDragging = useRef(false);
    const rows = useRows();
    const cols = useCols();

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const runtime = createGpuRuntime({ canvas, camera });
        const program = runtime.createProgram(fragmentShader);
        const engine = createSimulationEngine(
            runtime.gl,
            cols,
            rows,
            simStepShader,
            gpuPaintShader
        );
        setEngine(engine);

        const unsubscribe = runtime.subscribe(() => {
            const { engine: current, stateColors } = automaStore.getState();
            if (!current) return;
            program.setUniforms({
                gridTexture: current.getDisplayTexture(),
                stateColors: buildStateColorArray(stateColors),
                texelSize: [1 / current.width, 1 / current.height]
            });
            runtime.renderProgram(program);
        });

        return () => {
            unsubscribe();
            engine.destroy();
            program.destroy();
            runtime.destroy();
            setEngine(null);
        };
    }, [camera, canvasRef, cols, rows]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        return controls.attachWheel(canvas);
    }, [canvasRef, controls]);

    const {
        onPointerDown: onPaintDown,
        onPointerMove: onPaintMove,
        onPointerUp: onPaintUp,
        onContextMenu
    } = useCellPainting(canvasRef, { current: camera });

    const onPointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
        if (e.button === 1) {
            panDragging.current = true;
            e.currentTarget.setPointerCapture(e.pointerId);
            return;
        }
        onPaintDown(e);
    };

    const onPointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
        if (panDragging.current) {
            controls.update({ x: camera.x + e.movementX, y: camera.y + e.movementY });
            return;
        }
        onPaintMove(e);
    };

    const onPointerUp = () => {
        if (panDragging.current) {
            panDragging.current = false;
            return;
        }
        onPaintUp();
    };

    return (
        <canvas
            ref={canvasRef}
            style={{
                display: 'block',
                width: '100%',
                height: '100%'
            }}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onContextMenu={onContextMenu}
        />
    );
}

export { CellMesh };
