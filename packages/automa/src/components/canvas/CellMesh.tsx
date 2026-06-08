import { useGridTexture } from '../../hooks/useGridTexture.ts';
import { useCellPainting } from '../../hooks/useCellPainting.ts';
import { paintCell, placePattern } from '../../stores/simulation/actions.ts';
import {
  useBrushMode,
  useShaderId,
  usePaletteBrush,
} from '../../stores/ui/selectors.ts';
import { useCols, useRows } from '../../stores/simulation/selectors.ts';
import { getShader } from '../../core/shaders/registry.ts';
import { getCreature } from '../../core/creature/registry.ts';

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
