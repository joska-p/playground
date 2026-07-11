import type { RefObject } from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';

export interface FloatingNavState {
  visible: boolean;
  navHoveredRef: RefObject<boolean>;
  show: () => void;
  scheduleHide: () => void;
}

export function useFloatingNavState(): FloatingNavState {
  const [visible, setVisible] = useState(true);
  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout>>(null);
  const navHoveredRef = useRef(false);

  const isAtTop = () => document.documentElement.scrollTop < 50;
  const isAtTopRef = useRef(isAtTop);
  useEffect(() => {
    isAtTopRef.current = isAtTop;
  });

  const show = useCallback(() => {
    setVisible(true);
  }, []);

  const scheduleHide = useCallback(() => {
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }
    if (isAtTopRef.current() || navHoveredRef.current) return;
    scrollTimeoutRef.current = setTimeout(() => {
      if (!navHoveredRef.current && !isAtTopRef.current()) {
        setVisible(false);
      }
    }, 1500);
  }, []);

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
    scheduleHide();
  }, [scheduleHide]);

  return { visible, navHoveredRef, show, scheduleHide };
}
