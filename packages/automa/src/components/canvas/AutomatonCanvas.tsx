import { Canvas } from '@react-three/fiber';
import { Scene } from './Scene.tsx';

type CACanvasProps = {
  aliveColor?: string;
  deadColor?: string;
  className?: string;
};

const AutomatonCanvas = ({
  aliveColor = '#22d3ee',
  deadColor = '#0f172a',
  className,
}: CACanvasProps) => (
  <div
    className={className}
    style={
      {
        width: '100%',
        height: '100%',
        '--ca-alive': aliveColor,
        '--ca-dead': deadColor,
      } as React.CSSProperties
    }
  >
    <Canvas
      orthographic
      camera={{ position: [0, 0, 10], near: 0.1, far: 100 }}
      gl={{ preserveDrawingBuffer: true }}
    >
      <Scene
        aliveColor={aliveColor}
        deadColor={deadColor}
      />
    </Canvas>
  </div>
);

export { AutomatonCanvas };
export type { CACanvasProps };
