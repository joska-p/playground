import { CanvasContainer } from '@repo/graphics/react/CanvasContainer';
import { useShaderPass } from '@repo/graphics/react/useShaderPass';
import { useMemo } from 'react';
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

  // Memoize CPU-bound hash generation to preserve 60-120fps fluid calculations
  const seedOffset = useMemo(() => {
    let hash = 0;
    for (let i = 0; i < seed.length; i++) {
      hash = seed.charCodeAt(i) + ((hash << 5) - hash);
    }
    return Math.abs(hash % 1000);
  }, [seed]);

  const { canvasRef } = useShaderPass({
    fragmentShader: SYLLABIC_FIBONACCI_FRAGMENT,
    // All 7 custom uniforms are pushed every frame.
    // Resolution is handled by QuadPipeline's built-in uniform builder.
    onBeforeRender: (pipeline, time) => {
      pipeline.setUniforms({
        uTime: time,
        uGridSize: complexity,
        uModulo: modulo,
        uSymbolType: symbolType,
        uPalette: palette,
        uGlitch: glitch,
        uSeedOffset: seedOffset
      });
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

export { Atlas };
