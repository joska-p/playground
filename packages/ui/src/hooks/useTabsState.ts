import { useState } from 'react';

export function useTabsState(defaultValue: string) {
    const [value, setValue] = useState(defaultValue);
    return { value, setValue };
}
