import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Slider } from "@repo/ui";

/**
 * A styled range input component for adjusting numerical values.
 * Perfect for real-time adjustments in experiments like Mosaic Maker.
 */
const meta: Meta<typeof Slider> = {
  title: "Components/Slider",
  component: Slider,
  tags: ["autodocs"],
  argTypes: {
    label: {
      description: "The label text displayed above the slider.",
      control: "text",
    },
    helperText: {
      description: "Supportive text displayed below the slider.",
      control: "text",
    },
    variant: {
      description: "Controls the accent color of the slider thumb.",
      options: ["primary", "secondary", "accent", "destructive"],
      control: { type: "select" },
    },
    layout: {
      description: "Controls the layout direction.",
      options: ["vertical", "horizontal"],
      control: { type: "select" },
    },
    unit: {
      description: "Unit suffix displayed after value.",
      control: "text",
    },
    min: {
      description: "Minimum possible value.",
      control: { type: "number" },
    },
    max: {
      description: "Maximum possible value.",
      control: { type: "number" },
    },
    step: {
      description: "The granularity of the slider.",
      control: { type: "number" },
    },
    disabled: {
      description: "Disables user interaction and applies dimmed styling.",
      control: "boolean",
    },
  },
  args: {
    label: "Intensity",
    variant: "primary",
    layout: "vertical",
    min: 0,
    max: 100,
    step: 1,
  },
};

export default meta;

type Story = StoryObj<typeof Slider>;

type SliderStoryProps = {
  showValue?: boolean;
};

function InteractiveSlider(args: SliderStoryProps & React.ComponentProps<typeof Slider>) {
  const [value, setValue] = useState(args.value ?? 50);
  return (
    <div className="flex w-[300px] flex-col gap-4">
      <Slider {...args} value={value} onChange={setValue} />
    </div>
  );
}

/**
 * The standard slider using the primary accent color.
 * Use as the default slider for most controls.
 */
export const Primary: Story = {
  args: {
    variant: "primary",
  },
  render: (args) => <InteractiveSlider {...args} />,
};

/**
 * Uses the secondary accent color for alternative sliders.
 * Good for secondary parameters.
 */
export const Secondary: Story = {
  args: {
    label: "Volume",
    variant: "secondary",
    helperText: "Adjust the volume level.",
  },
  render: (args) => <InteractiveSlider {...args} />,
};

/**
 * Uses the accent color for highlighted sliders.
 * Use for sliders that need special attention.
 */
export const Accent: Story = {
  args: {
    label: "Brightness",
    variant: "accent",
    helperText: "Adjust the display brightness.",
  },
  render: (args) => <InteractiveSlider {...args} />,
};

/**
 * Uses the destructive accent color for warning sliders.
 * Use for parameters that might impact performance.
 */
export const Destructive: Story = {
  args: {
    label: "Particle Count",
    variant: "destructive",
    max: 1000,
    step: 10,
    helperText: "Warning: High values may affect performance.",
  },
  render: (args) => <InteractiveSlider {...args} />,
};

/**
 * Demonstrates the disabled state with reduced opacity.
 */
export const Disabled: Story = {
  args: {
    label: "Locked Slider",
    variant: "primary",
    value: 50,
    disabled: true,
    helperText: "This slider is currently locked.",
  },
  render: (args) => <InteractiveSlider {...args} />,
};

/**
 * Horizontal layout for inline controls.
 */
export const Horizontal: Story = {
  args: {
    label: "Volume",
    variant: "secondary",
    layout: "horizontal",
    max: 100,
    step: 10,
    unit: "%",
  },
  render: (args) => <InteractiveSlider {...args} className="max-w-xs" />,
};
