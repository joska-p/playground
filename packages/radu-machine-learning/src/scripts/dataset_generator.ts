import fs from 'fs';
import path from 'path';
import type { Label, RawSample, Sample } from '../core/types.ts';
import { CONSTANTS } from './constants.ts';
import { generateSVG } from './generate-svg.ts';
import { printProgress } from './utils.ts';

fs.mkdirSync(CONSTANTS.JSON_DIR, { recursive: true });
fs.mkdirSync(CONSTANTS.IMG_DIR, { recursive: true });
fs.mkdirSync(CONSTANTS.TS_OBJECTS, { recursive: true });

const fileNames = fs.readdirSync(CONSTANTS.RAW_DIR_SUBSET);

const samples: Sample[] = [];
let id = 1;

fileNames.forEach((fileName) => {
  const fileContent = fs.readFileSync(path.join(CONSTANTS.RAW_DIR, fileName), 'utf8');
  const { session, student, drawings } = JSON.parse(fileContent) as RawSample;

  for (const [label, paths] of Object.entries(drawings)) {
    samples.push({
      id,
      label: label as Label,
      student_name: student,
      student_id: session
    });

    fs.writeFileSync(path.join(CONSTANTS.JSON_DIR, `${String(id)}.json`), JSON.stringify(paths));

    const svgPath = path.join(CONSTANTS.IMG_DIR, `${String(id)}.svg`);
    const svgContent = generateSVG({ paths });
    fs.writeFileSync(svgPath, svgContent);

    printProgress({ count: id, max: fileNames.length * 8 });
    id++;
  }
});

// Save the raw JSON data if needed
fs.writeFileSync(CONSTANTS.SAMPLES, JSON.stringify(samples));

// 2. Write the perfectly pre-grouped data directly to your TS file!
fs.writeFileSync(
  CONSTANTS.SAMPLES_TS,
  `import type { Sample } from '../../../core/types'; export const samples = ${JSON.stringify(samples)} as const satisfies Sample[];`
);
