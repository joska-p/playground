import { SectionHeading } from '@repo/ui/SectionHeading';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof SectionHeading> = {
  title: 'Stylistic/Atoms/SectionHeading',
  component: SectionHeading,
  tags: ['autodocs'],
  argTypes: {
    label: {
      description: 'Section label text shown above the title.',
      control: 'text'
    },
    title: {
      description: 'Main heading text.',
      control: 'text'
    },
    description: {
      description: 'Optional description below the title.',
      control: 'text'
    },
    labelColor: {
      description: 'Color variant for the label text.',
      options: ['primary', 'secondary', 'accent', 'destructive', 'warning', 'blue'],
      control: { type: 'select' }
    }
  },
  args: {
    label: 'Section',
    title: 'Section Title'
  }
};

export default meta;

type Story = StoryObj<typeof SectionHeading>;

export const Default: Story = {
  args: {
    label: 'Experiments',
    title: 'Explore Creative Tools',
    description: 'A curated collection of generative art and interactive experiments.'
  }
};

export const PrimaryLabel: Story = {
  args: {
    label: 'Featured',
    title: 'Latest Experiments',
    labelColor: 'primary'
  }
};

export const AccentLabel: Story = {
  args: {
    label: 'New',
    title: 'What&rsquo;s New',
    description: 'Check out the latest features and improvements.',
    labelColor: 'accent'
  }
};

export const WarningLabel: Story = {
  args: {
    label: 'Notice',
    title: 'Deprecation Warning',
    description: 'Some older experiments will be removed in the next release.',
    labelColor: 'warning'
  }
};

export const NoDescription: Story = {
  args: {
    label: 'Overview',
    title: 'Getting Started Guide'
  }
};
