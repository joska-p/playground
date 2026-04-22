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
      options: ["default", "destructive", "outline", "secondary", "ghost", "link"],
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
 */
export const Default: Story = {
  args: {
    variant: "default",
  },
};

/**
 * Used for dangerous actions like 'Delete' or 'Reset Palette'.
 */
export const Destructive: Story = {
  args: {
    variant: "destructive",
    children: "Clear Data",
  },
};

/**
 * A subtle border style, perfect for secondary site navigation.
 */
export const Outline: Story = {
  args: {
    variant: "outline",
    children: "Documentation",
  },
};

/**
 * Specifically for async tasks like generating a Mosaic or Particle sequence.
 */
export const Loading: Story = {
  args: {
    isLoading: true,
    children: "Generating...",
  },
};

/**
 * Minimalist style for actions with low visual priority.
 */
export const Ghost: Story = {
  args: {
    variant: "ghost",
    children: "Settings",
  },
};
