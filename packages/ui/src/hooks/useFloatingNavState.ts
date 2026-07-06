import type { RefObject } from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';

export type FloatingNavState = {
  visible: boolean;
  navHoveredRef: RefObject<boolean>;
  show: () => void;
  scheduleHide: () => void;
};

export function useFloatingNavState(): FloatingNavState {
  const [visible, setVisible] = useState(true);
  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout>>(null);
  const navHoveredRef = useRef(false);

  const isAtTop = useCallback(() => document.documentElement.scrollTop < 50, []);

  const show = useCallback(() => {
    setVisible(true);
  }, []);

  const scheduleHide = useCallback(() => {
    if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    if (isAtTop() || navHoveredRef.current) return;
    scrollTimeoutRef.current = setTimeout(() => {
      if (!navHoveredRef.current && !isAtTop()) setVisible(false);
    }, 1500);
  }, [isAtTop]);

  const updateVisibility = useCallback(() => {
    show();
    scheduleHide();
  }, [show, scheduleHide]);

  useEffect(() => {
    const onScroll = () => {
      updateVisibility();
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [updateVisibility]);

  useEffect(() => {
    updateVisibility();
  }, [updateVisibility]);

  return { visible, navHoveredRef, show, scheduleHide };
}
