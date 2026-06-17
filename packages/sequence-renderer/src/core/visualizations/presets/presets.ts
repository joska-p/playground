import type { PresetRecord } from '../types';

const builtInPresets: PresetRecord[] = [
  {
    id: 'frontWave',
    name: 'Front Wave',
    layers: [
      { layerId: 'baseline', enabled: true, params: {} },
      { layerId: 'plotted-numbers', enabled: true, params: {} },
      { layerId: 'factor-waves', enabled: true, params: {} }
    ],
    isBuiltIn: true
  },
  {
    id: 'recamanWalk',
    name: 'Recamán Walk',
    layers: [
      { layerId: 'baseline', enabled: true, params: {} },
      { layerId: 'plotted-numbers', enabled: true, params: {} },
      { layerId: 'recaman-arcs', enabled: true, params: { lineWidth: 1, alpha: 1.0 } }
    ],
    isBuiltIn: true
  }
];

export { builtInPresets };
