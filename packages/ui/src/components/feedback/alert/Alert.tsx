import type { VariantProps } from 'class-variance-authority';
import type { ComponentProps, ReactNode } from 'react';
import { createContext, useContext } from 'react';
import { cn } from '../../../utils/cn';
import { feedbackIconColorMap, feedbackIconMap } from '../iconUtils';
import { alertVariants } from './alertVariants';

type AlertVariant = NonNullable<VariantProps<typeof alertVariants>['variant']>;

const AlertContext = createContext<AlertVariant>('primary');

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
      className={cn('mt-0.5 shrink-0', feedbackIconColorMap[variant] as string, className)}
      {...props}
    >
      {feedbackIconMap[variant]}
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
