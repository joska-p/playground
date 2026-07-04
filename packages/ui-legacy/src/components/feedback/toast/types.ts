import { type VariantProps } from 'class-variance-authority';
import { type toastVariants } from './toastVariants';

export type ToastVariant = NonNullable<VariantProps<typeof toastVariants>['variant']>;

export type ToastItemData = {
  id: number;
  variant: ToastVariant;
  title: string;
  description: string;
  exiting?: boolean;
};

export type ToastContextValue = {
  info: (title: string, description: string) => void;
  success: (title: string, description: string) => void;
  error: (title: string, description: string) => void;
  warning: (title: string, description: string) => void; // Added for completeness
};
