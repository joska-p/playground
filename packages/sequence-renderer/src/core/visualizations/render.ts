import type { LayerConfigEntry } from './types';
import { getLayer } from './layers/registry';

function render(
  canvas: HTMLCanvasElement,
  data: number[],
  layerEntries: LayerConfigEntry[]
): void {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (const entry of layerEntries) {
    if (!entry.enabled) continue;
    const layer = getLayer(entry.layerId);
    if (!layer) continue;
    const params = { ...layer.defaults, ...entry.params };
    layer.draw(ctx, data, params);
  }
}

export { render };
