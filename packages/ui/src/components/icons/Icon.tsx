import type { IconName } from './iconMap';
import { iconMap } from './iconMap';
import type { IconProps } from './lib';

type Props = IconProps & { name: IconName };

export function Icon({ name, ...props }: Props) {
  const Component = iconMap[name];
  return (
    <Component
      className="h-4 w-4"
      {...props}
    />
  );
}
