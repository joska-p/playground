import { getRandom } from "./getRandom";

function getRandomValue(obj: Record<string, unknown>) {
  const keys = Object.keys(obj);
  return getRandom(keys);
}

export { getRandomValue };
