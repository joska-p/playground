import { ShaderCanvas } from '@repo/graphics/2d/react/ShaderCanvas';
import {
  useComplexity,
  useGlitch,
  useModulo,
  usePalette,
  useSeed,
  useSymbolType
} from './store/selectors';
import { SYLLABIC_FIBONACCI_FRAGMENT } from './SyllabicFibonacciMaterial';

function Atlas() {
  const seed = useSeed();
  const modulo = useModulo();
  const complexity = useComplexity();
  const symbolType = useSymbolType();
  const palette = usePalette();
  const glitch = useGlitch();

  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = seed.charCodeAt(i) + ((hash << 5) - hash);
  }
  const seedOffset = Math.abs(hash % 1000);

  return (
    <ShaderCanvas
      fragmentShader={SYLLABIC_FIBONACCI_FRAGMENT}
      onBeforeRender={({ pipeline, time }) => {
        pipeline.setUniforms({
          uTime: time,
          uGridSize: complexity,
          uModulo: modulo,
          uSymbolType: symbolType,
          uPalette: palette,
          uGlitch: glitch,
          uSeedOffset: seedOffset
        });
      }}
    />
  );
}

export { Atlas };
