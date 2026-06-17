export function linearScale(
  canvasWidth: number,
  maxDataValue: number,
  padding = 0.95
): number {
  if (maxDataValue <= 0) return 1;
  return (canvasWidth * padding) / maxDataValue;
}

export function maxAbsInterval(data: number[]): number {
  let max = 0;
  for (let i = 1; i < data.length; i++) {
    const abs = Math.abs(data[i] - data[i - 1]);
    if (abs > max) max = abs;
  }
  return max || 1;
}
