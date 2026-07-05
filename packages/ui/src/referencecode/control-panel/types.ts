import type { ComponentProps, ComponentType } from 'react';
import type { Button } from '../../elements/button/Button';
import type { Slider } from '../../elements/slider/Slider';
import type { Switch } from '../../elements/switch/Switch';
import type { Input } from '../../form/input/Input';
import type { Select } from '../../form/select/Select';
import type { ColorPalette } from '../color-palette/ColorPalette';

// ─── Controls ────────────────────────────────────────────

export type Control =
  | TextControl
  | SliderControl
  | ColorControl
  | ToggleControl
  | SelectControl
  | NumberControl
  | ButtonControl
  | ColorPaletteControl
  | CustomControl;

type ControlBase = {
  id: string;
  label: string;
  disabled?: boolean;
  hidden?: boolean;
  tooltip?: string;
};

export type CustomControl = ControlBase & {
  type: 'custom';
  render: () => React.ReactNode;
};

export type ColorPaletteControl = ControlBase & {
  type: 'color-palette';
  value: string;
  colors: string[];
  name: string;
  checked: boolean;
  orientation?: 'horizontal' | 'vertical';
  size?: 'sm' | 'md' | 'lg';
  onChange: (palette: string) => void;
} & Omit<
    ComponentProps<typeof ColorPalette>,
    'value' | 'onChange' | 'colors' | 'name' | 'checked' | 'orientation' | 'size'
  >;

export type TextControl = ControlBase & {
  type: 'text';
  value: string;
  onChange: (value: string) => void;
} & Omit<ComponentProps<typeof Input>, 'value' | 'onChange' | 'type'>;

export type SliderControl = ControlBase & {
  type: 'slider';
  value: number;
  min?: number;
  max?: number;
  step?: number;
  onChange: (value: number) => void;
} & Omit<ComponentProps<typeof Slider>, 'value' | 'onChange' | 'min' | 'max' | 'step'>;

export type ColorControl = ControlBase & {
  type: 'color';
  value: string;
  onChange: (value: string) => void;
} & Omit<ComponentProps<typeof Input>, 'value' | 'onChange' | 'type'>;

export type ToggleControl = ControlBase & {
  type: 'toggle';
  value: boolean;
  onChange: (value: boolean) => void;
} & Omit<ComponentProps<typeof Switch>, 'value' | 'onChange' | 'checked'>;

export type SelectControl = ControlBase & {
  type: 'select';
  value: string;
  options: { label: string; value: string }[];
  onChange: (value: string) => void;
} & Omit<ComponentProps<typeof Select>, 'value' | 'onChange' | 'children'>;

export type NumberControl = ControlBase & {
  type: 'number';
  value: number;
  min?: number;
  max?: number;
  step?: number;
  onChange: (value: number) => void;
} & Omit<ComponentProps<typeof Input>, 'value' | 'onChange' | 'type' | 'min' | 'max' | 'step'>;

export type ButtonControl = ControlBase & {
  type: 'button';
  variant?: 'default' | 'primary' | 'danger';
  icon?: ComponentType<{ className?: string }>;
  onClick: () => void;
} & Omit<ComponentProps<typeof Button>, 'onClick' | 'children'>;

// ─── Sections ────────────────────────────────────────────

export type ControlSection = {
  id: string;
  label: string;
  icon?: ComponentType<{ className?: string }>;
  controls: Control[];
  defaultOpen?: boolean;
  flow?: 'horizontal' | 'vertical';
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
};

export type ControlPanelRef = {
  open: () => void;
  close: () => void;
  toggle: () => void;
};
