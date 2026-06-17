import type { JSX } from 'react';
import { useState } from 'react';
import { getAllLayerMetas } from '../../core/visualizations/layers/registry';
import {
  useLayersConfig,
  useScaleConfig,
  toggleLayer,
  addLayer,
  removeLayer,
  moveLayerUp,
  moveLayerDown,
  updateLayerParams,
  setScale,
  updateScaleParams,
  saveCurrentPreset
} from '../../stores/sequence/store';
import { LayerRow } from './LayerRow';
import { ScaleSelector } from './ScaleSelector';
import { SavePresetDialog } from './SavePresetDialog';

function LayerStackEditor(): JSX.Element {
  const layers = useLayersConfig();
  const scale = useScaleConfig();
  const [expandedLayerId, setExpandedLayerId] = useState<string | null>(null);
  const [scaleExpanded, setScaleExpanded] = useState(false);
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [showAddDropdown, setShowAddDropdown] = useState(false);

  const allLayerMetas = getAllLayerMetas();
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
    <div className="flex w-full flex-col gap-2 border-t border-zinc-700 px-4 py-2">
      <ScaleSelector
        scale={scale}
        expanded={scaleExpanded}
        onToggleExpand={() => setScaleExpanded(!scaleExpanded)}
        onChange={(id) => setScale(id)}
        onParamChange={(key, value) => updateScaleParams({ [key]: value })}
      />

      <div className="flex flex-col gap-1">
        <span className="text-xs font-medium text-zinc-400">Layers</span>

        {layers.map((entry, index) => {
          const meta = allLayerMetas.find(
            (m) => m.id === entry.layerId
          );
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
            <button
              type="button"
              onClick={() => setShowAddDropdown(!showAddDropdown)}
              className="rounded border border-dashed border-zinc-600 px-2 py-0.5 text-xs text-zinc-400 transition-colors hover:border-zinc-500 hover:text-zinc-200"
            >
              + Add Layer
            </button>

            {showAddDropdown && (
              <div className="absolute bottom-full left-0 mb-1 w-44 rounded border border-zinc-600 bg-zinc-800 shadow-lg">
                {availableLayers.map((meta) => (
                  <button
                    key={meta.id}
                    type="button"
                    onClick={() => handleAddLayer(meta.id)}
                    className="w-full px-2 py-1 text-left text-xs text-zinc-300 transition-colors hover:bg-zinc-700"
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
          <button
            type="button"
            onClick={() => setShowSaveDialog(true)}
            className="rounded border border-zinc-600 px-2 py-0.5 text-xs text-zinc-400 transition-colors hover:border-zinc-500 hover:text-zinc-200"
          >
            Save as...
          </button>
        )}
      </div>
    </div>
  );
}

export { LayerStackEditor };
