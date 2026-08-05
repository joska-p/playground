import { describe, expect, it } from 'vitest';
import { defaultCamera, screenToWorld, worldToScreen } from './camera';

describe('camera', () => {
  it('defaults to the identity camera', () => {
    expect(defaultCamera()).toEqual({ x: 0, y: 0, zoom: 1 });
  });

  it('maps world to screen and back', () => {
    const camera = { x: 40, y: -20, zoom: 2 };
    const world = { x: 10, y: 5 };
    const screen = worldToScreen(camera)(world);
    expect(screen).toEqual({ x: 60, y: -10 });
    expect(screenToWorld(camera)(screen)).toEqual({ x: 10, y: 5 });
  });

  it('handles zoom below one', () => {
    const camera = { x: 0, y: 0, zoom: 0.5 };
    expect(worldToScreen(camera)({ x: 10, y: 10 })).toEqual({ x: 5, y: 5 });
    expect(screenToWorld(camera)({ x: 5, y: 5 })).toEqual({ x: 10, y: 10 });
  });
});
