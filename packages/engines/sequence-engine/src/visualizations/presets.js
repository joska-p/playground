const builtInPresets = [
  {
    id: 'recamanWalk',
    name: 'Recamán Walk',
    layers: [
      { layerId: 'baseline', enabled: true, params: {} },
      { layerId: 'plotted-numbers', enabled: true, params: {} },
      {
        layerId: 'recaman-arcs',
        enabled: true,
        params: { lineWidth: 1, alpha: 1.0 }
      }
    ],
    isBuiltIn: true
  },
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
    id: 'collatzSpokes',
    name: 'Collatz Spokes',
    layers: [
      {
        layerId: 'radial-spokes',
        enabled: true,
        params: { dotRadius: 1, alpha: 0.6 }
      }
    ],
    isBuiltIn: true
  },
  {
    id: 'sternMountain',
    name: 'Stern Mountain',
    layers: [
      { layerId: 'baseline', enabled: true, params: { alpha: 0.3 } },
      {
        layerId: 'mountain',
        enabled: true,
        params: { alpha: 0.5, hue: 330, saturation: 60 }
      },
      {
        layerId: 'stem-plot',
        enabled: true,
        params: { markerRadius: 2, alpha: 0.8 }
      }
    ],
    isBuiltIn: true
  },
  {
    id: 'padovanBars',
    name: 'Padovan Bars',
    layers: [
      { layerId: 'baseline', enabled: true, params: {} },
      {
        layerId: 'bar-chart',
        enabled: true,
        params: { barWidth: 0.9, alpha: 0.85 }
      }
    ],
    isBuiltIn: true
  },
  {
    id: 'diatomicRadial',
    name: 'Diatomic Radial',
    layers: [
      {
        layerId: 'connection-lines',
        enabled: true,
        params: { hueCycle: 180, lineWidth: 2 }
      },
      {
        layerId: 'plotted-numbers',
        enabled: true,
        params: { radius: 2, alpha: 0.6 }
      }
    ],
    isBuiltIn: true
  },
  {
    id: 'squareStems',
    name: 'Square Stems',
    layers: [
      {
        layerId: 'stem-plot',
        enabled: true,
        params: { markerRadius: 5, saturation: 90 }
      }
    ],
    isBuiltIn: true
  }
];
export { builtInPresets };
