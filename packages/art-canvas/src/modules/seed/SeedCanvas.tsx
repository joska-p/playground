import { ShaderCanvas } from '@repo/graphics/2d/react/ShaderCanvas';
import { generateShaderFromSeed } from '../../assembly/from-seed';
import { useComplexity, useMood, usePalette, useSeed } from './store';

function SeedCanvas() {
  const seed = useSeed();
  const complexity = useComplexity();
  const mood = useMood();
  const palette = usePalette();

  const fragmentShader = generateShaderFromSeed(seed, complexity, mood, palette);

  return (
    <ShaderCanvas
      fragmentShader={fragmentShader}
      onBeforeRender={({ pipeline, time }) => {
        pipeline.setUniforms({ u_time: time });
      }}
    />
  );
}

export { SeedCanvas };
