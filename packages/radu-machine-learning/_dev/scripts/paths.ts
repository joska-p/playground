import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const DIR = dirname(fileURLToPath(import.meta.url));
const DEV = resolve(DIR, '..');
const ROOT = resolve(DEV, '..');

export const PATHS = {
  RAW_DATA_DIR: resolve(DEV, 'data/raw'),
  SAMPLE_DATA: resolve(ROOT, 'src/data/sampleData.json'),
} as const;
