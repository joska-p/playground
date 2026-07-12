import { Button } from '@repo/ui/button';
import { ControlSection } from '@repo/ui/control-panel';
import { useState } from 'react';
import { getAllLayers } from '../../core/layers/registry';
import { addLayer, removeLayer, toggleLayer, updateLayerParams } from '../../stores/ui/actions';
import { useLayersConfig } from '../../stores/ui/selectors';
import { LayerRowSection } from './LayerRowSection';

function LayerStackEditor() {
  const layers = useLayersConfig();
  const [expandedLayerId, setExpandedLayerId] = useState<string | null>(null);
  const [showAddDropdown, setShowAddDropdown] = useState(false);

  const allLayerMetas = getAllLayers();
  const availableLayers = allLayerMetas.filter((m) => !layers.some((l) => l.id === m.id));

  function handleToggleLayer(id: string) {
    toggleLayer(id);
  }

  function handleRemoveLayer(id: string) {
    removeLayer(id);
  }

  function handleAddLayer(id: string) {
    addLayer(id);
    setShowAddDropdown(false);
  }

  return (
    <ControlSection title="Layers">
      {layers.map((entry) => {
        const meta = allLayerMetas.find((m) => m.id === entry.id);
        if (!meta) return null;

        return (
          <LayerRowSection
            key={entry.id}
            meta={meta}
            enabled={entry.enabled}
            params={entry.params}
            isExpanded={expandedLayerId === entry.id}
            onToggle={() => {
              handleToggleLayer(entry.id);
            }}
            onToggleExpand={() => {
              setExpandedLayerId(expandedLayerId === entry.id ? null : entry.id);
            }}
            onParamChange={(key, value) => {
              updateLayerParams(entry.id, { [key]: value });
            }}
            onRemove={() => {
              handleRemoveLayer(entry.id);
            }}
          />
        );
      })}
      {availableLayers.length > 0 && (
        <Button
          variant="default"
          size="sm"
          onClick={() => {
            setShowAddDropdown(!showAddDropdown);
          }}
        >
          + Add Layer
        </Button>
      )}
      {showAddDropdown &&
        availableLayers.map((meta) => (
          <Button
            key={meta.id}
            className="w-full px-4 py-2 text-left hover:bg-gray-100"
            onClick={() => {
              handleAddLayer(meta.id);
              setShowAddDropdown(false);
            }}
          >
            {meta.name}
          </Button>
        ))}
    </ControlSection>
  );
}

export { LayerStackEditor };
