// styles — import once at your app root:
// import "pg-lab-ui/styles/globals.css"

export { cn } from "./lib/cn";
export { colorVar, colorVarStyle, COLOR_VARIANTS, type ColorVariant } from "./lib/colorVariant";

export { ThemeProvider, useTheme } from "./theme/ThemeProvider";

export { Button, buttonVariants, type ButtonProps } from "./components/Button";
export { Badge, type BadgeProps } from "./components/Badge";
export { Input, type InputProps } from "./components/Input";
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

export { Tabs, TabsList, TabsTrigger, TabsContent, type TabsProps } from "./components/Tabs";

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

export { ToastProvider, useToast, type ToastOptions } from "./components/Toast";
