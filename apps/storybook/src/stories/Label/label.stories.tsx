import type { Meta, StoryObj } from "@storybook/react-vite";
import { Label } from "@repo/ui";

const meta: Meta<typeof Label> = {
  component: Label,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      options: ["default", "outline", "primary", "destructive", "secondary"],
      control: { type: "select" },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Label>;

export const Default: Story = {
  args: {
    variant: "default",
    children: "Default label",
  },
};

export const Outline: Story = {
  args: {
    variant: "outline",
    children: "Outline label",
  },
};

export const Destructive: Story = {
  args: {
    variant: "destructive",
    children: "Destructive label",
  },
};
