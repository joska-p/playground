import type { ManipulationId } from "../manipulations/manipulations";

type WorkflowPresetStep = {
  id: ManipulationId;
  args: Record<string, number>;
};

type WorkflowPreset = {
  name: string;
  description: string;
  steps: WorkflowPresetStep[];
};

const WORKFLOW_PRESETS: WorkflowPreset[] = [
  {
    name: "Vintage",
    description: "Warm, faded sepia look",
    steps: [
      { id: "sepia", args: {} },
      { id: "brightness", args: { factor: 1.2 } },
      { id: "contrast", args: { factor: 0.8 } },
    ],
  },
  {
    name: "Dramatic B&W",
    description: "High-contrast black and white",
    steps: [
      { id: "grayscale", args: {} },
      { id: "contrast", args: { factor: 2.0 } },
    ],
  },
  {
    name: "Neon",
    description: "Bold oversaturated colors",
    steps: [
      { id: "saturate", args: { amount: 2.5 } },
      { id: "brightness", args: { factor: 1.2 } },
      { id: "contrast", args: { factor: 1.5 } },
    ],
  },
  {
    name: "Blueprint",
    description: "Inverted threshold mask",
    steps: [
      { id: "invert", args: {} },
      { id: "threshold", args: { threshold: 200 } },
    ],
  },
  {
    name: "Soft Pastel",
    description: "Muted, gentle tones",
    steps: [
      { id: "saturate", args: { amount: 1.1 } },
      { id: "brightness", args: { factor: 1.3 } },
      { id: "contrast", args: { factor: 0.7 } },
    ],
  },
  {
    name: "Dark & Moody",
    description: "Dark, rich atmosphere",
    steps: [
      { id: "brightness", args: { factor: 0.5 } },
      { id: "contrast", args: { factor: 1.8 } },
      { id: "saturate", args: { amount: 0.6 } },
    ],
  },
  {
    name: "Overexposed",
    description: "Bright, washed-out film look",
    steps: [
      { id: "brightness", args: { factor: 2.2 } },
      { id: "contrast", args: { factor: 0.5 } },
    ],
  },
  {
    name: "High Contrast",
    description: "Punchy, high-impact colors",
    steps: [
      { id: "contrast", args: { factor: 2.5 } },
      { id: "saturate", args: { amount: 1.6 } },
    ],
  },
  {
    name: "Edge Ink",
    description: "Sobel edge detection on grayscale",
    steps: [
      { id: "grayscale", args: {} },
      { id: "energyMap", args: {} },
    ],
  },
];

export { WORKFLOW_PRESETS };
export type { WorkflowPreset, WorkflowPresetStep };
