import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Switch } from "@repo/ui";

/**
 * A styled toggle switch component for binary on/off states.
 * Perfect for settings that take effect immediately.
 */
const meta: Meta<typeof Switch> = {
  title: "Components/Switch",
  component: Switch,
  tags: ["autodocs"],
  argTypes: {
    label: {
      description: "The label text displayed above the switch.",
      control: "text",
    },
    helperText: {
      description: "Supportive text displayed below the switch.",
      control: "text",
    },
    variant: {
      description: "Changes the 'on' state color palette.",
      options: ["primary", "secondary", "accent", "destructive"],
      control: { type: "select" },
    },
    size: {
      description: "The size of the switch.",
      options: ["medium", "small", "large"],
      control: { type: "select" },
    },
    checked: {
      description: "The current state of the switch.",
      control: "boolean",
    },
    disabled: {
      description: "Disables user interaction and applies dimmed styling.",
      control: "boolean",
    },
    },
    args: {
    label: "Enable Feature",
    variant: "primary",
    size: "medium",
    },
};

export default meta;

type Story = StoryObj<typeof Switch>;

function InteractiveSwitch(args: React.ComponentProps<typeof Switch>) {
  const [checked, setChecked] = useState(args.checked ?? false);
  return <Switch {...args} checked={checked} onCheckedChange={setChecked} />;
}

/**
 * The standard switch using the primary color.
 * Use as the default switch for most settings.
 */
export const Primary: Story = {
  render: (args) => <InteractiveSwitch {...args} />,
};

/**
 * Uses the secondary color for alternative switches.
 * Good for secondary settings.
 */
export const Secondary: Story = {
  args: {
    label: "Dark Mode",
    variant: "secondary",
    helperText: "Switch to dark theme.",
  },
  render: (args) => <InteractiveSwitch {...args} />,
};

/**
 * Uses the accent color for highlighted switches.
 * Use for switches that need special attention.
 */
export const Accent: Story = {
  args: {
    label: "Notifications",
    variant: "accent",
    helperText: "Receive push notifications.",
  },
  render: (args) => <InteractiveSwitch {...args} />,
};

/**
 * Uses the destructive color for dangerous switches.
 * Use for high-impact or dangerous settings.
 */
export const Destructive: Story = {
  args: {
    label: "Reset Data",
    variant: "destructive",
    helperText: "Warning: This action cannot be undone.",
  },
  render: (args) => <InteractiveSwitch {...args} />,
};

/**
 * Demonstrates the disabled state.
 */
export const Disabled: Story = {
  args: {
    label: "Locked Switch",
    variant: "primary",
    checked: true,
    disabled: true,
    helperText: "This switch is currently locked.",
  },
};
