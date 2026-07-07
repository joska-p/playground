import { SectionHeading } from '@repo/ui/data-display';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof SectionHeading> = {
  title: 'Data Display/SectionHeading',
  component: SectionHeading,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      description: 'Color of the uppercase label text.',
      options: ['default', 'primary', 'secondary', 'accent', 'warning', 'destructive', 'ghost'],
      control: { type: 'select' }
    },
    label: {
      description: 'Small uppercase label above the title.',
      control: 'text'
    },
    title: {
      description: 'Main heading text.',
      control: 'text'
    },
    description: {
      description: 'Optional paragraph below the title.',
      control: 'text'
    }
  }
};

export default meta;

type Story = StoryObj<typeof SectionHeading>;

export const Default: Story = {
  args: {
    label: 'Overview',
    title: 'Getting Started',
    description: 'Everything you need to begin creating generative art in minutes.'
  }
};

export const PrimaryLabel: Story = {
  args: {
    variant: 'primary',
    label: 'Features',
    title: 'What&#8217;s Included'
  }
};

export const AccentLabel: Story = {
  args: {
    variant: 'accent',
    label: 'New',
    title: 'Latest Updates',
    description: 'Check out what&#8217;s new in the latest release.'
  }
};

export const WarningLabel: Story = {
  args: {
    variant: 'warning',
    label: 'Notice',
    title: 'Deprecation Warning',
    description: 'The legacy API will be removed in v3.0. Migrate your projects.'
  }
};

export const NoDescription: Story = {
  args: {
    label: 'Title Only',
    title: 'Compact Section'
  }
};
