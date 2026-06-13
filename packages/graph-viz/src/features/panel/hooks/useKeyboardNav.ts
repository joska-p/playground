import { useEffect, useState } from 'react';
import { useUiStore } from '../../../stores/uiStore';

/**
 * Keyboard navigation state and handler for the community list in the side panel.
 * Manages a focused index, arrow key navigation, and Enter to select.
 * Returns the current focused index (clamped) and a setter.
 */
export function useKeyboardNav(maxIndex: number) {
  const communityFilter = useUiStore((s) => s.communityFilter);
  const [rawFocusedIndex, setRawFocusedIndex] = useState(0);
  const focusedIndex = Math.min(rawFocusedIndex, Math.max(0, maxIndex));

  // Derive view mode from communityFilter
  const selectedCommunityId = (() => {
    const trimmed = communityFilter.trim();
    return /^\d+$/.test(trimmed) ? Number.parseInt(trimmed, 10) : null;
  })();
  const viewMode = selectedCommunityId !== null ? 'detail' : 'overview';

  // Keyboard navigation for the community list
  useEffect(() => {
    if (viewMode !== 'overview') return;

    function handleKeyDown(e: KeyboardEvent) {
      const target = e.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') return;

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setRawFocusedIndex((prev) => Math.min(prev + 1, maxIndex));
          break;
        case 'ArrowUp':
          e.preventDefault();
          setRawFocusedIndex((prev) => Math.max(prev - 1, 0));
          break;
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [viewMode, maxIndex]);

  return {
    focusedIndex,
    setFocusedIndex: setRawFocusedIndex,
    viewMode,
  };
}
