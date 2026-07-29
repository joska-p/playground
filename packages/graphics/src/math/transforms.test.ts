import { describe, expect, it } from 'vitest';
import {
  createBufferToCanvas,
  createBufferToScreen,
  createCanvasToBuffer,
  createCanvasToData,
  createCanvasToGrid,
  createCanvasToNormalized,
  createDataToCanvas,
  createNormalizedToWebGL,
  createScreenToBuffer,
  createScreenToCanvas,
  createScreenToGrid,
  createShaderUniformBuilder,
  createWorldToGrid,
  generateGLSLFragment,
  gridToWorld,
  type AspectFitMode,
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

  describe('grid transforms', () => {
    const cols = 4;
    const rows = 3;

    describe('createWorldToGrid', () => {
      it('maps continuous coords to correct cell', () => {
        const toGrid = createWorldToGrid(cols, rows);
        expect(toGrid({ x: 0.5, y: 0.5 })).toEqual({ column: 0, row: 0, index: 0 });
        expect(toGrid({ x: 3.7, y: 2.2 })).toEqual({ column: 3, row: 2, index: 11 });
        expect(toGrid({ x: 1.0, y: 1.0 })).toEqual({ column: 1, row: 1, index: 5 });
      });

      it('clamps out-of-bounds values', () => {
        const toGrid = createWorldToGrid(cols, rows);
        expect(toGrid({ x: -1, y: -5 })).toEqual({ column: 0, row: 0, index: 0 });
        expect(toGrid({ x: 100, y: 100 })).toEqual({ column: 3, row: 2, index: 11 });
      });
    });

    describe('gridToWorld', () => {
      it('returns cell center at col+0.5, row+0.5', () => {
        expect(gridToWorld({ column: 0, row: 0 })).toEqual({ x: 0.5, y: 0.5 });
        expect(gridToWorld({ column: 3, row: 2 })).toEqual({ x: 3.5, y: 2.5 });
        expect(gridToWorld({ column: 1, row: 1 })).toEqual({ x: 1.5, y: 1.5 });
      });
    });

    describe('createCanvasToGrid', () => {
      const canvasWidth = 800;
      const canvasHeight = 600;
      const dataDomain: DataDomainBounds = { xMin: 0, xMax: cols, yMin: 0, yMax: rows };
      const testDataPoints = [
        { x: 0.5, y: 0.5, expectedCol: 0, expectedRow: 0 },
        { x: 1.2, y: 0.8, expectedCol: 1, expectedRow: 0 },
        { x: 3.7, y: 2.2, expectedCol: 3, expectedRow: 2 },
        { x: 2.5, y: 1.5, expectedCol: 2, expectedRow: 1 }
      ];
      const fits: AspectFitMode[] = ['contain', 'cover', 'fill', 'none'];

      for (const fit of fits) {
        it(`round-trips with gridToWorld under "${fit}"`, () => {
          const toCanvas = createDataToCanvas(dataDomain, canvasWidth, canvasHeight, fit);
          const toGrid = createCanvasToGrid(cols, rows, canvasWidth, canvasHeight, fit);

          for (const { x, y, expectedCol, expectedRow } of testDataPoints) {
            const canvas = toCanvas({ x, y });
            const cell = toGrid(canvas);
            expect(cell.column).toBe(expectedCol);
            expect(cell.row).toBe(expectedRow);
            const world = gridToWorld(cell);
            expect(world.x).toBe(expectedCol + 0.5);
            expect(world.y).toBe(expectedRow + 0.5);
          }
        });
      }
    });

    describe('createScreenToGrid', () => {
      it('composes with known canvas bounds', () => {
        const bounds = { left: 100, top: 50, width: 800, height: 600 };
        const toGrid = createScreenToGrid(bounds, cols, rows);
        expect(toGrid({ x: 100, y: 50 })).toEqual({ column: 0, row: 0, index: 0 });
        expect(toGrid({ x: 500, y: 350 })).toEqual({ column: 2, row: 1, index: 6 });
      });
    });
  });
});
