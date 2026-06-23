import { useFrame, useThree } from '@react-three/fiber';
import { useRef } from 'react';
import type {
  MeshBasicMaterial,
  OrthographicCamera,
  Scene,
  ShaderMaterial,
  Texture,
  WebGLRenderTarget
} from 'three';

type SimulationRendererProps = {
  simObjects: React.RefObject<{
    scene: Scene;
    camera: OrthographicCamera;
    material: ShaderMaterial;
  } | null>;
  writeBuffer: React.RefObject<WebGLRenderTarget>;
  readBuffer: React.RefObject<WebGLRenderTarget>;
  swapBuffers: () => void;
  updateGridTexture: (texture: Texture) => void;
  shouldUpdate: (currentTime: number) => boolean;
  displayMaterialRef: React.RefObject<MeshBasicMaterial | null>;
};

export const SimulationRenderer = ({
  simObjects,
  writeBuffer,
  readBuffer,
  swapBuffers,
  updateGridTexture,
  shouldUpdate,
  displayMaterialRef
}: SimulationRendererProps) => {
  const { gl } = useThree();
  const isFirstFrame = useRef(true); // Track if we need to preserve initial texture

  useFrame((state) => {
    if (!simObjects.current) return;
    const { scene: simScene, camera: simCamera } = simObjects.current;

    const currentTime = state.clock.getElapsedTime();

    if (shouldUpdate(currentTime)) {
      // 1. Only overwrite the texture uniform if it's NOT the first frame.
      // On the first frame, we let it use the initialTexture set by useSimulationScene.
      if (!isFirstFrame.current) {
        updateGridTexture(readBuffer.current.texture);
      } else {
        isFirstFrame.current = false;
      }

      // 2. Render simulation into the write buffer
      gl.setRenderTarget(writeBuffer.current);
      gl.render(simScene, simCamera);
      gl.setRenderTarget(null);

      // 3. Update the visible screen mesh with the freshly rendered state
      if (displayMaterialRef.current) {
        displayMaterialRef.current.map = writeBuffer.current.texture;
      }

      // 4. Swap them so write becomes read for the next cycle
      swapBuffers();
    }
  });

  return null;
};
