import type { Meta, StoryObj } from "@storybook/react-vite";
import type { ComponentProps } from "react";
import { fn } from "storybook/test";
import { Slider } from "@repo/ui/Slider";

type StoryProps = ComponentProps<typeof Slider> & {
  buttonText: string;
};

const meta: Meta<StoryProps> = {
  component: Slider,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      options: ["default", "destructive"],
      control: {
        type: "select",
      },
    },
  },
  args: {
    onChange: fn(),
  },
};

export default meta;

type Story = StoryObj<typeof Slider>;

export const Default: Story = {
  args: {
    variant: "default",
    min: 0,
    max: 100,
    step: 1,
    value: 50,
    label: "Default Slider",
    ariaLabel: "Default Slider",
  },
};

export const Destructive: Story = {
  args: {
    variant: "destructive",
    min: 0,
    max: 100,
    step: 1,
    value: 50,
    label: "Destructive Slider",
    ariaLabel: "Destructive Slider",
  },
};
