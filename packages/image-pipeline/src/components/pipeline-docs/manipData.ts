import type { ManipulationDefinition } from "../image-pipeline/types";

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
  type: "pixel" | "neighborhood" | "whole";
  path: string;
  params?: ParamDef[];
  description: string;
};

type EndpointId =
  | { kind: "overview" }
  | { kind: "manip"; id: string }
  | { kind: "pipeline"; id: "snapshots" | "resize" | "chaining" | "custom" };

type EndpointItemType = "overview" | "pixel" | "neighborhood" | "whole" | "pipeline";

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
  if (a.kind === "overview" && b.kind === "overview") return true;
  if (a.kind === "manip" && b.kind === "manip" && a.id === b.id) return true;
  if (a.kind === "pipeline" && b.kind === "pipeline" && a.id === b.id) return true;
  return false;
}

function findItemForEndpoint(groups: EndpointGroup[], endpoint: EndpointId): EndpointItem | undefined {
  if (endpoint.kind === "overview") {
    return groups[0]?.items[0];
  }
  for (const group of groups) {
    for (const item of group.items) {
      if (endpoint.kind === "manip" && item.id === endpoint.id && item.type !== "pipeline") {
        return item;
      }
      if (endpoint.kind === "pipeline" && item.id === endpoint.id && item.type === "pipeline") {
        return item;
      }
    }
  }
  return undefined;
}

function findManipById(id: string): ManipInfo | undefined {
  return [...PIXEL_MANIPS, ...NEIGHBOR_MANIPS, ...WHOLE_MANIPS].find((m) => m.id === id);
}

const PIXEL_MANIPS: ManipInfo[] = [
  {
    id: "brightness",
    label: "Brightness",
    type: "pixel",
    path: "/manip/brightness",
    description: "Multiply RGB channels by a value",
    params: [{ key: "value", label: "Amount", min: 0, max: 3, step: 0.05, default: 1.5 }],
  },
  {
    id: "contrast",
    label: "Contrast",
    type: "pixel",
    path: "/manip/contrast",
    description: "Stretch or compress contrast around 50% gray",
    params: [{ key: "value", label: "Strength", min: 0, max: 3, step: 0.05, default: 1.5 }],
  },
  {
    id: "grayscale",
    label: "Grayscale",
    type: "pixel",
    path: "/manip/grayscale",
    description: "Convert to luminosity grayscale",
  },
  {
    id: "sepia",
    label: "Sepia",
    type: "pixel",
    path: "/manip/sepia",
    description: "Classic sepia tone effect",
  },
  {
    id: "invert",
    label: "Invert",
    type: "pixel",
    path: "/manip/invert",
    description: "Invert all RGB channels",
  },
  {
    id: "saturation",
    label: "Saturation",
    type: "pixel",
    path: "/manip/saturation",
    description: "Adjust color intensity",
    params: [{ key: "value", label: "Amount", min: 0, max: 3, step: 0.05, default: 0.3 }],
  },
  {
    id: "hue-rotate",
    label: "Hue Rotate",
    type: "pixel",
    path: "/manip/hue-rotate",
    description: "Rotate hues around the color wheel",
    params: [{ key: "degrees", label: "Degrees", min: 0, max: 360, step: 5, default: 180 }],
  },
  {
    id: "opacity",
    label: "Opacity",
    type: "pixel",
    path: "/manip/opacity",
    description: "Multiply alpha channel",
    params: [{ key: "value", label: "Amount", min: 0, max: 1, step: 0.05, default: 0.5 }],
  },
  {
    id: "threshold",
    label: "Threshold",
    type: "pixel",
    path: "/manip/threshold",
    description: "Binary black/white based on luminance threshold",
    params: [{ key: "threshold", label: "Level", min: 0, max: 255, step: 5, default: 128 }],
  },
];

const NEIGHBOR_MANIPS: ManipInfo[] = [
  {
    id: "gaussian-blur",
    label: "Gaussian Blur",
    type: "neighborhood",
    path: "/manip/gaussian-blur",
    description: "Gaussian kernel blur",
    params: [{ key: "radius", label: "Radius", min: 1, max: 5, step: 1, default: 2 }],
  },
  {
    id: "box-blur",
    label: "Box Blur",
    type: "neighborhood",
    path: "/manip/box-blur",
    description: "Uniform kernel blur",
    params: [{ key: "radius", label: "Radius", min: 1, max: 5, step: 1, default: 2 }],
  },
  {
    id: "sharpen",
    label: "Sharpen",
    type: "neighborhood",
    path: "/manip/sharpen",
    description: "Laplacian unsharp mask",
    params: [{ key: "strength", label: "Strength", min: 0.5, max: 5, step: 0.5, default: 2 }],
  },
  {
    id: "edge-detect",
    label: "Edge Detect",
    type: "neighborhood",
    path: "/manip/edge-detect",
    description: "Sobel operator edge detection",
  },
];

const WHOLE_MANIPS: ManipInfo[] = [
  {
    id: "histogram-equalize",
    label: "Histogram Equalize",
    type: "whole",
    path: "/manip/histogram-equalize",
    description: "Equalize luminance histogram for contrast stretch",
  },
  {
    id: "flip-horizontal",
    label: "Flip Horizontal",
    type: "whole",
    path: "/manip/flip-horizontal",
    description: "Mirror image left-to-right",
  },
  {
    id: "flip-vertical",
    label: "Flip Vertical",
    type: "whole",
    path: "/manip/flip-vertical",
    description: "Mirror image top-to-bottom",
  },
  {
    id: "rotate-90cw",
    label: "Rotate 90° CW",
    type: "whole",
    path: "/manip/rotate-90cw",
    description: "Rotate 90 degrees clockwise",
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
    id: "snapshots",
    label: "Snapshots",
    type: "pipeline",
    path: "/pipeline/snapshots",
    description: "Capture intermediate results mid-pipeline with snapshot steps",
  },
  {
    id: "resize",
    label: "Resize",
    type: "pipeline",
    path: "/pipeline/resize",
    description: "Resize images at any point in the pipeline",
  },
  {
    id: "chaining",
    label: "Chaining",
    type: "pipeline",
    path: "/pipeline/chaining",
    description: "Compose multiple manipulations into a single pipeline run",
  },
  {
    id: "custom",
    label: "Custom",
    type: "pipeline",
    path: "/pipeline/custom",
    description: "Register and run your own custom manipulation functions",
  },
];

const OVERVIEW_ITEM: EndpointItem = {
  id: "overview",
  label: "API Overview",
  type: "overview",
  path: "/overview",
  description: "Architecture, API surfaces, and quick start guide",
};

const ENDPOINT_GROUPS: EndpointGroup[] = [
  { label: "Overview", items: [OVERVIEW_ITEM] },
  { label: "Pixel", items: PIXEL_MANIPS.map(manipToItem) },
  { label: "Neighbor", items: NEIGHBOR_MANIPS.map(manipToItem) },
  { label: "Whole", items: WHOLE_MANIPS.map(manipToItem) },
  { label: "Pipeline", items: PIPELINE_ITEMS },
];

export const DEMO_MANIPULATIONS: ManipulationDefinition[] = [
  {
    id: "demo-warm",
    type: "pixel",
    fn: (r: number, g: number, b: number, a: number): [number, number, number, number] => [
      Math.min(255, r * 1.1),
      g * 0.85,
      b * 0.7,
      a,
    ],
  },
];

export {
  ENDPOINT_GROUPS,
  NEIGHBOR_MANIPS,
  PIXEL_MANIPS,
  WHOLE_MANIPS,
  findItemForEndpoint,
  findManipById,
  isActiveEndpoint,
};
export type { EndpointGroup, EndpointId, EndpointItem, ManipInfo, ParamDef };
