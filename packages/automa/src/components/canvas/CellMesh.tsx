import { useGridTexture } from '../../hooks/useGridTexture.ts';
import { useCellPainting } from '../../hooks/useCellPainting.ts';
import { paintCell } from '../../stores/simulation/actions.ts';
import { useBrushMode, useShaderId } from '../../stores/ui/selectors.ts';
import { useCols, useRows } from '../../stores/simulation/selectors.ts';
import { getShader } from '../../core/shaders/registry.ts';

function CellMesh() {
  const cols = useCols();
  const rows = useRows();
  const brushMode = useBrushMode();
  const shaderId = useShaderId();
  const shader = getShader(shaderId);

  const { uniforms } = useGridTexture({ cols, rows });

  const { meshRef, onPointerDown, onPointerMove, onPointerUp, onContextMenu } =
    useCellPainting(cols, rows, brushMode, paintCell);

  if (!shader) return null;

  return (
    <mesh
      ref={meshRef}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onContextMenu={onContextMenu}
    >
      <planeGeometry args={[cols, rows]} />
      <shaderMaterial
        uniforms={uniforms}
        vertexShader={shader.vert}
        fragmentShader={shader.frag}
      />
    </mesh>
  );
}

export { CellMesh };
