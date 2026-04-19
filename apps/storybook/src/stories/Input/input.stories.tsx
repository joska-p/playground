import type { Meta, StoryObj } from "@storybook/react-vite";
import { Input, Field } from "@repo/ui";

/**
 * A primitive input component.
 * Use the Field component to add labels and helper text.
 */
const meta: Meta<typeof Input> = {
  title: "Components/Input",
  component: Input,
  tags: ["autodocs"],
  argTypes: {
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
 * The primitive input.
 */
export const Primitive: Story = {
  args: {
    placeholder: "Just a primitive input...",
    variant: "default",
  },
};

/**
 * Input wrapped in a Field to provide a Label and Helper Text.
 */
export const WithField: StoryObj = {
  render: (args) => (
    <Field
      label="Username"
      helperText="Choose a unique name for the playground."
      {...args}
    >
      <Input placeholder="e.g. josh_creative" />
    </Field>
  ),
};

/**
 * Field with error state.
 */
export const FieldWithError: StoryObj = {
  render: (args) => (
    <Field
      label="Email Address"
      error
      helperText="Please enter a valid email address."
      {...args}
    >
      <Input type="email" defaultValue="invalid-email" variant="error" />
    </Field>
  ),
};

/**
 * Standard password masking.
 */
export const Password: StoryObj = {
  render: (args) => (
    <Field label="Password" {...args}>
      <Input type="password" placeholder="••••••••" />
    </Field>
  ),
};
