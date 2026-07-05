**Perfect. Here's the complete set for the new structure.**

### 1. Updated Structure Reminder (with variants & tools)

Each component directory will look like this:

```
button/
├── Button.tsx
├── variants.ts          # buttonVariants, etc.
└── types.ts             # (optional) if types are big
```

Same for others that have variants (badge, card, alert, etc.).

---

### 2. All Section Barrels (Ready to Copy)

#### `src/components/data-entry/index.ts`
```ts
export { Button, buttonVariants } from './button/Button';
export type { ButtonProps } from './button/Button';

export { Checkbox } from './checkbox/Checkbox';
export type { CheckboxProps } from './checkbox/Checkbox';

export { HelperText } from './helper-text/HelperText';
export type { HelperTextProps } from './helper-text/HelperText';

export { Input } from './input/Input';
export type { InputProps } from './input/Input';

export { Label } from './label/Label';
export type { LabelProps } from './label/Label';

export { Radio } from './radio/Radio';
export type { RadioProps } from './radio/Radio';

export { Select } from './select/Select';
export type { SelectProps } from './select/Select';

export { Slider } from './slider/Slider';
export type { SliderProps } from './slider/Slider';

export { Switch } from './switch/Switch';
export type { SwitchProps } from './switch/Switch';

export { Textarea } from './textarea/Textarea';
export type { TextareaProps } from './textarea/Textarea';
```

#### `src/components/data-display/index.ts`
```ts
export {
  Accordion,
  AccordionItem
} from './accordion/Accordion';
export type { AccordionItemProps } from './accordion/Accordion';

export { Badge, badgeVariants } from './badge/Badge';
export type { BadgeProps } from './badge/Badge';

export {
  Card,
  CardActions,
  CardBody,
  CardDescription,
  CardFooter,
  CardImage,
  CardTitle
} from './card/Card';
export type { CardProps } from './card/Card';

export { Carousel, CarouselSlide } from './carousel/Carousel';
export type { CarouselProps } from './carousel/Carousel';

export { ChangelogItem } from './changelog-item/ChangelogItem';
export type { ChangelogItemProps } from './changelog-item/ChangelogItem';

export { ColorSwatch } from './color-swatch/ColorSwatch';
export type { ColorSwatchProps, ColorSwatchSize } from './color-swatch/ColorSwatch';

export { Hero } from './hero/Hero';
export type { HeroProps } from './hero/Hero';

export { MenuItem } from './menu-item/MenuItem';
export type { MenuItemProps } from './menu-item/MenuItem';

export { NotificationItem } from './notification-item/NotificationItem';
export type { NotificationItemProps } from './notification-item/NotificationItem';

export { Popover } from './popover/Popover';
export type { PopoverProps } from './popover/Popover';

export { ScrollReveal } from './scroll-reveal/ScrollReveal';
export type { ScrollRevealProps } from './scroll-reveal/ScrollReveal';

export { SectionHeader } from './section-header/SectionHeader';
export type { SectionHeaderProps } from './section-header/SectionHeader';

export { SectionHeading } from './section-heading/SectionHeading';
export type { SectionHeadingProps } from './section-heading/SectionHeading';

export { Tooltip } from './tooltip/Tooltip';
export type { TooltipProps } from './tooltip/Tooltip';
```

#### `src/components/navigation/index.ts`
```ts
export { FloatingNav } from './floating-nav/FloatingNav';
export type { FloatingNavProps, NavLink } from './floating-nav/FloatingNav';

export {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from './tabs/Tabs';
export type { TabsProps } from './tabs/Tabs';
```

#### `src/components/feedback/index.ts`
```ts
export { Alert, alertVariants } from './alert/Alert';
export type { AlertProps } from './alert/Alert';

export { DefaultFallback, defaultFallbackVariants } from './default-fallback/DefaultFallback';
export type { DefaultFallbackProps } from './default-fallback/DefaultFallback';

export {
  Dialog,
  DialogActions,
  DialogBody,
  DialogDescription,
  DialogFooter,
  DialogTitle
} from './dialog/Dialog';
export type { DialogProps, DialogHandle } from './dialog/Dialog';

export { ErrorBoundary } from './error-boundary/ErrorBoundary';
export type { ErrorBoundaryProps, FallbackRenderer } from './error-boundary/ErrorBoundary';

export { ToastProvider, ToastViewport, useToast } from './toast/Toast';
export type { ToastProviderProps } from './toast/Toast';
```

#### `src/components/control-panel/index.ts`
```ts
export { ControlConditional } from './control-conditional/ControlConditional';
export type { ControlConditionalProps } from './control-conditional/ControlConditional';

export { ControlGrid } from './control-grid/ControlGrid';
export type { ControlGridProps } from './control-grid/ControlGrid';

export { ControlPanel } from './control-panel/ControlPanel';
export type { ControlPanelProps } from './control-panel/ControlPanel';

export { ControlRow } from './control-row/ControlRow';
export type { ControlRowProps } from './control-row/ControlRow';

export { ControlSection } from './control-section/ControlSection';
export type { ControlSectionProps } from './control-section/ControlSection';

export { ControlSubsection } from './control-subsection/ControlSubsection';
export type { ControlSubsectionProps } from './control-subsection/ControlSubsection';
```

#### `src/components/widgets/index.ts`
```ts
export { ColorPalette, colorPaletteVariants } from './color-palette/ColorPalette';
export type { ColorPaletteProps } from './color-palette/ColorPalette';

export {
  Sidebar,
  SidebarMain,
  SidebarPanel,
  SidebarToggle
} from './sidebar/Sidebar';
export type {
  SidebarProps,
  SidebarMainProps,
  SidebarPanelProps,
  SidebarToggleProps
} from './sidebar/Sidebar';
```

---

###  index.ts
```TS
// Core Utilities
export { cn } from './lib/cn';
export { COLOR_VARIANTS, colorVar, colorVarStyle, type ColorVariant } from './lib/colorVariant';

// Theme
export { useThemeState, type Theme } from './hooks/useThemeState';
export { ThemeProvider, type ThemeProviderProps } from './theme/ThemeProvider';
export { useTheme } from './theme/useTheme';

// Section Barrels (convenience)
export * from './components/data-entry';
export * from './components/data-display';
export * from './components/navigation';
export * from './components/feedback';
export * from './components/control-panel';
export * from './components/widgets';

// Important Individual Hooks
export { useToastQueue, type ToastItem, type ToastOptions } from './hooks/useToastQueue';
export { useSidebarState, type SidebarState } from './hooks/useSidebarState';
export { useFloatingNavState, type FloatingNavState } from './hooks/useFloatingNavState';
export { useTabsState } from './hooks/useTabsState';
export { useResizeObserver } from './hooks/useResizeObserver';
export { useScrollRevealState } from './hooks/useScrollRevealState';

// Icons
export { Icon } from './icons/Icon';
export { iconMap, type IconName } from './icons/iconMap';
export { createIcon } from './icons/lib';
export type { IconProps } from './icons/lib';

// App-specific Cards
export { accentTokens, type AccentToken } from './components/Cards/accentTokens';
export { CardBody as CardBodyWithAccent, type CardBodyProps } from './components/Cards/CardBody';
export { CardLink, type CardLinkProps } from './components/Cards/CardLink';
export { CategoryCard, type CategoryCardProps } from './components/Cards/CategoryCard';
export { DocCard, type DocCardProps } from './components/Cards/DocCard';
export { ProjectCard, type ProjectCardProps } from './components/Cards/ProjectCard';
```

## inside package.json
```json
{
  "exports": {
    ".": {
      "types": "./src/index.ts",
      "default": "./src/index.ts"
    },

    // Section-level
    "./data-entry": {
      "types": "./src/components/data-entry/index.ts",
      "default": "./src/components/data-entry/index.ts"
    },
    "./data-display": {
      "types": "./src/components/data-display/index.ts",
      "default": "./src/components/data-display/index.ts"
    },
    "./navigation": {
      "types": "./src/components/navigation/index.ts",
      "default": "./src/components/navigation/index.ts"
    },
    "./feedback": {
      "types": "./src/components/feedback/index.ts",
      "default": "./src/components/feedback/index.ts"
    },
    "./control-panel": {
      "types": "./src/components/control-panel/index.ts",
      "default": "./src/components/control-panel/index.ts"
    },
    "./widgets": {
      "types": "./src/components/widgets/index.ts",
      "default": "./src/components/widgets/index.ts"
    },

    // Popular individual components (direct access)
    "./button": {
      "types": "./src/components/data-entry/button/Button.tsx",
      "default": "./src/components/data-entry/button/Button.tsx"
    },
    "./card": {
      "types": "./src/components/data-display/card/Card.tsx",
      "default": "./src/components/data-display/card/Card.tsx"
    },
    "./dialog": {
      "types": "./src/components/feedback/dialog/Dialog.tsx",
      "default": "./src/components/feedback/dialog/Dialog.tsx"
    },
    "./sidebar": {
      "types": "./src/components/widgets/sidebar/Sidebar.tsx",
      "default": "./src/components/widgets/sidebar/Sidebar.tsx"
    },

    // Helpers
    "./hooks/*": {
      "types": "./src/hooks/*.ts",
      "default": "./src/hooks/*.ts"
    },
    "./lib/*": {
      "types": "./src/lib/*.ts",
      "default": "./src/lib/*.ts"
    },
    "./theme/*": {
      "types": "./src/theme/*.ts",
      "default": "./src/theme/*.ts"
    },

    // Wildcard fallback
    "./*": {
      "types": "./src/components/*/*/*.tsx",
      "default": "./src/components/*/*/*.tsx"
    }
  }
}
```
