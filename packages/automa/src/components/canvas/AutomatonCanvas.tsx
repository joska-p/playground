import { Canvas } from '@react-three/fiber';
import { Scene } from './Scene.tsx';
import {
  CAMERA_Z,
  CAMERA_NEAR,
  CAMERA_FAR,
  COLOR_ALIVE,
  COLOR_DEAD,
} from '../../core/config.ts';

type CACanvasProps = {
  className?: string;
};

function AutomatonCanvas({ className }: CACanvasProps) {
  return (
    <div
      className={className}
      style={
        {
          width: '100%',
          height: '100%',
          touchAction: 'manipulation',
          '--ca-alive': COLOR_ALIVE,
          '--ca-dead': COLOR_DEAD,
        } as React.CSSProperties
      }
    >
      <Canvas
        orthographic
        camera={{
          position: [0, 0, CAMERA_Z],
          near: CAMERA_NEAR,
          far: CAMERA_FAR,
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
