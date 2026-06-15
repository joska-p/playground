This is a solid foundation — the key insight (a layer is just `(context: DrawingContext) => void`, and a visualization is just an ordered list of those) already buys you a lot of reuse: `drawBaseline` and `drawPlottedNumbers` are shared between `factorWave` and `recamanArcs` for free.

A few refinements that would push this further toward "composable":

**1. Make layers configurable via factories, not hardcoded constants**

Right now things like `lineWidth = 1`, `globalAlpha = 0.4`, or the hue formula in `drawFactorWaves` are baked into the layer itself. If two visualizations want the same layer but different styling (e.g. thinner arcs, different dot opacity), they currently can't — they'd have to fork the file. Turning each layer into a factory that returns a `VisualizationLayer` lets you parameterize:

```typescript
type DrawPlottedNumbersOptions = {
  radius?: number;
  alpha?: number;
};

export const createDrawPlottedNumbers = (
  options: DrawPlottedNumbersOptions = {}
): VisualizationLayer => {
  const { radius = 3, alpha = 0.4 } = options;

  return ({ context, sequence, offsetX, offsetY, valueScale, textColor }) => {
    context.save();
    context.fillStyle = textColor;
    context.globalAlpha = alpha;
    const plotted = new Set<number>();
    sequence.forEach((val) => {
      if (!plotted.has(val)) {
        plotted.add(val);
        const x = offsetX + val * valueScale;
        context.beginPath();
        context.arc(x, offsetY, radius, 0, 2 * Math.PI);
        context.fill();
      }
    });
    context.restore();
  };
};
```

Then a visualization just calls `createDrawPlottedNumbers({ radius: 5 })` in its `layers` array. Keep exporting a default instance (`drawPlottedNumbers = createDrawPlottedNumbers()`) so existing code doesn't break.

**2. A layer registry, mirroring your visualization registry**

If you want users to eventually mix-and-match layers in a UI ("show me Recamán arcs + factor waves on the same plot"), give each layer an id and metadata, just like `visualizations`:

```typescript
type LayerEntry = {
  id: string;
  name: string;
  layer: VisualizationLayer;
  compatibleWith?: (seqMeta: { hasIntervals: boolean }) => boolean;
};

const layers = new Map<string, LayerEntry>([
  ['baseline', { id: 'baseline', name: 'Baseline', layer: drawBaseline }],
  [
    'plotted-numbers',
    {
      id: 'plotted-numbers',
      name: 'Plotted Numbers',
      layer: drawPlottedNumbers
    }
  ],
  [
    'recaman-arcs',
    { id: 'recaman-arcs', name: 'Recamán Arcs', layer: drawRecamanArcs }
  ],
  [
    'factor-waves',
    { id: 'factor-waves', name: 'Factor Waves', layer: drawFactorWaves }
  ]
]);
```

Then a "custom" visualization could just be `{ id: 'custom', name: 'Custom', layers: selectedLayerIds.map(id => layers.get(id)!.layer) }` built dynamically from user selection.

**3. Composable scale calculators**

`calculateRecamanScale` already combines a horizontal and vertical constraint via `Math.min`. You could generalize this into a `combineScales(...calculators)` helper that takes the min (or max) across any number of scale calculators — useful if a custom visualization mixes arc-based and wave-based layers and needs both constraints satisfied:

```typescript
export const combineScales =
  (...calculators: ScaleCalculator[]): ScaleCalculator =>
  (args) =>
    Math.min(...calculators.map((c) => c(args)));
```

**4. A shared "preset" grouping for common layer stacks**

Since `[drawBaseline, drawPlottedNumbers]` appears at the start of both visualizations, naming that combo (`basePreset`) makes intent clearer and ensures consistent ordering if you add a third visualization later:

```typescript
export const basePreset: VisualizationLayer[] = [
  drawBaseline,
  drawPlottedNumbers
];

export const recamanArcs = factoryVisualization({
  id: 'recaman-arcs',
  name: 'Recamán Arcs',
  layers: [...basePreset, drawRecamanArcs],
  calculateScale: calculateRecamanScale
});
```

These are additive — none require restructuring what you have, and you could adopt them incrementally (start with the layer factory pattern since it's the highest-leverage one for actual visual variety). Want me to sketch out what a "custom visualization builder" UI feeding off the layer registry might look like?
