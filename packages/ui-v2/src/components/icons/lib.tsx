import type { ComponentPropsWithoutRef, ReactNode } from 'react';

export type IconProps = ComponentPropsWithoutRef<'svg'>;

type CreateIconConfig = {
  name: string;
  children: ReactNode;
  viewBox?: string;
  defaultProps?: Partial<IconProps>;
};

export function createIcon(config: CreateIconConfig) {
  // Extract configuration options with smart defaults
  const { name, children, viewBox = '0 0 24 24', defaultProps = {} } = config;

  // This is the actual React component that will be returned
  function Icon(userProps: IconProps) {
    const { className, ...remainingProps } = userProps;

    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox={viewBox}
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        className={className}
        {...defaultProps}
        {...remainingProps}
      >
        {children}
      </svg>
    );
  }

  // Set a friendly name for React DevTools (e.g., "IconUser" instead of just "Icon")
  const capitalizedName = name.charAt(0).toUpperCase() + name.slice(1);
  Icon.displayName = `Icon${capitalizedName}`;

  return Icon;
}
