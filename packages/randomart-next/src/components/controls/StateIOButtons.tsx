import { Button } from '@repo/ui/data-entry';
import { useCallback, useRef } from 'react';
import { randomartStore, updateTreeConfig } from '../../stores/randomart/store';
import type { RandomartState } from '../../stores/randomart/types';

/**
 * The "recipe" needed to reproduce an image and its animation state:
 * the inputs to `generateTrees`, plus the animation frame (`time`) and
 * which behaviors are active. `mode`, `activeChannel`, and `running` are
 * still excluded as pure UI/playback state. The derived trees themselves
 * are excluded too — they're recomputed on import.
 */
type RandomartRecipe = {
  seedText: RandomartState['seedText'];
  selectedRuleId: RandomartState['selectedRuleId'];
  customOperators: RandomartState['customOperators'];
  minDepth: RandomartState['minDepth'];
  maxDepth: RandomartState['maxDepth'];
  time: RandomartState['time'];
  activeBehaviorIds: RandomartState['activeBehaviorIds'];
  correlatedRGB?: RandomartState['correlatedRGB'];
};

function toRecipe(state: RandomartState): RandomartRecipe {
  const {
    seedText,
    selectedRuleId,
    customOperators,
    minDepth,
    maxDepth,
    time,
    activeBehaviorIds,
    correlatedRGB
  } = state;
  return {
    seedText,
    selectedRuleId,
    customOperators,
    minDepth,
    maxDepth,
    time,
    activeBehaviorIds,
    correlatedRGB
  };
}

// Minimal runtime shape check — not a full schema validator, just enough
// to fail fast on an obviously wrong file rather than crash deep inside
// generateTrees.
function isRandomartRecipe(value: unknown): value is RandomartRecipe {
  if (typeof value !== 'object' || value === null) return false;
  const v = value as Record<string, unknown>;
  return (
    typeof v['seedText'] === 'string' &&
    typeof v['selectedRuleId'] === 'string' &&
    typeof v['minDepth'] === 'number' &&
    typeof v['maxDepth'] === 'number' &&
    typeof v['time'] === 'number' &&
    Array.isArray(v['activeAnimationBehaviorIds'])
  );
}

export function StateIOButtons() {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleExport = useCallback(() => {
    const recipe = toRecipe(randomartStore.getState());
    const json = JSON.stringify(recipe, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'randomart-recipe.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, []);

  const handleImportClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = ''; // allow re-selecting the same file later

    if (!file) return;

    const reader = new FileReader();

    reader.onload = (event) => {
      try {
        const text = event.target?.result;
        if (typeof text !== 'string') throw new Error('File could not be read as text');

        const parsed: unknown = JSON.parse(text);
        if (!isRandomartRecipe(parsed)) {
          throw new Error('File does not contain a valid randomart recipe');
        }

        // updateTreeConfig recomputes trees from the recipe and merges the
        // result into the store (running/time/animationSpeed/mode/etc. are
        // left untouched).
        updateTreeConfig(() => parsed, 'state/importRecipe');
      } catch (err) {
        console.error('Failed to import recipe:', err);
      }
    };

    reader.onerror = () => {
      console.error('Failed to read file:', reader.error);
    };

    reader.readAsText(file);
  }, []);

  return (
    <>
      <Button
        type="button"
        onClick={handleExport}
      >
        Export
      </Button>
      <Button
        type="button"
        onClick={handleImportClick}
      >
        Import
      </Button>
      <input
        ref={fileInputRef}
        type="file"
        accept="application/json"
        onChange={handleFileChange}
        className="hidden"
      />
    </>
  );
}
