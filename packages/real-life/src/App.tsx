import { Canvas } from '@react-three/fiber';
import { ContinuousAutomaton } from './components/ContinuousAutomaton';

function App() {
  return (
    <div className="h-screen w-full">
      <Canvas>
        <ContinuousAutomaton />
      </Canvas>
    </div>
  );
}

export { App };
