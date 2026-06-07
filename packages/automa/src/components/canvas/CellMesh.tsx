import { useGridTexture } from '../../hooks/useGridTexture.ts';
import { useCellPainting } from '../../hooks/useCellPainting.ts';
import { paintCell } from '../../stores/simulation/actions.ts';
import { useBrushMode } from '../../stores/ui/selectors.ts';
import {
  useCols,
  useRows,
  useGrid,
  useGeneration,
} from '../../stores/simulation/selectors.ts';
import vertexShader from '../../shaders/cell-mesh.vert?raw';
import fragmentShader from '../../shaders/cell-mesh.frag?raw';

type CellMeshProps = {
  aliveColor: string;
  glowColor: string;
  deadColor: string;
};

function CellMesh({ aliveColor, glowColor, deadColor }: CellMeshProps) {
  const cols = useCols();
  const rows = useRows();
  const brushMode = useBrushMode();
  const grid = useGrid();
  const generation = useGeneration();

  const { uniforms } = useGridTexture(
    grid,
    generation,
    cols,
    rows,
    aliveColor,
    glowColor,
    deadColor
  );
  const { meshRef, onPointerDown, onPointerMove, onPointerUp, onContextMenu } =
    useCellPainting(cols, rows, brushMode, paintCell);

  return (
    <mesh
      ref={meshRef}
      position={[cols / 2, rows / 2, 0]}
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
