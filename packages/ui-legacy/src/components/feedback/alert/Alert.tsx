import { type VariantProps } from 'class-variance-authority';
import type { ComponentProps, ReactNode } from 'react';
import { createContext, useContext } from 'react';
import { cn } from '../../../utils/cn';
import { alertVariants } from './alertVariants';

type AlertVariant = NonNullable<VariantProps<typeof alertVariants>['variant']>;

const AlertContext = createContext<AlertVariant>('primary');

const iconMap: Record<AlertVariant, ReactNode> = {
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
  primary: 'text-primary',
  secondary: 'text-secondary',
  accent: 'text-accent',
  destructive: 'text-destructive',
  warning: 'text-warning'
};

export type AlertProps = ComponentProps<'div'> & VariantProps<typeof alertVariants>;

function Alert({ ref, className, variant = 'primary', children, ...props }: AlertProps) {
  const safeVariant = variant ?? 'primary';

  return (
    <AlertContext.Provider value={safeVariant}>
      <div
        ref={ref}
        role="alert"
        className={cn(alertVariants({ variant }), className)}
        {...props}
      >
        {children}
      </div>
    </AlertContext.Provider>
  );
}

export type AlertIconProps = ComponentProps<'span'>;

function AlertIcon({ ref, className, ...props }: AlertIconProps) {
  const variant = useContext(AlertContext);
  return (
    <span
      ref={ref}
      className={cn('mt-0.5 shrink-0', iconColorMap[variant], className)}
      {...props}
    >
      {iconMap[variant]}
    </span>
  );
}

export type AlertTitleProps = ComponentProps<'h5'>;

function AlertTitle({ ref, children, className, ...props }: AlertTitleProps) {
  return (
    <h5
      ref={ref}
      className={cn('mb-1 leading-none font-medium tracking-tight', className)}
      {...props}
    >
      {children}
    </h5>
  );
}

export type AlertDescriptionProps = ComponentProps<'div'>;

function AlertDescription({ ref, children, className, ...props }: AlertDescriptionProps) {
  return (
    <div
      ref={ref}
      className={cn('text-muted-foreground text-sm [&_p]:leading-relaxed', className)}
      {...props}
    >
      {children}
    </div>
  );
}

Alert.Icon = AlertIcon;
Alert.Title = AlertTitle;
Alert.Description = AlertDescription;

export { Alert };
