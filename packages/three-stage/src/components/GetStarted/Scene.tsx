import { OrbitControls } from '@react-three/drei';
import { GradientBackground } from './GradientBackground';
import { GroupComponent } from './GroupComponent';

function Scene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <hemisphereLight args={['white', 'darkgray', 1]} />
      <GroupComponent />
      <GradientBackground />
      <OrbitControls enableDamping />
    </>
  );
}

export { Scene };
