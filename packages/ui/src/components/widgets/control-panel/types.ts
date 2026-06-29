import type { ComponentType } from 'react';

// ─── Controls ────────────────────────────────────────────

export type Control =
  | SliderControl
  | ColorControl
  | ToggleControl
  | SelectControl
  | NumberControl
  | Vec2Control
  | Vec3Control
  | ButtonControl;

type ControlBase = {
  id: string;
  label: string;
  disabled?: boolean;
  hidden?: boolean;
  tooltip?: string;
};

export type SliderControl = ControlBase & {
  type: 'slider';
  value: number;
  min?: number;
  max?: number;
  step?: number;
  onChange: (value: number) => void;
};

export type ColorControl = ControlBase & {
  type: 'color';
  value: string;
  onChange: (value: string) => void;
};

export type ToggleControl = ControlBase & {
  type: 'toggle';
  value: boolean;
  onChange: (value: boolean) => void;
};

export type SelectControl = ControlBase & {
  type: 'select';
  value: string;
  options: { label: string; value: string }[];
  onChange: (value: string) => void;
};

export type NumberControl = ControlBase & {
  type: 'number';
  value: number;
  min?: number;
  max?: number;
  step?: number;
  onChange: (value: number) => void;
};

export type Vec2Control = ControlBase & {
  type: 'vec2';
  value: [number, number];
  min?: number;
  max?: number;
  step?: number;
  labels?: [string, string];
  onChange: (value: [number, number]) => void;
};

export type Vec3Control = ControlBase & {
  type: 'vec3';
  value: [number, number, number];
  min?: number;
  max?: number;
  step?: number;
  labels?: [string, string, string];
  onChange: (value: [number, number, number]) => void;
};

export type ButtonControl = ControlBase & {
  type: 'button';
  variant?: 'default' | 'primary' | 'danger';
  icon?: ComponentType<{ className?: string }>;
  onClick: () => void;
};

// ─── Sections ────────────────────────────────────────────

export type ControlSection = {
  id: string;
  label: string;
  icon?: ComponentType<{ className?: string }>;
  controls: Control[];
  defaultOpen?: boolean;
};

// ─── Panel ───────────────────────────────────────────────

export type ControlPanelProps = {
  sections: ControlSection[];
  width?: string;
  accordion?: boolean;
  defaultOpenSections?: string[];

  // Drawer state (controlled or uncontrolled)
  open?: boolean;
  onOpenChange?: (open: boolean) => void;

  // Slots
  header?: React.ReactNode;
  footer?: React.ReactNode;

  // Styling
  className?: string;

  // Ref
  ref?: React.Ref<ControlPanelRef>;
};

export type ControlPanelRef = {
  open: () => void;
  close: () => void;
  toggle: () => void;
};
