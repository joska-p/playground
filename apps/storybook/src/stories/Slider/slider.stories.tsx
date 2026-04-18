import type { Meta, StoryObj } from "@storybook/react-vite";
import type { ComponentProps } from "react";
import { fn } from "storybook/test";
import { Slider } from "@repo/ui";

type StoryProps = ComponentProps<typeof Slider> & {
  buttonText: string;
};

const meta: Meta<StoryProps> = {
  component: Slider,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      options: ["default", "outline", "primary", "destructive", "secondary"],
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

export const outline: Story = {
  args: {
    variant: "outline",
    min: 0,
    max: 100,
    step: 1,
    value: 50,
    label: "Outline Slider",
    ariaLabel: "Outline Slider",
  },
};

export const destructive: Story = {
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

export const secondary: Story = {
  args: {
    variant: "secondary",
    min: 0,
    max: 100,
    step: 1,
    value: 50,
    label: "Secondary Slider",
    ariaLabel: "Secondary Slider",
  },
};
