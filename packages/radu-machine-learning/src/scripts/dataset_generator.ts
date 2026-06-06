import fs from 'fs';
import path from 'path';
import { generateSVG } from './generate-svg.ts';
import { CONSTANTS } from './constants.ts';
import { printProgress } from './utils.ts';

fs.mkdirSync(CONSTANTS.JSON_DIR, { recursive: true });
fs.mkdirSync(CONSTANTS.IMG_DIR, { recursive: true });

type Drawing = {
  id: number;
  label: string;
  paths: [number, number][][];
};

type Samples = {
  student_id: string;
  student_name: string;
  drawings: Drawing[];
};

const fileNames = fs.readdirSync(CONSTANTS.RAW_DIR);

const samplesMap: Record<string, Samples> = {};
let id = 1;

fileNames.forEach((fileName) => {
  const fileContent = fs.readFileSync(
    path.join(CONSTANTS.RAW_DIR, fileName),
    'utf8'
  );
  const { session, student, drawings } = JSON.parse(fileContent);

  if (!samplesMap[session]) {
    samplesMap[session] = {
      student_id: String(session),
      student_name: student,
      drawings: [],
    };
  }

  for (const label in drawings) {
    const paths = drawings[label];

    // Push the sample directly into that specific student's sample array
    samplesMap[session].drawings.push({
      id,
      label,
      paths,
    });

    fs.writeFileSync(
      path.join(CONSTANTS.JSON_DIR, `${id}.json`),
      JSON.stringify(paths)
    );

    const svgPath = path.join(CONSTANTS.IMG_DIR, `${id}.svg`);
    const svgContent = generateSVG({ paths });
    fs.writeFileSync(svgPath, svgContent);

    printProgress({ count: id, max: fileNames.length * 8 });
    id++;
  }
});

// Convert the map back into a clean array of students for easy rendering
const samplesArray = Object.values(samplesMap);

// Save the raw JSON data if needed
fs.writeFileSync(CONSTANTS.SAMPLE, JSON.stringify(samplesArray));

// 2. Write the perfectly pre-grouped data directly to your TS file!
fs.writeFileSync(
  CONSTANTS.SAMPLES_TS,
  `export const samples = ${JSON.stringify(samplesArray)} as const;`
);
