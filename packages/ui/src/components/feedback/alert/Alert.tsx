import type { VariantProps } from 'class-variance-authority';
import type { ComponentProps, ReactNode } from 'react';
import { createContext, useContext } from 'react';
import { cn } from '../../../utils/cn';
import { alertVariants } from './alertVariants';

type AlertVariant = NonNullable<VariantProps<typeof alertVariants>['variant']>;

const AlertContext = createContext<AlertVariant>('default');

const iconMap: Record<AlertVariant, ReactNode> = {
  default: (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle
        cx="12"
        cy="12"
        r="10"
      />
      <line
        x1="12"
        y1="16"
        x2="12"
        y2="12"
      />
      <line
        x1="12"
        y1="8"
        x2="12.01"
        y2="8"
      />
    </svg>
  ),
  primary: (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle
        cx="12"
        cy="12"
        r="10"
      />
      <line
        x1="12"
        y1="16"
        x2="12"
        y2="12"
      />
      <line
        x1="12"
        y1="8"
        x2="12.01"
        y2="8"
      />
    </svg>
  ),
  secondary: (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  ),
  accent: (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  ),
  destructive: (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle
        cx="12"
        cy="12"
        r="10"
      />
      <line
        x1="15"
        y1="9"
        x2="9"
        y2="15"
      />
      <line
        x1="9"
        y1="9"
        x2="15"
        y2="15"
      />
    </svg>
  ),
  warning: (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
      <line
        x1="12"
        y1="9"
        x2="12"
        y2="13"
      />
      <line
        x1="12"
        y1="17"
        x2="12.01"
        y2="17"
      />
    </svg>
  )
};

const iconColorMap: Record<AlertVariant, string> = {
  default: 'text-primary',
  primary: 'text-primary',
  secondary: 'text-secondary',
  accent: 'text-accent',
  destructive: 'text-destructive',
  warning: 'text-warning'
};

type AlertProps = {
  children: ReactNode;
} & VariantProps<typeof alertVariants>;

function Alert({ variant = 'default', children }: AlertProps) {
  return (
    <AlertContext.Provider value={variant}>
      <div className={cn(alertVariants({ variant }))}>{children}</div>
    </AlertContext.Provider>
  );
}

type AlertIconProps = ComponentProps<'span'>;

function AlertIcon({ className, ...props }: AlertIconProps) {
  const variant = useContext(AlertContext);
  return (
    <span
      className={cn('mt-0.5 shrink-0', iconColorMap[variant], className)}
      {...props}
    >
      {iconMap[variant]}
    </span>
  );
}

type AlertTitleProps = {
  children: ReactNode;
} & ComponentProps<'p'>;

function AlertTitle({ children, className, ...props }: AlertTitleProps) {
  return (
    <p
      className={cn('text-sm font-medium', className)}
      {...props}
    >
      {children}
    </p>
  );
}

type AlertDescriptionProps = {
  children: ReactNode;
} & ComponentProps<'p'>;

function AlertDescription({ children, className, ...props }: AlertDescriptionProps) {
  return (
    <p
      className={cn('text-muted-foreground mt-0.5 text-xs', className)}
      {...props}
    >
      {children}
    </p>
  );
}

Alert.Icon = AlertIcon;
Alert.Title = AlertTitle;
Alert.Description = AlertDescription;

export { Alert };
export type { AlertDescriptionProps, AlertIconProps, AlertProps, AlertTitleProps };
