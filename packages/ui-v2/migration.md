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
