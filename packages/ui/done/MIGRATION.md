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

plan for the directory structure as an example. all those directory do not have to be in the final package

│ ├── components/
│ │ │
│ │ ├── data-entry/ # Forms, inputs, user text entry
│ │ │ ├── button/
│ │ │ │ ├── button.tsx
│ │ │ ├── input/
│ │ │ ├── select/
│ │ │ ├── checkbox/
│ │ │ ├── radio-group/
│ │ │ ├── switch/
│ │ │ ├── textarea/
│ │ │ └── index.ts # Re-exports all data-entry components
│ │ │
│ │ ├── data-display/ # Showing information to the user
│ │ │ ├── table/
│ │ │ ├── card/
│ │ │ ├── badge/
│ │ │ ├── avatar/
│ │ │ ├── tooltip/
│ │ │ ├── tag/
│ │ │ └── index.ts
│ │ │
│ │ ├── navigation/ # Moving around the app
│ │ │ ├── tabs/
│ │ │ ├── breadcrumb/
│ │ │ ├── pagination/
│ │ │ ├── navbar/
│ │ │ ├── sidebar/
│ │ │ └── index.ts
│ │ │
│ │ ├── feedback/ # Alerts, loading states, modals
│ │ │ ├── dialog/ # Compound component (Dialog, Trigger, Content)
│ │ │ │ ├── dialog.tsx
│ │ │ │ ├── dialog-content.tsx
│ │ │ │ ├── dialog-trigger.tsx
│ │ │ │ └── index.ts
│ │ │ ├── alert/
│ │ │ ├── toast/ # Toast + Toaster provider
│ │ │ ├── progress-bar/
│ │ │ ├── skeleton/
│ │ │ └── index.ts
│ │ │
│ │ ├── layout/ # Structural building blocks
│ │ │ ├── stack/ # Flexbox row/col
│ │ │ ├── grid/
│ │ │ ├── container/
│ │ │ ├── divider/
│ │ │ ├── aspect-ratio/
│ │ │ └── index.ts
│ │ │
│ │ └── typography/ # Text elements
│ │ ├── heading/
│ │ ├── text/
│ │ ├── code/
│ │ └── index.ts
│ │
│ ├── hooks/ # UI-specific React hooks
│ │ ├── use-disclosure.ts # For modals/drawers
│ │ ├── use-toast.ts
│ │ └── index.ts
│ │
│ ├── primitives/ # Unstyled, accessible base components (Optional)
│ │ └── ...
