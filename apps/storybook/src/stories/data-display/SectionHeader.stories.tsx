import { SectionHeader } from '@repo/ui/data-display';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof SectionHeader> = {
  title: 'Data Display/SectionHeader',
  component: SectionHeader,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      description: 'Color of the icon and title text.',
      options: ['default', 'primary', 'secondary', 'accent', 'warning', 'destructive', 'outline'],
      control: { type: 'select' }
    },
    align: {
      description: 'Text alignment.',
      options: ['left', 'center'],
      control: { type: 'select' }
    },
    title: {
      description: 'Section title text.',
      control: 'text'
    },
    description: {
      description: 'Optional description below the title.',
      control: 'text'
    },
    iconName: {
      description: 'Icon shown next to the title.',
      control: 'text'
    },
    href: {
      description: 'Optional link destination.',
      control: 'text'
    },
    linkText: {
      description: 'Text for the optional link.',
      control: 'text'
    }
  }
};

export default meta;

type Story = StoryObj<typeof SectionHeader>;

const VARIANTS = ['default', 'primary', 'secondary', 'accent', 'warning', 'destructive'] as const;

export const Default: Story = {
  args: {
    title: 'Experiments',
    description: 'Browse the collection of interactive generative art experiments.'
  }
};

export const CenterAligned: Story = {
  args: {
    align: 'center',
    title: 'Featured Projects',
    description: 'Hand-picked experiments showcasing the full capabilities of the platform.',
    href: '/projects'
  }
};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      {VARIANTS.map((variant) => (
        <SectionHeader
          key={variant}
          variant={variant}
          title={variant}
          description="Section description with variant-colored text."
          iconName="home"
        />
      ))}
    </div>
  )
};
