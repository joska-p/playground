import fs from 'fs';
import path from 'path';
import { createCanvas } from 'canvas';
import { drawPaths } from './draw-paths.ts';
import type { Paths } from './draw-paths.ts';
import { CONSTANTS } from './constants.ts';
import { printProgress } from './utils.ts';

fs.mkdirSync(CONSTANTS.JSON_DIR, { recursive: true });
fs.mkdirSync(CONSTANTS.IMG_DIR, { recursive: true });

const fileNames = fs.readdirSync(CONSTANTS.RAW_DIR);
const samples = [];
let id = 1;

fileNames.forEach((fileName) => {
  const fileContent = fs.readFileSync(
    path.join(CONSTANTS.RAW_DIR, fileName),
    'utf8'
  );
  const { session, student, drawings } = JSON.parse(fileContent);

  for (const label in drawings) {
    samples.push({
      id,
      label,
      student_name: student,
      student_id: session,
    });

    const paths = drawings[label];
    fs.writeFileSync(
      path.join(CONSTANTS.JSON_DIR, `${id}.json`),
      JSON.stringify(paths)
    );

    generateImageFile(path.join(CONSTANTS.IMG_DIR, `${id}.png`), paths);

    printProgress({ count: id, max: fileNames.length * 8 });
    id++;
  }
});

fs.writeFileSync(CONSTANTS.SAMPLE, JSON.stringify(samples));

fs.writeFileSync(
  CONSTANTS.SAMPLES_TS,
  `export const samples = ${JSON.stringify(samples)} as const;`
);

function generateImageFile(outFile: string, paths: Paths) {
  const canvas = createCanvas(400, 400);
  const ctx = canvas.getContext('2d');
  drawPaths({ ctx, paths });

  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync(outFile, buffer);
}
