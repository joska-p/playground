import type { Meta, StoryObj } from "@storybook/react-vite";
import { Input } from "@repo/ui";

/**
 * A highly customizable, Gruvbox-themed input component.
 * Built with React 19 and Tailwind CSS v4, supporting accessible labels
 * and automated ID generation.
 */
const meta: Meta<typeof Input> = {
  title: "Components/Input",
  component: Input,
  tags: ["autodocs"],
  argTypes: {
    label: {
      description: "The floating label text above the input.",
      control: "text",
    },
    helperText: {
      description: "Supportive text displayed below the input field.",
      control: "text",
    },
    variant: {
      description: "Visual style variant based on the Gruvbox color palette.",
      options: ["default", "error", "secondary"],
      control: { type: "select" },
    },
    type: {
      description: "Standard HTML input types.",
      options: ["text", "email", "number", "password", "file", "color"],
      control: { type: "select" },
    },
    disabled: {
      description: "Disables user interaction and applies dimmed styling.",
      control: "boolean",
    },
    placeholder: {
      description: "Placeholder text inside the input.",
      control: "text",
    },
  },
};

export default meta;

type Story = StoryObj<typeof Input>;

/**
 * The standard input style using the Gruvbox 'border-border' and 'bg-input' tokens.
 */
export const Default: Story = {
  args: {
    label: "Username",
    placeholder: "e.g. josh_creative",
    variant: "default",
    helperText: "Choose a unique name for the playground.",
  },
};

/**
 * Highlights errors using the 'destructive' (red) color from the theme.
 */
export const ErrorState: Story = {
  args: {
    label: "Email Address",
    type: "email",
    defaultValue: "invalid-email",
    variant: "error",
    helperText: "Please enter a valid email address.",
  },
};

/**
 * A subtle style with a slightly different background weight.
 */
export const Secondary: Story = {
  args: {
    label: "Additional Notes",
    placeholder: "Optional details...",
    variant: "secondary",
  },
};

/**
 * Standard password masking.
 */
export const Password: Story = {
  args: {
    label: "Password",
    type: "password",
    placeholder: "••••••••",
  },
};

/**
 * Demonstrates the disabled state with reduced opacity and 'not-allowed' cursor.
 */
export const Disabled: Story = {
  args: {
    label: "Read Only Field",
    disabled: true,
    placeholder: "You cannot edit this content",
    helperText: "This field is currently locked.",
  },
};
