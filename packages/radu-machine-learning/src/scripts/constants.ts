import path from 'path';

const BASE_DIR = import.meta.dirname;
const DATA_DIR = path.join(BASE_DIR, '../data');
const RAW_DIR = path.join(DATA_DIR, 'raw');
const DATASET_DIR = path.join(DATA_DIR, 'dataset');
const JSON_DIR = path.join(DATASET_DIR, 'json');
const IMG_DIR = path.join(DATASET_DIR, 'img');
const SAMPLE = path.join(DATASET_DIR, 'samples.json');

export const CONSTANTS = {
  BASE_DIR,
  DATA_DIR,
  RAW_DIR,
  DATASET_DIR,
  JSON_DIR,
  IMG_DIR,
  SAMPLE,
};
