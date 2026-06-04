import { ALL_MANIPULATIONS } from '@repo/image-pipeline/manipulations';

const pixelManipulations = ALL_MANIPULATIONS.filter((m) => m.type === 'pixel');

const manipulationsIds = pixelManipulations.map(
  (m) => m.id
) as readonly string[];

type ArgDefinition = {
  key: string;
  label: string;
  min: number;
  max: number;
  step: number;
};

const manipulations: Record<
  string,
  {
    name: string;
    description: string;
    defaultArgs: Record<string, number>;
    argDefinitions: ArgDefinition[];
  }
> = {};
for (const m of pixelManipulations) {
  manipulations[m.id] = {
    name: m.ui.name,
    description: m.ui.description,
    defaultArgs: m.ui.defaultArgs,
    argDefinitions: m.ui.argDefinitions,
  };
}

type ManipulationId = string;

export { manipulations, manipulationsIds };
export type { ArgDefinition, ManipulationId };
