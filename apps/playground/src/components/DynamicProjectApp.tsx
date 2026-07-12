import React, { Suspense } from 'react';

const ArtCanvasApp = React.lazy(() => import('@repo/art-canvas').then((m) => ({ default: m.App })));
const AutomaApp = React.lazy(() => import('@repo/automa').then((m) => ({ default: m.App })));
const GraphifyApp = React.lazy(() => import('@repo/graph-viz').then((m) => ({ default: m.App })));
const ImageManipulatorApp = React.lazy(() =>
  import('@repo/pixel-manipulator').then((m) => ({ default: m.App }))
);
const PixelApp = React.lazy(() => import('@repo/pixel/App').then((m) => ({ default: m.App })));
const ParticlesApp = React.lazy(() =>
  import('@repo/image-to-particles').then((m) => ({ default: m.App }))
);
const MosaicApp = React.lazy(() => import('@repo/mosaic-maker').then((m) => ({ default: m.App })));
const PaletteApp = React.lazy(() =>
  import('@repo/palette-generator').then((m) => ({ default: m.App }))
);
const RandomArtApp = React.lazy(() => import('@repo/randomart').then((m) => ({ default: m.App })));
const SequenceApp = React.lazy(() =>
  import('@repo/sequence-renderer').then((m) => ({ default: m.App }))
);
const ThreeStageApp = React.lazy(() =>
  import('@repo/three-stage').then((m) => ({ default: m.App }))
);
const LSystemApp = React.lazy(() => import('@repo/l-system').then((m) => ({ default: m.App })));
const RealLifeApp = React.lazy(() => import('@repo/real-life').then((m) => ({ default: m.App })));
const RaduMLApp = React.lazy(() =>
  import('@repo/radu-machine-learning/App').then((m) => ({ default: m.App }))
);
const UIApp = React.lazy(() => import('@repo/ui/App').then((m) => ({ default: m.App })));

const components: Record<string, React.ComponentType> = {
  mosaic: MosaicApp,
  randomart: RandomArtApp,
  sequences: SequenceApp,
  palettes: PaletteApp,
  particles: ParticlesApp,
  'pixel-manipulator': ImageManipulatorApp,
  pixel: PixelApp,
  graphify: GraphifyApp,
  'three-stage': ThreeStageApp,
  automa: AutomaApp,
  'l-system': LSystemApp,
  'art-canvas': ArtCanvasApp,
  'real-life': RealLifeApp,
  'radu-machine-learning': RaduMLApp,
  ui: UIApp
};

export function DynamicProjectApp({ slug }: { slug: string }) {
  const Component = components[slug];
  return (
    <Suspense fallback={<div>Loading project...</div>}>
      <Component />
    </Suspense>
  );
}
