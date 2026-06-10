import { Canvas } from '@react-three/fiber';
import { useStore } from 'zustand';
import {
  CAMERA_FAR,
  CAMERA_FOV,
  CAMERA_NEAR,
  CAMERA_Z,
} from '../../core/config';
import { uiStore } from '../../stores/ui/store';
import { Scene } from './Scene.tsx';

type CACanvasProps = {
  className?: string;
};

function AutomatonCanvas({ className }: CACanvasProps) {
  const stateColors = useStore(uiStore, (s) => s.stateColors);

  return (
    <div
      className={className}
      style={
        {
          width: '100%',
          height: '100%',
          touchAction: 'manipulation',
          '--ca-alive': stateColors[1] ?? '#d97706',
          '--ca-dead': stateColors[0] ?? '#070a14',
        } as React.CSSProperties
      }
    >
      <Canvas
        orthographic
        camera={{
          fov: CAMERA_FOV,
          near: CAMERA_NEAR,
          far: CAMERA_FAR,
          position: [0, 0, CAMERA_Z],
        }}
        gl={{
          preserveDrawingBuffer: true,
          powerPreference: 'high-performance',
        }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}

export { AutomatonCanvas };
export type { CACanvasProps };
