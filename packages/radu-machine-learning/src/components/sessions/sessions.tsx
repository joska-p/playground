import * as fs from "node:fs/promises";
import { PATHS } from "../../core/paths";
import { Session } from "./session";

type Sessions = {
  session: string;
  student: string;
  drawings: { [key in string]: number[][][] };
};

const getSessions = async () => {
  const rawDataDir = PATHS.RAW_DATA_DIR;
  const rawFiles = await fs.readdir(rawDataDir);
  const sessions = [] as Sessions[];

  for (const rawFile of rawFiles) {
    const rawFilePath = rawDataDir + "/" + rawFile;
    const rawFileContent = await fs.readFile(rawFilePath, "utf8");
    const session = JSON.parse(rawFileContent);
    sessions.push(session);
  }
  return sessions;
};

const Sessions = async () => {
  const sessions = await getSessions();

  return (
    <>
      {sessions.map((session) => (
        <div key={session.session}>
          <Session drawings={session.drawings} />
        </div>
      ))}
    </>
  );
};

export { Sessions };
