import { CanvasContainer } from '@repo/graphics/react/CanvasContainer';
import { useShaderPass } from '@repo/graphics/react/useShaderPass';
import { generateShaderFromSeed } from '../../assembly/from-seed';
import { useComplexity, useMood, usePalette, useSeed } from './store';

function SeedCanvas() {
  const seed = useSeed();
  const complexity = useComplexity();
  const mood = useMood();
  const palette = usePalette();

  // Assembly engine is completely unchanged — still produces GLSL 300 ES.
  const fragmentShader = generateShaderFromSeed(seed, complexity, mood, palette);

  const { canvasRef } = useShaderPass({
    fragmentShader,
    // u_mouse and u_resolution are handled by the built-in uniform builder.
    // Only u_time needs to be pushed manually each frame.
    onBeforeRender: (pipeline, time) => {
      pipeline.setUniforms({ u_time: time });
    }
  });

  return (
    <CanvasContainer>
      <canvas
        ref={canvasRef}
        style={{ width: '100%', height: '100%', display: 'block' }}
      />
    </CanvasContainer>
  );
}

export { SeedCanvas };
