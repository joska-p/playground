export const GRID_DEFAULT_ROWS = 100;
export const GRID_DEFAULT_COLS = 100;
export const GRID_DEFAULT_DENSITY = 0.2;
export const GRID_DEFAULT_SEED = 42;

export const CAMERA_Z = 10;
export const CAMERA_NEAR = 0.1;
export const CAMERA_FAR = 100;

export const SPEED_MIN_MS = 50;
export const SPEED_MAX_MS = 1000;
export const SPEED_STEP_MS = 10;
export const SPEED_DEFAULT_MS = 100;

export const MAX_COLS = 2000;
export const MAX_ROWS = 2000;

export const MAX_STATE_COUNT = 8;

export const COLOR_GLOW = '#fbbf24';

export const DEFAULT_STATE_COLORS: string[] = ['#070a14', '#d97706'];

const STATE_FALLBACK_COLORS = ['#6b21a8', '#0891b2', '#059669', '#ca8a04'];

export function getDefaultStateColor(index: number): string {
  if (index < DEFAULT_STATE_COLORS.length) return DEFAULT_STATE_COLORS[index];
  return STATE_FALLBACK_COLORS[
    (index - DEFAULT_STATE_COLORS.length) % STATE_FALLBACK_COLORS.length
  ];
}

export const WORKER_MESSAGE_STEP = 'step';
