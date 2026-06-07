import { useGridTexture } from '../../hooks/useGridTexture.ts';
import { useCellPainting } from '../../hooks/useCellPainting.ts';
import { paintCell } from '../../stores/simulation/actions.ts';
import { useBrushMode } from '../../stores/ui/selectors.ts';
import { useCols, useRows } from '../../stores/simulation/selectors.ts';
import vertexShader from '../../shaders/cell-mesh.vert?raw';
import fragmentShader from '../../shaders/cell-mesh.frag?raw';

function CellMesh() {
  const cols = useCols();
  const rows = useRows();
  const brushMode = useBrushMode();

  const { uniforms } = useGridTexture({ cols, rows });

  const { meshRef, onPointerDown, onPointerMove, onPointerUp, onContextMenu } =
    useCellPainting(cols, rows, brushMode, paintCell);

  return (
    <mesh
      ref={meshRef} // Pass it directly
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onContextMenu={onContextMenu}
    >
      <planeGeometry args={[cols, rows]} />
      <shaderMaterial
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
      />
    </mesh>
  );
}

export { CellMesh };
