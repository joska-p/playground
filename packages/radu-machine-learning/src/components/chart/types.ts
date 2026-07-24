export type Point = {
  drawingId: string | number;
  label: string;
  x: number;
  y: number;
};

export type Domain = [number, number];

export type ChartBounds = {
  xDomain: Domain;
  yDomain: Domain;
};
