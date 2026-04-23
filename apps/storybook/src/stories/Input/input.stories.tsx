import type { Meta, StoryObj } from "@storybook/react-vite";
import { Input } from "@repo/ui";

function MailIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 8.99-4.97-4.96-3.03 3.03" />
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
      <path d="M2 12h20" />
    </svg>
  );
}

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
    isLoading: {
      description: "Shows a loading spinner and disables the input.",
      control: "boolean",
    },
    startIcon: {
      description: "Icon displayed before the input text.",
      control: false,
    },
    endIcon: {
      description: "Icon displayed after the input text.",
      control: false,
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

export const Password: Story = {
  args: {
    label: "Password",
    type: "password",
    placeholder: "Enter password",
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

/**
 * Shows a loading spinner inside the input field.
 */
export const Loading: Story = {
  args: {
    label: "Search",
    placeholder: "Searching…",
    isLoading: true,
    helperText: "Searching for results…",
  },
};

/**
 * Input with an icon on the left side.
 */
export const WithStartIcon: Story = {
  args: {
    label: "Email",
    type: "email",
    placeholder: "you@example.com",
    startIcon: <MailIcon />,
    helperText: "We'll never share your email.",
  },
};

/**
 * Input with an icon on the right side.
 */
export const WithEndIcon: Story = {
  args: {
    label: "Website",
    type: "url",
    placeholder: "https://",
    endIcon: <GlobeIcon />,
    helperText: "Your personal portfolio URL.",
  },
};
