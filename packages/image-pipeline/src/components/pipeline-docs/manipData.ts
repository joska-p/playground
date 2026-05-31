import type { ManipulationDefinition } from "../image-pipeline/types";

type ManipInfo = {
  id: string;
  label: string;
  type: "pixel" | "neighborhood" | "whole";
  params?: {
    key: string;
    label: string;
    min: number;
    max: number;
    step: number;
    default: number;
  }[];
  description: string;
};

const PIXEL_MANIPS: ManipInfo[] = [
  {
    id: "brightness",
    label: "Brightness",
    type: "pixel",
    description: "Multiply RGB channels by a value",
    params: [{ key: "value", label: "Amount", min: 0, max: 3, step: 0.05, default: 1.5 }],
  },
  {
    id: "contrast",
    label: "Contrast",
    type: "pixel",
    description: "Stretch or compress contrast around 50% gray",
    params: [{ key: "value", label: "Strength", min: 0, max: 3, step: 0.05, default: 1.5 }],
  },
  {
    id: "grayscale",
    label: "Grayscale",
    type: "pixel",
    description: "Convert to luminosity grayscale",
  },
  { id: "sepia", label: "Sepia", type: "pixel", description: "Classic sepia tone effect" },
  { id: "invert", label: "Invert", type: "pixel", description: "Invert all RGB channels" },
  {
    id: "saturation",
    label: "Saturation",
    type: "pixel",
    description: "Adjust color intensity",
    params: [{ key: "value", label: "Amount", min: 0, max: 3, step: 0.05, default: 0.3 }],
  },
  {
    id: "hue-rotate",
    label: "Hue Rotate",
    type: "pixel",
    description: "Rotate hues around the color wheel",
    params: [{ key: "degrees", label: "Degrees", min: 0, max: 360, step: 5, default: 180 }],
  },
  {
    id: "opacity",
    label: "Opacity",
    type: "pixel",
    description: "Multiply alpha channel",
    params: [{ key: "value", label: "Amount", min: 0, max: 1, step: 0.05, default: 0.5 }],
  },
  {
    id: "threshold",
    label: "Threshold",
    type: "pixel",
    description: "Binary black/white based on luminance threshold",
    params: [{ key: "threshold", label: "Level", min: 0, max: 255, step: 5, default: 128 }],
  },
];

const NEIGHBOR_MANIPS: ManipInfo[] = [
  {
    id: "gaussian-blur",
    label: "Gaussian Blur",
    type: "neighborhood",
    description: "Gaussian kernel blur",
    params: [{ key: "radius", label: "Radius", min: 1, max: 5, step: 1, default: 2 }],
  },
  {
    id: "box-blur",
    label: "Box Blur",
    type: "neighborhood",
    description: "Uniform kernel blur",
    params: [{ key: "radius", label: "Radius", min: 1, max: 5, step: 1, default: 2 }],
  },
  {
    id: "sharpen",
    label: "Sharpen",
    type: "neighborhood",
    description: "Laplacian unsharp mask",
    params: [{ key: "strength", label: "Strength", min: 0.5, max: 5, step: 0.5, default: 2 }],
  },
  {
    id: "edge-detect",
    label: "Edge Detect",
    type: "neighborhood",
    description: "Sobel operator edge detection",
  },
];

const WHOLE_MANIPS: ManipInfo[] = [
  {
    id: "histogram-equalize",
    label: "Histogram Equalize",
    type: "whole",
    description: "Equalize luminance histogram for contrast stretch",
  },
  {
    id: "flip-horizontal",
    label: "Flip Horizontal",
    type: "whole",
    description: "Mirror image left-to-right",
  },
  {
    id: "flip-vertical",
    label: "Flip Vertical",
    type: "whole",
    description: "Mirror image top-to-bottom",
  },
  {
    id: "rotate-90cw",
    label: "Rotate 90° CW",
    type: "whole",
    description: "Rotate 90 degrees clockwise",
  },
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

export { NEIGHBOR_MANIPS, PIXEL_MANIPS, WHOLE_MANIPS };
export type { ManipInfo };
