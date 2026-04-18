import type { Meta, StoryObj } from "@storybook/react-vite";
import { Input } from "@repo/ui";

const meta: Meta<typeof Input> = {
  component: Input,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      options: ["default", "primary", "destructive", "secondary"],
      control: { type: "select" },
    },
    type: {
      options: ["text", "email", "number", "file", "password"],
      control: { type: "select" },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    type: "text",
    placeholder: "Type something...",
    variant: "default",
  },
};

export const Password: Story = {
  args: {
    type: "password",
    placeholder: "Enter password",
    variant: "default",
  },
};

export const Number: Story = {
  args: {
    type: "number",
    placeholder: "0",
    variant: "default",
  },
};
