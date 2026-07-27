import { CanvasContainer } from '@repo/graphics/react/CanvasContainer';
import { useShaderPass } from '@repo/graphics/react/useShaderPass';
import { useRef } from 'react';
import { manual } from './manual';
import { useChroma, useDivisions, useIsPlaying, useLightness } from './store';

function Manual() {
  const isPlaying = useIsPlaying();
  const divisions = useDivisions();
  const lightness = useLightness();
  const chroma = useChroma();

  // Accumulated animation time — only advances when isPlaying is true.
  const accTimeRef = useRef(0);
  const lastTickRef = useRef<number | null>(null);

  const { canvasRef } = useShaderPass({
    fragmentShader: manual.fragmentShader,
    onBeforeRender: (pipeline, time) => {
      // Accumulate delta time only while playing, matching the original useFrame(_, delta) logic.
      if (isPlaying) {
        if (lastTickRef.current !== null) {
          accTimeRef.current += time - lastTickRef.current;
        }
        lastTickRef.current = time;
      } else {
        lastTickRef.current = null;
      }

      // Push all custom uniforms every frame — closure always captures latest Zustand values.
      pipeline.setUniforms({
        uDivisions: divisions,
        uLightness: lightness,
        uChroma: chroma,
        uTime: accTimeRef.current
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

export { Manual };
