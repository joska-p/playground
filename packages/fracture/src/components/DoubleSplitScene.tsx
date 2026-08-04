import { useEffect } from 'react';
import { ShaderCanvas } from '@repo/graphics/2d/react/ShaderCanvas';
import fragmentShader from '../core/mandelbrot-double-split.glsl?raw';
import { splitDouble } from '../core/doubleSplit';
import { useParams } from '../stores/createParamStore';
import { doubleSplitStore } from '../stores/doubleSplitStore';
import { setView, useRenderer, useViewPan, useViewZoom } from '../stores/viewStore';

const MAX_ZOOM = 1e11;

function DoubleSplitScene() {
  const params = useParams(doubleSplitStore);

  const renderer = useRenderer();
  const isActive = renderer === 'double-single';
  const pan = useViewPan();
  const zoom = useViewZoom();

  // Other renderers can zoom deeper than this one supports; clamp on activation.
  useEffect(() => {
    if (isActive && zoom > MAX_ZOOM) {
      setView({ pan, zoom: MAX_ZOOM });
    }
  }, [isActive, pan, zoom]);

  return (
    <ShaderCanvas
      fragmentShader={fragmentShader}
      webGLContextAttributes={{ antialias: true }}
      initialView={{ pan, zoom }}
      maxZoom={MAX_ZOOM}
      zoomToCursor
      scalePanWithZoom
      zoomSpeed={250}
      onViewChange={(view) => {
        setView({ pan: view.pan, zoom: view.zoom });
      }}
      onBeforeRender={({ pipeline, view }) => {
        // Map the interaction view onto the complex-plane center the shader
        // expects. With the shader's convention
        //   c = (uvCoord - 0.5) · (3 / zoom) + center
        // the center is (−3·panNormX − 0.5, 3·panNormY), where panNorm is the
        // pan offset normalized by the canvas size. pan is a drag offset, so it
        // must move opposite the cursor (content-follows); y is flipped by the
        // canvas→vUv conversion, so it enters positive.
        const panNormX = view.pan.x / view.canvasWidth;
        const panNormY = view.pan.y / view.canvasHeight;
        const aspect = view.canvasWidth / view.canvasHeight;
        const centerRe = -3.0 * aspect * panNormX - 0.5;
        const centerIm = 3.0 * panNormY;

        // Split each float64 center component into a double-single (hi, lo)
        // pair of float32s (~48 bits) before uploading, so the GPU can keep
        // the center exact at zoom levels far beyond float32.
        const [centerReHi, centerReLo] = splitDouble(centerRe);
        const [centerImHi, centerImLo] = splitDouble(centerIm);

        pipeline.setUniforms({
          u_iterationBase: params.iterationBase,
          u_iterationScale: params.iterationScale,
          u_iterationCap: params.iterationCap,
          u_interiorScale: params.interiorScale,
          u_pixelEps: params.pixelEps,
          u_sunAngle: params.sunAngle,
          u_bumpHeight: params.bumpHeight,
          u_ambient: params.ambientLight,
          u_hueShift: params.hueShift,
          u_hueFrequency: params.hueFrequency,
          u_chromaScale: params.chromaScale,
          u_centerRe: [centerReHi, centerReLo],
          u_centerIm: [centerImHi, centerImLo]
        });
      }}
    />
  );
}

export { DoubleSplitScene };
