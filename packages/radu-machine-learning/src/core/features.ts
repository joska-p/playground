import type { Paths } from './types';

function getPathCount(paths: Paths) {
  return paths.length;
}

function getPointCount(paths: Paths) {
  return paths.flat().length;
}

const features = {
  getPathCount,
  getPointCount
};

export { features };
