import { IconArrowDiagonal } from './components/IconArrowDiagonal';
import { IconArrowRight } from './components/IconArrowRight';
import { IconBluesky } from './components/IconBluesky';
import { IconBook } from './components/IconBook';
import { IconBox } from './components/IconBox';
import { IconChevronDown } from './components/IconChevronDown';
import { IconClose } from './components/IconClose';
import { IconCode } from './components/IconCode';
import { IconColor } from './components/IconColor';
import { IconDataViz } from './components/IconDataViz';
import { IconDiscord } from './components/IconDiscord';
import { IconDocumentation } from './components/IconDocumentation';
import { IconFlame } from './components/IconFlame';
import { IconGenerative } from './components/IconGenerative';
import { IconGithub } from './components/IconGithub';
import { IconGrid } from './components/IconGrid';
import { IconGrid3x3 } from './components/IconGrid3x3';
import { IconHamburger } from './components/IconHamburger';
import { IconHome } from './components/IconHome';
import { IconImage } from './components/IconImage';
import { IconImageDown } from './components/IconImageDown';
import { IconInfinity } from './components/IconInfinity';
import { IconLightbulb } from './components/IconLightbulb';
import { IconPalette } from './components/IconPalette';
import { IconPieChart } from './components/IconPieChart';
import { IconRandom } from './components/IconRandom';
import { IconSimulation } from './components/IconSimulation';
import { IconSocial } from './components/IconSocial';
import { IconSparkles } from './components/IconSparkles';
import { IconSpinner } from './components/IconSpinner';
import { IconWrench } from './components/IconWrench';
import { IconX } from './components/IconX';
export const iconMap = {
  'arrow-diagonal': IconArrowDiagonal,
  'arrow-right': IconArrowRight,
  bluesky: IconBluesky,
  book: IconBook,
  box: IconBox,
  'chevron-down': IconChevronDown,
  close: IconClose,
  code: IconCode,
  color: IconColor,
  'data-viz': IconDataViz,
  discord: IconDiscord,
  documentation: IconDocumentation,
  flame: IconFlame,
  generative: IconGenerative,
  github: IconGithub,
  grid: IconGrid,
  'grid-3x3': IconGrid3x3,
  hamburger: IconHamburger,
  home: IconHome,
  image: IconImage,
  'image-down': IconImageDown,
  infinity: IconInfinity,
  lightbulb: IconLightbulb,
  palette: IconPalette,
  'pie-chart': IconPieChart,
  random: IconRandom,
  simulation: IconSimulation,
  social: IconSocial,
  sparkles: IconSparkles,
  spinner: IconSpinner,
  wrench: IconWrench,
  x: IconX,
} as const;

export type IconName = keyof typeof iconMap;
