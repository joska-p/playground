import { ShaderCanvas } from '@repo/graphics/2d/react/ShaderCanvas';
import fragmentShader from '../core/mandelbrot-original.glsl?raw';
import {
  useInteriorScale,
  useIterationBase,
  useIterationCap,
  useIterationScale,
  usePixelEps,
  useAmbientLight,
  useBumpHeight,
  useChromaScale,
  useHueFrequency,
  useHueShift,
  useSunAngle
} from '../stores/store';

function OriginalScene() {
  const interiorScale = useInteriorScale();
  const iterationBase = useIterationBase();
  const iterationCap = useIterationCap();
  const iterationScale = useIterationScale();
  const pixelEps = usePixelEps();
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
      onBeforeRender={({ pipeline }) => {
        pipeline.setUniforms({
          u_iterationBase: iterationBase,
          u_iterationScale: iterationScale,
          u_iterationCap: iterationCap,
          u_interiorScale: interiorScale,
          u_pixelEps: pixelEps,
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
        zoomToCursor: true
      }}
    />
  );
}

export { OriginalScene };
