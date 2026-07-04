import { useState } from 'react';

/**
 * useTabsState — the state hook for <Tabs>. `Tabs` itself is a stateless,
 * fully controlled component; this hook is the (optional) place state
 * actually lives, kept separate so the component tree stays pure.
 *
 *   const tabs = useTabsState("overview");
 *   <Tabs value={tabs.value} onValueChange={tabs.setValue}>...</Tabs>
 */
export function useTabsState(defaultValue: string) {
  const [value, setValue] = useState(defaultValue);
  return { value, setValue };
}
