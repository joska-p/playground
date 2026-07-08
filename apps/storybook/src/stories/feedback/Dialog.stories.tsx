import { Button } from '@repo/ui/data-entry';
import type { DialogHandle } from '@repo/ui/feedback';
import {
  Dialog,
  DialogActions,
  DialogBody,
  DialogDescription,
  DialogFooter,
  DialogTitle
} from '@repo/ui/feedback';
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
          <DialogBody>
            <DialogTitle>Confirm Action</DialogTitle>
            <DialogDescription>
              Are you sure you want to proceed with this action?
            </DialogDescription>
          </DialogBody>
          <DialogActions dialogRef={ref} />
        </Dialog>
      </div>
    );
  }
};

export const Variants: Story = {
  render: () => {
    const refA = useRef<DialogHandle>(null);
    const refB = useRef<DialogHandle>(null);
    const refC = useRef<DialogHandle>(null);
    return (
      <div className="flex min-h-48 items-center justify-center gap-3">
        <Button
          onClick={() => refA.current?.open()}
          variant="destructive"
          size="sm"
        >
          Delete Project
        </Button>
        <Button
          onClick={() => refB.current?.open()}
          variant="warning"
          size="sm"
        >
          Storage Warning
        </Button>
        <Button
          onClick={() => refC.current?.open()}
          variant="accent"
          size="sm"
        >
          Pro Tip
        </Button>

        <Dialog ref={refA}>
          <DialogBody>
            <DialogTitle>Delete project?</DialogTitle>
            <DialogDescription>
              This will permanently delete all files and cannot be undone.
            </DialogDescription>
          </DialogBody>
          <DialogActions
            dialogRef={refA}
            onConfirm={() => {}}
            confirmLabel="Delete"
            cancelLabel="Keep"
            variant="destructive"
          />
        </Dialog>

        <Dialog ref={refB}>
          <DialogBody>
            <DialogTitle>Storage limit reached</DialogTitle>
            <DialogDescription>
              You are at 95% capacity. Please free up space to continue creating.
            </DialogDescription>
          </DialogBody>
          <DialogActions
            dialogRef={refB}
            confirmLabel="Manage Storage"
            cancelLabel="Dismiss"
          />
        </Dialog>

        <Dialog ref={refC}>
          <DialogBody>
            <DialogTitle>Did you know?</DialogTitle>
            <DialogDescription>
              You can drag and drop images directly onto the canvas to use them as texture sources.
            </DialogDescription>
          </DialogBody>
          <DialogActions
            dialogRef={refC}
            confirmLabel="Got it"
            cancelLabel="Show again"
            variant="accent"
          />
        </Dialog>
      </div>
    );
  }
};

export const WithCustomFooter: Story = {
  render: () => {
    const ref = useRef<DialogHandle>(null);
    return (
      <div className="flex min-h-48 items-center justify-center">
        <Button
          onClick={() => ref.current?.open()}
          variant="default"
          size="sm"
        >
          Export Options
        </Button>
        <Dialog ref={ref}>
          <DialogBody>
            <DialogTitle>Export Settings</DialogTitle>
            <DialogDescription>Choose your preferred export format and options.</DialogDescription>
          </DialogBody>
          <DialogFooter>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => ref.current?.close()}
            >
              Cancel
            </Button>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => ref.current?.close()}
            >
              Export PNG
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={() => ref.current?.close()}
            >
              Export All
            </Button>
          </DialogFooter>
        </Dialog>
      </div>
    );
  }
};
