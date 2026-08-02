import { useFrame } from '@repo/graphics/2d/react/FrameLoopContext';
import { usePanZoom } from '@repo/graphics/2d/react/usePanZoom';
import { useShaderRunner } from '@repo/graphics/2d/react/useShaderRunner';
import { useEffect } from 'react';
import { createSimulationEngine } from '@repo/automa-engine/gpu/createSimulationEngine';
import { useCellPainting } from '../../hooks/useCellPainting';
import { useSimulationUniforms } from '../../hooks/useSimulationUniforms';
import fragmentShader from '../../shaders/cell-mesh.frag?raw';
import gpuPaintShader from '../../shaders/gpu-paint.frag?raw';
import simStepShader from '@repo/automa-engine/gpu/shaders/sim-step.frag?raw';
import { useCols, useRows, setEngine } from '../../stores/automa';

function CellMesh() {
  const { canvasRef, runnerRef } = useShaderRunner({ fragmentShader });
  const panZoomRef = usePanZoom(canvasRef);
  const { onBeforeRenderRef } = useSimulationUniforms({
    runnerRef,
    panZoomRef
  });
  const rows = useRows();
  const cols = useCols();

  useEffect(() => {
    const runner = runnerRef.current;
    if (!runner) return;

    const gl = runner.context;
    const engine = createSimulationEngine(gl, cols, rows, simStepShader, gpuPaintShader);
    setEngine(engine);

    return () => {
      engine.destroy();
      setEngine(null);
    };
  }, [cols, rows, runnerRef]);

  useFrame((time) => {
    onBeforeRenderRef.current?.(time);
    runnerRef.current?.render();
  });

  const { onPointerDown, onPointerMove, onPointerUp, onContextMenu } = useCellPainting(
    canvasRef,
    panZoomRef
  );

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
