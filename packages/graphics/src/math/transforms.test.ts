import { describe, expect, it } from 'vitest';
import {
  createBufferToCanvas,
  createBufferToScreen,
  createCanvasToBuffer,
  createCanvasToData,
  createCanvasToNormalized,
  createDataToCanvas,
  createNormalizedToWebGL,
  createScreenToBuffer,
  createScreenToCanvas,
  createShaderUniformBuilder,
  createWorldToGrid,
  generateGLSLFragment,
  gridToWorld,
  type DataDomainBounds,
  type Point2D
} from './transforms';

describe('transforms', () => {
  const canvasWidth = 800;
  const canvasHeight = 600;
  const devicePixelRatio = 2;

  describe('createScreenToCanvas', () => {
    it('returns a function when configured', () => {
      const transform = createScreenToCanvas({ left: 10, top: 20, width: 800, height: 600 });
      expect(typeof transform).toBe('function');
    });

    it('translates point relative to canvas bounds', () => {
      const transform = createScreenToCanvas({ left: 50, top: 100, width: 800, height: 600 });
      const result = transform({ x: 150, y: 250 });
      expect(result).toEqual({ x: 100, y: 150 });
    });
  });

  describe('createCanvasToNormalized', () => {
    it('returns a function when configured', () => {
      const transform = createCanvasToNormalized(canvasWidth, canvasHeight);
      expect(typeof transform).toBe('function');
    });

    it('maps origin (0,0) to (0,0)', () => {
      const transform = createCanvasToNormalized(canvasWidth, canvasHeight);
      const result = transform({ x: 0, y: 0 });
      expect(result.x).toBeCloseTo(0);
      expect(result.y).toBeCloseTo(0);
    });

    it('maps (canvasWidth, canvasHeight) to (1,1)', () => {
      const transform = createCanvasToNormalized(canvasWidth, canvasHeight);
      const result = transform({ x: canvasWidth, y: canvasHeight });
      expect(result.x).toBeCloseTo(1);
      expect(result.y).toBeCloseTo(1);
    });

    it('maps center to (0.5, 0.5)', () => {
      const transform = createCanvasToNormalized(canvasWidth, canvasHeight);
      const result = transform({ x: canvasWidth / 2, y: canvasHeight / 2 });
      expect(result.x).toBeCloseTo(0.5);
      expect(result.y).toBeCloseTo(0.5);
    });
  });

  describe('createNormalizedToWebGL', () => {
    it('returns a function when called without arguments', () => {
      const transform = createNormalizedToWebGL();
      expect(typeof transform).toBe('function');
    });

    it('accepts vector directly if called with vector', () => {
      const result = createNormalizedToWebGL({ x: 0, y: 0 });
      expect(result).toEqual({ x: -1, y: 1 });
    });

    it('maps top-left (0,0) to (-1,1)', () => {
      const transform = createNormalizedToWebGL();
      const result = transform({ x: 0, y: 0 });
      expect(result.x).toBeCloseTo(-1);
      expect(result.y).toBeCloseTo(1);
    });

    it('maps bottom-right (1,1) to (1,-1)', () => {
      const transform = createNormalizedToWebGL();
      const result = transform({ x: 1, y: 1 });
      expect(result.x).toBeCloseTo(1);
      expect(result.y).toBeCloseTo(-1);
    });

    it('maps center (0.5,0.5) to (0,0)', () => {
      const transform = createNormalizedToWebGL();
      const result = transform({ x: 0.5, y: 0.5 });
      expect(result.x).toBeCloseTo(0);
      expect(result.y).toBeCloseTo(0);
    });
  });

  describe('createCanvasToBuffer and createBufferToCanvas', () => {
    it('scales by dpr=1', () => {
      const toBuffer = createCanvasToBuffer(1);
      const toCanvas = createBufferToCanvas(1);
      const point = { x: 100, y: 50 };
      expect(toBuffer(point)).toEqual({ x: 100, y: 50 });
      expect(toCanvas(point)).toEqual({ x: 100, y: 50 });
    });

    it('scales by dpr=1.5', () => {
      const toBuffer = createCanvasToBuffer(1.5);
      const toCanvas = createBufferToCanvas(1.5);
      const point = { x: 100, y: 50 };
      expect(toBuffer(point)).toEqual({ x: 150, y: 75 });
      expect(toCanvas({ x: 150, y: 75 })).toEqual(point);
    });

    it('scales by dpr=2 and round-trips', () => {
      const toBuffer = createCanvasToBuffer(2);
      const toCanvas = createBufferToCanvas(2);
      const point = { x: 100, y: 50 };
      const buffered = toBuffer(point);
      expect(buffered).toEqual({ x: 200, y: 100 });
      expect(toCanvas(buffered)).toEqual(point);
    });
  });

  describe('createDataToCanvas and createCanvasToData', () => {
    const dataDomainBounds: DataDomainBounds = { xMin: -100, xMax: 100, yMin: -50, yMax: 50 };
    const testPoints: Point2D[] = [
      { x: 0, y: 0 },
      { x: -50, y: -25 },
      { x: 75, y: 40 },
      { x: -100, y: -50 },
      { x: 100, y: 50 }
    ];

    const fitModes: ('contain' | 'cover' | 'fill' | 'none')[] = [
      'contain',
      'cover',
      'fill',
      'none'
    ];

    for (const fitMode of fitModes) {
      it(`round-trips under "${fitMode}" fit mode`, () => {
        const toCanvas = createDataToCanvas(dataDomainBounds, canvasWidth, canvasHeight, fitMode);
        const toData = createCanvasToData(dataDomainBounds, canvasWidth, canvasHeight, fitMode);
        for (const point of testPoints) {
          const canvasPoint = toCanvas(point);
          const back = toData(canvasPoint);
          expect(back.x).toBeCloseTo(point.x, 10);
          expect(back.y).toBeCloseTo(point.y, 10);
        }
      });

      it(`round-trips under "${fitMode}" with padding=0.1`, () => {
        const toCanvas = createDataToCanvas(
          dataDomainBounds,
          canvasWidth,
          canvasHeight,
          fitMode,
          0.1
        );
        const toData = createCanvasToData(
          dataDomainBounds,
          canvasWidth,
          canvasHeight,
          fitMode,
          0.1
        );
        for (const point of testPoints) {
          const canvasPoint = toCanvas(point);
          const back = toData(canvasPoint);
          expect(back.x).toBeCloseTo(point.x, 10);
          expect(back.y).toBeCloseTo(point.y, 10);
        }
      });
    }
  });

  describe('createWorldToGrid and gridToWorld', () => {
    const columns = 50;
    const rows = 50;

    it('maps grid (0,0) to world cell center', () => {
      const world = gridToWorld({ column: 0, row: 0 });
      expect(world.x).toBeCloseTo(0.5);
      expect(world.y).toBeCloseTo(0.5);
    });

    it('maps grid (49,49) to world cell center', () => {
      const world = gridToWorld({ column: 49, row: 49 });
      expect(world.x).toBeCloseTo(49.5);
      expect(world.y).toBeCloseTo(49.5);
    });

    it('createWorldToGrid returns correct cell for center of grid', () => {
      const toGrid = createWorldToGrid(columns, rows);
      const result = toGrid({ x: 25.5, y: 25.5 });
      expect(result.column).toBe(25);
      expect(result.row).toBe(25);
      expect(result.index).toBe(25 * columns + 25);
    });

    it('createWorldToGrid clamps out-of-range to nearest valid cell', () => {
      const toGrid = createWorldToGrid(columns, rows);
      const result = toGrid({ x: 999, y: -999 });
      expect(result.column).toBe(49);
      expect(result.row).toBe(0);
    });

    it('round-trips grid -> world -> grid', () => {
      const toGrid = createWorldToGrid(columns, rows);
      for (let column = 0; column < columns; column += 10) {
        for (let row = 0; row < rows; row += 10) {
          const world = gridToWorld({ column, row });
          const back = toGrid(world);
          expect(back.column).toBe(column);
          expect(back.row).toBe(row);
        }
      }
    });
  });

  describe('createScreenToBuffer and createBufferToScreen', () => {
    it('end-to-end composition from screen to buffer and back', () => {
      const bounds = { left: 100, top: 50, width: 800, height: 600 };
      const screenToBuffer = createScreenToBuffer(bounds, devicePixelRatio);
      const bufferToScreen = createBufferToScreen(bounds, devicePixelRatio);

      const screenPoint = { x: 250, y: 150 };
      const bufferPoint = screenToBuffer(screenPoint);
      expect(bufferPoint).toEqual({ x: (250 - 100) * 2, y: (150 - 50) * 2 });

      const back = bufferToScreen(bufferPoint);
      expect(back).toEqual(screenPoint);
    });
  });

  describe('createShaderUniformBuilder', () => {
    it('returns correct uniform values', () => {
      const builder = createShaderUniformBuilder(canvasWidth, canvasHeight, devicePixelRatio);
      const uniforms = builder({ x: 100, y: 200 });

      expect(uniforms.uniformResolution).toEqual([
        canvasWidth * devicePixelRatio,
        canvasHeight * devicePixelRatio
      ]);
      expect(uniforms.uniformAspectRatio).toBeCloseTo(canvasWidth / canvasHeight);
      expect(uniforms.uniformMouse).toEqual([100, 200]);
    });

    it('defaults mouse to [0,0] when not provided', () => {
      const builder = createShaderUniformBuilder(canvasWidth, canvasHeight, devicePixelRatio);
      const uniforms = builder();

      expect(uniforms.uniformMouse).toEqual([0, 0]);
    });
  });

  describe('generateGLSLFragment', () => {
    it('generates default normalized fragment shader code', () => {
      const glsl = generateGLSLFragment();
      expect(glsl).toContain('vec2 uv = vUv;');
    });

    it('generates canvas fragment shader code with vertical flip and aspect correction', () => {
      const glsl = generateGLSLFragment({
        inputSpace: 'canvas',
        flipVertically: true,
        correctAspectRatio: true
      });
      expect(glsl).toContain('vec2 uv = gl_FragCoord.xy / uniformResolution;');
      expect(glsl).toContain('uv.y = 1.0 - uv.y;');
      expect(glsl).toContain('uv.x *= uniformResolution.x / uniformResolution.y;');
    });

    it('generates webgl fragment shader code', () => {
      const glsl = generateGLSLFragment({ inputSpace: 'webgl', flipVertically: true });
      expect(glsl).toContain('vec2 uv = vUv * 2.0 - 1.0;');
      expect(glsl).toContain('uv.y = -uv.y;');
    });
  });
});
