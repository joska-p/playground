import { OrbitControls } from '@react-three/drei';
import { controls } from '../../../config';
import { useFlyAnimation } from '../hooks/useFlyAnimation';

type CameraControllerProps = {
  selectedCommunityId: number | null;
};

function CameraController({ selectedCommunityId }: CameraControllerProps) {
  const { controlsRef, flyActive, autoRotate, controlsEnabled } =
    useFlyAnimation(selectedCommunityId);

  return (
    <OrbitControls
      ref={controlsRef}
      enableDamping
      dampingFactor={controls.dampingFactor}
      autoRotate={!flyActive && autoRotate}
      autoRotateSpeed={controls.autoRotateSpeed}
      minDistance={controls.minDistance}
      maxDistance={controls.maxDistance}
      enabled={controlsEnabled}
    />
  );
}

export { CameraController };
