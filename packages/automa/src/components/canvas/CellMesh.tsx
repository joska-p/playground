import { useGridTexture } from '../../hooks/useGridTexture.ts';
import { usePointerPaint } from '../../hooks/usePointerPaint.ts';
import { useCAStore } from '../../stores/automaton/context.ts';
import { useCols, useRows, useToolMode } from '../../stores/automaton/selectors.ts';
import { usePaintCell } from '../../stores/automaton/actions.ts';

const vertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const fragmentShader = `
uniform sampler2D gridTexture;
uniform vec3 aliveColor;
uniform vec3 deadColor;
varying vec2 vUv;
void main() {
  float val = texture2D(gridTexture, vUv).r;
  gl_FragColor = vec4(val > 0.5 ? aliveColor : deadColor, 1.0);
}
`;

type CellMeshProps = {
  aliveColor: string;
  deadColor: string;
};

function CellMesh({ aliveColor, deadColor }: CellMeshProps) {
  const store = useCAStore();
  const cols = useCols();
  const rows = useRows();
  const toolMode = useToolMode();
  const paintCell = usePaintCell();

  const { uniforms } = useGridTexture(store, cols, rows, aliveColor, deadColor);
  const { meshRef, onPointerDown, onPointerMove, onPointerUp, onContextMenu } =
    usePointerPaint(cols, rows, toolMode, paintCell);

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
