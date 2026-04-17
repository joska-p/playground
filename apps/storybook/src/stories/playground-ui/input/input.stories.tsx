import type { Meta, StoryObj } from "@storybook/react-vite";
import type { ComponentProps } from "react";
import { fn } from "storybook/test";
import { Input } from "@repo/ui/Input";

type StoryProps = ComponentProps<typeof Input> & {
  buttonText: string;
};

const meta: Meta<StoryProps> = {
  component: Input,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      options: ["default", "error"],
      control: {
        type: "select",
      },
    },
    type: {
      options: ["text", "email", "file"],
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

type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    type: "text",
    placeholder: "Default placeholder",
    variant: "default",
  },
};

export const Error: Story = {
  args: {
    type: "text",
    placeholder: "Error placeholder",
    variant: "error",
  },
};
