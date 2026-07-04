// styles — import once at your app root:
// import "pg-lab-ui/styles/globals.css"

export { cn } from "./lib/cn";
export { colorVar, colorVarStyle, COLOR_VARIANTS, type ColorVariant } from "./lib/colorVariant";

// Theme — stateless provider + the hook that actually holds state
export { ThemeProvider, useTheme, type ThemeProviderProps } from "./theme/ThemeProvider";
export { useThemeState, type Theme } from "./hooks/useThemeState";

export { Button } from "./components/Button";
export { buttonVariants } from "./components/Button.variants";
export type { ButtonProps } from "./components/Button";

export { Badge } from "./components/Badge";
export { badgeVariants } from "./components/Badge.variants";
export type { BadgeProps } from "./components/Badge";

export { Input } from "./components/Input";
export { inputWrapperVariants } from "./components/Input.variants";
export type { InputProps } from "./components/Input";

export { Textarea, type TextareaProps } from "./components/Textarea";
export { Checkbox, type CheckboxProps } from "./components/Checkbox";
export { Radio, type RadioProps } from "./components/Radio";
export { Switch, type SwitchProps } from "./components/Switch";
export { Slider, type SliderProps } from "./components/Slider";

export {
  Card,
  CardImage,
  CardBody,
  CardTitle,
  CardDescription,
  CardFooter,
  CardActions,
  type CardProps,
} from "./components/Card";

export { Accordion, AccordionItem, type AccordionItemProps } from "./components/Accordion";

// Tabs — fully controlled/stateless component + the hook that holds state
export { Tabs, TabsList, TabsTrigger, TabsContent, type TabsProps } from "./components/Tabs";
export { useTabsState } from "./hooks/useTabsState";

export { Carousel, CarouselSlide, type CarouselProps } from "./components/Carousel";

export { Popover, type PopoverProps } from "./components/Popover";

export { Tooltip, type TooltipProps } from "./components/Tooltip";

export {
  Dialog,
  DialogBody,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogActions,
  type DialogHandle,
  type DialogProps,
} from "./components/Dialog";

export { Alert, type AlertProps } from "./components/Alert";
export { alertVariants } from "./components/Alert.variants";

// Toasts — stateless provider/viewport + the hook that holds state
export { ToastProvider, ToastViewport, useToast, type ToastProviderProps } from "./components/Toast";
export { useToastQueue, type ToastOptions, type ToastItem } from "./hooks/useToastQueue";
