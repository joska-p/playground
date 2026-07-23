import fs from 'fs';
import { features } from '../core/features.ts';
import type { FeatureSample } from '../core/types.ts';
import { CONSTANTS } from './constants.ts';

console.log('Extracting features...');

const samples = JSON.parse(fs.readFileSync(CONSTANTS.SAMPLES, 'utf-8')) as FeatureSample[];

for (const sample of samples) {
  const paths = JSON.parse(fs.readFileSync(`${CONSTANTS.JSON_DIR}/${sample.id}.json`, 'utf-8'));
  sample.point = [features.getPathCount(paths), features.getPointCount(paths)];
}

const featureNames = ['Path Count', 'Point Count'];

fs.writeFileSync(
  CONSTANTS.FEATURES,
  JSON.stringify({
    featureNames,
    samples: samples.map((sample) => ({ point: sample.point, label: sample.label }))
  })
);

fs.writeFileSync(
  CONSTANTS.FEATURES_TS,
  `import type { Features } from '../../../core/types'; export const features = ${JSON.stringify({ featureNames, samples })} as const satisfies Features;`
);

console.log('Features extracted successfully.');

export { samples };
