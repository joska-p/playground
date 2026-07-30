import { creatures } from '@repo/automa-engine/creature/registry';
import { useFrame } from '@repo/graphics/react/FrameLoopContext';
import { useInteractiveCanvas } from '@repo/graphics/react/useInteractiveCanvas';
import { useShaderRunner } from '@repo/graphics/react/useShaderRunner';
import { useEffect, useRef } from 'react';
import { SimulationEngine } from '../../engine/SimulationEngine';
import { setEngine } from '../../engine/registry';
import { useCellPainting } from '../../hooks/useCellPainting';
import { useSimulationUniforms } from '../../hooks/useSimulationUniforms';
import fragmentShader from '../../shaders/cell-mesh.frag?raw';
import gpuPaintShader from '../../shaders/gpu-paint.frag?raw';
import simStepShader from '../../shaders/sim-step.frag?raw';
import {
  paintCell,
  placePattern,
  useBrushMode,
  useCols,
  usePaletteBrush,
  useRows
} from '../../stores/automa';

function CellMesh() {
  const cols = useCols();
  const rows = useRows();
  const brushMode = useBrushMode();
  const paletteBrushId = usePaletteBrush();
  const creature = paletteBrushId;
  const engineCreated = useRef(false);
  const { canvasRef, runnerRef } = useShaderRunner(fragmentShader);
  const interactionState = useInteractiveCanvas(canvasRef);
  const { onBeforeRenderRef } = useSimulationUniforms({
    runnerRef,
    cols,
    rows,
    interactionState
  });

  useEffect(() => {
    const runner = runnerRef.current;
    if (!runner) return;

    const gl = runner.ctx.gl;
    const engine = new SimulationEngine(gl, cols, rows, simStepShader, gpuPaintShader);
    setEngine(engine);
    engineCreated.current = true;

    return () => {
      engine.destroy();
      setEngine(null);
      engineCreated.current = false;
    };
    // Intentionally run once on mount — the engine is reused for its lifetime.
    // Dimension changes are handled by init() → onEngineReady, which resizes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useFrame((time) => {
    onBeforeRenderRef.current?.(time);
    runnerRef.current?.render();
  });

  const { onPointerDown, onPointerMove, onPointerUp, onContextMenu } = useCellPainting(
    cols,
    rows,
    brushMode,
    paintCell,
    creature,
    placePattern,
    canvasRef,
    interactionState
  );

  return (
    <canvas
      ref={canvasRef}
      style={{
        display: 'block',
        width: '100%',
        height: '100%',
        transformOrigin: 'center center',
        cursor: brushMode === 'erase' ? 'crosshair' : 'pointer'
      }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onContextMenu={onContextMenu}
    />
  );
}

export { CellMesh };
