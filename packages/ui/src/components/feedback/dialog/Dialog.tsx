import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '../../../lib/cn';
import { Button } from '../../data-entry';
import type { ButtonVariants } from '../../data-entry/button/variants';
import {
  dialogBodyVariants,
  dialogDescriptionVariants,
  dialogFooterVariants,
  dialogTitleVariants,
  dialogVariants,
  type DialogVariants
} from './variants';

export interface DialogProps
  extends Omit<HTMLAttributes<HTMLDialogElement>, 'open'>, DialogVariants {
  /** Controls whether the dialog is open (required for stateless mode) */
  open?: boolean;
  /** Called when the dialog is closed by the browser (Esc, backdrop click, etc.) */
  onClose?: () => void;
  children: ReactNode;
}

export function Dialog({
  open = false,
  onClose,
  children,
  className,
  size = 'md',
  ...props
}: DialogProps) {
  return (
    <dialog
      open={open}
      onClose={onClose}
      className={cn(dialogVariants({ size }), className)}
      style={{ boxShadow: 'var(--shadow-lg)' }}
      {...props}
    >
      {children}
    </dialog>
  );
}

// Sub-components (pure & stateless)
export function DialogBody({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn(dialogBodyVariants(), className)}>{children}</div>;
}

export function DialogTitle({ children, className }: { children: ReactNode; className?: string }) {
  return <h3 className={cn(dialogTitleVariants(), className)}>{children}</h3>;
}

export function DialogDescription({
  children,
  className
}: {
  children: ReactNode;
  className?: string;
}) {
  return <p className={cn(dialogDescriptionVariants(), className)}>{children}</p>;
}

export function DialogFooter({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn(dialogFooterVariants(), className)}>{children}</div>;
}

export function DialogActions({
  onOpenChange,
  onConfirm,
  cancelLabel = 'Cancel',
  confirmLabel = 'Confirm',
  variant
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm?: () => void;
  cancelLabel?: string;
  confirmLabel?: string;
  variant?: ButtonVariants['variant'];
}) {
  return (
    <DialogFooter>
      <Button
        variant="default"
        size="sm"
        onClick={() => {
          onOpenChange(false);
        }}
      >
        {cancelLabel}
      </Button>
      <Button
        variant={variant}
        size="sm"
        onClick={() => {
          onConfirm?.();
          onOpenChange(false);
        }}
      >
        {confirmLabel}
      </Button>
    </DialogFooter>
  );
}
