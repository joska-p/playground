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

// Interactive wrapper for the stories
const SliderWithState = (args: any) => {
  const [value, setValue] = useState(args.value ?? 50);
  return (
    <div className="flex flex-col gap-4 w-[300px] p-4 bg-card rounded-lg border border-border">
      <div className="flex justify-between items-center font-mono text-sm">
        <Label>Intensity</Label>
        <span className="text-primary font-bold">{value}%</span>
      </div>
      <Slider {...args} value={value} onChange={setValue} />
    </div>
  );
};

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
