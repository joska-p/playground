import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Switch, Label } from "@repo/ui";

/**
 * The Switch component is a digital toggle that allows users to switch between two states.
 * Best used for settings that take effect immediately in your creative tools.
 */
const meta: Meta<typeof Switch> = {
  title: "Components/Switch",
  component: Switch,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      description: "Changes the 'on' state color palette.",
      options: ["default", "dangerous"],
      control: { type: "select" },
    },
    size: {
      description: "The physical size of the toggle.",
      options: ["default", "sm"],
      control: { type: "select" },
    },
    checked: {
      description: "The current state of the switch.",
      control: "boolean",
    },
  },
};

export default meta;

type Story = StoryObj<typeof Switch>;

/**
 * The standard switch used for general settings like 'Dark Mode' or 'Auto-save'.
 */
export const Default: Story = {
  args: {
    variant: "default",
  },
  render: (args) => {
    const [checked, setChecked] = useState(false);
    return (
      <div className="flex items-center gap-3 font-mono">
        <Switch {...args} checked={checked} onCheckedChange={setChecked} id="toggle-feature" />
        <Label htmlFor="toggle-feature" className="cursor-pointer">
          Enable Experiment
        </Label>
      </div>
    );
  },
};

/**
 * A smaller version for dense UI sidebars or property panels.
 */
export const Small: Story = {
  args: {
    size: "sm",
  },
  render: (args) => {
    const [checked, setChecked] = useState(true);
    return (
      <div className="flex items-center gap-3 font-mono text-xs">
        <Switch {...args} checked={checked} onCheckedChange={setChecked} />
        <Label>Compact Mode</Label>
      </div>
    );
  },
};

/**
 * Used for high-impact actions like 'Hardware Acceleration' or 'Reset Canvas'.
 */
export const Dangerous: Story = {
  args: {
    variant: "dangerous",
  },
  render: (args) => {
    const [checked, setChecked] = useState(false);
    return (
      <div className="text-destructive flex items-center gap-3 font-mono">
        <Switch {...args} checked={checked} onCheckedChange={setChecked} />
        <Label>Self-Destruct Mode</Label>
      </div>
    );
  },
};
