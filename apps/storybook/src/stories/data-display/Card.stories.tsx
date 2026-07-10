import { Card } from '@repo/ui/data-display';
import { Button } from '@repo/ui/data-entry';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof Card> = {
  title: 'Data Entry/Card',
  component: Card,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      options: ['default', 'primary', 'secondary', 'accent', 'warning', 'destructive', 'outline'],
      control: { type: 'select' }
    },
    children: { control: 'text' }
  }
};

export default meta;

type Story = StoryObj<typeof Card>;

export const Default: Story = {
  args: { variant: 'primary' },
  render: (args) => (
    <div className="grid grid-cols-2 gap-4 p-4">
      <Card {...args}>
        <h3>Default</h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        <span className="text-foreground-muted text-xs">Last edited 2h ago</span>
      </Card>
    </div>
  )
};

export const Variants: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-4 p-4">
      <Card variant="default">
        <h3>Default</h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        <span className="text-foreground-muted text-xs">Last edited 2h ago</span>
      </Card>

      <Card variant="primary">
        <img
          src="https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=225&fit=crop"
          alt="Abstract generative art"
        />
        <div>
          <h3>Primary</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </div>
      </Card>

      <Card variant="secondary">
        <img
          src="https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=225&fit=crop"
          alt="Preview"
        />
        <div>
          <h3>Secondary</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </div>
      </Card>

      <Card variant="accent">
        <img
          src="https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=225&fit=crop"
          alt="Abstract generative art"
        />
        <div>
          <h3>Accent</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </div>
        <div className="flex gap-4">
          <Button size="icon">
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </Button>
          <Button size="icon">
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
              />
            </svg>
          </Button>
        </div>
      </Card>

      <Card variant="warning">
        <img
          src="https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=225&fit=crop"
          alt="Preview"
        />
        <div>
          <h3>Warning</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </div>
      </Card>

      <Card variant="destructive">
        <img
          src="https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=225&fit=crop"
          alt="Preview"
        />
        <div>
          <h3>Destructive</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </div>
      </Card>
    </div>
  )
};
