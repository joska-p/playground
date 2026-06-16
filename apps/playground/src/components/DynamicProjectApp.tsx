import React, { Suspense } from 'react';

const AutomaApp = React.lazy(() =>
  import('@repo/automa').then((m) => ({ default: m.App }))
);
const GraphifyApp = React.lazy(() =>
  import('@repo/graph-viz').then((m) => ({ default: m.App }))
);
const ImageManipulatorApp = React.lazy(() =>
  import('@repo/image-manipulator').then((m) => ({ default: m.App }))
);
const PipelineApp = React.lazy(() =>
  import('@repo/image-pipeline/App').then((m) => ({ default: m.App }))
);
const ParticlesApp = React.lazy(() =>
  import('@repo/image-to-particles').then((m) => ({ default: m.App }))
);
const MosaicApp = React.lazy(() =>
  import('@repo/mosaic-maker').then((m) => ({ default: m.App }))
);
const PaletteApp = React.lazy(() =>
  import('@repo/palette-generator').then((m) => ({ default: m.App }))
);
const RandomArtApp = React.lazy(() =>
  import('@repo/randomart').then((m) => ({ default: m.App }))
);
const SequenceApp = React.lazy(() =>
  import('@repo/sequence-renderer').then((m) => ({ default: m.App }))
);
const ThreeStageApp = React.lazy(() =>
  import('@repo/three-stage').then((m) => ({ default: m.App }))
);

const components: Record<string, React.ComponentType> = {
  mosaic: MosaicApp,
  randomart: RandomArtApp,
  sequences: SequenceApp,
  palettes: PaletteApp,
  particles: ParticlesApp,
  'image-manipulator': ImageManipulatorApp,
  pipeline: PipelineApp,
  graphify: GraphifyApp,
  'three-stage': ThreeStageApp,
  automa: AutomaApp
};

export function DynamicProjectApp({ slug }: { slug: string }) {
  const Component = components[slug];
  if (!Component) return null;
  return (
    <Suspense fallback={<div>Loading project...</div>}>
      <Component />
    </Suspense>
  );
}
