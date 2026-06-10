const CSS_VARS = {
  size: '--tile-size',
  gap: '--mosaicGap',
} as const;

const MAX_NUMBER_OF_PALETTES = 27;
const DEFAULT_TILE_SIZE = 64;
const DEFAULT_GAP_SIZE = 0;

const initialTileSize = {
  [CSS_VARS.size]: `${DEFAULT_TILE_SIZE}px`,
};

const initialGapSize = {
  [CSS_VARS.gap]: `${DEFAULT_GAP_SIZE}px`,
};

const initialRotations = {
  '--rotation-0': '0deg',
  '--rotation-1': '90deg',
  '--rotation-2': '180deg',
  '--rotation-3': '270deg',
};

export {
  CSS_VARS,
  DEFAULT_GAP_SIZE,
  DEFAULT_TILE_SIZE,
  MAX_NUMBER_OF_PALETTES,
  initialGapSize,
  initialRotations,
  initialTileSize,
};
