type CameraBounds = {
  left: number;
  right: number;
  top: number;
  bottom: number;
};

const fitCameraToGrid = (
  cols: number,
  rows: number,
  viewWidth: number,
  viewHeight: number
): CameraBounds => {
  const aspect = viewWidth / viewHeight;
  const gridAspect = cols / rows;

  if (gridAspect > aspect) {
    return {
      left: -cols / 2,
      right: cols / 2,
      top: cols / aspect / 2,
      bottom: -cols / aspect / 2
    };
  }

  return {
    left: (-rows * aspect) / 2,
    right: (rows * aspect) / 2,
    top: rows / 2,
    bottom: -rows / 2
  };
};

export { fitCameraToGrid };
export type { CameraBounds };
