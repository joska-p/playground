import { Canvas } from '@react-three/fiber';
import { Scene } from './Scene.tsx';

type CACanvasProps = {
  aliveColor?: string;
  glowColor?: string;
  deadColor?: string;
  className?: string;
};

function AutomatonCanvas({
  aliveColor = '#d97706',
  glowColor = '#fbbf24',
  deadColor = '#070a14',
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
        camera={{ position: [0, 0, 10], near: 0.1, far: 100 }}
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
