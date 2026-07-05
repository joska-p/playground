import { Label } from '@repo/ui/data-entry';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof Label> = {
  title: 'Components/Label',
  component: Label,
  tags: ['autodocs'],
  argTypes: {
    children: {
      description: 'The text content of the label.',
      control: 'text'
    },
    htmlFor: {
      description: 'The ID of the form element this label is associated with.',
      control: 'text'
    }
  },
  args: {
    children: 'Label Text'
  }
};

export default meta;

type Story = StoryObj<typeof Label>;

export const Default: Story = {
  args: {
    children: 'Username'
  }
};

export const WithHtmlFor: Story = {
  args: {
    children: 'Email Address',
    htmlFor: 'email'
  }
};
