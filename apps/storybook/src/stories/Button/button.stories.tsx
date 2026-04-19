import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button, Spinner } from "@repo/ui";

/**
 * A tactile, physical button component.
 * Features a 2px bottom border and a press-down animation to simulate physical feedback.
 */
const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      description: "Visual style variant.",
      options: [
        "default",
        "secondary",
        "destructive",
        "outline",
        "ghost",
        "link",
      ],
      control: { type: "select" },
    },
    size: {
      description: "Button size.",
      options: ["default", "sm", "lg", "icon"],
      control: { type: "select" },
    },
    disabled: {
      description: "Disables interaction.",
      control: "boolean",
    },
  },
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    children: "Click Me",
    variant: "default",
  },
};

export const Secondary: Story = {
  args: {
    children: "Secondary Action",
    variant: "secondary",
  },
};

export const Destructive: Story = {
  args: {
    children: "Delete Record",
    variant: "destructive",
  },
};

/**
 * Using the standalone Spinner primitive within a Button.
 */
export const Loading: Story = {
  render: (args) => (
    <Button {...args} disabled>
      <Spinner size="sm" variant="white" />
      Processing...
    </Button>
  ),
};

export const Outline: Story = {
  args: {
    children: "Outline Style",
    variant: "outline",
  },
};

export const Ghost: Story = {
  args: {
    children: "Ghost Button",
    variant: "ghost",
  },
};

export const IconButton: Story = {
  args: {
    variant: "default",
    size: "icon",
    children: (
      <svg
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 4v16m8-8H4"
        />
      </svg>
    ),
  },
};
