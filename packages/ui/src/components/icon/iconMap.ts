import { IconArrowDiagonal } from './IconArrowDiagonal';
import { IconArrowRight } from './IconArrowRight';
import { IconBluesky } from './IconBluesky';
import { IconBook } from './IconBook';
import { IconBox } from './IconBox';
import { IconChevronDown } from './IconChevronDown';
import { IconClose } from './IconClose';
import { IconCode } from './IconCode';
import { IconDiscord } from './IconDiscord';
import { IconDocumentation } from './IconDocumentation';
import { IconFlame } from './IconFlame';
import { IconGithub } from './IconGithub';
import { IconGrid } from './IconGrid';
import { IconGrid3x3 } from './IconGrid3x3';
import { IconHamburger } from './IconHamburger';
import { IconHome } from './IconHome';
import { IconImageDown } from './IconImageDown';
import { IconInfinity } from './IconInfinity';
import { IconLightbulb } from './IconLightbulb';
import { IconPalette } from './IconPalette';
import { IconPieChart } from './IconPieChart';
import { IconSocial } from './IconSocial';
import { IconSparkles } from './IconSparkles';
import { IconSpinner } from './IconSpinner';
import { IconWrench } from './IconWrench';
import { IconX } from './IconX';
export const iconMap = {
  'arrow-diagonal': IconArrowDiagonal,
  'arrow-right': IconArrowRight,
  bluesky: IconBluesky,
  book: IconBook,
  box: IconBox,
  'chevron-down': IconChevronDown,
  close: IconClose,
  code: IconCode,
  discord: IconDiscord,
  documentation: IconDocumentation,
  flame: IconFlame,
  github: IconGithub,
  grid: IconGrid,
  'grid-3x3': IconGrid3x3,
  hamburger: IconHamburger,
  home: IconHome,
  'image-down': IconImageDown,
  infinity: IconInfinity,
  lightbulb: IconLightbulb,
  palette: IconPalette,
  'pie-chart': IconPieChart,
  social: IconSocial,
  sparkles: IconSparkles,
  spinner: IconSpinner,
  wrench: IconWrench,
  x: IconX,
} as const;

export type IconName = keyof typeof iconMap;
