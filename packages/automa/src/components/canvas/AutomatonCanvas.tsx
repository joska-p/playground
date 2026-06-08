import { Canvas } from '@react-three/fiber';
import { useStore } from 'zustand';
import { Scene } from './Scene.tsx';
import { CAMERA_Z, CAMERA_NEAR, CAMERA_FAR } from '../../core/config.ts';
import { uiStore } from '../../stores/ui/store.ts';

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
