import { useState } from 'react';
import { ControlSection } from './ControlSection';
import type { ControlSection as ControlSectionType } from './types';

type PanelContentProps = {
  sections: ControlSectionType[];
  accordion?: boolean;
  defaultOpenSections?: string[] | undefined;
};

export function PanelContent({
  sections,
  accordion = true,
  defaultOpenSections = []
}: PanelContentProps) {
  const [openSections, setOpenSections] = useState<Set<string>>(() => {
    if (defaultOpenSections.length > 0) {
      return new Set(defaultOpenSections);
    }
    if (sections[0] && sections[0].defaultOpen !== false) {
      return new Set([sections[0].id]);
    }
    return new Set();
  });

  const toggleSection = (id: string) => {
    setOpenSections((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        if (accordion) next.clear();
        next.add(id);
      }
      return next;
    });
  };

  return (
    <div className="flex-1 overflow-y-auto overscroll-contain">
      {sections.map((section) => (
        <ControlSection
          key={section.id}
          section={section}
          isOpen={openSections.has(section.id)}
          onToggle={() => {
            toggleSection(section.id);
          }}
          flow={section.flow ?? 'vertical'}
        />
      ))}
    </div>
  );
}
