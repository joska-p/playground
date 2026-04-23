import type { Meta, StoryObj } from "@storybook/react-vite";
import { Select } from "@repo/ui";

const options = (
  <>
    <option value="">Choose an option</option>
    <option value="option1">Option 1</option>
    <option value="option2">Option 2</option>
    <option value="option3">Option 3</option>
  </>
);

const options2 = (
  <>
    <option value="">Choose a category</option>
    <option value="cat1">Category 1</option>
    <option value="cat2">Category 2</option>
    <option value="cat3">Category 3</option>
  </>
);

const options3 = (
  <>
    <option value="">Select a theme</option>
    <option value="light">Light</option>
    <option value="dark">Dark</option>
    <option value="auto">Auto</option>
  </>
);

const options4 = (
  <>
    <option value="">Select country</option>
    <option value="us">United States</option>
    <option value="uk">United Kingdom</option>
    <option value="ca">Canada</option>
  </>
);

const options5 = (
  <>
    <option value="">Select difficulty</option>
    <option value="easy">Easy</option>
    <option value="medium">Medium</option>
    <option value="hard">Hard</option>
  </>
);

const options6 = (
  <>
    <option value="">Select language</option>
    <option value="en">English</option>
    <option value="es">Spanish</option>
    <option value="fr">French</option>
  </>
);

/**
 * A styled select dropdown component with customizable variants.
 * Supports label, helperText, and uses the same variant system as Input and Button.
 */
const meta: Meta<typeof Select> = {
  title: "Components/Select",
  component: Select,
  tags: ["autodocs"],
  argTypes: {
    label: {
      description: "The label text displayed above the select.",
      control: "text",
    },
    helperText: {
      description: "Supportive text displayed below the select.",
      control: "text",
    },
    variant: {
      description: "Visual style variant based on the theme colors.",
      options: ["primary", "secondary", "accent", "destructive", "outline", "ghost"],
      control: { type: "select" },
    },
    disabled: {
      description: "Disables user interaction and applies dimmed styling.",
      control: "boolean",
    },
    value: {
      description: "The selected value.",
      control: false,
    },
    onChange: {
      description: "Callback when the selection changes.",
      control: false,
    },
    children: {
      description: "The select options (option elements).",
      control: false,
    },
  },
  args: {
    label: "Select Option",
  },
};

export default meta;

type Story = StoryObj<typeof Select>;

/**
 * The standard select style using the primary border color.
 * Use as the default select for most forms.
 */
export const Primary: Story = {
  args: {
    variant: "primary",
    children: options,
    helperText: "Select an option from the dropdown.",
  },
};

/**
 * Uses the secondary color for alternative select styling.
 * Good for optional or secondary fields.
 */
export const Secondary: Story = {
  args: {
    label: "Category",
    variant: "secondary",
    children: options2,
    helperText: "Choose a category (optional).",
  },
};

/**
 * Uses the accent color for highlighted selects.
 * Use for selects that need special attention.
 */
export const Accent: Story = {
  args: {
    label: "Theme",
    variant: "accent",
    children: options3,
    helperText: "Select your preferred theme.",
  },
};

/**
 * Uses the destructive color to indicate errors.
 * Displayed when the select has an invalid value.
 */
export const Destructive: Story = {
  args: {
    label: "Country",
    variant: "destructive",
    children: options4,
    helperText: "Please select a valid country.",
  },
};

/**
 * A subtle transparent style with border on hover.
 * Good for less prominent select fields.
 */
export const Outline: Story = {
  args: {
    label: "Difficulty",
    variant: "outline",
    children: options5,
    helperText: "Select the difficulty level.",
  },
};

/**
 * Minimal style with hover background effect.
 * Use for inline or compact forms.
 */
export const Ghost: Story = {
  args: {
    label: "Language",
    variant: "ghost",
    children: options6,
    helperText: "Choose a language.",
  },
};

/**
 * Demonstrates the disabled state with reduced opacity and 'not-allowed' cursor.
 */
export const Disabled: Story = {
  args: {
    label: "Locked Option",
    variant: "primary",
    children: options,
    disabled: true,
    helperText: "This field is currently locked.",
  },
};
