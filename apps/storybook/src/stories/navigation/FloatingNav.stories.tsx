import { FloatingNav } from '@repo/ui/navigation';
import type { Meta, StoryObj } from '@storybook/react-vite';
import type { CSSProperties } from 'react';

const meta: Meta<typeof FloatingNav> = {
  title: 'Navigation/FloatingNav',
  component: FloatingNav,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      options: ['default', 'primary', 'secondary', 'accent', 'warning', 'destructive'],
      control: { type: 'select' }
    },
    brand: { control: 'object' },
    links: { control: 'object' }
  },
  parameters: {
    layout: 'fullscreen'
  }
};

export default meta;

type Story = StoryObj<typeof FloatingNav>;

const sampleLinks = [
  { label: 'Experiments', href: '/experiments' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Docs', href: '/docs' },
  { label: 'Settings', href: '/settings' },
  { label: 'Preview', href: '/preview' },
  { label: 'Atlas', href: 'Atlas' }
];

export const Default: Story = {
  args: {
    brand: { label: 'Playground', href: '/' },
    links: sampleLinks,
    variant: 'primary'
  }
};

export const Variants: Story = {
  render: () => (
    <div className="grid grid-cols-1 gap-24 pt-20">
      <div className="relative w-full px-6 py-8">
        <FloatingNav
          brand={{ label: 'Default', href: '/' }}
          links={sampleLinks}
          variant="default"
        />
      </div>
      <div className="relative w-full px-6 py-8">
        <FloatingNav
          brand={{ label: 'Primary', href: '/' }}
          links={sampleLinks}
          variant="primary"
        />
      </div>
      <div className="relative w-full px-6 py-8">
        <FloatingNav
          brand={{ label: 'Secondary', href: '/' }}
          links={sampleLinks}
          variant="secondary"
        />
      </div>
      <div className="relative w-full px-6 py-8">
        <FloatingNav
          brand={{ label: 'Accent', href: '/' }}
          links={sampleLinks}
          variant="accent"
        />
      </div>
      <div className="relative w-full px-6 py-8">
        <FloatingNav
          brand={{ label: 'Warning', href: '/' }}
          links={sampleLinks}
          variant="warning"
        />
      </div>
      <div className="relative w-full px-6 py-8">
        <FloatingNav
          brand={{ label: 'Destructive', href: '/' }}
          links={sampleLinks}
          variant="destructive"
        />
      </div>
      <div className="relative w-full px-6 py-8">
        <FloatingNav
          brand={{ label: 'Custom', href: '/' }}
          links={sampleLinks}
          variant="primary"
          style={
            {
              '--primary': '#251452',
              '--primary-foreground': '#fff'
            } as CSSProperties
          }
        />
      </div>
    </div>
  )
};
