import { cn } from '../../utils/cn';
import type { IconName } from './iconMap';
import { iconMap } from './iconMap';
import { iconVariants } from './iconVariants';
import type { IconProps } from './lib';

type Props = IconProps & { name: IconName };

export function Icon({ name, className, ...props }: Props) {
  const Component = iconMap[name];
  return (
    <Component
      className={cn(iconVariants(), className)}
      {...props}
    />
  );
}
