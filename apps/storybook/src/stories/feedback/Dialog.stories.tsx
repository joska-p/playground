import { Button } from '@repo/ui/data-entry';
import type { DialogHandle } from '@repo/ui/feedback';
import { Dialog } from '@repo/ui/feedback';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useRef } from 'react';

const meta: Meta<typeof Dialog> = {
  title: 'Feedback/Dialog',
  component: Dialog,
  tags: ['autodocs']
};

export default meta;

type Story = StoryObj<typeof Dialog>;

export const Default: Story = {
  render: () => {
    const ref = useRef<DialogHandle>(null);
    return (
      <div className="flex min-h-48 items-center justify-center">
        <Button
          onClick={() => ref.current?.open()}
          variant="primary"
          size="sm"
        >
          Open Dialog
        </Button>
        <Dialog ref={ref}>
          <Dialog.Body>
            <Dialog.Title>Confirm Action</Dialog.Title>
            <Dialog.Description>
              Are you sure you want to proceed with this action?
            </Dialog.Description>
          </Dialog.Body>
          <Dialog.Footer>
            <Button
              variant="ghost"
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
          </Dialog.Footer>
        </Dialog>
      </div>
    );
  }
};

export const Destructive: Story = {
  render: () => {
    const ref = useRef<DialogHandle>(null);
    return (
      <div className="flex min-h-48 items-center justify-center">
        <Button
          onClick={() => ref.current?.open()}
          variant="destructive"
          size="sm"
        >
          Delete Project
        </Button>
        <Dialog ref={ref}>
          <Dialog.Body>
            <Dialog.Title>Delete project?</Dialog.Title>
            <Dialog.Description>
              This will permanently delete all files and cannot be undone.
            </Dialog.Description>
          </Dialog.Body>
          <Dialog.Actions
            dialogRef={ref}
            onConfirm={() => {}}
            confirmLabel="Delete"
            cancelLabel="Keep"
            variant="destructive"
          />
        </Dialog>
      </div>
    );
  }
};

export const Warning: Story = {
  render: () => {
    const ref = useRef<DialogHandle>(null);
    return (
      <div className="flex min-h-48 items-center justify-center">
        <Button
          onClick={() => ref.current?.open()}
          variant="warning"
          size="sm"
        >
          Storage Warning
        </Button>
        <Dialog ref={ref}>
          <Dialog.Body>
            <Dialog.Title>Storage limit reached</Dialog.Title>
            <Dialog.Description>
              You are at 95% capacity. Please free up space to continue creating.
            </Dialog.Description>
          </Dialog.Body>
          <Dialog.Actions
            dialogRef={ref}
            confirmLabel="Manage Storage"
            cancelLabel="Dismiss"
          />
        </Dialog>
      </div>
    );
  }
};

export const Accent: Story = {
  render: () => {
    const ref = useRef<DialogHandle>(null);
    return (
      <div className="flex min-h-48 items-center justify-center">
        <Button
          onClick={() => ref.current?.open()}
          variant="accent"
          size="sm"
        >
          Pro Tip
        </Button>
        <Dialog ref={ref}>
          <Dialog.Body>
            <Dialog.Title>Did you know?</Dialog.Title>
            <Dialog.Description>
              You can drag and drop images directly onto the canvas to use them as texture sources.
            </Dialog.Description>
          </Dialog.Body>
          <Dialog.Actions
            dialogRef={ref}
            confirmLabel="Got it"
            cancelLabel="Show again"
            variant="accent"
          />
        </Dialog>
      </div>
    );
  }
};
