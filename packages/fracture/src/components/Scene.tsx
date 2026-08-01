import { ShaderCanvas } from '@repo/graphics/2d/react/ShaderCanvas';
import fragmentShader from '../core/mandelbrot.glsl?raw';
import { splitDouble } from '../core/doubleSplit';
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

function Scene() {
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
      onBeforeRender={({ pipeline, view }) => {
        // Map the interaction view onto the complex-plane center the shader
        // expects. With the shader's convention
        //   c = (uvCoord - 0.5) · (3 / zoom) + center
        // the center is (3·panNorm − 0.5, 3·panNorm.y), where panNorm is the
        // pan offset normalized by the canvas size (y-up).
        const panNormX = -view.pan.x / view.canvasWidth;
        const panNormY = view.pan.y / view.canvasHeight;
        const centerRe = 3.0 * panNormX - 0.5;
        const centerIm = 3.0 * panNormY;

        // Split each float64 center component into a double-single (hi, lo)
        // pair of float32s (~48 bits) before uploading, so the GPU can keep
        // the center exact at zoom levels far beyond float32.
        const [centerReHi, centerReLo] = splitDouble(centerRe);
        const [centerImHi, centerImLo] = splitDouble(centerIm);

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
          u_chromaScale: chromaScale,
          u_centerRe: [centerReHi, centerReLo],
          u_centerIm: [centerImHi, centerImLo]
        });
      }}
      interactionOptions={{
        maxZoom: 1e11,
        zoomToCursor: true,
        scalePanWithZoom: true,
        zoomSpeed: 250
      }}
    />
  );
}

export { Scene };
