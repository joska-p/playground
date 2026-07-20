import fs from 'fs';
import { features } from '../core/features.ts';
import { CONSTANTS } from './constants.ts';

const samples = JSON.parse(fs.readFileSync(CONSTANTS.SAMPLES, 'utf-8'));

for (const sample of samples) {
  const paths = JSON.parse(fs.readFileSync(`${CONSTANTS.JSON_DIR}/${sample.id}.json`, 'utf-8'));
  sample.point = [features.getPathCount(paths), features.getPointCount(paths)];
}

export { samples };
