import { ShaderCanvas } from '@repo/graphics/2d/react/ShaderCanvas';
import fragmentShader from '../core/mandelbrot.glsl?raw';
import {
  useAmbientLight,
  useBumpHeight,
  useChromaScale,
  useHueFrequency,
  useHueShift,
  useSunAngle
} from '../stores/store';

function Scene() {
  const ambientLight = useAmbientLight();
  const bumpHeight = useBumpHeight();
  const chromaScale = useChromaScale();
  const hueFrequency = useHueFrequency();
  const hueShift = useHueShift();
  const sunAngle = useSunAngle();

  return (
    <ShaderCanvas
      interactive
      fragmentShader={fragmentShader}
      webGLContextAttributes={{ antialias: true }}
      onBeforeRender={(pipeline) => {
        pipeline.setUniforms({
          u_sunAngle: sunAngle,
          u_bumpHeight: bumpHeight,
          u_ambient: ambientLight,
          u_hueShift: hueShift,
          u_hueFrequency: hueFrequency,
          u_chromaScale: chromaScale
        });
      }}
      interactionOptions={{
        maxZoom: 1e6,
        zoomToCursor: true,
        scalePanWithZoom: true,
        zoomSpeed: 250
      }}
    />
  );
}

export { Scene };
