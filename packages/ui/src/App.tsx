import { ToastProvider } from './components/feedback';
import { FloatingNav } from './components/navigation';
import { useThemeState } from './hooks/useThemeState';
import { useToastQueue } from './hooks/useToastQueue';
import { ThemeProvider } from './theme/ThemeProvider';

/* Showcase imports */
import { DocHeading } from './showcase/layout/DocHeading';
import { Prose } from './showcase/layout/Prose';
import { ThemeToggleButton } from './showcase/layout/ThemeToggleButton';

// sections
import { ArchitectureSection } from './showcase/sections/ArchitectureSection';
import { DesignTokensSection } from './showcase/sections/DesignTokensSection';
import { PhilosophySection } from './showcase/sections/PhilosophySection';
import { SetupSection } from './showcase/sections/SetupSection';
import { VariantSystemSection } from './showcase/sections/VariantSystemSection';

// component demos
import { EdgeField } from './components/widgets';
import { AccordionDemo } from './showcase/components/AccordionDemo';
import { AlertGallery } from './showcase/components/AlertGallery';
import { BadgeGallery } from './showcase/components/BadgeGallery';
import { ButtonGallery } from './showcase/components/ButtonGallery';
import { CardDemo } from './showcase/components/CardDemo';
import { CardGalleries } from './showcase/components/CardGalleries';
import { CardLinkDemo } from './showcase/components/CardLinkDemo';
import { CarouselDemo } from './showcase/components/CarouselDemo';
import { ChangelogGallery } from './showcase/components/ChangelogGallery';
import { CheckboxDemo } from './showcase/components/CheckboxDemo';
import { ColorPaletteDemo } from './showcase/components/ColorPaletteDemo';
import { ColorSwatchGallery } from './showcase/components/ColorSwatchGallery';
import { ControlPanelDemo } from './showcase/components/ControlPanelDemo';
import { DialogDemo } from './showcase/components/DialogDemo';
import { EdgeCardDemo } from './showcase/components/EdgeCardDemo';
import { ErrorBoundaryDemo } from './showcase/components/ErrorBoundaryDemo';
import { FloatingNavDemo } from './showcase/components/FloatingNavDemo';
import { HelperTextDemo } from './showcase/components/HelperTextDemo';
import { IconGallery } from './showcase/components/IconGallery';
import { InputDemo } from './showcase/components/InputDemo';
import { LabelDemo } from './showcase/components/LabelDemo';
import { MenuItemDemo } from './showcase/components/MenuItemDemo';
import { NotificationItemDemo } from './showcase/components/NotificationItemDemo';
import { PopoverDemo } from './showcase/components/PopoverDemo';
import { RadioDemo } from './showcase/components/RadioDemo';
import { ScrollRevealDemo } from './showcase/components/ScrollRevealDemo';
import { SectionHeaderDemo } from './showcase/components/SectionHeaderDemo';
import { SectionHeadingDemo } from './showcase/components/SectionHeadingDemo';
import { SelectDemo } from './showcase/components/SelectDemo';
import { SidebarDemo } from './showcase/components/SidebarDemo';
import { SliderDemo } from './showcase/components/SliderDemo';
import { SwitchDemo } from './showcase/components/SwitchDemo';
import { TabsDemo } from './showcase/components/TabsDemo';
import { TextareaDemo } from './showcase/components/TextareaDemo';
import { ToastDemo } from './showcase/components/ToastDemo';
import { TooltipDemo } from './showcase/components/TooltipDemo';
import { HeroSection } from './showcase/sections/HeroSection';

// references
import { AccessibilitySection } from './showcase/references/AccessibilitySection';
import { ChecklistSection } from './showcase/references/ChecklistSection';
import { ContributingSection } from './showcase/references/ContributingSection';
import { HooksSection } from './showcase/references/HooksSection';

import { ErrorBoundary } from './components/feedback';

function AppContent() {
  return (
    <ErrorBoundary>
      <main className="mx-auto flex max-w-240 flex-col px-4 py-10 sm:px-6">
        <header className="mb-14 flex items-center justify-between">
          <div>
            <span className="text-primary text-sm font-semibold tracking-tight">pg_lab-ui v2</span>
            <span className="text-foreground-dim ml-2 text-xs">guidelines + showcase</span>
          </div>
        </header>

        <HeroSection />

        <div className="fixed inset-0 h-screen">
          <EdgeField />
        </div>

        <PhilosophySection />
        <SetupSection />
        <DesignTokensSection />
        <ArchitectureSection />
        <VariantSystemSection />

        <DocHeading level="h2">6. Component reference</DocHeading>
        <Prose>
          <p>
            Each component entry includes the API table, a code example, and an interactive live
            preview.
          </p>
        </Prose>

        <ButtonGallery />
        <BadgeGallery />
        <InputDemo />
        <LabelDemo />
        <HelperTextDemo />
        <TextareaDemo />
        <SelectDemo />
        <CheckboxDemo />
        <RadioDemo />
        <SwitchDemo />
        <SliderDemo />
        <CardDemo />
        <CardLinkDemo />
        <EdgeCardDemo />
        <AccordionDemo />
        <TabsDemo />
        <CarouselDemo />
        <PopoverDemo />
        <TooltipDemo />
        <DialogDemo />
        <AlertGallery />
        <ToastDemo />
        <SectionHeaderDemo />
        <SectionHeadingDemo />
        <ColorSwatchGallery />
        <ChangelogGallery />
        <NotificationItemDemo />
        <IconGallery />
        <MenuItemDemo />
        <ColorPaletteDemo />
        <ScrollRevealDemo />
        <SidebarDemo />
        <ControlPanelDemo />
        <CardGalleries />
        <ErrorBoundaryDemo />
        <FloatingNavDemo />

        <HooksSection />
        <ChecklistSection />
        <AccessibilitySection />
        <ContributingSection />
      </main>
    </ErrorBoundary>
  );
}

export function App() {
  const theme = useThemeState();
  const toastQueue = useToastQueue();

  return (
    <ThemeProvider
      theme={theme.theme}
      setTheme={theme.setTheme}
      toggleTheme={theme.toggleTheme}
    >
      <ToastProvider
        toasts={toastQueue.toasts}
        toast={toastQueue.toast}
        dismiss={toastQueue.dismiss}
      >
        <FloatingNav
          brand={{ label: 'pg_lab-ui', href: '#' }}
          links={[
            { label: 'philosophy', href: '#philosophy' },
            { label: 'setup', href: '#setup' },
            { label: 'tokens', href: '#tokens' },
            { label: 'architecture', href: '#architecture' },
            { label: 'variants', href: '#variants' },
            { label: 'components', href: '#components' },
            { label: 'hooks', href: '#hooks' },
            { label: 'checklist', href: '#checklist' },
            { label: 'a11y', href: '#accessibility' },
            { label: 'contributing', href: '#contributing' }
          ]}
          themeToggle={<ThemeToggleButton />}
        />
        <AppContent />
      </ToastProvider>
    </ThemeProvider>
  );
}

export function AppWithoutThemeProvider() {
  const toastQueue = useToastQueue();

  return (
    <ToastProvider
      toasts={toastQueue.toasts}
      toast={toastQueue.toast}
      dismiss={toastQueue.dismiss}
    >
      <AppContent />
    </ToastProvider>
  );
}
