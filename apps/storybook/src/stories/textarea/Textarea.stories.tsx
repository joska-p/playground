import { Textarea } from '@repo/ui/data-entry';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof Textarea> = {
  title: 'Components/Textarea',
  component: Textarea,
  tags: ['autodocs'],
  argTypes: {
    label: {
      description: 'The label text displayed above the textarea.',
      control: 'text'
    },
    helperText: {
      description: 'Supportive text displayed below the textarea.',
      control: 'text'
    },
    variant: {
      description: 'Visual style variant based on the theme colors.',
      options: ['default', 'primary', 'secondary', 'accent', 'destructive', 'warning'],
      control: { type: 'select' }
    },
    placeholder: {
      description: 'Placeholder text inside the textarea.',
      control: 'text'
    },
    disabled: {
      description: 'Disables user interaction.',
      control: 'boolean'
    }
  },
  args: {
    label: 'Description',
    placeholder: 'Write your thoughts here…'
  }
};

export default meta;

type Story = StoryObj<typeof Textarea>;

export const Default: Story = {
  args: {
    variant: 'default'
  }
};

export const Primary: Story = {
  args: {
    variant: 'primary',
    helperText: 'Enter a brief description of your project.'
  }
};

export const Secondary: Story = {
  args: {
    label: 'Notes',
    variant: 'secondary'
  }
};

export const Accent: Story = {
  args: {
    label: 'Feedback',
    variant: 'accent',
    helperText: 'We value your input.'
  }
};

export const Destructive: Story = {
  args: {
    label: 'Error Details',
    variant: 'destructive',
    helperText: 'Please describe what went wrong.',
    defaultValue: 'Something broke…'
  }
};

export const Disabled: Story = {
  args: {
    label: 'Read Only',
    variant: 'primary',
    disabled: true,
    defaultValue: 'This content is locked.',
    helperText: 'This field is currently locked.'
  }
};

export const WithValue: Story = {
  args: {
    variant: 'primary',
    label: 'Bio',
    defaultValue: 'Creative developer exploring generative art and interactive experiences.',
    helperText: 'Tell us about yourself.'
  }
};
