import { useState } from "react";
import { useWorkflow } from "../../store/workflowStore";
import { ControlSection } from "./sections/ControlSection";
import { ImageSourceControls } from "./ImageSourceControls";
import { ManipulationSelector } from "./ManipulationSelector";
import { PresetSelector } from "./PresetSelector";
import { WorkflowControls } from "./WorkflowControls";

type Section = "source" | "presets" | "manipulations" | "workflow";

function Controls() {
  const workflow = useWorkflow();
  const [openSection, setOpenSection] = useState<Section | null>(
    workflow.length > 0 ? "workflow" : "source",
  );

  function toggleSection(section: Section) {
    setOpenSection((prev) => (prev === section ? null : section));
  }

  return (
    <div className="flex w-72 flex-col gap-2 p-2">
      <ControlSection
        title="Source"
        isOpen={openSection === "source"}
        onToggle={() => toggleSection("source")}
      >
        <ImageSourceControls />
      </ControlSection>

      <ControlSection
        title="Presets"
        isOpen={openSection === "presets"}
        onToggle={() => toggleSection("presets")}
      >
        <PresetSelector />
      </ControlSection>

      <ControlSection
        title="Manipulations"
        isOpen={openSection === "manipulations"}
        onToggle={() => toggleSection("manipulations")}
      >
        <ManipulationSelector />
      </ControlSection>

      <ControlSection
        title="Workflow"
        isOpen={openSection === "workflow"}
        onToggle={() => toggleSection("workflow")}
      >
        <WorkflowControls />
      </ControlSection>
    </div>
  );
}

export { Controls };
