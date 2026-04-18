import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Slider, Label } from "@repo/ui";

const meta: Meta<typeof Slider> = {
  component: Slider,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      options: ["default", "outline", "primary", "destructive", "secondary"],
      control: { type: "select" },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Slider>;

const SliderWithState = (args: any) => {
  const [value, setValue] = useState(args.value ?? 50);
  return (
    <div className="flex flex-col gap-4 w-[300px]">
      <Label className="flex flex-col gap-2">
        <span className="text-sm font-medium">Value: {value}</span>
        <Slider {...args} value={value} onChange={setValue} />
      </Label>
    </div>
  );
};

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

export const Outline: Story = {
  args: {
    variant: "outline",
    min: 0,
    max: 100,
    step: 1,
    value: 30,
  },
  render: (args) => <SliderWithState {...args} />,
};

export const Destructive: Story = {
  args: {
    variant: "destructive",
    min: 0,
    max: 100,
    step: 5,
    value: 80,
  },
  render: (args) => <SliderWithState {...args} />,
};
