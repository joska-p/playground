export type Point = {
  drawingId: number;
  label: string;
  x: number;
  y: number;
};

export type Domain = [number, number];

export type ChartBounds = {
  xDomain: Domain;
  yDomain: Domain;
};
