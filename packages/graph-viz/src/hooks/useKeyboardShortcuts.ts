import { useEffect } from 'react';
import { useUiStore } from '../stores/uiStore';

type KeyboardConfig = {
  onArrowUp?: () => void;
  onArrowDown?: () => void;
  onEnter?: () => void;
};

/**
 * Keyboard shortcuts for graph navigation.
 * - Escape: go back to overview, deselect node
 * - f: focus search input
 * - r: toggle auto-rotate
 * - ↑/↓: navigate community list (via config callbacks)
 * - Enter: select focused community (via config callback)
 */
export function useKeyboardShortcuts(config?: KeyboardConfig) {
  const communityFilter = useUiStore((s) => s.communityFilter);
  const setCommunityFilter = useUiStore((s) => s.setCommunityFilter);
  const selectNode = useUiStore((s) => s.selectNode);
  const autoRotate = useUiStore((s) => s.autoRotate);
  const setAutoRotate = useUiStore((s) => s.setAutoRotate);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      // Don't capture when typing in inputs
      const target = e.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
        // Allow Ctrl+F / Cmd+F to focus search even in inputs
        if ((e.ctrlKey || e.metaKey) && (e.key === 'f' || e.key === 'F')) {
          e.preventDefault();
          const searchInput = document.querySelector<HTMLInputElement>(
            'input[placeholder="Search nodes..."]'
          );
          searchInput?.focus();
        }
        return;
      }

      switch (e.key) {
        case 'Escape': {
          // Go back to overview if in detail mode
          if (/^\d+$/.test(communityFilter.trim())) {
            setCommunityFilter('');
            selectNode(null);
            e.preventDefault();
          }
          break;
        }
        case 'f':
        case 'F': {
          // Focus search input (Ctrl+F / Cmd+F)
          if (e.ctrlKey || e.metaKey) {
            const searchInput = document.querySelector<HTMLInputElement>(
              'input[placeholder="Search nodes..."]'
            );
            searchInput?.focus();
            e.preventDefault();
          }
          break;
        }
        case 'r':
        case 'R': {
          // Toggle auto-rotate
          setAutoRotate(!autoRotate);
          e.preventDefault();
          break;
        }
        case 'ArrowUp': {
          e.preventDefault();
          config?.onArrowUp?.();
          break;
        }
        case 'ArrowDown': {
          e.preventDefault();
          config?.onArrowDown?.();
          break;
        }
        case 'Enter': {
          if (e.ctrlKey || e.metaKey) break;
          config?.onEnter?.();
          break;
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [communityFilter, setCommunityFilter, selectNode, autoRotate, setAutoRotate, config]);
}
