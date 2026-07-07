import { FloatingNav } from '@repo/ui/navigation';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Sun } from 'lucide-react';

const meta: Meta<typeof FloatingNav> = {
  title: 'Navigation/FloatingNav',
  component: FloatingNav,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      description: 'Accent color for the brand label.',
      options: ['default', 'primary', 'secondary', 'accent', 'warning', 'destructive', 'ghost'],
      control: { type: 'select' }
    }
  },
  parameters: {
    layout: 'fullscreen'
  }
};

export default meta;

type Story = StoryObj<typeof FloatingNav>;

export const Default: Story = {
  args: {
    brand: { label: 'Playground', href: '/' },
    links: [
      { label: 'Experiments', href: '/experiments' },
      { label: 'Gallery', href: '/gallery' },
      { label: 'Docs', href: '/docs' }
    ]
  }
};

export const WithThemeToggle: Story = {
  args: {
    brand: { label: 'Studio', href: '/' },
    links: [
      { label: 'Projects', href: '/projects' },
      { label: 'Assets', href: '/assets' },
      { label: 'Settings', href: '/settings' }
    ],
    themeToggle: (
      <button
        type="button"
        className="text-foreground-muted hover:text-foreground ml-2 flex h-7 w-7 cursor-pointer items-center justify-center rounded-full text-xs transition-colors"
        aria-label="Toggle theme"
      >
        <Sun className="h-3.5 w-3.5" />
      </button>
    )
  }
};
