import { describe, expect, it } from 'vitest';
import type { DomainBounds, Point } from './SpaceMapper';
import { SpaceMapper } from './SpaceMapper';

describe('SpaceMapper', () => {
  const cssWidth = 800;
  const cssHeight = 600;
  const dpr = 2;

  function createMapper(dprValue = dpr) {
    return new SpaceMapper({ cssWidth, cssHeight, dpr: dprValue });
  }

  describe('screenToUV', () => {
    it('maps origin (0,0) to (0,0)', () => {
      const mapper = createMapper();
      const uv = mapper.screenToUV({ x: 0, y: 0 });
      expect(uv.x).toBeCloseTo(0);
      expect(uv.y).toBeCloseTo(0);
    });

    it('maps (cssWidth, cssHeight) to (1,1)', () => {
      const mapper = createMapper();
      const uv = mapper.screenToUV({ x: cssWidth, y: cssHeight });
      expect(uv.x).toBeCloseTo(1);
      expect(uv.y).toBeCloseTo(1);
    });

    it('maps center to (0.5, 0.5)', () => {
      const mapper = createMapper();
      const uv = mapper.screenToUV({ x: cssWidth / 2, y: cssHeight / 2 });
      expect(uv.x).toBeCloseTo(0.5);
      expect(uv.y).toBeCloseTo(0.5);
    });
  });

  describe('screenToBuffer', () => {
    it('scales by dpr=1', () => {
      const mapper = createMapper(1);
      const buf = mapper.screenToBuffer({ x: 100, y: 50 });
      expect(buf.x).toBeCloseTo(100);
      expect(buf.y).toBeCloseTo(50);
    });

    it('scales by dpr=1.5', () => {
      const mapper = createMapper(1.5);
      const buf = mapper.screenToBuffer({ x: 100, y: 50 });
      expect(buf.x).toBeCloseTo(150);
      expect(buf.y).toBeCloseTo(75);
    });

    it('scales by dpr=2', () => {
      const mapper = createMapper(2);
      const buf = mapper.screenToBuffer({ x: 100, y: 50 });
      expect(buf.x).toBeCloseTo(200);
      expect(buf.y).toBeCloseTo(100);
    });
  });

  describe('dataToScreen / screenToData round-trips', () => {
    const dataBounds: DomainBounds = { xMin: -100, xMax: 100, yMin: -50, yMax: 50 };
    const testPoints: Point[] = [
      { x: 0, y: 0 },
      { x: -50, y: -25 },
      { x: 75, y: 40 },
      { x: -100, y: -50 },
      { x: 100, y: 50 }
    ];

    const fitModes: Array<'contain' | 'cover' | 'fill'> = ['contain', 'cover', 'fill'];

    for (const fitMode of fitModes) {
      it(`round-trips under "${fitMode}" fit mode`, () => {
        const mapper = createMapper();
        for (const point of testPoints) {
          const screen = mapper.dataToScreen(point, dataBounds, fitMode);
          const back = mapper.screenToData(screen, dataBounds, fitMode);
          expect(back.x).toBeCloseTo(point.x, 10);
          expect(back.y).toBeCloseTo(point.y, 10);
        }
      });

      it(`round-trips under "${fitMode}" with padding=0.1`, () => {
        const mapper = createMapper();
        for (const point of testPoints) {
          const screen = mapper.dataToScreen(point, dataBounds, fitMode, 0.1);
          const back = mapper.screenToData(screen, dataBounds, fitMode, 0.1);
          expect(back.x).toBeCloseTo(point.x, 10);
          expect(back.y).toBeCloseTo(point.y, 10);
        }
      });
    }
  });

  describe('worldToGrid / gridToWorld', () => {
    const cols = 50;
    const rows = 50;

    it('maps grid (0,0) to world cell center', () => {
      const mapper = createMapper();
      const world = mapper.gridToWorld(0, 0, cols, rows);
      expect(world.x).toBeCloseTo(0.5);
      expect(world.y).toBeCloseTo(0.5);
    });

    it('maps grid (49,49) to world cell center', () => {
      const mapper = createMapper();
      const world = mapper.gridToWorld(49, 49, cols, rows);
      expect(world.x).toBeCloseTo(49.5);
      expect(world.y).toBeCloseTo(49.5);
    });

    it('worldToGrid returns correct cell for center of grid', () => {
      const mapper = createMapper();
      const result = mapper.worldToGrid({ x: 25.5, y: 25.5 }, cols, rows);
      expect(result.col).toBe(25);
      expect(result.row).toBe(25);
      expect(result.index).toBe(25 * cols + 25);
    });

    it('worldToGrid clamps out-of-range to nearest valid cell', () => {
      const mapper = createMapper();
      const result = mapper.worldToGrid({ x: 999, y: -999 }, cols, rows);
      expect(result.col).toBeGreaterThanOrEqual(0);
      expect(result.col).toBeLessThan(cols);
      expect(result.row).toBeGreaterThanOrEqual(0);
      expect(result.row).toBeLessThan(rows);
    });

    it('round-trips grid -> world -> grid', () => {
      const mapper = createMapper();
      for (let col = 0; col < cols; col += 10) {
        for (let row = 0; row < rows; row += 10) {
          const world = mapper.gridToWorld(col, row, cols, rows);
          const back = mapper.worldToGrid(world, cols, rows);
          expect(back.col).toBe(col);
          expect(back.row).toBe(row);
        }
      }
    });
  });

  describe('getShaderUniforms', () => {
    it('returns correct resolution and aspect', () => {
      const mapper = createMapper();
      const uniforms = mapper.getShaderUniforms();
      expect(uniforms.u_resolution).toEqual([cssWidth * dpr, cssHeight * dpr]);
      expect(uniforms.u_aspect).toBeCloseTo(cssWidth / cssHeight);
    });

    it('defaults mouse to [0,0]', () => {
      const mapper = createMapper();
      const uniforms = mapper.getShaderUniforms();
      expect(uniforms.u_mouse).toEqual([0, 0]);
    });

    it('reflects provided mouse coordinates', () => {
      const mapper = createMapper();
      const uniforms = mapper.getShaderUniforms({ x: 150, y: 200 });
      expect(uniforms.u_mouse).toEqual([150, 200]);
    });
  });

  describe('resize and size getters', () => {
    it('getBufferSize returns css * dpr', () => {
      const mapper = createMapper();
      const size = mapper.getBufferSize();
      expect(size.x).toBe(cssWidth * dpr);
      expect(size.y).toBe(cssHeight * dpr);
    });

    it('getCSSSize returns css dimensions', () => {
      const mapper = createMapper();
      const size = mapper.getCSSSize();
      expect(size.x).toBe(cssWidth);
      expect(size.y).toBe(cssHeight);
    });

    it('resize updates dimensions', () => {
      const mapper = createMapper();
      mapper.resize({ cssWidth: 1024, cssHeight: 768 });
      expect(mapper.getCSSSize()).toEqual({ x: 1024, y: 768 });
      expect(mapper.getBufferSize()).toEqual({ x: 1024 * dpr, y: 768 * dpr });
    });
  });
});
