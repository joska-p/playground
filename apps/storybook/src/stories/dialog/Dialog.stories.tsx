import { Dialog } from '@repo/ui/Dialog';
import { Button } from '@repo/ui/Button';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useRef } from 'react';

const meta: Meta<typeof Dialog> = {
  title: 'Components/Dialog',
  component: Dialog,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      description: 'Accent ring color for the dialog.',
      options: ['default', 'primary', 'secondary', 'accent', 'destructive', 'warning'],
      control: { type: 'select' }
    }
  }
};

export default meta;

type Story = StoryObj<typeof Dialog>;

function DialogTemplate(args: React.ComponentProps<typeof Dialog>) {
  const ref = useRef<HTMLDialogElement>(null);
  return (
    <div className="flex min-h-48 items-center justify-center">
      <Button
        onClick={() => ref.current?.showModal()}
        variant="primary"
        size="sm"
      >
        Open Dialog
      </Button>
      <Dialog
        ref={ref}
        {...args}
      >
        <div className="flex flex-col gap-4 p-6">
          <h2 className="text-lg font-semibold">Confirm Action</h2>
          <p className="text-muted-foreground text-sm">
            Are you sure you want to proceed with this action?
          </p>
          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => ref.current?.close()}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={() => ref.current?.close()}
            >
              Confirm
            </Button>
          </div>
        </div>
      </Dialog>
    </div>
  );
}

export const Default: Story = {
  render: (args) => <DialogTemplate {...args} />
};

export const Destructive: Story = {
  args: {
    variant: 'destructive'
  },
  render: (args) => <DialogTemplate {...args} />
};

export const Warning: Story = {
  args: {
    variant: 'warning'
  },
  render: (args) => <DialogTemplate {...args} />
};

export const Accent: Story = {
  args: {
    variant: 'accent'
  },
  render: (args) => <DialogTemplate {...args} />
};
