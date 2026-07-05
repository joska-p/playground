import { Button } from '@repo/ui/data-entry';
import { useState } from 'react';
import { getAllLayers } from '../../core/layers/registry';
import { addLayer, removeLayer, toggleLayer, updateLayerParams } from '../../stores/ui/actions';
import { useLayersConfig } from '../../stores/ui/selectors';
import { LayerRow } from './LayerRow';

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
    <div className="border-border flex w-full flex-col gap-2 border-t px-3 py-2">
      <div className="flex flex-col gap-1">
        <span className="text-muted-foreground text-xs font-medium">Layers</span>

        {layers.map((entry) => {
          const meta = allLayerMetas.find((m) => m.id === entry.id);
          if (!meta) return null;

          return (
            <LayerRow
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
      </div>

      <div className="flex items-center gap-2">
        {availableLayers.length > 0 && (
          <div className="relative">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setShowAddDropdown(!showAddDropdown);
              }}
            >
              + Add Layer
            </Button>

            {showAddDropdown && (
              <div className="border-border bg-card absolute bottom-full left-0 mb-1 w-44 rounded border shadow-lg">
                {availableLayers.map((meta) => (
                  <button
                    key={meta.id}
                    type="button"
                    onClick={() => {
                      handleAddLayer(meta.id);
                    }}
                    className="text-foreground hover:bg-muted w-full cursor-pointer px-2 py-1 text-left text-xs transition-colors"
                  >
                    {meta.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export { LayerStackEditor };
