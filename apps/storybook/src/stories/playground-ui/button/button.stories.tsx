import type { Meta, StoryObj } from "@storybook/react-vite";
import type { ComponentProps } from "react";
import { fn } from "storybook/test";
import { Button } from "@repo/ui/Button";

type StoryProps = ComponentProps<typeof Button> & {
  buttonText: string;
};

const meta: Meta<StoryProps> = {
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      options: [
        "default",
        "destructive",
        "outline",
        "secondary",
        "ghost",
        "link",
      ],
      control: {
        type: "select",
      },
    },
    size: {
      options: ["default", "sm", "lg", "icon"],
      control: {
        type: "select",
      },
    },
  },
  args: {
    onClick: fn(),
  },
};

export default meta;

type Story = StoryObj<StoryProps>;

export const Default: Story = {
  args: {
    buttonText: "Hello, i am a default button",
    variant: "default",
    size: "default",
  },
  render: ({ buttonText, ...args }) => {
    return <Button {...args}>{buttonText}</Button>;
  },
};

export const Destructive: Story = {
  args: {
    buttonText: "Hello, i am a destructive button",
    variant: "destructive",
    size: "default",
  },
  render: ({ buttonText, ...args }) => {
    return <Button {...args}>{buttonText}</Button>;
  },
};

export const Outline: Story = {
  args: {
    buttonText: "Hello, i am an outline button",
    variant: "outline",
    size: "default",
  },
  render: ({ buttonText, ...args }) => {
    return <Button {...args}>{buttonText}</Button>;
  },
};

export const Secondary: Story = {
  args: {
    buttonText: "Hello, i am a secondary button",
    variant: "secondary",
    size: "default",
  },
  render: ({ buttonText, ...args }) => {
    return <Button {...args}>{buttonText}</Button>;
  },
};

export const Ghost: Story = {
  args: {
    buttonText: "Hello, i am a ghost button",
    variant: "ghost",
    size: "default",
  },
  render: ({ buttonText, ...args }) => {
    return <Button {...args}>{buttonText}</Button>;
  },
};

export const Link: Story = {
  args: {
    buttonText: "Hello, i am a link button",
    variant: "link",
    size: "default",
  },
  render: ({ buttonText, ...args }) => {
    return <Button {...args}>{buttonText}</Button>;
  },
};
