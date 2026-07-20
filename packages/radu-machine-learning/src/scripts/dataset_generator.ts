import fs from 'fs';
import path from 'path';
import type { Samples } from '../core/types.ts';
import { CONSTANTS } from './constants.ts';
import { generateSVG } from './generate-svg.ts';
import { printProgress } from './utils.ts';

fs.mkdirSync(CONSTANTS.JSON_DIR, { recursive: true });
fs.mkdirSync(CONSTANTS.IMG_DIR, { recursive: true });

const fileNames = fs.readdirSync(CONSTANTS.RAW_DIR);

const samples: Samples = [];
let id = 1;

fileNames.forEach((fileName) => {
  const fileContent = fs.readFileSync(path.join(CONSTANTS.RAW_DIR, fileName), 'utf8');
  const { session, student, drawings } = JSON.parse(fileContent);

  for (const label in drawings) {
    samples.push({
      id,
      label,
      student_name: student,
      student_id: session
    });

    const paths = drawings[label];
    fs.writeFileSync(path.join(CONSTANTS.JSON_DIR, `${id}.json`), JSON.stringify(paths));

    const svgPath = path.join(CONSTANTS.IMG_DIR, `${id}.svg`);
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
  `export const samples = ${JSON.stringify(samples)} as const;`
);
