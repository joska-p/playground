import type { VariantProps } from 'class-variance-authority';
import type { ComponentProps } from 'react';
import { createContext, useContext } from 'react';
import { cn } from '../../utils/cn';
import { cardVariants } from './cardVariants';

type CardVariant = VariantProps<typeof cardVariants>['variant'];

const CardContext = createContext<CardVariant>('primary');

type CardProps = {
  interactive?: boolean;
} & ComponentProps<'div'> & VariantProps<typeof cardVariants>;

function Card({ className, variant, interactive, ...props }: CardProps) {
  return (
    <CardContext.Provider value={variant ?? 'primary'}>
      <div
        className={cn(
          cardVariants({ variant, className }),
          interactive && 'cursor-pointer'
        )}
        {...props}
      />
    </CardContext.Provider>
  );
}

function CardHeader({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      className={cn('flex flex-col space-y-1.5 p-6', className)}
      {...props}
    />
  );
}

function CardTitle({ className, ...props }: ComponentProps<'h3'>) {
  return (
    <h3
      className={cn('font-mono text-xl', className)}
      {...props}
    />
  );
}

function CardDescription({ className, ...props }: ComponentProps<'p'>) {
  return (
    <p
      className={cn(
        'text-muted-foreground font-mono text-sm italic',
        className
      )}
      {...props}
    />
  );
}

function CardContent({ className, ...props }: ComponentProps<'div'>) {
  const variant = useContext(CardContext);
  return (
    <div
      className={cn('p-6 pt-0 font-mono', className)}
      data-card-variant={variant}
      {...props}
    />
  );
}

function CardFooter({ className, ...props }: ComponentProps<'div'>) {
  const variant = useContext(CardContext);
  return (
    <div
      className={cn('flex items-center p-6 pt-0', className)}
      data-card-variant={variant}
      {...props}
    />
  );
}

export {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
};
