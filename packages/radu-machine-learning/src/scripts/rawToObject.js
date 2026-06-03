import * as fs from "node:fs/promises"
import { PATHS } from "../common/constants/paths.js"

const rawToObject = async () => {
  const rawDataDir = PATHS.RAW_DATA_DIR
  const sessionsDir = PATHS.SESSIONS_OBJECTS_DIR
  const rawFiles = await fs.readdir(rawDataDir)

  const sessions = []

  for (const rawFile of rawFiles) {
    const rawFilePath = rawDataDir + "/" + rawFile
    const rawFileContent = await fs.readFile(rawFilePath, "utf8")
    const rawFileData = JSON.parse(rawFileContent)

    // create a new ts file in the samples objects directory that export the data as an object
    const session = rawFileData.session
    const student = rawFileData.student
    const drawings = rawFileData.drawings
    const sessionFilePath = `${sessionsDir}/${session}.ts`
    const sessionFileContent = `export const samples = ${JSON.stringify(drawings)}`

    await fs.writeFile(sessionFilePath, sessionFileContent)

    // add the data to the samples array
    sessions.push({
      session,
      student,
      drawings,
    })
  }
}

export { rawToObject }
