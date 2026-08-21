import { useState } from 'react';

export interface SidebarState {
    isOpen: boolean;
    toggle: () => void;
    open: () => void;
    close: () => void;
}

export function useSidebarState(defaultOpen = true): SidebarState {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    const toggle = () => {
        setIsOpen((v) => !v);
    };
    const open = () => {
        setIsOpen(true);
    };
    const close = () => {
        setIsOpen(false);
    };

    return { isOpen, toggle, open, close };
}
