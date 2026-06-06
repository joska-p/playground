import { iconMap } from './iconMap';
import type { IconName } from './iconMap';
import type { IconProps } from './lib';

type Props = IconProps & { name: IconName };

export function Icon({ name, ...props }: Props) {
  const Component = iconMap[name];
  return <Component {...props} />;
}
