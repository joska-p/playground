import type { Meta, StoryObj } from "@storybook/react-vite";
import { Label } from "@repo/ui";

/**
 * The Label component provides an accessible caption for an item in a user interface.
 * It is primarily used alongside the Input component.
 */
const meta: Meta<typeof Label> = {
  title: "Components/Label",
  component: Label,
  tags: ["autodocs"],
  argTypes: {
    children: {
      description: "The text content of the label.",
      control: "text",
    },
    variant: {
      description: "Visual style variant based on the current field state.",
      options: ["default", "destructive"],
      control: { type: "select" },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Label>;

/**
 * The standard label style used for most form fields.
 */
export const Default: Story = {
  args: {
    variant: "default",
    children: "Username",
  },
};

/**
 * Used to indicate that the associated input is in an error state.
 */
export const Destructive: Story = {
  args: {
    variant: "destructive",
    children: "Invalid email address",
  },
};
