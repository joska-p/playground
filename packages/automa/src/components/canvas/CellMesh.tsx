import { getCreature } from '../../core/creature/registry.ts';
import { getShader } from '../../core/shaders/registry.ts';
import { useCellPainting } from '../../hooks/useCellPainting.ts';
import { useGridTexture } from '../../hooks/useGridTexture.ts';
import { paintCell, placePattern } from '../../stores/simulation/actions.ts';
import { useCols, useRows } from '../../stores/simulation/selectors';
import {
  useBrushMode,
  usePaletteBrush,
  useShaderId,
} from '../../stores/ui/selectors';

function CellMesh() {
  const cols = useCols();
  const rows = useRows();
  const brushMode = useBrushMode();
  const shaderId = useShaderId();
  const shader = getShader(shaderId);

  const paletteBrushId = usePaletteBrush();
  const creature = paletteBrushId
    ? (getCreature(paletteBrushId) ?? null)
    : null;

  const { uniforms } = useGridTexture({ cols, rows });

  const { meshRef, onPointerDown, onPointerMove, onPointerUp, onContextMenu } =
    useCellPainting(cols, rows, brushMode, paintCell, creature, placePattern);

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
