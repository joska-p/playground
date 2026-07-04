// styles — import once at your app root:
// import "pg-lab-ui/styles/globals.css"

export { cn } from './lib/cn';
export { COLOR_VARIANTS, colorVar, colorVarStyle, type ColorVariant } from './lib/colorVariant';

// Theme — stateless provider + the hook that actually holds state
export { useThemeState, type Theme } from './hooks/useThemeState';
export { ThemeProvider, type ThemeProviderProps } from './theme/ThemeProvider';
export { useTheme } from './theme/useTheme';

// Data Entry — forms, inputs, user text entry
export {
  Button,
  Checkbox,
  HelperText,
  Input,
  Label,
  Radio,
  Select,
  Slider,
  Switch,
  Textarea,
  buttonVariants,
  helperTextVariants,
  inputWrapperVariants,
  labelVariants,
  selectVariants,
  selectWrapperVariants,
  type ButtonProps,
  type CheckboxProps,
  type HelperTextProps,
  type InputProps,
  type LabelProps,
  type RadioProps,
  type SelectProps,
  type SliderProps,
  type SwitchProps,
  type TextareaProps
} from './components/data-entry/index';

// Data Display — showing information to the user
export {
  Accordion,
  AccordionItem,
  Badge,
  Card,
  CardActions,
  CardBody,
  CardDescription,
  CardFooter,
  CardImage,
  CardTitle,
  Carousel,
  CarouselSlide,
  ChangelogItem,
  ColorSwatch,
  MenuItem,
  NotificationItem,
  Popover,
  SectionHeading,
  Tooltip,
  badgeVariants,
  type AccordionItemProps,
  type BadgeProps,
  type CardProps,
  type CarouselProps,
  type ChangelogItemProps,
  type ColorSwatchProps,
  type ColorSwatchSize,
  type MenuItemProps,
  type NotificationItemProps,
  type PopoverProps,
  type SectionHeadingProps,
  type TooltipProps
} from './components/data-display/index';

// Navigation — moving around the app
export {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  type TabsProps
} from './components/navigation/index';
export { useTabsState } from './hooks/useTabsState';

// Feedback — alerts, loading states, modals
export {
  Alert,
  DefaultFallback,
  Dialog,
  DialogActions,
  DialogBody,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  ErrorBoundary,
  ToastProvider,
  ToastViewport,
  alertVariants,
  defaultFallbackVariants,
  useToast,
  type AlertProps,
  type DefaultFallbackProps,
  type DialogHandle,
  type DialogProps,
  type ErrorBoundaryProps,
  type FallbackRenderer,
  type ToastProviderProps
} from './components/feedback/index';

// Toasts — stateless provider/viewport + the hook that holds state
export { useToastQueue, type ToastItem, type ToastOptions } from './hooks/useToastQueue';

// ControlPanel — a container for control sections, with optional title and variant.
export {
  ControlConditional,
  type ControlConditionalProps
} from './components/ControlPanel/ControlConditional';
export { ControlGrid, type ControlGridProps } from './components/ControlPanel/ControlGrid';
export { ControlPanel, type ControlPanelProps } from './components/ControlPanel/ControlPanel';
export { ControlRow, type ControlRowProps } from './components/ControlPanel/ControlRow';
export { ControlSection, type ControlSectionProps } from './components/ControlPanel/ControlSection';
export {
  ControlSubsection,
  type ControlSubsectionProps
} from './components/ControlPanel/ControlSubsection';

// Cards — app-specific card variants
export { accentTokens, type AccentToken } from './components/Cards/accentTokens';
export { CardBody as CardBodyWithAccent, type CardBodyProps } from './components/Cards/CardBody';
export { CardLink, type CardLinkProps } from './components/Cards/CardLink';
export { CategoryCard, type CategoryCardProps } from './components/Cards/CategoryCard';
export { DocCard, type DocCardProps } from './components/Cards/DocCard';
export { ProjectCard, type ProjectCardProps } from './components/Cards/ProjectCard';
