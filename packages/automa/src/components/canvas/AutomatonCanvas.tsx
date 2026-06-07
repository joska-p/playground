import { Canvas } from '@react-three/fiber';
import { Scene } from './Scene.tsx';
import {
  COLOR_ALIVE,
  COLOR_GLOW,
  COLOR_DEAD,
  CAMERA_Z,
  CAMERA_NEAR,
  CAMERA_FAR,
} from '../../config.ts';

type CACanvasProps = {
  aliveColor?: string;
  glowColor?: string;
  deadColor?: string;
  className?: string;
};

function AutomatonCanvas({
  aliveColor = COLOR_ALIVE,
  glowColor = COLOR_GLOW,
  deadColor = COLOR_DEAD,
  className,
}: CACanvasProps) {
  return (
    <div
      className={className}
      style={
        {
          width: '100%',
          height: '100%',
          touchAction: 'manipulation',
          '--ca-alive': aliveColor,
          '--ca-dead': deadColor,
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
        gl={{ preserveDrawingBuffer: true }}
      >
        <Scene
          aliveColor={aliveColor}
          glowColor={glowColor}
          deadColor={deadColor}
        />
      </Canvas>
    </div>
  );
}

export { AutomatonCanvas };
export type { CACanvasProps };
