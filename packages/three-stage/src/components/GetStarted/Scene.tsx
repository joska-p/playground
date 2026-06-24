import { OrbitControls } from '@react-three/drei';
import { GradientBackground } from './GradientBackground';
import { Root } from './Root';

function Scene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <hemisphereLight args={['white', 'darkgray', 1]} />
      <Root />
      <GradientBackground />
      <OrbitControls enableDamping />
    </>
  );
}

export { Scene };
