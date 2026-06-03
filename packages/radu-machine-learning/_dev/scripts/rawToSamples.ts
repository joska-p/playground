import * as fs from "node:fs/promises";
import { PATHS } from "./paths";

type Sample = {
  session: number;
  student: string;
  label: string;
  paths: number[][][];
};

const rawToSamples = async () => {
  const rawDataDir = PATHS.RAW_DATA_DIR;
  const rawFiles = await fs.readdir(rawDataDir);

  const samples: Sample[] = [];

  for (const rawFile of rawFiles) {
    const rawFilePath = `${rawDataDir}/${rawFile}`;
    const rawFileContent = await fs.readFile(rawFilePath, "utf8");
    const rawFileData = JSON.parse(rawFileContent);

    const session = rawFileData.session;
    const student = rawFileData.student;
    const drawings = rawFileData.drawings;

    for (const [label, paths] of Object.entries(drawings)) {
      samples.push({
        session,
        student,
        label,
        paths: paths as number[][][],
      });
    }
  }

  console.log(`Extracted ${samples.length} samples from raw data`);
};

export { rawToSamples };
