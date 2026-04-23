import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "@repo/ui";
import { fn } from "storybook/test";

/**
 * A versatile Button component themed for the Creative Playground.
 * Utilizes the shared Gruvbox palette and supports various states like loading and disabled.
 */
const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    children: {
      description: "the content to display inside the button.",
      control: "text",
    },
    variant: {
      description: "Visual style of the button based on the theme palette.",
      options: ["primary", "secondary", "accent", "destructive", "outline", "ghost"],
      control: { type: "select" },
    },
    size: {
      description: "Controls the physical dimensions of the button.",
      options: ["default", "sm", "lg", "icon"],
      control: { type: "select" },
    },
    isLoading: {
      description: "Shows a loading spinner and disables the button.",
      control: "boolean",
    },
    disabled: {
      description: "Disables interaction and dims the appearance.",
      control: "boolean",
    },
  },
  args: {
    onClick: fn(),
    children: "Button Text",
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

/**
 * The primary action style using the core theme colors.
 * Use as the main call-to-action button.
 */
export const Primary: Story = {
  args: {
    variant: "primary",
  },
};

/**
 * Uses the secondary color for alternative actions.
 * Good for secondary actions that complement the primary button.
 */
export const Secondary: Story = {
  args: {
    variant: "secondary",
    children: "Secondary Action",
  },
};

/**
 * Uses the accent color for highlights or special actions.
 * Use for attention-grabbing but non-destructive actions.
 */
export const Accent: Story = {
  args: {
    variant: "accent",
    children: "Accent Action",
  },
};

/**
 * Used for dangerous actions like 'Delete' or 'Reset Palette'.
 * Uses the destructive/red color to signal caution.
 */
export const Destructive: Story = {
  args: {
    variant: "destructive",
    children: "Clear Data",
  },
};

/**
 * A subtle border style, perfect for secondary site navigation.
 * Displays as an outline with transparent background.
 */
export const Outline: Story = {
  args: {
    variant: "outline",
    children: "Documentation",
  },
};

/**
 * Minimalist style for actions with low visual priority.
 * Shows background color only on hover.
 */
export const Ghost: Story = {
  args: {
    variant: "ghost",
    children: "Settings",
  },
};

/**
 * Specifically for async tasks like generating a Mosaic or Particle sequence.
 * Shows a loading spinner and disables interaction.
 */
export const Loading: Story = {
  args: {
    isLoading: true,
    children: "Generating…",
  },
};
