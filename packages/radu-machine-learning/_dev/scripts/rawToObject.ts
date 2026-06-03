import * as fs from "node:fs/promises";
import { PATHS } from "./paths";

type SessionData = {
  session: number;
  student: string;
  drawings: Record<string, number[][][]>;
};

const rawToObject = async () => {
  const rawDataDir = PATHS.RAW_DATA_DIR;
  const rawFiles = await fs.readdir(rawDataDir);

  const sessions: SessionData[] = [];

  for (const rawFile of rawFiles) {
    const rawFilePath = `${rawDataDir}/${rawFile}`;
    const rawFileContent = await fs.readFile(rawFilePath, "utf8");
    const rawFileData = JSON.parse(rawFileContent);

    sessions.push({
      session: rawFileData.session,
      student: rawFileData.student,
      drawings: rawFileData.drawings,
    });
  }

  await fs.writeFile(PATHS.SAMPLE_DATA, JSON.stringify(sessions, null, 2));

  console.log(`Processed ${sessions.length} sessions into ${PATHS.SAMPLE_DATA}`);
};

export { rawToObject };
