import type { ThreeEvent } from '@react-three/fiber';
import { getCreature } from '@repo/automa-engine/discrete/creature/registry';
import { useCallback } from 'react';
import { useCellPainting } from '../../hooks/useCellPainting';
import { useGridTexture } from '../../hooks/useGridTexture';
import { getShader } from '../../shaders/registry';
import { paintCell, placePattern } from '../../stores/simulation/actions';
import { useCols, useRows } from '../../stores/simulation/selectors';
import {
  useBrushMode,
  usePaletteBrush,
  useShaderId
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

  const { meshRef, onPointerDown, onPointerUp, onContextMenu } =
    useCellPainting(cols, rows, brushMode, paintCell, creature, placePattern);

  const onPointerMove = useCallback(
    (e: ThreeEvent<PointerEvent>) => {
      uniforms.mouse.value.set(
        (e.point.x + cols / 2) / cols,
        (e.point.y + rows / 2) / rows
      );
    },
    [uniforms, cols, rows]
  );

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
        key={shaderId}
        uniforms={uniforms}
        vertexShader={shader.vert}
        fragmentShader={shader.frag}
      />
    </mesh>
  );
}

export { CellMesh };
