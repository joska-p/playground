import { OrbitControls } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import { useEffect } from 'react';
import { MOUSE } from 'three';
import { useCols, useRows } from '../../stores/simulation/selectors.ts';
import { useShowDebug } from '../../stores/ui/selectors.ts';
import { useCameraFitter } from '../../hooks/useCameraFitter.ts';
import { CellMesh } from './CellMesh.tsx';
import { GridLines } from './GridLines.tsx';

function Scene() {
  const showDebug = useShowDebug();
  const cols = useCols();
  const rows = useRows();
  const webGlRenderer = useThree((s) => s.gl);

  useEffect(() => {
    webGlRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  }, [webGlRenderer]);

  useCameraFitter(cols, rows);

  return (
    <>
      <OrbitControls
        enableRotate={false}
        enableZoom={true}
        enablePan={true}
        target={[0, 0, 0]}
        mouseButtons={{
          MIDDLE: MOUSE.DOLLY,
          RIGHT: MOUSE.PAN,
        }}
      />
      <CellMesh />
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
