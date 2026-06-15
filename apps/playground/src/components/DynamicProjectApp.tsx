import { App as AutomaApp } from '@repo/automa';
import { App as GraphifyApp } from '@repo/graph-viz';
import { App as ImageManipulatorApp } from '@repo/image-manipulator';
import { App as PipelineApp } from '@repo/image-pipeline/App';
import { App as ParticlesApp } from '@repo/image-to-particles';
import { App as MosaicApp } from '@repo/mosaic-maker';
import { App as PaletteApp } from '@repo/palette-generator';
import { App as RandomArtApp } from '@repo/randomart';
import { App as SequenceApp } from '@repo/sequence-renderer';
import { App as ThreeStageApp } from '@repo/three-stage';
import React from 'react';

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
  return <Component />;
}
