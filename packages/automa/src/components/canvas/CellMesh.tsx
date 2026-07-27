import { getCreature } from '@repo/automa-engine/creature/registry';
import { useInteractiveCanvas } from '@repo/graphics/react/useInteractiveCanvas';
import { useShaderRunner } from '@repo/graphics/react/useShaderRunner';
import { useEffect } from 'react';
import { useCellPainting } from '../../hooks/useCellPainting';
import { useGridTexture } from '../../hooks/useGridTexture';
import fragmentShader from '../../shaders/cell-mesh.frag?raw';
import { paintCell, placePattern } from '../../stores/simulation/actions';
import { useCols, useRows } from '../../stores/simulation/selectors';
import { useBrushMode, usePaletteBrush } from '../../stores/ui/selectors';

function CellMesh() {
  const cols = useCols();
  const rows = useRows();
  const brushMode = useBrushMode();
  const paletteBrushId = usePaletteBrush();
  const creature = paletteBrushId ? (getCreature(paletteBrushId) ?? null) : null;

  const { canvasRef, runnerRef } = useShaderRunner(fragmentShader);

  const { onBeforeRender } = useGridTexture({
    runnerRef,
    cols,
    rows
  });

  // Attach interactive panning/zooming
  useInteractiveCanvas(canvasRef);

  useEffect(() => {
    const runner = runnerRef.current;
    if (!runner) return;

    runner.start((time) => {
      onBeforeRender(time);
    });

    return () => {
      runner.stop();
    };
  }, [onBeforeRender, runnerRef]);

  const { onPointerDown, onPointerMove, onPointerUp, onContextMenu } = useCellPainting(
    cols,
    rows,
    brushMode,
    paintCell,
    creature,
    placePattern
  );

  return (
    <canvas
      ref={canvasRef}
      style={{
        display: 'block',
        width: '100%',
        height: '100%',
        transformOrigin: 'center center',
        cursor: brushMode === 'erase' ? 'crosshair' : 'cell'
      }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onContextMenu={onContextMenu}
    />
  );
}

export { CellMesh };
