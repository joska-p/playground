export const SCENE = {
  bg: '#0d1117',
  bgGpu: [0.05, 0.07, 0.09] as const,
  circle: { center: { x: 200, y: 150 }, radius: 60, fill: '#e11d48' },
  rect: { x: 30, y: 30, w: 120, h: 90, fill: '#16a34a' },
  line: { a: { x: 30, y: 260 }, b: { x: 200, y: 260 }, stroke: '#3b82f6', lineWidth: 8 },
  text: { text: 'RENDER', position: { x: 220, y: 80 }, fill: '#f8fafc', fontSize: 28 }
} as const;
