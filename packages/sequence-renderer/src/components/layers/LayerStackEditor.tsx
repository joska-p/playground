import { Button } from '@repo/ui/Button';
import type { JSX } from 'react';
import { useState } from 'react';
import { getAllLayers } from '../../core/visualizations/layers/registry';
import {
  addLayer,
  moveLayerDown,
  moveLayerUp,
  removeLayer,
  saveCurrentPreset,
  toggleLayer,
  updateLayerParams
} from '../../stores/sequence/actions';
import { useLayersConfig } from '../../stores/sequence/selectors/useLayersConfig';
import { LayerRow } from './LayerRow';
import { SavePresetDialog } from '../presets/SavePresetDialog';

function LayerStackEditor(): JSX.Element {
  const layers = useLayersConfig();
  const [expandedLayerId, setExpandedLayerId] = useState<string | null>(null);
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [showAddDropdown, setShowAddDropdown] = useState(false);

  const allLayerMetas = getAllLayers();
  const enabledCount = layers.filter((l) => l.enabled).length;

  const availableLayers = allLayerMetas.filter(
    (m) => !layers.some((l) => l.layerId === m.id)
  );

  function handleToggleLayer(layerId: string) {
    toggleLayer(layerId);
  }

  function handleAddLayer(layerId: string) {
    addLayer(layerId);
    setShowAddDropdown(false);
  }

  function handleRemoveLayer(layerId: string) {
    removeLayer(layerId);
    if (expandedLayerId === layerId) {
      setExpandedLayerId(null);
    }
  }

  function handleSave(name: string) {
    saveCurrentPreset(name);
    setShowSaveDialog(false);
  }

  return (
    <div className="border-border flex w-full flex-col gap-2 border-t px-3 py-2">
      <div className="flex flex-col gap-1">
        <span className="text-muted-foreground text-xs font-medium">
          Layers
        </span>

        {layers.map((entry, index) => {
          const meta = allLayerMetas.find((m) => m.id === entry.layerId);
          if (!meta) return null;

          return (
            <LayerRow
              key={entry.layerId}
              meta={meta}
              enabled={entry.enabled}
              params={entry.params}
              isExpanded={expandedLayerId === entry.layerId}
              canMoveUp={index > 0}
              canMoveDown={index < layers.length - 1}
              canRemove={enabledCount > 1 || !entry.enabled}
              onToggle={() => handleToggleLayer(entry.layerId)}
              onMoveUp={() => moveLayerUp(entry.layerId)}
              onMoveDown={() => moveLayerDown(entry.layerId)}
              onRemove={() => handleRemoveLayer(entry.layerId)}
              onToggleExpand={() =>
                setExpandedLayerId(
                  expandedLayerId === entry.layerId ? null : entry.layerId
                )
              }
              onParamChange={(key, value) =>
                updateLayerParams(entry.layerId, { [key]: value })
              }
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
              onClick={() => setShowAddDropdown(!showAddDropdown)}
            >
              + Add Layer
            </Button>

            {showAddDropdown && (
              <div className="border-border bg-card absolute bottom-full left-0 mb-1 w-44 rounded border shadow-lg">
                {availableLayers.map((meta) => (
                  <button
                    key={meta.id}
                    type="button"
                    onClick={() => handleAddLayer(meta.id)}
                    className="text-foreground hover:bg-muted w-full cursor-pointer px-2 py-1 text-left text-xs transition-colors"
                  >
                    {meta.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {showSaveDialog ? (
          <SavePresetDialog
            onSave={handleSave}
            onCancel={() => setShowSaveDialog(false)}
          />
        ) : (
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowSaveDialog(true)}
          >
            Save as...
          </Button>
        )}
      </div>
    </div>
  );
}

export { LayerStackEditor };
