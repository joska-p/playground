import { useGridTexture } from '../../hooks/useGridTexture.ts';
import { useCellPainting } from '../../hooks/useCellPainting.ts';
import { useCAStore } from '../../stores/automaton/context.ts';
import {
  useCols,
  useRows,
  useBrushMode,
} from '../../stores/automaton/selectors.ts';
import { usePaintCell } from '../../stores/automaton/actions.ts';
import vertexShader from '../../shaders/cell-mesh.vert?raw';
import fragmentShader from '../../shaders/cell-mesh.frag?raw';

type CellMeshProps = {
  aliveColor: string;
  glowColor: string;
  deadColor: string;
};

function CellMesh({ aliveColor, glowColor, deadColor }: CellMeshProps) {
  const store = useCAStore();
  const cols = useCols();
  const rows = useRows();
  const brushMode = useBrushMode();
  const paintCell = usePaintCell();

  const { uniforms } = useGridTexture(
    store,
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
