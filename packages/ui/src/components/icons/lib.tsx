import type { ComponentPropsWithoutRef, ReactNode } from 'react';

export type IconProps = ComponentPropsWithoutRef<'svg'> & {
  size?: number;
};

export function createIcon(
  name: string,
  {
    children,
    viewBox = '0 0 24 24',
    defaultProps = {},
  }: {
    viewBox?: string;
    children: ReactNode;
    defaultProps?: Partial<IconProps>;
  }
) {
  function Icon({ className, size = 16, ...props }: IconProps) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox={viewBox}
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        className={className}
        {...defaultProps}
        {...props}
      >
        {children}
      </svg>
    );
  }

  Icon.displayName = `Icon${name.charAt(0).toUpperCase() + name.slice(1)}`;
  return Icon;
}
