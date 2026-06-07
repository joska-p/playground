import { OrbitControls } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import type { OrthographicCamera } from 'three';
import { MOUSE } from 'three';
import { useCols, useRows } from '../../stores/simulation/selectors.ts';
import { useShowDebug } from '../../stores/ui/selectors.ts';
import { useCameraFit } from '../../hooks/useCameraFit.ts';
import { CellMesh } from './CellMesh.tsx';
import { GridLines } from './GridLines.tsx';

type SceneProps = {
  aliveColor: string;
  glowColor: string;
  deadColor: string;
};

function Scene({ aliveColor, glowColor, deadColor }: SceneProps) {
  const { camera } = useThree();
  const showDebug = useShowDebug();
  const cols = useCols();
  const rows = useRows();

  const orthoCamera =
    camera.type === 'OrthographicCamera'
      ? (camera as OrthographicCamera)
      : undefined;

  useCameraFit(orthoCamera, cols, rows);

  return (
    <>
      <OrbitControls
        enableRotate={false}
        enableZoom={true}
        enablePan={true}
        target={[cols / 2, rows / 2, 0]}
        mouseButtons={{
          MIDDLE: MOUSE.DOLLY,
          RIGHT: MOUSE.PAN,
        }}
      />
      <CellMesh
        aliveColor={aliveColor}
        glowColor={glowColor}
        deadColor={deadColor}
      />
      {showDebug && (
        <GridLines
          cols={cols}
          rows={rows}
        />
      )}
    </>
  );
}

export { Scene };
