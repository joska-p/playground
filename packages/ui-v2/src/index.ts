// styles — import once at your app root:
// import "pg-lab-ui/styles/globals.css"

export { cn } from './lib/cn';
export { COLOR_VARIANTS, colorVar, colorVarStyle, type ColorVariant } from './lib/colorVariant';

// Theme — stateless provider + the hook that actually holds state
export { useThemeState, type Theme } from './hooks/useThemeState';
export { ThemeProvider, useTheme, type ThemeProviderProps } from './theme/ThemeProvider';

export { Button } from './components/Button';
export type { ButtonProps } from './components/Button';
export { buttonVariants } from './components/Button.variants';

export { Badge } from './components/Badge';
export type { BadgeProps } from './components/Badge';
export { badgeVariants } from './components/Badge.variants';

export { Input } from './components/Input';
export type { InputProps } from './components/Input';
export { inputWrapperVariants } from './components/Input.variants';

export { Textarea, type TextareaProps } from './components/Textarea';

export { Select } from './components/Select';
export type { SelectProps } from './components/Select';
export { selectVariants, selectWrapperVariants } from './components/Select.variants';

export { Label } from './components/Label';
export type { LabelProps } from './components/Label';
export { labelVariants } from './components/Label.variants';

export { HelperText } from './components/HelperText';
export type { HelperTextProps } from './components/HelperText';
export { helperTextVariants } from './components/HelperText.variants';

export { Checkbox, type CheckboxProps } from './components/Checkbox';
export { Radio, type RadioProps } from './components/Radio';
export { Slider, type SliderProps } from './components/Slider';
export { Switch, type SwitchProps } from './components/Switch';

export {
  Card,
  CardActions,
  CardBody,
  CardDescription,
  CardFooter,
  CardImage,
  CardTitle,
  type CardProps
} from './components/Card';

export { Accordion, AccordionItem, type AccordionItemProps } from './components/Accordion';

// Tabs — fully controlled/stateless component + the hook that holds state
export { Tabs, TabsContent, TabsList, TabsTrigger, type TabsProps } from './components/Tabs';
export { useTabsState } from './hooks/useTabsState';

export { Carousel, CarouselSlide, type CarouselProps } from './components/Carousel';

export { Popover, type PopoverProps } from './components/Popover';

export { Tooltip, type TooltipProps } from './components/Tooltip';

export {
  Dialog,
  DialogActions,
  DialogBody,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  type DialogHandle,
  type DialogProps
} from './components/Dialog';

export { Alert, type AlertProps } from './components/Alert';
export { alertVariants } from './components/Alert.variants';

// Toasts — stateless provider/viewport + the hook that holds state
export {
  ToastProvider,
  ToastViewport,
  useToast,
  type ToastProviderProps
} from './components/Toast';
export { useToastQueue, type ToastItem, type ToastOptions } from './hooks/useToastQueue';

// ErrorBoundary — the one class-component exception; see its own file for why.
export { DefaultFallback, type DefaultFallbackProps } from './components/DefaultFallback';
export { defaultFallbackVariants } from './components/DefaultFallback.variants';
export {
  ErrorBoundary,
  type ErrorBoundaryProps,
  type FallbackRenderer
} from './components/ErrorBoundary';

// ControlPanel — a container for control sections, with optional title and variant.
export { ControlPanel, type ControlPanelProps } from './components/ControlPanel/ControlPanel';

// ControlSection — a section within a ControlPanel, with optional title and variant.
export { ControlSection, type ControlSectionProps } from './components/ControlPanel/ControlSection';

// ControlRow — a single row of controls within a ControlSection.
export { ControlRow, type ControlRowProps } from './components/ControlPanel/ControlRow';

// ControlConditional — a conditional wrapper for control rows, based on a condition.
export {
  ControlConditional,
  type ControlConditionalProps
} from './components/ControlPanel/ControlConditional';

// ControlSubsection — a subsection within a ControlSection, with optional title and variant.
export {
  ControlSubsection,
  type ControlSubsectionProps
} from './components/ControlPanel/ControlSubsection';

// ControlGrid — a grid of control rows within a ControlSection.
export { ControlGrid, type ControlGridProps } from './components/ControlPanel/ControlGrid';

// CardBody — layout-only wrapper for a card's main content.
export { accentTokens, type AccentToken } from './components/Cards/accentTokens';
export { CardBody as CardBodyWithAccent, type CardBodyProps } from './components/Cards/CardBody';
export { CardLink, type CardLinkProps } from './components/Cards/CardLink';
export { CategoryCard, type CategoryCardProps } from './components/Cards/CategoryCard';
export { DocCard, type DocCardProps } from './components/Cards/DocCard';
export { ProjectCard, type ProjectCardProps } from './components/Cards/ProjectCard';
