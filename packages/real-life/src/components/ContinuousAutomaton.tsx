import { useRef } from 'react';
import type { MeshBasicMaterial } from 'three';
import { useInitialGridTexture } from '../hooks/useInitialGridTexture';
import { useSimulationBuffers } from '../hooks/useSimulationBuffers';
import { useSimulationScene } from '../hooks/useSimulationScene';
import { useThrottledUpdate } from '../hooks/useThrottledUpdate';
import { DisplayMesh } from './DisplayMesh';
import { SimulationRenderer } from './SimulationRenderer';

export function ContinuousAutomaton() {
  const size = 512;
  const initialTexture = useInitialGridTexture(size);
  const displayMaterialRef = useRef<MeshBasicMaterial>(null);

  const { readBuffer, writeBuffer, swapBuffers } = useSimulationBuffers(size);
  const { simObjects, updateGridTexture } = useSimulationScene(size, initialTexture);
  const { shouldUpdate } = useThrottledUpdate(0.1);

  return (
    <>
      <DisplayMesh displayMaterialRef={displayMaterialRef} />
      <SimulationRenderer
        simObjects={simObjects}
        writeBuffer={writeBuffer}
        readBuffer={readBuffer}
        swapBuffers={swapBuffers}
        updateGridTexture={updateGridTexture}
        shouldUpdate={shouldUpdate}
        displayMaterialRef={displayMaterialRef}
      />
    </>
  );
}
