import type { HTMLAttributes, ImgHTMLAttributes, Ref } from 'react';
import { cn } from '../../../lib/cn';
import { type ColorVariant } from '../../../lib/colorVariant';
import { cardVariants } from './variants';

export type CardProps = {
  variant?: ColorVariant;
  horizontal?: boolean;
  ref?: Ref<HTMLDivElement>;
} & HTMLAttributes<HTMLDivElement>;

export function Card({
  className,
  variant = 'primary',
  horizontal,
  style,
  ref,
  ...props
}: CardProps) {
  return (
    <div
      ref={ref}
      className={cn(
        'bg-surface overflow-hidden rounded-lg transition-shadow duration-200 hover:shadow-md',
        cardVariants({ variant }),
        horizontal && 'grid grid-cols-1 landscape:grid-cols-[200px_1fr]',
        className
      )}
      style={{ boxShadow: 'var(--shadow-sm)', ...style }}
      {...props}
    />
  );
}

export function CardImage({
  className,
  alt = '',
  ref,
  ...props
}: ImgHTMLAttributes<HTMLImageElement> & { ref?: Ref<HTMLImageElement> }) {
  return (
    <img
      ref={ref}
      alt={alt}
      className={cn('aspect-video h-full w-full object-cover landscape:aspect-auto', className)}
      {...props}
    />
  );
}

export function CardBody({
  className,
  ref,
  ...props
}: HTMLAttributes<HTMLDivElement> & { ref?: Ref<HTMLDivElement> }) {
  return (
    <div
      ref={ref}
      className={cn('p-4', className)}
      {...props}
    />
  );
}

export function CardTitle({
  className,
  ref,
  ...props
}: HTMLAttributes<HTMLParagraphElement> & { ref?: Ref<HTMLParagraphElement> }) {
  return (
    <p
      ref={ref}
      className={cn('text-foreground text-[14px] font-medium', className)}
      {...props}
    />
  );
}

export function CardDescription({
  className,
  ref,
  ...props
}: HTMLAttributes<HTMLParagraphElement> & { ref?: Ref<HTMLParagraphElement> }) {
  return (
    <p
      ref={ref}
      className={cn('text-foreground-muted mt-1 text-[12px] leading-relaxed', className)}
      {...props}
    />
  );
}

export function CardFooter({
  className,
  ref,
  ...props
}: HTMLAttributes<HTMLDivElement> & { ref?: Ref<HTMLDivElement> }) {
  return (
    <div
      ref={ref}
      className={cn(
        'bg-surface-raised/50 flex items-center justify-between px-4 py-2.5',
        className
      )}
      {...props}
    />
  );
}

/** Wrap the row of icon buttons at the bottom of a card in this — hovering
 *  it triggers the `.card-interactive` glow via `:has()`, no JS needed. */
export function CardActions({
  className,
  ref,
  ...props
}: HTMLAttributes<HTMLDivElement> & { ref?: Ref<HTMLDivElement> }) {
  return (
    <div
      ref={ref}
      className={cn('card-actions flex gap-0.5 px-4 pb-3', className)}
      {...props}
    />
  );
}
