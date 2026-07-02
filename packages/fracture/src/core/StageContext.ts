export type VectorN = number[];

export type Viewport = {
  xMin: number;
  xMax: number;
  yMin: number;
  yMax: number;
};

class StageContext {
  public readonly view: Viewport;
  public readonly width: number;
  public readonly height: number;

  constructor(view: Viewport, width: number, height: number) {
    this.view = view;
    this.width = width;
    this.height = height;
  }

  toScreen2D(x: number, y: number): { sx: number; sy: number } {
    const sx = ((x - this.view.xMin) / (this.view.xMax - this.view.xMin)) * this.width;
    const sy =
      this.height - ((y - this.view.yMin) / (this.view.yMax - this.view.yMin)) * this.height;
    return { sx, sy };
  }

  project(vector: VectorN, projectionPipeline: (v: VectorN) => { x: number; y: number }) {
    const { x, y } = projectionPipeline(vector);
    return this.toScreen2D(x, y);
  }
}
