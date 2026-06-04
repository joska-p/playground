type ParamDef = {
  key: string;
  label: string;
  min: number;
  max: number;
  step: number;
  default: number;
};

type ManipInfo = {
  id: string;
  label: string;
  type: 'pixel' | 'neighborhood' | 'whole';
  path: string;
  params?: ParamDef[];
  description: string;
  longDescription: string;
};

type EndpointId =
  | { kind: 'overview' }
  | { kind: 'manip'; id: string }
  | { kind: 'pipeline'; id: 'resize' | 'chaining' }
  | { kind: 'internals'; id: string };

type EndpointItemType =
  | 'overview'
  | 'pixel'
  | 'neighborhood'
  | 'whole'
  | 'pipeline'
  | 'internals';

type EndpointItem = {
  id: string;
  label: string;
  type: EndpointItemType;
  description: string;
  path: string;
  params?: ParamDef[];
};

type EndpointGroup = {
  label: string;
  items: EndpointItem[];
};

function isActiveEndpoint(a: EndpointId, b: EndpointId): boolean {
  if (a.kind === 'overview' && b.kind === 'overview') return true;
  if (a.kind === 'manip' && b.kind === 'manip' && a.id === b.id) return true;
  if (a.kind === 'pipeline' && b.kind === 'pipeline' && a.id === b.id)
    return true;
  if (a.kind === 'internals' && b.kind === 'internals' && a.id === b.id)
    return true;
  return false;
}

function findItemForEndpoint(
  groups: EndpointGroup[],
  endpoint: EndpointId
): EndpointItem | undefined {
  if (endpoint.kind === 'overview') {
    return groups[0]?.items[0];
  }
  for (const group of groups) {
    for (const item of group.items) {
      if (
        endpoint.kind === 'manip' &&
        item.id === endpoint.id &&
        item.type !== 'pipeline'
      ) {
        return item;
      }
      if (
        endpoint.kind === 'pipeline' &&
        item.id === endpoint.id &&
        item.type === 'pipeline'
      ) {
        return item;
      }
      if (
        endpoint.kind === 'internals' &&
        item.id === endpoint.id &&
        item.type === 'internals'
      ) {
        return item;
      }
    }
  }
  return undefined;
}

function findManipById(id: string): ManipInfo | undefined {
  return [...PIXEL_MANIPS, ...NEIGHBOR_MANIPS, ...WHOLE_MANIPS].find(
    (m) => m.id === id
  );
}

const PIXEL_MANIPS: ManipInfo[] = [
  {
    id: 'brightness',
    label: 'Brightness',
    type: 'pixel',
    path: '/manip/brightness',
    description: 'Multiply RGB channels by a value',
    longDescription:
      'Multiplies each RGB channel by `value`. Each output channel = input × value. A value of 1 leaves the image unchanged, 2 doubles brightness, and 0.5 halves it.',
    params: [
      {
        key: 'value',
        label: 'Amount',
        min: 0,
        max: 3,
        step: 0.05,
        default: 1.5,
      },
    ],
  },
  {
    id: 'contrast',
    label: 'Contrast',
    type: 'pixel',
    path: '/manip/contrast',
    description: 'Stretch or compress contrast around 50% gray',
    longDescription:
      'Scales each channel relative to 128 (mid-gray). output = (input − 128) × value + 128. A value of 1 leaves the image unchanged; values above 1 increase contrast.',
    params: [
      {
        key: 'value',
        label: 'Strength',
        min: 0,
        max: 3,
        step: 0.05,
        default: 1.5,
      },
    ],
  },
  {
    id: 'grayscale',
    label: 'Grayscale',
    type: 'pixel',
    path: '/manip/grayscale',
    description: 'Convert to luminosity grayscale',
    longDescription:
      'Converts to luminance using ITU-R BT.601 weights: L = 0.2126R + 0.7152G + 0.0722B. Each channel is set to the luminance value, preserving perceived brightness.',
  },
  {
    id: 'sepia',
    label: 'Sepia',
    type: 'pixel',
    path: '/manip/sepia',
    description: 'Classic sepia tone effect',
    longDescription:
      'Applies a classic sepia tone matrix transformation. The output RGB values are computed as weighted combinations of the input RGB channels to produce a warm brownish tone.',
  },
  {
    id: 'invert',
    label: 'Invert',
    type: 'pixel',
    path: '/manip/invert',
    description: 'Invert all RGB channels',
    longDescription:
      'Inverts each channel independently: output = 255 − input. Alpha is preserved unchanged.',
  },
  {
    id: 'saturation',
    label: 'Saturation',
    type: 'pixel',
    path: '/manip/saturation',
    description: 'Adjust color intensity',
    longDescription:
      "Scales each channel's deviation from luminance. For each channel: output = L + (input − L) × value. 0 produces grayscale, 1 is unchanged, values above 1 oversaturate.",
    params: [
      {
        key: 'value',
        label: 'Amount',
        min: 0,
        max: 3,
        step: 0.05,
        default: 0.3,
      },
    ],
  },
  {
    id: 'hue-rotate',
    label: 'Hue Rotate',
    type: 'pixel',
    path: '/manip/hue-rotate',
    description: 'Rotate hues around the color wheel',
    longDescription:
      'Rotates hue in a YUV-like color space using a rotation matrix. Each pixel is converted to YUV, the UV vector is rotated by the given angle, then converted back to RGB.',
    params: [
      {
        key: 'degrees',
        label: 'Degrees',
        min: 0,
        max: 360,
        step: 5,
        default: 180,
      },
    ],
  },
  {
    id: 'opacity',
    label: 'Opacity',
    type: 'pixel',
    path: '/manip/opacity',
    description: 'Multiply alpha channel',
    longDescription:
      'Multiplies the alpha channel by the given value. A value of 1 preserves full opacity, 0 makes the image fully transparent.',
    params: [
      {
        key: 'value',
        label: 'Amount',
        min: 0,
        max: 1,
        step: 0.05,
        default: 0.5,
      },
    ],
  },
  {
    id: 'threshold',
    label: 'Threshold',
    type: 'pixel',
    path: '/manip/threshold',
    description: 'Binary black/white based on luminance threshold',
    longDescription:
      'Converts each pixel to pure black or white by comparing luminance against the threshold. Luminance uses BT.601 weights. Pixels below the threshold become black, above become white.',
    params: [
      {
        key: 'threshold',
        label: 'Level',
        min: 0,
        max: 255,
        step: 5,
        default: 128,
      },
    ],
  },
];

const NEIGHBOR_MANIPS: ManipInfo[] = [
  {
    id: 'gaussian-blur',
    label: 'Gaussian Blur',
    type: 'neighborhood',
    path: '/manip/gaussian-blur',
    description: 'Gaussian kernel blur',
    longDescription:
      'Convolves the image with a Gaussian kernel. Kernel size = radius × 2 + 1, sigma = radius / 2 + 0.5. The kernel weights follow a Gaussian distribution centered on the pixel.',
    params: [
      { key: 'radius', label: 'Radius', min: 1, max: 5, step: 1, default: 2 },
    ],
  },
  {
    id: 'box-blur',
    label: 'Box Blur',
    type: 'neighborhood',
    path: '/manip/box-blur',
    description: 'Uniform kernel blur',
    longDescription:
      'Convolves the image with a uniform kernel where all weights are equal. Faster than Gaussian for large radii. Kernel size = radius × 2 + 1.',
    params: [
      { key: 'radius', label: 'Radius', min: 1, max: 5, step: 1, default: 2 },
    ],
  },
  {
    id: 'sharpen',
    label: 'Sharpen',
    type: 'neighborhood',
    path: '/manip/sharpen',
    description: 'Laplacian unsharp mask',
    longDescription:
      'Laplacian unsharp mask. Kernel: [0, −s, 0, −s, 1+4s, −s, 0, −s, 0]. The center pixel is amplified relative to its neighbors, enhancing edges.',
    params: [
      {
        key: 'strength',
        label: 'Strength',
        min: 0.5,
        max: 5,
        step: 0.5,
        default: 2,
      },
    ],
  },
  {
    id: 'edge-detect',
    label: 'Edge Detect',
    type: 'neighborhood',
    path: '/manip/edge-detect',
    description: 'Sobel operator edge detection',
    longDescription:
      'Sobel edge detection. Computes gradient magnitude from Sobel X and Sobel Y kernels per channel: G = sqrt(Gx² + Gy²). Strong gradients (edges) appear bright, uniform areas appear dark.',
  },
];

const WHOLE_MANIPS: ManipInfo[] = [
  {
    id: 'histogram-equalize',
    label: 'Histogram Equalize',
    type: 'whole',
    path: '/manip/histogram-equalize',
    description: 'Equalize luminance histogram for contrast stretch',
    longDescription:
      'Improves contrast by spreading luminance values across the full 0–255 range. Computes the luminance histogram, builds a CDF-based lookup table, and remaps each pixel while preserving per-channel color ratios.',
  },
  {
    id: 'flip-horizontal',
    label: 'Flip Horizontal',
    type: 'whole',
    path: '/manip/flip-horizontal',
    description: 'Mirror image left-to-right',
    longDescription:
      'Mirrors the image horizontally by reversing pixel order within each row. Pixel at (x, y) moves to (width − 1 − x, y).',
  },
  {
    id: 'flip-vertical',
    label: 'Flip Vertical',
    type: 'whole',
    path: '/manip/flip-vertical',
    description: 'Mirror image top-to-bottom',
    longDescription:
      'Mirrors the image vertically by reversing row order. Pixel at (x, y) moves to (x, height − 1 − y).',
  },
  {
    id: 'rotate-90cw',
    label: 'Rotate 90° CW',
    type: 'whole',
    path: '/manip/rotate-90cw',
    description: 'Rotate 90 degrees clockwise',
    longDescription:
      'Rotates the image 90 degrees clockwise. The output dimensions swap: output width = input height, output height = input width. Pixel at (x, y) maps to (height − 1 − y, x).',
  },
];

function manipToItem(m: ManipInfo): EndpointItem {
  return {
    id: m.id,
    label: m.label,
    type: m.type,
    description: m.description,
    path: m.path,
    params: m.params,
  };
}

const PIPELINE_ITEMS: EndpointItem[] = [
  {
    id: 'resize',
    label: 'Resize',
    type: 'pipeline',
    path: '/pipeline/resize',
    description: 'Resize images at any point in the pipeline',
  },
  {
    id: 'chaining',
    label: 'Chaining',
    type: 'pipeline',
    path: '/pipeline/chaining',
    description: 'Compose multiple manipulations into a single pipeline run',
  },
];

const OVERVIEW_ITEM: EndpointItem = {
  id: 'overview',
  label: 'API Overview',
  type: 'overview',
  path: '/overview',
  description: 'Architecture, API surfaces, and quick start guide',
};

const INTERNAL_SECTIONS: EndpointItem[] = [
  {
    id: 'execution-engine',
    label: 'Execution Engine',
    type: 'internals',
    path: '/internals/execution-engine',
    description: 'Pipeline run loop, double-buffering, and step routing',
  },
  {
    id: 'fusion-scheduler',
    label: 'Fusion Scheduler',
    type: 'internals',
    path: '/internals/fusion-scheduler',
    description: 'Batching consecutive pixel ops into a single pass',
  },
  {
    id: 'tiling',
    label: 'Neighborhood Tiling',
    type: 'internals',
    path: '/internals/tiling',
    description:
      'Tile-based convolution for memory-efficient large-image processing',
  },
  {
    id: 'resize-algorithm',
    label: 'Resize Algorithm',
    type: 'internals',
    path: '/internals/resize-algorithm',
    description: 'Bilinear interpolation and dimension logic',
  },
  {
    id: 'worker-architecture',
    label: 'Worker Architecture',
    type: 'internals',
    path: '/internals/worker-architecture',
    description: 'Web Worker pool, FIFO queue, and zero-copy Transferables',
  },
  {
    id: 'configuration',
    label: 'Configuration',
    type: 'internals',
    path: '/internals/configuration',
    description: 'Default limits and environment settings',
  },
];

const ENDPOINT_GROUPS: EndpointGroup[] = [
  { label: 'Overview', items: [OVERVIEW_ITEM] },
  { label: 'Pixel', items: PIXEL_MANIPS.map(manipToItem) },
  { label: 'Neighbor', items: NEIGHBOR_MANIPS.map(manipToItem) },
  { label: 'Whole', items: WHOLE_MANIPS.map(manipToItem) },
  { label: 'Pipeline', items: PIPELINE_ITEMS },
  { label: 'Internals', items: INTERNAL_SECTIONS },
];

export {
  ENDPOINT_GROUPS,
  INTERNAL_SECTIONS,
  NEIGHBOR_MANIPS,
  PIXEL_MANIPS,
  WHOLE_MANIPS,
  findItemForEndpoint,
  findManipById,
  isActiveEndpoint,
};
export type { EndpointGroup, EndpointId, EndpointItem, ManipInfo, ParamDef };
