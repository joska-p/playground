✅ Ported to v2
Component
Button, Badge, Input, Textarea, Checkbox, Radio, Switch, Slider
Card (compound: CardImage, CardBody, CardTitle, etc.)
Accordion (+ AccordionItem), Tabs (+ compound), Carousel (+ CarouselSlide)
Popover, Tooltip, Dialog (+ compound)
Alert, Toast (ToastProvider/Viewport/useToast)
cn utility
CSS styles
❌ Missing from v2
Core form elements (could be gaps):

1. Select — packages/ui/src/components/form/select/Select.tsx + selectVariants
2. Label — packages/ui/src/components/elements/label/Label.tsx
3. HelperText — packages/ui/src/components/elements/helper-text/HelperText.tsx
   Error handling:
4. ErrorBoundary — packages/ui/src/components/error-boundary/ErrorBoundary.tsx
5. DefaultFallback — packages/ui/src/components/error-boundary/DefaultFallback.tsx
   Widgets (app-specific, may not belong in a v2 UI lib):
6. ControlPanel + ControlSection — interactive control panel widget

*** all the above is done

*** keep the bellow ones from the current ui lib

7. ColorPalette — color palette widget
8. Sidebar — sidebar layout widget
   Stylistic/content components (design-specific, may be out of scope for v2):
9. SectionHeading, ColorSwatch (atoms)
10. NotificationItem, ChangelogItem, MenuItem, ProjectCard, DocCard, CategoryCard (molecules)
11. FloatingNav, ScrollReveal, Hero, SectionHeader (organisms)
    Icons:
12. Icon / iconMap / IconName / createIcon — v2 depends on lucide-react instead, so this may be intentional
    Utilities:
13. useResizeObserver — hook
14. variantConfig — lib utility

plan for the directory structure

# CORE: The actual React components

│ │ ├── src/
│ │ │ ├── components/
│ │ │ │ ├── button/
│ │ │ │ │ ├── button.tsx
│ │ │ │ │ ├── button.test.tsx
│ │ │ │ │ ├── button.stories.tsx
│ │ │ │ │ └── index.ts
│ │ │ │ ├── input/
│ │ │ │ │ └── ...
│ │ │ │ └── dialog/
│ │ │ │ ├── dialog.tsx
│ │ │ │ ├── dialog-content.tsx
│ │ │ │ ├── dialog-trigger.tsx
│ │ │ │ └── index.ts
│ │ │ ├── hooks/ # UI-specific hooks (e.g., useDisclosure)
│ │ │ ├── primitives/ # Unstyled, accessible base components (Radix-style)
│ │ │ └── index.ts # Main barrel export
│ │ ├── package.json # "main", "module", "types", "exports" (CJS/ESM)
│ │ ├── tsconfig.json
│ │ └── vite.config.ts # Build config using Vite in library mode
│ │
│ ├── theme/ # Design tokens, CSS variables, Tailwind preset
│ │ ├── src/
│ │ │ ├── tokens.ts # Spacing, colors, radii as JS objects
│ │ │ ├── styles.css # Global CSS reset & variables
│ │ │ └── tailwind-preset.ts # If using Tailwind
│ │ └── package.json
│ │
│ ├── utils/ # Framework-agnostic vanilla TS utilities
│ │ ├── src/
│ │ │ ├── cx.ts # Class name merger (cn utility)
│ │ │ ├── merge-refs.ts # React ref merging utility
│ │ │ └── index.ts
│ │ └── package.json
│ │
│ └── icons/ # Optional: Icon library wrapper
│ ├── src/
│ └── package.json
│
