import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Slider, Label } from "@repo/ui";

/**
 * The Slider component allows users to make selections from a range of values.
 * Perfect for real-time adjustments in the Mosaic Maker or Particle experiments.
 */
const meta: Meta<typeof Slider> = {
  title: "Components/Slider",
  component: Slider,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      description: "Controls the accent color of the slider thumb.",
      options: ["default", "destructive"],
      control: { type: "select" },
    },
    value: {
      description: "The current numerical value.",
      control: { type: "number" },
    },
    min: { description: "Minimum possible value." },
    max: { description: "Maximum possible value." },
    step: { description: "The granularity of the slider." },
  },
};

export default meta;

type Story = StoryObj<typeof Slider>;
type SliderProps = React.ComponentProps<typeof Slider>;

// Interactive wrapper for the stories
function SliderWithState(args: SliderProps) {
  const [value, setValue] = useState(args.value ?? 50);
  return (
    <div className="bg-card border-border flex w-[300px] flex-col gap-4 rounded-lg border p-4">
      <div className="flex items-center justify-between font-mono text-sm">
        <Label>Intensity</Label>
        <span className="text-primary font-bold">{value}%</span>
      </div>
      <Slider {...args} value={value} onChange={setValue} />
    </div>
  );
}

/**
 * Standard slider used for general parameter tuning.
 */
export const Default: Story = {
  args: {
    variant: "default",
    min: 0,
    max: 100,
    step: 1,
    value: 50,
  },
  render: (args) => <SliderWithState {...args} />,
};

/**
 * Destructive variant for parameters that might impact performance (like particle count).
 */
export const PerformanceWarning: Story = {
  args: {
    variant: "destructive",
    min: 0,
    max: 1000,
    step: 10,
    value: 800,
  },
  render: (args) => <SliderWithState {...args} />,
};
