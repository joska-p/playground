import { Button } from '@repo/tlc/components/forms';
import { PanelSection } from '@repo/tlc/layout';
import { useState } from 'react';

import { LayerRowSection } from './LayerRowSection';
import { getAllLayers } from '../../core/layers/registry';
import { addLayer, removeLayer, toggleLayer, updateLayerParams } from '../../stores/ui/actions';
import { useLayersConfig } from '../../stores/ui/selectors';

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
        <PanelSection label="Layers">
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
                            updateLayerParams(entry.id, {
                                [key]: value
                            });
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
        </PanelSection>
    );
}

export { LayerStackEditor };
