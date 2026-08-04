import { apply2d, compose2d, clamp, rotation2d, translation2d, vec, type Vec2 } from '@repo/pixelate2d-math';
import { drawCircle, drawLine, drawRect, drawText, fillPath, strokePath, withCamera, type FrameCallback } from '@repo/pixelate2d-core';

const gridColor = (hue: number): string => `hsl(${String(Math.round(hue) % 360)} 85% 62% / 0.92)`;

const primitives: FrameCallback = (driver, ctx) => {
  const { width, height, time } = ctx;
  driver.clear('#0d1015');
  const cols = 6;
  const rows = 4;
  const cellW = width / cols;
  const cellH = height / rows;
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      const cx = i * cellW + cellW / 2;
      const cy = j * cellH + cellH / 2;
      const pulse = 0.7 + 0.3 * Math.sin(time * 2 + i * 1.3 + j * 0.7);
      const size = Math.min(cellW, cellH) * 0.28 * pulse;
      if ((i + j) % 2 === 0) {
        drawCircle(gridColor((i / cols) * 360 + time * 40))(size)(vec(cx, cy))(driver);
      } else {
        drawRect(gridColor((i / cols) * 360 + time * 40))({ w: size * 1.7, h: size * 1.7 })(vec(cx, cy))(driver);
      }
    }
  }
  const sweep = ((time * 0.25) % 1) * width;
  drawLine('#fbbf24')(2)(vec(sweep, 0))(vec(sweep, height))(driver);
};

const starPoints = (count: number, outer: number, inner: number, transform: (point: Vec2) => Vec2): Vec2[] => {
  const points: Vec2[] = [];
  for (let i = 0; i < count; i++) {
    const radius = i % 2 === 0 ? outer : inner;
    const angle = (i / count) * Math.PI * 2 - Math.PI / 2;
    points.push(transform(vec(Math.cos(angle) * radius, Math.sin(angle) * radius)));
  }
  return points;
};

const paths: FrameCallback = (driver, ctx) => {
  const { width, height, time } = ctx;
  driver.clear('#0d1015');
  const cx = width / 2;
  const cy = height / 2;
  const spin = (point: Vec2): Vec2 => apply2d(compose2d(translation2d(cx, cy), rotation2d(time * 0.5)))(point);
  fillPath('#8b5cf6')(starPoints(10, 140, 70, spin))(driver);
  strokePath('#22d3ee')(2)(starPoints(16, 110, 55, spin))(driver);
  const wave: Vec2[] = [];
  const segments = 48;
  for (let i = 0; i <= segments; i++) {
    const t = i / segments;
    wave.push(vec(t * width, cy + Math.sin(t * Math.PI * 4 + time * 1.5) * 70));
  }
  strokePath('#f43f5e')(3)(wave)(driver);
};

const text: FrameCallback = (driver, ctx) => {
  const { width, height, time, fps, frameCount } = ctx;
  driver.clear('#0d1015');
  const bob = Math.sin(time * 2) * 18;
  driver.drawText({ fill: '#e2e8f0', fontSize: 56, align: 'center', baseline: 'middle' }, 'Pixelate2D', vec(width / 2, height / 2 - 48 + bob));
  drawText('drawText(text)(color)(size)(position)(driver)')('#94a3b8')(15)(vec(width / 2, height / 2 + 2))(driver);
  drawText(`fps ${String(Math.round(fps))} · frame ${String(frameCount)}`)('#fbbf24')(14)(vec(width / 2, height / 2 + 30))(driver);
  withCamera({ x: 0, y: 0, zoom: 1 })((d) => {
    drawText('screen-space HUD via withCamera — ignores pan/zoom')('#4ade80')(13)(vec(12, height - 16))(d);
  })(driver, ctx);
};

const player = { x: 0, y: 0 };

const interactive: FrameCallback = (driver, ctx) => {
  const { width, height, deltaTime, input, camera } = ctx;
  driver.clear('#0d1015');
  const spacing = 40;
  for (let x = 0; x <= width; x += spacing) {
    drawLine('#ffffff14')(1)(vec(x, 0))(vec(x, height))(driver);
  }
  for (let y = 0; y <= height; y += spacing) {
    drawLine('#ffffff14')(1)(vec(0, y))(vec(width, y))(driver);
  }
  let dx = 0;
  let dy = 0;
  if (input.isKeyDown('KeyW') || input.isKeyDown('ArrowUp')) dy -= 1;
  if (input.isKeyDown('KeyS') || input.isKeyDown('ArrowDown')) dy += 1;
  if (input.isKeyDown('KeyA') || input.isKeyDown('ArrowLeft')) dx -= 1;
  if (input.isKeyDown('KeyD') || input.isKeyDown('ArrowRight')) dx += 1;
  const speed = 320;
  const halfW = width / 2;
  const halfH = height / 2;
  player.x = clamp(-halfW + 24)(halfW - 24)(player.x + dx * speed * deltaTime);
  player.y = clamp(-halfH + 24)(halfH - 24)(player.y + dy * speed * deltaTime);
  const world = input.getPointerWorldPos(camera);
  if (input.wasKeyPressed('Space')) {
    drawCircle('#facc15')(42)(vec(player.x, player.y))(driver);
  }
  drawCircle('#22c55e')(16)(vec(player.x, player.y))(driver);
  drawCircle('#f472b6')(6)(world)(driver);
  drawText('WASD moves the dot · space pulses · the pink dot tracks the pointer in world space')('#cbd5e1')(13)(vec(12, height - 16))(driver);
  drawText(`world ${world.x.toFixed(0)}, ${world.y.toFixed(0)}`)('#cbd5e1')(13)(vec(12, height - 36))(driver);
};

export type SceneId = 'primitives' | 'paths' | 'text' | 'interactive';

export const SCENES: Record<SceneId, FrameCallback> = { primitives, paths, text, interactive };

export const SCENE_IDS: readonly SceneId[] = ['primitives', 'paths', 'text', 'interactive'];
