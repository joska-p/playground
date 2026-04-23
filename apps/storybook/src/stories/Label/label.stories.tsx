import type { Meta, StoryObj } from "@storybook/react-vite";
import { Label } from "@repo/ui";

/**
 * The Label component provides an accessible caption for an item in a user interface.
 * Styled with a mono font to match the Creative Playground aesthetic.
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
    htmlFor: {
      description: "The ID of the form element this label is associated with.",
      control: "text",
    },
    variant: {
      description: "Visual style variant based on the theme colors.",
      options: ["primary", "secondary", "accent", "destructive", "outline", "ghost"],
      control: { type: "select" },
    },
    size: {
      description: "Controls the physical dimensions of the label.",
      options: ["default", "sm", "lg"],
      control: { type: "select" },
    },
  },
  args: {
    children: "Label Text",
  },
};

export default meta;

type Story = StoryObj<typeof Label>;

/**
 * The standard label style using the primary color.
 * Use as the default label for form fields.
 */
export const Primary: Story = {
  args: {
    variant: "primary",
    children: "Username",
  },
};

/**
 * Uses the secondary color for alternative labels.
 * Good for optional or supplementary fields.
 */
export const Secondary: Story = {
  args: {
    variant: "secondary",
    children: "(Optional)",
  },
};

/**
 * Uses the accent color for highlighted labels.
 * Use for labels that need special attention.
 */
export const Accent: Story = {
  args: {
    variant: "accent",
    children: "Promo Code",
  },
};

/**
 * Uses the destructive color to indicate errors.
 * Displayed when the associated input has an invalid value.
 */
export const Destructive: Story = {
  args: {
    variant: "destructive",
    children: "Invalid email address",
  },
};

/**
 * A pill-style label with a border.
 * Useful for badges or tags.
 */
export const Outline: Story = {
  args: {
    variant: "outline",
    children: "New",
  },
};

/**
 * A minimal label style with hover effect.
 * Good for clickable labels or interactive elements.
 */
export const Ghost: Story = {
  args: {
    variant: "ghost",
    children: "Click me",
  },
};
