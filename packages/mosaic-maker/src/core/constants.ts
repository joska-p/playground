import { CSS_VARS } from "./cssVars";

const MAX_NUMBER_OF_PALETTES = 33;
const DEFAULT_TILE_SIZE = 64;
const DEFAULT_GAP_SIZE = 0;

const defaultTileSize = {
  [CSS_VARS.width]: `${DEFAULT_TILE_SIZE}px`,
  [CSS_VARS.height]: `${DEFAULT_TILE_SIZE}px`,
};

const defaultGapSize = {
  [CSS_VARS.gap]: `${DEFAULT_GAP_SIZE}px`,
};

const defaultRotations = {
  "--rotation-0": "0deg",
  "--rotation-1": "90deg",
  "--rotation-2": "180deg",
  "--rotation-3": "270deg",
};

const initialTileSize = defaultTileSize;
const initialGapSize = defaultGapSize;
const initialRotations = defaultRotations;

export {
  DEFAULT_GAP_SIZE,
  DEFAULT_TILE_SIZE,
  MAX_NUMBER_OF_PALETTES,
  initialGapSize,
  initialRotations,
  initialTileSize,
};
