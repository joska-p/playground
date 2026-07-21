import { lerp, remap } from '../core/math';

export type Sample = {
  id: number;
  type: 'basic' | 'sport';
  point: [x: number, y: number];
};

export const samples: Sample[] = [];

for (let i = 0; i < 100; i++) {
  const type = Math.random() < 0.5 ? 'basic' : 'sport';
  const km = lerp(3000, 300000, Math.random());
  const price =
    remap(3000, 300000, 9000, 900, km) +
    lerp(-2000, 2000, Math.random()) +
    (type === 'basic' ? 0 : 5000);
  samples.push({
    id: i,
    type,
    point: [km, price]
  });
}
